import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
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
  styleUrls: ['./camp.component.scss', './camp-scene.scss', './camp-keyboard.scss', './camp-scene-details.scss', './camp-scene-phases.scss', './camp-weather.scss', './camp-postcard.scss', './camp-postcard-art.scss']
})
export class CampComponent implements OnInit, OnDestroy {
  @ViewChild('postcardArtwork') private postcardArtwork?: ElementRef<SVGSVGElement>;
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
  readonly postcardPalette = computed(() => this.getPostcardPalette(this.timeOfDay()));
  readonly postcardLocationFontSize = computed(() => Math.max(25, Math.min(46, Math.floor(930 / (this.displayLocation().length * .57)))));
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
    const svg = this.postcardArtwork?.nativeElement;
    if (!svg || !this.weather() || typeof document === 'undefined') return null;

    const svgMarkup = new XMLSerializer().serializeToString(svg.cloneNode(true) as SVGSVGElement);
    const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(svgBlob);

    try {
      const image = new Image();
      image.src = objectUrl;
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Could not render postcard artwork.'));
      });

      const viewBox = svg.viewBox.baseVal;
      const canvas = document.createElement('canvas');
      canvas.width = viewBox.width || 1200;
      canvas.height = viewBox.height || 630;
      const context = canvas.getContext('2d');
      if (!context) return null;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch {
      return null;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
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
