import { Component, HostListener, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LanguageService } from '../../core/language.service';
import { CampWeatherService } from './services/camp-weather.service';
import { CampDayPhase, CampWeatherSnapshot, CampWeatherSource } from './models/camp-weather.model';
import { CampTrack } from './models/camp-track.model';

const CAMP_TRACKS: CampTrack[] = [
  {
    id: 'yuru-camp',
    titleKey: 'CAMP.YURU_CAMP',
    noteKey: 'CAMP.YURU_CAMP_NOTE',
    spotifyUrl: 'https://open.spotify.com/album/7eZW6uTX2ZHWjU5yrgObx5',
    embedUrl: 'https://open.spotify.com/embed/album/7eZW6uTX2ZHWjU5yrgObx5?utm_source=generator&theme=0'
  },
  {
    id: 'bocchi',
    titleKey: 'CAMP.BOCCHI',
    noteKey: 'CAMP.BOCCHI_NOTE',
    spotifyUrl: 'https://open.spotify.com/playlist/0khIb9sON6ZEbWvRQI6268',
    embedUrl: 'https://open.spotify.com/embed/playlist/0khIb9sON6ZEbWvRQI6268?utm_source=generator&theme=0'
  },
  {
    id: 'your-name',
    titleKey: 'CAMP.YOUR_NAME',
    noteKey: 'CAMP.YOUR_NAME_NOTE',
    spotifyUrl: 'https://open.spotify.com/album/4qApTp9557qYZzRLEih4uP',
    embedUrl: 'https://open.spotify.com/embed/album/4qApTp9557qYZzRLEih4uP?utm_source=generator&theme=0'
  },
  {
    id: 'spy-family',
    titleKey: 'CAMP.SPY_FAMILY',
    noteKey: 'CAMP.SPY_FAMILY_NOTE',
    spotifyUrl: 'https://open.spotify.com/album/4Tun5Ibl0lRYCv9K7LCzqL',
    embedUrl: 'https://open.spotify.com/embed/album/4Tun5Ibl0lRYCv9K7LCzqL?utm_source=generator&theme=0'
  }
];

const KEYBOARD_NOTES = [
  { key: 'a', frequency: 261.63 },
  { key: 's', frequency: 293.66 },
  { key: 'd', frequency: 329.63 },
  { key: 'f', frequency: 349.23 },
  { key: 'g', frequency: 392 },
  { key: 'h', frequency: 440 },
  { key: 'j', frequency: 493.88 },
  { key: 'k', frequency: 523.25 }
];

const BARRA_BONITA_COORDINATES = { latitude: -22.490, longitude: -48.558 };

