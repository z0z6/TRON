export class ReplaySystem {
  constructor() {
    this.isRecording = false;
    this.isPlaying = false;
    this.inputs = [];
    this.gameState = [];
    this.startTime = 0;
    this.playbackIndex = 0;
    this.playbackSpeed = 1.0;
  }

  // Rozpocznij nagrywanie
  startRecording() {
    this.isRecording = true;
    this.isPlaying = false;
    this.inputs = [];
    this.gameState = [];
    this.startTime = performance.now();
  }

  // Zapisz input gracza
  recordInput(action, data = {}) {
    if (!this.isRecording) return;
    
    const timestamp = performance.now() - this.startTime;
    this.inputs.push({
      timestamp,
      action,
      data
    });
  }

  // Zapisz stan gry (pozycje graczy)
  recordGameState(playerPosition, opponentPosition, playerDirection, opponentDirection) {
    if (!this.isRecording) return;
    
    const timestamp = performance.now() - this.startTime;
    this.gameState.push({
      timestamp,
      player: {
        position: playerPosition.clone(),
        direction: playerDirection.clone()
      },
      opponent: {
        position: opponentPosition.clone(),
        direction: opponentDirection.clone()
      }
    });
  }

  // Zakończ nagrywanie
  stopRecording() {
    this.isRecording = false;
    return {
      inputs: this.inputs,
      gameState: this.gameState,
      duration: this.inputs.length > 0 ? this.inputs[this.inputs.length - 1].timestamp : 0
    };
  }

  // Rozpocznij odtwarzanie
  startPlayback(replayData, onFrameCallback) {
    this.isRecording = false;
    this.isPlaying = true;
    this.inputs = replayData.inputs;
    this.gameState = replayData.gameState;
    this.startTime = performance.now();
    this.playbackIndex = 0;
    this.onFrameCallback = onFrameCallback;
  }

  // Aktualizuj odtwarzanie
  updatePlayback() {
    if (!this.isPlaying) return null;
    
    const currentTime = (performance.now() - this.startTime) * this.playbackSpeed;
    
    // Znajdź wszystkie inputy do tego momentu
    const inputsToApply = [];
    while (this.playbackIndex < this.inputs.length && 
           this.inputs[this.playbackIndex].timestamp <= currentTime) {
      inputsToApply.push(this.inputs[this.playbackIndex]);
      this.playbackIndex++;
    }
    
    // Znajdź najbliższy stan gry
    let currentGameState = null;
    for (let i = this.gameState.length - 1; i >= 0; i--) {
      if (this.gameState[i].timestamp <= currentTime) {
        currentGameState = this.gameState[i];
        break;
      }
    }
    
    // Sprawdź czy odtwarzanie zakończone
    if (this.playbackIndex >= this.inputs.length && 
        currentTime > this.inputs[this.inputs.length - 1]?.timestamp) {
      this.isPlaying = false;
      return { finished: true };
    }
    
    return {
      inputs: inputsToApply,
      gameState: currentGameState,
      currentTime,
      finished: false
    };
  }

  // Zatrzymaj odtwarzanie
  stopPlayback() {
    this.isPlaying = false;
    this.playbackIndex = 0;
  }

  // Zmień prędkość odtwarzania
  setPlaybackSpeed(speed) {
    this.playbackSpeed = Math.max(0.25, Math.min(4.0, speed));
  }

  // Eksportuj do JSON
  exportReplay() {
    return JSON.stringify({
      inputs: this.inputs,
      gameState: this.gameState,
      version: '1.0',
      timestamp: Date.now()
    });
  }

  // Importuj z JSON
  importReplay(jsonString) {
    const data = JSON.parse(jsonString);
    return {
      inputs: data.inputs,
      gameState: data.gameState
    };
  }

  // Pobierz postęp odtwarzania (0-1)
  getPlaybackProgress() {
    if (!this.isPlaying || this.inputs.length === 0) return 0;
    
    const currentTime = (performance.now() - this.startTime) * this.playbackSpeed;
    const totalDuration = this.inputs[this.inputs.length - 1].timestamp;
    
    return Math.min(1, currentTime / totalDuration);
  }
}
