import { Injectable, signal } from '@angular/core';

/** A small, original Web Audio soundscape. It starts only after an explicit user action. */
@Injectable({ providedIn: 'root' })
export class AmbientAudioService {
  readonly isPlaying = signal(false);

  private context?: AudioContext;
  private voices: OscillatorNode[] = [];
  private progressionTimer?: number;
  private melodyTimer?: number;
  private melodyIndex = 0;
  private starting = false;
  private generation = 0;

  private readonly progression = [
    [130.81, 196, 246.94, 329.63],
    [110, 164.81, 196, 261.63],
    [87.31, 130.81, 164.81, 220],
    [98, 146.83, 164.81, 196]
  ];

  toggle(): void {
    if (this.isPlaying() || this.starting) this.stop();
    else void this.start();
  }

  private async start(): Promise<void> {
    if (typeof window === 'undefined' || !('AudioContext' in window)) return;

    const generation = ++this.generation;
    this.starting = true;
    try {
      const context = new AudioContext();
      this.context = context;
      await context.resume();
      if (generation !== this.generation) {
        await context.close();
        return;
      }

      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, context.currentTime);
      master.gain.setTargetAtTime(0.18, context.currentTime, 1.2);

      const lowPass = context.createBiquadFilter();
      lowPass.type = 'lowpass';
      lowPass.frequency.value = 720;
      lowPass.Q.value = 0.55;
      master.connect(lowPass).connect(context.destination);

      const initialChord = this.progression[0];
      initialChord.forEach((frequency, index) => {
        const voice = context.createOscillator();
        const level = context.createGain();
        voice.type = index === 3 ? 'triangle' : 'sine';
        voice.frequency.value = frequency;
        level.gain.value = [0.22, 0.11, 0.08, 0.045][index];
        voice.connect(level).connect(master);
        voice.start();
        this.voices.push(voice);
      });

      const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
      const noiseSamples = noiseBuffer.getChannelData(0);
      for (let index = 0; index < noiseSamples.length; index++) noiseSamples[index] = (Math.random() * 2 - 1) * 0.22;
      const softNoise = context.createBufferSource();
      const noiseFilter = context.createBiquadFilter();
      const noiseLevel = context.createGain();
      softNoise.buffer = noiseBuffer;
      softNoise.loop = true;
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 260;
      noiseLevel.gain.value = 0.025;
      softNoise.connect(noiseFilter).connect(noiseLevel).connect(master);
      softNoise.start();

      let chordIndex = 0;
      const melody = [
        [523.25, 659.25, 783.99, 659.25],
        [523.25, 659.25, 880, 659.25],
        [523.25, 698.46, 880, 698.46],
        [587.33, 783.99, 987.77, 783.99]
      ];
      this.progressionTimer = window.setInterval(() => {
        const activeContext = this.context;
        if (!activeContext || activeContext.state !== 'running') return;
        chordIndex = (chordIndex + 1) % this.progression.length;
        this.melodyIndex = chordIndex;
        const now = activeContext.currentTime;
        this.progression[chordIndex].forEach((frequency, index) => {
          this.voices[index]?.frequency.setTargetAtTime(frequency, now, 2.8);
        });
      }, 16000);
      this.melodyTimer = window.setInterval(() => {
        const activeContext = this.context;
        if (!activeContext || activeContext.state !== 'running') return;
        const now = activeContext.currentTime;
        const note = activeContext.createOscillator();
        const noteLevel = activeContext.createGain();
        note.type = 'sine';
        note.frequency.value = melody[this.melodyIndex][Math.floor(Math.random() * 4)];
        noteLevel.gain.setValueAtTime(0.0001, now);
        noteLevel.gain.exponentialRampToValueAtTime(0.065, now + 0.55);
        noteLevel.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
        note.connect(noteLevel).connect(master);
        note.onended = () => { note.disconnect(); noteLevel.disconnect(); };
        note.start(now);
        note.stop(now + 3.25);
      }, 4200);

      this.isPlaying.set(true);
    } catch {
      this.stop();
    } finally {
      if (generation === this.generation) this.starting = false;
    }
  }

  private stop(): void {
    this.generation++;
    this.starting = false;
    if (this.progressionTimer !== undefined) window.clearInterval(this.progressionTimer);
    if (this.melodyTimer !== undefined) window.clearInterval(this.melodyTimer);
    this.progressionTimer = undefined;
    this.melodyTimer = undefined;
    const context = this.context;
    this.voices.forEach(voice => {
      try { voice.stop(); } catch { /* The context may already have stopped. */ }
    });
    this.voices = [];
    this.context = undefined;
    this.isPlaying.set(false);
    if (context && context.state !== 'closed') void context.close();
  }
}
