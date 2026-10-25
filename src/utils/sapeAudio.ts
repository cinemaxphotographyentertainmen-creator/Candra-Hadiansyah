// Web Audio API acoustic synthesis for Dayak Sape' and Borneo soundscapes

class SapeAudioEngine {
  private ctx: AudioContext | null = null;
  private isAmbientPlaying = false;
  private ambientGain: GainNode | null = null;
  private ambientTimer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a natural Sape' pluck note
  // Frequencies for Dayak Sape' Pentatonic scale: C4 (261.63), D4 (293.66), F4 (349.23), G4 (392.00), A4 (440.00), C5 (523.25)
  public playSapeNote(freq: number, velocity = 0.8) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Primary string fundamental (triangle wave for wooden warm resonance)
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // 2. Harmonic overtone (metallic wire sheen)
      const oscHarmonic = this.ctx.createOscillator();
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      // 3. Body Wood Formant Filter (mimicking Adau / Ulin hollow wood body)
      const bodyFilter = this.ctx.createBiquadFilter();
      bodyFilter.type = 'bandpass';
      bodyFilter.frequency.setValueAtTime(800, now);
      bodyFilter.Q.setValueAtTime(2.5, now);

      // 4. Lowpass filter to dampen harsh treble
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(2400, now);
      lowpass.frequency.exponentialRampToValueAtTime(600, now + 1.2);

      // 5. Pluck Gain Envelope
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(velocity * 0.45, now + 0.008); // sharp pluck attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // slow acoustic sustain

      // Routing
      osc.connect(bodyFilter);
      oscHarmonic.connect(bodyFilter);
      bodyFilter.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 2.0);
      oscHarmonic.stop(now + 2.0);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play a quick authentic traditional Sape' melody arpeggio
  public playTraditionalArpeggio() {
    const notes = [261.63, 349.23, 392.00, 523.25, 440.00, 349.23, 261.63];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playSapeNote(freq, 0.7);
      }, index * 220);
    });
  }

  // Toggle tranquil rainforest ambient soundscape
  public toggleAmbient(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    const targetState = enable !== undefined ? enable : !this.isAmbientPlaying;

    if (targetState) {
      if (this.isAmbientPlaying) return true;
      this.isAmbientPlaying = true;

      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 1.5);
      this.ambientGain.connect(this.ctx.destination);

      // Gentle white/pink river flow generator
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.08;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const riverFilter = this.ctx.createBiquadFilter();
      riverFilter.type = 'lowpass';
      riverFilter.frequency.setValueAtTime(450, now);

      whiteNoise.connect(riverFilter);
      riverFilter.connect(this.ambientGain);
      whiteNoise.start(now);

      // Periodic birds chirping simulation
      this.scheduleBirdChirp();
      return true;
    } else {
      if (!this.isAmbientPlaying) return false;
      this.isAmbientPlaying = false;
      if (this.ambientGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      }
      if (this.ambientTimer) {
        window.clearTimeout(this.ambientTimer);
        this.ambientTimer = null;
      }
      return false;
    }
  }

  private scheduleBirdChirp() {
    if (!this.isAmbientPlaying || !this.ctx) return;
    const delay = 4000 + Math.random() * 6000;
    this.ambientTimer = window.setTimeout(() => {
      if (this.isAmbientPlaying && this.ctx) {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2600 + Math.random() * 800, now);
        osc.frequency.exponentialRampToValueAtTime(3600, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.3);

        chirpGain.gain.setValueAtTime(0.001, now);
        chirpGain.gain.linearRampToValueAtTime(0.035, now + 0.08);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(chirpGain);
        chirpGain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      }
      this.scheduleBirdChirp();
    }, delay);
  }

  public getIsAmbientPlaying() {
    return this.isAmbientPlaying;
  }
}

export const sapeAudio = new SapeAudioEngine();
