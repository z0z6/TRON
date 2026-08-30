export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.engineOscillator = null;
    this.engineGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Niektóre przeglądarki (głównie Safari) tworzą AudioContext w stanie
      // 'suspended' nawet po geście użytkownika - trzeba go jawnie wznowić.
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
      
      this.isInitialized = true;
      this.startEngineSound();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Buczenie silnika - ciągły dźwięk
  startEngineSound() {
    if (!this.isInitialized) return;

    this.engineOscillator = this.audioContext.createOscillator();
    this.engineGain = this.audioContext.createGain();
    
    // Typ fali - sawtooth daje retro syntezatorowy dźwięk
    this.engineOscillator.type = 'sawtooth';
    this.engineOscillator.frequency.value = 80;
    
    this.engineGain.gain.value = 0.1;
    
    this.engineOscillator.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);
    
    this.engineOscillator.start();
  }

  // Zmiana wysokości dźwięku silnika w zależności od prędkości
  updateEngineSound(speed, maxSpeed = 20) {
    if (!this.engineOscillator) return;
    
    const normalizedSpeed = speed / maxSpeed;
    const frequency = 80 + normalizedSpeed * 120; // 80-200 Hz
    
    this.engineOscillator.frequency.setTargetAtTime(
      frequency,
      this.audioContext.currentTime,
      0.1
    );
  }

  // Dźwięk skrętu
  playTurnSound() {
    if (!this.isInitialized) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      400,
      this.audioContext.currentTime + 0.1
    );
    
    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // Dźwięk derezzing (eksplozja)
  playDerezzSound() {
    if (!this.isInitialized) return;

    // Szum (noise)
    const bufferSize = this.audioContext.sampleRate * 0.5;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    
    const noiseGain = this.audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.5
    );
    
    // Filtr dolnoprzepustowy
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.5
    );
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    // Niski ton
    const osc = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      50,
      this.audioContext.currentTime + 0.5
    );
    
    oscGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.5
    );
    
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    noise.start();
    noise.stop(this.audioContext.currentTime + 0.5);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.5);
  }

  // Dźwięk startu gry
  playStartSound() {
    if (!this.isInitialized) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      800,
      this.audioContext.currentTime + 0.2
    );
    
    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // Zatrzymaj silnik
  stopEngineSound() {
    if (this.engineOscillator) {
      this.engineOscillator.stop();
      this.engineOscillator = null;
    }
  }

  // Wycisz/włącz
  setMuted(muted) {
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : 0.3;
    }
  }

  // Cleanup
  dispose() {
    this.stopEngineSound();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
