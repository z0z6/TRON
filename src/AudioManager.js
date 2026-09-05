export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.isInitialized = false;

    // Dwie NIEZALEŻNE "ścieżki" silnika - gracz i przeciwnik (AI albo
    // RemotePlayer w multiplayer - Game.js traktuje oba tak samo). Każdy
    // głos ma własny łańcuch węzłów Web Audio, więc mogą brzmieć
    // jednocześnie z zupełnie inną wysokością/głośnością.
    this.voices = {
      player: this._emptyVoice(),
      opponent: this._emptyVoice()
    };
  }

  _emptyVoice() {
    return {
      osc1: null, osc2: null, sub: null, lfo: null,
      filter: null, gain: null, lfoGain: null, subGain: null,
      distanceGain: null, // dodatkowy mnożnik głośności wg odległości (tylko opponent, patrz setVoiceDistanceGain)
      currentBaseFreq: 80
    };
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
      this.startEngineSound('player');
      this.startEngineSound('opponent');
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Buczenie silnika - ciągły dźwięk, jeden na "głos" (player/opponent).
  // Filtr dolnoprzepustowy zaokrągla ostre krawędzie surowego sawtootha,
  // druga, lekko rozstrojona kopia dodaje "grubości" (klasyczny trik
  // chorus), cichy sub-bass sinus dodaje ciała bez ostrości, a wolne LFO na
  // częstotliwości odcięcia filtra sprawia, że barwa dźwięku powoli
  // "oddycha" zamiast brzmieć jak statyczna, zapętlona pętla.
  //
  // Głos "opponent" ma dodatkowy węzeł distanceGain (patrz
  // setVoiceDistanceGain) w łańcuchu PRZED masterGain - to on realizuje
  // "im dalej, tym ciszej" niezależnie od modulacji wysokości/barwy.
  startEngineSound(voiceId) {
    if (!this.isInitialized) return;
    this.stopEngineSound(voiceId); // patrz komentarz w oryginalnej wersji - zabezpieczenie przed nakładającymi się warstwami po restarcie

    const voice = this.voices[voiceId];
    const ctx = this.audioContext;

    voice.filter = ctx.createBiquadFilter();
    voice.filter.type = 'lowpass';
    voice.filter.frequency.value = 400;
    voice.filter.Q.value = 1.2;

    voice.osc1 = ctx.createOscillator();
    voice.osc1.type = 'sawtooth';
    voice.osc1.frequency.value = 80;

    voice.osc2 = ctx.createOscillator();
    voice.osc2.type = 'sawtooth';
    voice.osc2.frequency.value = 80;
    voice.osc2.detune.value = 11; // ~11 centów - "grubszy", mniej cyfrowy dźwięk

    voice.sub = ctx.createOscillator();
    voice.sub.type = 'sine';
    voice.sub.frequency.value = 40;

    voice.gain = ctx.createGain();
    voice.gain.gain.value = 0.09;

    voice.subGain = ctx.createGain();
    voice.subGain.gain.value = 0.05;

    // LFO - powolna (0.15 Hz = pełny cykl co ~6.5s), niewielka modulacja
    // odcięcia filtra, ledwo zauważalna świadomie.
    voice.lfo = ctx.createOscillator();
    voice.lfo.type = 'sine';
    voice.lfo.frequency.value = 0.15;
    voice.lfoGain = ctx.createGain();
    voice.lfoGain.gain.value = 120;
    voice.lfo.connect(voice.lfoGain);
    voice.lfoGain.connect(voice.filter.frequency);

    // distanceGain: mnożnik 0-1 wg odległości od gracza (tylko sensowny dla
    // "opponent" - dla "player" zawsze zostaje 1, patrz setVoiceDistanceGain).
    voice.distanceGain = ctx.createGain();
    voice.distanceGain.gain.value = 1;

    voice.osc1.connect(voice.filter);
    voice.osc2.connect(voice.filter);
    voice.filter.connect(voice.gain);
    voice.gain.connect(voice.distanceGain);
    voice.distanceGain.connect(this.masterGain);

    voice.sub.connect(voice.subGain);
    voice.subGain.connect(voice.distanceGain);

    voice.osc1.start();
    voice.osc2.start();
    voice.sub.start();
    voice.lfo.start();
  }

  // Zmiana wysokości i barwy dźwięku silnika w zależności od prędkości -
  // oprócz tonu podnosi się też jasność filtra (bardziej "otwarty" dźwięk
  // przy większej prędkości). Zapamiętuje currentBaseFreq, żeby
  // playGearShift() wiedziało, do jakiej wysokości "opaść" po skoku.
  updateEngineSound(voiceId, speed, maxSpeed = 20) {
    const voice = this.voices[voiceId];
    if (!voice || !voice.osc1) return;

    const normalizedSpeed = speed / maxSpeed;
    const frequency = 80 + normalizedSpeed * 120; // 80-200 Hz
    voice.currentBaseFreq = frequency;
    const now = this.audioContext.currentTime;

    voice.osc1.frequency.setTargetAtTime(frequency, now, 0.1);
    voice.osc2.frequency.setTargetAtTime(frequency, now, 0.1);
    voice.sub.frequency.setTargetAtTime(frequency / 2, now, 0.1);

    const cutoff = 350 + normalizedSpeed * 900;
    voice.filter.frequency.setTargetAtTime(cutoff, now, 0.15);
  }

  // Głośność WZGLĘDNA danego głosu wg odległości na scenie - 1 = pełna
  // głośność (blisko gracza), niżej = ciszej (dalej). Wywoływane co klatkę
  // z Game.js dla głosu "opponent" na podstawie realnej odległości 3D
  // między motocyklami. Osobny węzeł od `gain` (który steruje ogólną
  // głośnością silnika, wspólną dla obu głosów) - dzięki temu modulacja
  // odległości nie miesza się z modulacją prędkości.
  setVoiceDistanceGain(voiceId, gainMultiplier) {
    const voice = this.voices[voiceId];
    if (!voice || !voice.distanceGain) return;
    const now = this.audioContext.currentTime;
    // setTargetAtTime zamiast setValueAtTime - płynne przejście przy
    // zmianie odległości, zamiast słyszalnego "skoku" głośności co klatkę.
    voice.distanceGain.gain.setTargetAtTime(gainMultiplier, now, 0.12);
  }

  // "Podbicie biegu" przy zmianie kierunku - ton silnika DANEGO motocykla
  // (player/opponent, niezależnie) skacze w górę (jak wzrost obrotów przy
  // zmianie biegu w silniku spalinowym), po czym płynnie opada z powrotem
  // do wysokości wynikającej z bieżącej prędkości. Zastępuje dawny,
  // niezależny "dzwonek" playTurnSound() - to jest modulacja SAMEGO
  // dźwięku silnika, nie osobny efekt nałożony na wierzch.
  playGearShift(voiceId) {
    const voice = this.voices[voiceId];
    if (!voice || !voice.osc1 || !this.isInitialized) return;

    const now = this.audioContext.currentTime;
    const base = voice.currentBaseFreq || 80;
    const peak = base * 2.4;

    [voice.osc1, voice.osc2].forEach((osc) => {
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.linearRampToValueAtTime(peak, now + 0.09); // narastanie - niżej do wyżej
      osc.frequency.setTargetAtTime(base, now + 0.09, 0.15); // płynny powrót do wysokości napędzanej prędkością
    });
    if (voice.sub) {
      voice.sub.frequency.cancelScheduledValues(now);
      voice.sub.frequency.setValueAtTime(base / 2, now);
      voice.sub.frequency.linearRampToValueAtTime(peak / 2, now + 0.09);
      voice.sub.frequency.setTargetAtTime(base / 2, now + 0.09, 0.15);
    }
    if (voice.filter) {
      const currentCutoff = voice.filter.frequency.value;
      voice.filter.frequency.cancelScheduledValues(now);
      voice.filter.frequency.setValueAtTime(currentCutoff, now);
      voice.filter.frequency.linearRampToValueAtTime(currentCutoff + 700, now + 0.09);
      voice.filter.frequency.setTargetAtTime(currentCutoff, now + 0.09, 0.15);
    }
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

  // Zatrzymaj silnik JEDNEGO głosu (albo obu, jeśli nie podano voiceId -
  // kompatybilność z dawnym wywołaniem bez argumentu, np. przy derezz gracza).
  stopEngineSound(voiceId) {
    const ids = voiceId ? [voiceId] : Object.keys(this.voices);
    for (const id of ids) {
      const voice = this.voices[id];
      if (!voice) continue;
      [voice.osc1, voice.osc2, voice.sub, voice.lfo].forEach((osc) => {
        if (osc) {
          try { osc.stop(); } catch (e) { /* już zatrzymany - nic się nie dzieje */ }
        }
      });
      this.voices[id] = this._emptyVoice();
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
