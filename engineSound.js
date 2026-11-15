// Web Audio API engine sound generator
class PorscheEngineAudio {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.gain = null;
    this.filter = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  playRev(type = 'flat6') {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gainNode = this.ctx.createGain();

      if (type === 'electric') {
        // Taycan futuristic electric propulsion sound
        osc1.type = 'sine';
        osc2.type = 'triangle';
        subOsc.type = 'sine';

        osc1.frequency.setValueAtTime(140, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 1.2);
        osc1.frequency.exponentialRampToValueAtTime(320, now + 2.5);

        osc2.frequency.setValueAtTime(280, now);
        osc2.frequency.exponentialRampToValueAtTime(1760, now + 1.2);
        osc2.frequency.exponentialRampToValueAtTime(640, now + 2.5);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.linearRampToValueAtTime(2200, now + 1.2);
      } else {
        // High-revving 9,000 RPM Flat-6 / V8 Twin-Turbo
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        subOsc.type = 'square';

        // Idle rumble -> Redline rev -> overrun burble
        osc1.frequency.setValueAtTime(75, now);
        osc1.frequency.linearRampToValueAtTime(260, now + 0.6);
        osc1.frequency.exponentialRampToValueAtTime(540, now + 1.4); // scream up to 9k rpm
        osc1.frequency.linearRampToValueAtTime(95, now + 2.6);

        osc2.frequency.setValueAtTime(150, now);
        osc2.frequency.linearRampToValueAtTime(520, now + 0.6);
        osc2.frequency.exponentialRampToValueAtTime(1080, now + 1.4);
        osc2.frequency.linearRampToValueAtTime(190, now + 2.6);

        subOsc.frequency.setValueAtTime(38, now);
        subOsc.frequency.linearRampToValueAtTime(130, now + 1.4);
        subOsc.frequency.linearRampToValueAtTime(45, now + 2.6);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(4200, now + 1.4);
        filter.frequency.exponentialRampToValueAtTime(800, now + 2.6);
      }

      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.3);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 1.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);

      osc1.stop(now + 2.8);
      osc2.stop(now + 2.8);
      subOsc.stop(now + 2.8);

      return true;
    } catch (e) {
      console.warn('Audio playback error:', e);
      return false;
    }
  }
}

export const engineAudio = new PorscheEngineAudio();