@Component({
  selector: 'app-camp',
  standalone: true,
  imports: [TranslocoPipe, UpperCasePipe],
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.scss', './camp-scene.scss', './camp-keyboard.scss', './camp-scene-details.scss', './camp-scene-phases.scss', './camp-weather.scss', './camp-postcard.scss', './camp-postcard-art.scss', './camp-postcard-details.scss', './camp-postcard-phases.scss']
})
export class CampComponent implements OnInit, OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly weatherService = inject(CampWeatherService);
  private readonly languageService = inject(LanguageService);
  private readonly transloco = inject(TranslocoService);
  readonly tracks = CAMP_TRACKS;
  readonly selectedTrack = signal(CAMP_TRACKS[0]);
  readonly safeEmbedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedTrack().embedUrl)
  );
  readonly activeKey = signal<string | null>(null);
  readonly isPlayingSequence = signal(false);
  readonly weather = signal<CampWeatherSnapshot | null>(null);
  readonly weatherSource = signal<CampWeatherSource>('barra-bonita');
  readonly weatherLoading = signal(false);
  readonly weatherErrorKey = signal<string | null>(null);
  readonly localityLabel = signal<string | null>(null);
  readonly localTime = signal('--:--');
  readonly timeOfDay = signal<CampDayPhase>('night');
  readonly postcardFeedbackKey = signal<string | null>(null);
  readonly displayLocation = computed(() => {
    const language = this.languageService.currentLang();
    const place = this.localityLabel();
    if (this.weatherSource() === 'local' && place) return place;
    return this.transloco.translate(this.weatherSource() === 'local' ? 'CAMP.WEATHER_NEARBY' : 'CAMP.WEATHER_BARRA_BONITA', {}, language);
  });
  readonly weatherConditionKey = computed(() => this.getWeatherConditionKey(this.weather()?.weatherCode ?? 0));
  readonly weatherVisual = computed(() => this.getWeatherVisual(this.weather()?.weatherCode ?? 0));
  readonly weatherIcon = computed(() => this.getWeatherIcon(this.weather()?.weatherCode ?? 0));

  private audioContext?: AudioContext;
  private sequenceTimers: number[] = [];
  private activeOscillators: OscillatorNode[] = [];
  private clearActiveKeyTimer?: number;
  private localClockInterval?: number;
  private postcardFeedbackTimer?: number;

  ngOnInit(): void {
    this.updateLocalTime('America/Sao_Paulo');
    if (typeof window !== 'undefined') {
      this.localClockInterval = window.setInterval(() => this.updateLocalTime(this.weather()?.timezone ?? 'America/Sao_Paulo'), 60000);
    }
    this.loadWeather(BARRA_BONITA_COORDINATES, 'barra-bonita');
  }

  useCurrentLocation(): void {
    this.weatherErrorKey.set(null);

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      this.weatherErrorKey.set('CAMP.LOCATION_UNAVAILABLE');
      this.loadWeather(BARRA_BONITA_COORDINATES, 'barra-bonita');
      return;
    }

    this.weatherLoading.set(true);
    navigator.geolocation.getCurrentPosition(
      position => this.loadWeather({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, 'local'),
      error => {
        this.weatherErrorKey.set(error.code === error.PERMISSION_DENIED
          ? 'CAMP.LOCATION_DENIED'
          : 'CAMP.LOCATION_UNAVAILABLE');
        this.loadWeather(BARRA_BONITA_COORDINATES, 'barra-bonita');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  }

  private loadWeather(coordinates: { latitude: number; longitude: number }, source: CampWeatherSource): void {
    this.weatherLoading.set(true);
    this.weatherSource.set(source);
    if (source === 'barra-bonita') this.localityLabel.set(null);
    this.weatherService.getCurrent(coordinates.latitude, coordinates.longitude).subscribe({
      next: weather => {
        this.weather.set(weather);
        this.weatherLoading.set(false);
        this.updateLocalTime(weather.timezone);
      },
      error: () => {
        this.weather.set(null);
        this.weatherLoading.set(false);
        this.weatherErrorKey.set('CAMP.WEATHER_UNAVAILABLE');
        if (source === 'local') {
          this.weatherErrorKey.set('CAMP.LOCAL_WEATHER_UNAVAILABLE');
          this.weatherSource.set('barra-bonita');
          this.loadWeather(BARRA_BONITA_COORDINATES, 'barra-bonita');
        }
      }
    });

    if (source === 'local') {
      this.weatherService.getLocationName(coordinates.latitude, coordinates.longitude, this.languageService.currentLang()).subscribe({
        next: locationName => {
          if (this.weatherSource() === 'local') this.localityLabel.set(locationName || null);
        },
        error: () => {
          if (this.weatherSource() !== 'local') return;
          this.localityLabel.set(null);
          this.weatherErrorKey.set('CAMP.CITY_UNAVAILABLE');
        }
      });
    }
  }

  private updateLocalTime(timezone: string): void {
    const now = new Date();
    try {
      const locale = this.languageService.currentLang() === 'pt' ? 'pt-BR' : 'en-US';
      this.localTime.set(new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
      }).format(now));
      const localHour = Number(new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hourCycle: 'h23',
        timeZone: timezone
      }).format(now));
      this.timeOfDay.set(this.getDayPhase(localHour));
    } catch {
      const locale = this.languageService.currentLang() === 'pt' ? 'pt-BR' : 'en-US';
      this.localTime.set(new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(now));
      this.timeOfDay.set(this.getDayPhase(now.getHours()));
    }
  }

  private getDayPhase(hour: number): CampDayPhase {
    if (hour < 6) return 'night';
    if (hour < 8) return 'dawn';
    if (hour < 17) return 'day';
    if (hour < 20) return 'sunset';
    return 'night';
  }

  async downloadPostcard(): Promise<void> {
    const blob = await this.createPostcardBlob();
    if (!blob || typeof document === 'undefined') return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'erickg-camp-postcard.png';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.showPostcardFeedback('CAMP.POSTCARD_SAVED');
  }

  async sharePostcard(): Promise<void> {
    const blob = await this.createPostcardBlob();
    if (!blob) return;
    const file = new File([blob], 'erickg-camp-postcard.png', { type: 'image/png' });
    const shareData: ShareData = {
      title: this.transloco.translate('CAMP.POSTCARD_TITLE', {}, this.languageService.currentLang()),
      text: `${this.displayLocation()} · ${this.localTime()} · ${this.weather()?.temperature ?? ''} °C`
    };

    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ ...shareData, files: [file] });
        this.showPostcardFeedback('CAMP.POSTCARD_SHARED');
        return;
      }
      if (navigator.share) {
        await navigator.share(shareData);
        await this.downloadPostcard();
        this.showPostcardFeedback('CAMP.POSTCARD_SHARED_AND_SAVED');
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }

    await this.downloadPostcard();
    this.showPostcardFeedback('CAMP.POSTCARD_SHARE_FALLBACK');
  }

  private async createPostcardBlob(): Promise<Blob | null> {
    if (typeof document === 'undefined' || !this.weather()) return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const context = canvas.getContext('2d');
    if (!context) return null;

    const phase = this.timeOfDay();
    const palette = this.getPostcardPalette(phase);
    const background = context.createLinearGradient(0, 0, 0, canvas.height);
    background.addColorStop(0, palette.skyTop);
    background.addColorStop(.72, palette.skyBottom);
    background.addColorStop(1, palette.ground);
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = palette.sun;
    context.beginPath();
    context.arc(950, phase === 'day' ? 150 : 128, 54, 0, Math.PI * 2);
    context.fill();

    if (phase === 'night' || phase === 'sunset') {
      context.fillStyle = '#f1e4cb';
      for (let index = 0; index < 28; index++) {
        const x = 70 + ((index * 173) % 1050);
        const y = 42 + ((index * 89) % 245);
        context.globalAlpha = .35 + (index % 5) * .1;
        context.beginPath();
        context.arc(x, y, index % 4 === 0 ? 2.2 : 1.4, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    }

    this.drawPostcardMountain(context, palette.mountainBack, 398, .4, 124, 640);
    this.drawPostcardMountain(context, palette.mountainFront, 475, .53, 92, 690);
    context.fillStyle = palette.lake;
    context.fillRect(0, 480, 1200, 150);
    context.fillStyle = `${palette.sun}66`;
    for (let index = 0; index < 10; index++) {
      const width = 112 - index * 8;
      context.globalAlpha = .62 - index * .045;
      context.fillRect(650 - width / 2, 505 + index * 12, width, index % 3 === 0 ? 3 : 2);
    }
    context.globalAlpha = 1;

    this.drawPostcardPine(context, 150, 487, 112, palette.mountainFront);
    this.drawPostcardPine(context, 1080, 490, 144, palette.mountainFront);
    this.drawPostcardPine(context, 970, 500, 72, palette.mountainFront);

    context.fillStyle = 'rgba(14, 19, 18, .32)';
    context.beginPath();
    context.ellipse(900, 485, 126, 12, 0, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = palette.tent;
    context.beginPath();
    context.moveTo(775, 480);
    context.lineTo(900, 300);
    context.lineTo(1025, 480);
    context.closePath();
    context.fill();
    context.strokeStyle = `${palette.accent}88`;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(900, 302);
    context.lineTo(900, 480);
    context.stroke();
    context.fillStyle = palette.tentDoor;
    context.beginPath();
    context.moveTo(876, 480);
    context.lineTo(900, 390);
    context.lineTo(925, 480);
    context.closePath();
    context.fill();
    context.strokeStyle = 'rgba(241, 232, 208, .48)';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(777, 480);
    context.lineTo(900, 304);
    context.lineTo(1023, 480);
    context.stroke();

    context.fillStyle = '#514038';
    context.fillRect(694, 524, 52, 7);
    context.fillRect(699, 536, 48, 6);
    context.fillStyle = '#ed9b60';
    context.beginPath();
    context.moveTo(717, 521);
    context.bezierCurveTo(695, 501, 717, 482, 721, 467);
    context.bezierCurveTo(745, 489, 741, 505, 729, 521);
    context.closePath();
    context.fill();
    context.fillStyle = '#f6d18d';
    context.beginPath();
    context.moveTo(720, 520);
    context.bezierCurveTo(712, 508, 724, 499, 726, 491);
    context.bezierCurveTo(737, 505, 731, 516, 728, 520);
    context.closePath();
    context.fill();

    if (this.weatherVisual() === 'rain') {
      context.strokeStyle = 'rgba(222, 234, 240, .34)';
      context.lineWidth = 2;
      for (let index = 0; index < 72; index++) {
        const x = (index * 137) % 1200;
        const y = (index * 83) % 500;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - 10, y + 28);
        context.stroke();
      }
    } else if (this.weatherVisual() === 'snow') {
      context.fillStyle = 'rgba(242, 238, 226, .72)';
      for (let index = 0; index < 42; index++) {
        context.beginPath();
        context.arc((index * 191) % 1200, (index * 97) % 480, index % 3 === 0 ? 3 : 1.8, 0, Math.PI * 2);
        context.fill();
      }
    } else if (this.weatherVisual() === 'cloudy' || this.weatherVisual() === 'storm') {
      context.fillStyle = this.weatherVisual() === 'storm' ? 'rgba(31, 34, 45, .28)' : 'rgba(202, 207, 204, .18)';
      context.beginPath();
      context.ellipse(880, 238, 190, 28, 0, 0, Math.PI * 2);
      context.ellipse(1010, 242, 124, 23, 0, 0, Math.PI * 2);
      context.fill();
    }

    const labelBand = context.createLinearGradient(54, 0, 1146, 0);
    labelBand.addColorStop(0, 'rgba(16, 20, 20, .9)');
    labelBand.addColorStop(.75, 'rgba(16, 20, 20, .76)');
    labelBand.addColorStop(1, 'rgba(16, 20, 20, .56)');
    context.fillStyle = labelBand;
    context.fillRect(54, 398, 1092, 178);
    context.strokeStyle = 'rgba(239, 227, 204, .36)';
    context.lineWidth = 1;
    context.strokeRect(54, 398, 1092, 178);
    context.strokeStyle = palette.accent;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(76, 418);
    context.lineTo(76, 554);
    context.stroke();
    context.fillStyle = palette.accent;
    context.font = '600 20px monospace';
    context.fillText('野営  ·  FIELD NOTE', 96, 435);
    context.fillStyle = '#f1eee8';
    context.font = '700 46px sans-serif';
    context.fillText(this.displayLocation(), 94, 486, 930);
    context.fillStyle = palette.accent;
    context.font = '500 20px monospace';
    context.fillText(`${this.localTime()}  ·  ${this.transloco.translate('CAMP.LOCAL_TIME', {}, this.languageService.currentLang())}`, 96, 520);
    context.fillStyle = '#f1eee8';
    context.font = '700 55px sans-serif';
    context.fillText(`${this.weather()!.temperature}°`, 96, 566);
    context.fillStyle = '#d1cec5';
    context.font = '500 21px sans-serif';
    context.fillText(this.transloco.translate(this.weatherConditionKey(), {}, this.languageService.currentLang()), 238, 560, 300);

    context.strokeStyle = palette.accent;
    context.lineWidth = 3;
    context.strokeRect(1050, 52, 92, 92);
    context.fillStyle = palette.accent;
    context.font = '58px serif';
    context.textAlign = 'center';
    context.fillText('旅', 1096, 118);
    context.textAlign = 'start';
    context.fillStyle = '#e7e0d2';
    context.font = '600 14px monospace';
    context.textAlign = 'right';
    context.fillText('ERICKG.DEV  ·  CAMPING POSTCARD', 1116, 558);
    context.fillStyle = 'rgba(231, 224, 210, .62)';
    context.font = '500 12px monospace';
    context.fillText(`FIELD NOTE  /  ${phase.toUpperCase()}`, 1116, 538);
    context.textAlign = 'start';

    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  }

  private drawPostcardMountain(context: CanvasRenderingContext2D, color: string, baseline: number, heightFactor: number, peakOffset: number, peakX: number): void {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(0, baseline);
    context.lineTo(peakX * .38, baseline - heightFactor * 270);
    context.lineTo(peakX * .64, baseline - peakOffset);
    context.lineTo(peakX, baseline - heightFactor * 340);
    context.lineTo(1200, baseline);
    context.lineTo(1200, 630);
    context.lineTo(0, 630);
    context.closePath();
    context.fill();
  }

  private drawPostcardPine(context: CanvasRenderingContext2D, x: number, baseline: number, height: number, color: string): void {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x, baseline - height);
    context.lineTo(x - height * .42, baseline - height * .26);
    context.lineTo(x - height * .22, baseline - height * .3);
    context.lineTo(x - height * .52, baseline);
    context.lineTo(x + height * .52, baseline);
    context.lineTo(x + height * .22, baseline - height * .3);
    context.lineTo(x + height * .42, baseline - height * .26);
    context.closePath();
    context.fill();
    context.fillStyle = '#28221d';
    context.fillRect(x - 5, baseline - height * .25, 10, height * .25);
  }

  private getPostcardPalette(phase: CampDayPhase) {
    const palettes = {
      dawn: { skyTop: '#6b626a', skyBottom: '#d39a7a', ground: '#4d514a', mountainBack: '#77706a', mountainFront: '#484e49', lake: '#536467', sun: '#f2c795', tent: '#b96d55', tentDoor: '#533b36', accent: '#f0c49f' },
      day: { skyTop: '#79a6ad', skyBottom: '#d9bd94', ground: '#536354', mountainBack: '#68776f', mountainFront: '#45564e', lake: '#4a7478', sun: '#f1d99c', tent: '#b96d55', tentDoor: '#533b36', accent: '#f1dfbb' },
      sunset: { skyTop: '#544d64', skyBottom: '#db916f', ground: '#343b3b', mountainBack: '#655c63', mountainFront: '#343d3c', lake: '#374c50', sun: '#f1c28d', tent: '#bd7058', tentDoor: '#483530', accent: '#f1bd9b' },
      night: { skyTop: '#18212c', skyBottom: '#4d504d', ground: '#202d2a', mountainBack: '#303b3c', mountainFront: '#232d2b', lake: '#263537', sun: '#e8d9b7', tent: '#b86250', tentDoor: '#342b27', accent: '#ed9b8e' }
    };
    return palettes[phase];
  }

  private showPostcardFeedback(key: string): void {
    this.postcardFeedbackKey.set(key);
    if (this.postcardFeedbackTimer !== undefined) window.clearTimeout(this.postcardFeedbackTimer);
    this.postcardFeedbackTimer = window.setTimeout(() => this.postcardFeedbackKey.set(null), 4500);
  }

  private getWeatherConditionKey(code: number): string {
    if (code === 0) return 'CAMP.WEATHER_CLEAR';
    if (code <= 3) return 'CAMP.WEATHER_CLOUDY';
    if (code <= 48) return 'CAMP.WEATHER_FOG';
    if (code <= 57) return 'CAMP.WEATHER_DRIZZLE';
    if (code <= 67) return 'CAMP.WEATHER_RAIN';
    if (code <= 77) return 'CAMP.WEATHER_SNOW';
    if (code <= 82) return 'CAMP.WEATHER_SHOWERS';
    if (code <= 86) return 'CAMP.WEATHER_SNOW';
    return 'CAMP.WEATHER_STORM';
  }

  private getWeatherVisual(code: number): string {
    if (code === 0) return 'clear';
    if (code <= 3 || code <= 48) return 'cloudy';
    if (code <= 57 || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
    if (code <= 77 || (code >= 85 && code <= 86)) return 'snow';
    return 'storm';
  }

  private getWeatherIcon(code: number): string {
    if (code === 0) return '☼';
    if (code <= 3 || code <= 48) return '☁';
    if (code <= 57 || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return '☂';
    if (code <= 77 || (code >= 85 && code <= 86)) return '❄';
    return 'ϟ';
  }

  selectTrack(track: CampTrack): void {
    this.selectedTrack.set(track);
  }

  playKey(index: number, fromSequence = false): void {
    const note = KEYBOARD_NOTES[index];
    if (!note || typeof window === 'undefined' || !('AudioContext' in window)) return;

    if (!fromSequence) this.stopSequence();
    this.activeKey.set(note.key);
    if (this.clearActiveKeyTimer !== undefined) window.clearTimeout(this.clearActiveKeyTimer);
    this.clearActiveKeyTimer = window.setTimeout(() => this.activeKey.set(null), 460);

    try {
      this.audioContext ??= new AudioContext();
      const context = this.audioContext;
      void context.resume();
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(note.frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
      oscillator.connect(gain).connect(context.destination);
      oscillator.onended = () => {
        this.activeOscillators = this.activeOscillators.filter(active => active !== oscillator);
        oscillator.disconnect();
        gain.disconnect();
      };
      this.activeOscillators.push(oscillator);
      oscillator.start(now);
      oscillator.stop(now + 0.44);
    } catch {
      this.activeKey.set(null);
    }
  }

  toggleSequence(): void {
    if (this.isPlayingSequence()) {
      this.stopSequence();
      return;
    }

    this.isPlayingSequence.set(true);
    const melody = [0, 2, 4, 2, 1, 3, 5, 7, 5, 3, 2, 0];
    melody.forEach((keyIndex, step) => {
      const timer = window.setTimeout(() => {
        if (!this.isPlayingSequence()) return;
        this.playKey(keyIndex, true);
        if (step === melody.length - 1) this.isPlayingSequence.set(false);
      }, step * 470);
      this.sequenceTimers.push(timer);
    });
  }

  stopSequence(): void {
    this.sequenceTimers.forEach(timer => window.clearTimeout(timer));
    this.sequenceTimers = [];
    if (this.isPlayingSequence()) this.isPlayingSequence.set(false);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyboardInput(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    const target = event.target;
    if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const index = KEYBOARD_NOTES.findIndex(note => note.key === event.key.toLowerCase());
    if (index >= 0) this.playKey(index);
  }

  ngOnDestroy(): void {
    this.stopSequence();
    if (this.localClockInterval !== undefined) window.clearInterval(this.localClockInterval);
    if (this.postcardFeedbackTimer !== undefined) window.clearTimeout(this.postcardFeedbackTimer);
    if (this.clearActiveKeyTimer !== undefined) window.clearTimeout(this.clearActiveKeyTimer);
    this.activeOscillators.forEach(oscillator => {
      try { oscillator.stop(); } catch { /* The note has already ended. */ }
    });
    if (this.audioContext && this.audioContext.state !== 'closed') void this.audioContext.close();
  }
}
