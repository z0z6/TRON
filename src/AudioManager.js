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

  // Buczenie silnika - ciągły dźwięk. Poprzednia wersja to JEDEN surowy,
  // niefiltrowany sawtooth - taka fala ma bardzo ostre, pełne harmoniczne
  // ("brzęczenie w stylu MIDI"), stąd męczące brzmienie przy dłuższym
  // słuchaniu. Teraz: filtr dolnoprzepustowy zaokrągla ostre krawędzie,
  // druga, lekko rozstrojona kopia dodaje "grubości" (klasyczny trik
  // chorus), cichy sub-bass sinus dodaje ciała bez ostrości, a wolne LFO na
  // częstotliwości odcięcia filtra sprawia, że barwa dźwięku powoli "oddycha"
  // zamiast brzmieć jak statyczna, zapętlona pętla.
  startEngineSound() {
    if (!this.isInitialized) return;

    // Zabezpieczenie: restart() może się wywołać w trakcie trwającej rundy
    // (np. ręczny restart klawiszem R bez wcześniejszej śmierci) - bez tego
    // każde takie wywołanie dokładałoby kolejną, nakładającą się warstwę
    // oscylatorów na te już grające.
    this.stopEngineSound();

    this.engineFilter = this.audioContext.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 400;
    this.engineFilter.Q.value = 1.2;

    this.engineOscillator = this.audioContext.createOscillator();
    this.engineOscillator.type = 'sawtooth';
    this.engineOscillator.frequency.value = 80;

    this.engineOscillator2 = this.audioContext.createOscillator();
    this.engineOscillator2.type = 'sawtooth';
    this.engineOscillator2.frequency.value = 80;
    this.engineOscillator2.detune.value = 11; // ~11 centów - "grubszy", mniej cyfrowy dźwięk

    this.engineSub = this.audioContext.createOscillator();
    this.engineSub.type = 'sine';
    this.engineSub.frequency.value = 40;

    this.engineGain = this.audioContext.createGain();
    this.engineGain.gain.value = 0.09;

    this.engineSubGain = this.audioContext.createGain();
    this.engineSubGain.gain.value = 0.05;

    // LFO - powolna (0.15 Hz = pełny cykl co ~6.5s), niewielka modulacja
    // odcięcia filtra. Ledwo zauważalna świadomie, ale zapobiega wrażeniu
    // "martwego", statycznego tonu.
    this.engineLfo = this.audioContext.createOscillator();
    this.engineLfo.type = 'sine';
    this.engineLfo.frequency.value = 0.15;
    this.engineLfoGain = this.audioContext.createGain();
    this.engineLfoGain.gain.value = 120;
    this.engineLfo.connect(this.engineLfoGain);
    this.engineLfoGain.connect(this.engineFilter.frequency);

    this.engineOscillator.connect(this.engineFilter);
    this.engineOscillator2.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.engineSub.connect(this.engineSubGain);
    this.engineSubGain.connect(this.masterGain);

    this.engineOscillator.start();
    this.engineOscillator2.start();
    this.engineSub.start();
    this.engineLfo.start();
  }

  // Zmiana wysokości i barwy dźwięku silnika w zależności od prędkości -
  // oprócz tonu podnosi się też jasność filtra (bardziej "otwarty" dźwięk
  // przy większej prędkości), więc przyspieszanie brzmi bardziej naturalnie
  // niż sama zmiana wysokości tonu.
  updateEngineSound(speed, maxSpeed = 20) {
    if (!this.engineOscillator) return;

    const normalizedSpeed = speed / maxSpeed;
    const frequency = 80 + normalizedSpeed * 120; // 80-200 Hz
    const now = this.audioContext.currentTime;

    this.engineOscillator.frequency.setTargetAtTime(frequency, now, 0.1);
    if (this.engineOscillator2) {
      this.engineOscillator2.frequency.setTargetAtTime(frequency, now, 0.1);
    }
    if (this.engineSub) {
      this.engineSub.frequency.setTargetAtTime(frequency / 2, now, 0.1);
    }
    if (this.engineFilter) {
      const cutoff = 350 + normalizedSpeed * 900;
      this.engineFilter.frequency.setTargetAtTime(cutoff, now, 0.15);
    }
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
    [this.engineOscillator, this.engineOscillator2, this.engineSub, this.engineLfo].forEach((osc) => {
      if (osc) {
        try { osc.stop(); } catch (e) { /* już zatrzymany - nic się nie dzieje */ }
      }
    });
    this.engineOscillator = null;
    this.engineOscillator2 = null;
    this.engineSub = null;
    this.engineLfo = null;
    this.engineFilter = null;
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
