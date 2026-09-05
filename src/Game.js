import * as THREE from 'three';
import { DerezzEffect } from './Effects.js';
import { AudioManager } from './AudioManager.js';
import { CameraController } from './CameraController.js';
import { AI } from './AI.js';
import { RemotePlayer } from './RemotePlayer.js';
import { createLightCycleMesh } from './LightCycleModel.js';
import { Trail } from './Trail.js';
import { PowerUpSystem } from './PowerUpSystem.js';
import { ScoringSystem } from './ScoringSystem.js';
import { AchievementSystem } from './AchievementSystem.js';

export class Game {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    
    this.derezzEffect = new DerezzEffect(scene);
    this.audioManager = new AudioManager();
    this.cameraController = new CameraController(camera);
    this.powerUpSystem = new PowerUpSystem(scene);
    this.scoringSystem = new ScoringSystem();
    this.achievementSystem = new AchievementSystem();
    // Wywoływane raz na koniec każdej rundy (przegrana/wygrana), zanim
    // ruszy auto-restart - main.js podpina tu wyświetlenie ekranu
    // podsumowania (wynik, statystyki, nowe osiągnięcia).
    this.onGameOver = null;
    this._lastCloseCallTime = 0;
    this._gridBounds = 45;
    this._currentDifficulty = 'medium';
    this._autoRestartTimer = null;

    // --- Multiplayer ---
    // multiplayerManager jest przypisywany z zewnątrz (main.js), Game.js nie
    // tworzy go sam - dzięki temu ten sam Game działa identycznie w trybie
    // single-player (multiplayerManager pozostaje null) i multiplayer.
    this.multiplayerManager = null;
    this.isMultiplayer = false;
    this.isHost = false;
    
    this.gameOver = false;
    this.isStarted = false;
    
    this.player = null;
    this.opponent = null;
    
    this.playerTrail = new Set();
    this.opponentTrail = new Set();
    
    this.init();
  }

  init() {
    window.addEventListener('click', () => {
      this.audioManager.init();
    }, { once: true });
    
    this.cameraController.setMode('follow');
  }

  initPlayer(startPosition = new THREE.Vector3(-15, 0, 0), color = 0x00ffff) {
    this.player = {
      mesh: createLightCycleMesh(color),
      position: startPosition.clone(),
      direction: new THREE.Vector3(1, 0, 0),
      speed: 10,
      visible: true,
      hasShield: false,
      isGhost: false,
      // PowerUpSystem oczekuje interfejsu zgodnego z klasą AI (getPosition()).
      getPosition() {
        return this.position.clone();
      }
    };
    
    this.player.mesh.position.copy(startPosition);
    // Ustaw rotację mesh zgodnie z kierunkiem startowym (ta sama konwencja co w turnPlayer:
    // angle = atan2(dir.x, dir.z)) - bez tego mesh domyślnie "patrzy" w +Z (rotation.y=0),
    // mimo że faktycznie porusza się w kierunku startowym direction.
    this.player.mesh.rotation.y = Math.atan2(this.player.direction.x, this.player.direction.z);
    this.scene.add(this.player.mesh);
    
    this.playerTrailMesh = new Trail(this.scene, color);
    this.playerTrailMesh.start(this.player.position, this.player.direction);
    
    console.log('Player created at:', this.player.position);
  }

  initOpponent(startPosition = new THREE.Vector3(15, 0, 0), color = 0xff00ff, difficulty = 'medium') {
    console.log('Initializing opponent...');
    this.opponent = new AI(this.scene, startPosition, color, difficulty);
    console.log('Opponent initialized:', this.opponent);
    return this.opponent;
  }

  // Odpowiednik initOpponent() dla trybu multiplayer - zamiast AI tworzy
  // RemotePlayer sterowanego zdarzeniami sieciowymi (patrz RemotePlayer.js).
  initRemoteOpponent(startPosition = new THREE.Vector3(15, 0, 0), color = 0xff00ff) {
    console.log('Initializing remote opponent...');
    this.opponent = new RemotePlayer(this.scene, startPosition, color);
    return this.opponent;
  }

  // Zapewnia, że this.opponent jest właściwego typu dla danego trybu -
  // jeśli gracz przełącza się między single-player a multiplayer w tej
  // samej sesji przeglądarki (bez przeładowania strony), poprzednia
  // instancja (AI lub RemotePlayer) jest poprawnie zwalniana (dispose),
  // żeby nie zostawić w scenie osieroconych meshy/materiałów.
  _ensureOpponentType(wantRemote, startPosition, color, difficulty) {
    const isCurrentlyRemote = this.opponent instanceof RemotePlayer;
    if (this.opponent && isCurrentlyRemote !== wantRemote) {
      this.opponent.dispose();
      this.opponent = null;
    }
    if (!this.opponent) {
      if (wantRemote) this.initRemoteOpponent(startPosition, color);
      else this.initOpponent(startPosition, color, difficulty);
    }
  }

  startSinglePlayer(difficulty = 'medium') {
    console.log('Starting single player game...');
    
    this.isMultiplayer = false;
    this._currentDifficulty = difficulty;
    
    // Inicjalizuj audio TUTAJ, nie tylko na globalny 'click' w init() - gra startuje
    // też klawiaturą (SPACJA/Enter w main.js), która nie generuje zdarzenia 'click'.
    // Bez tego gracz korzystający wyłącznie z klawiatury nigdy nie usłyszy dźwięku.
    this.audioManager.init();
    
    if (!this.player) this.initPlayer();
    this._ensureOpponentType(false, new THREE.Vector3(15, 0, 0), 0xff00ff, difficulty);
    
    this.playerTrail.clear();
    this.opponentTrail.clear();
    
    // Reset systemów na nową rundę. UWAGA: restart() (patrz niżej) ma
    // WŁASNĄ, analogiczną kopię tej logiki zamiast wywoływać tę metodę -
    // dzięki temu jedno naciśnięcie R w pełni odpala kolejną rundę (spójnie
    // z wersją 2D), a gamesPlayed wciąż liczy się dokładnie raz na rundę.
    this.scoringSystem.reset();
    this.powerUpSystem.clear();
    this.player.hasShield = false;
    this.player.isGhost = false;
    this.achievementSystem.incrementStat('gamesPlayed', 1);
    
    this.isStarted = true;
    this.gameOver = false;
    this.audioManager.playStartSound();
    
    console.log('Game started! isStarted:', this.isStarted, 'player:', !!this.player, 'opponent:', !!this.opponent);
  }

  // Odpowiednik startSinglePlayer() dla trybu multiplayer. Wywoływane z
  // main.js po odebraniu zdarzenia 'game-start' z serwera (patrz
  // MultiplayerManager.onGameStart). isHost decyduje, kto rozgrywa rolę
  // "host"/"guest" przy rozstrzyganiu zwycięzcy (patrz handlePlayerDeath /
  // handleOpponentDeath) - obie strony grają symetrycznie jako "player"
  // (lokalne sterowanie) kontra "opponent" (RemotePlayer sterowany siecią).
  startMultiplayer(isHost) {
    console.log('Starting multiplayer game, isHost:', isHost);
    
    this.isMultiplayer = true;
    this.isHost = isHost;
    
    this.audioManager.init();
    
    if (!this.player) this.initPlayer();
    this._ensureOpponentType(true, new THREE.Vector3(15, 0, 0), 0xff00ff);
    
    this.playerTrail.clear();
    this.opponentTrail.clear();
    
    this.scoringSystem.reset();
    this.powerUpSystem.clear();
    this.player.hasShield = false;
    this.player.isGhost = false;
    this.achievementSystem.incrementStat('gamesPlayed', 1);
    
    this.isStarted = true;
    this.gameOver = false;
    this.audioManager.playStartSound();
    
    console.log('Multiplayer game started!');
  }

  // Najmniejsza odległość gracza od czegokolwiek, co mogłoby go zabić: granicy
  // planszy lub śladu przeciwnika. Używane do "close call" i "perfect turn".
  // Świadomie NIE sprawdzamy odległości do WŁASNEGO śladu gracza - inaczej
  // gracz wyzwalałby to na sobie przy każdym ciasnym skręcie, co byłoby
  // mylące (to przecież nie jest "bliskie starcie" z przeciwnikiem).
  _minDistanceToDanger() {
    const p = this.player.position;
    let minDist = this._gridBounds - Math.max(Math.abs(p.x), Math.abs(p.z));

    if (this.opponent && this.opponent.trail) {
      const pts = this.opponent.trail.points;
      for (let i = 0; i < pts.length - 1; i++) {
        const d = this._pointToSegmentDistance(p, pts[i], pts[i + 1]);
        if (d < minDist) minDist = d;
      }
    }

    return minDist;
  }

  _pointToSegmentDistance(p, a, b) {
    const abx = b.x - a.x, abz = b.z - a.z;
    const apx = p.x - a.x, apz = p.z - a.z;
    const lenSq = abx * abx + abz * abz;
    let t = lenSq > 0 ? (apx * abx + apz * abz) / lenSq : 0;
    t = Math.max(0, Math.min(1, t));
    const cx = a.x + abx * t, cz = a.z + abz * t;
    const dx = p.x - cx, dz = p.z - cz;
    return Math.sqrt(dx * dx + dz * dz);
  }

  handlePlayerInput(action) {
    if (this.gameOver || !this.isStarted || !this.player) return;
    
    if (action === 'turnLeft') {
      this.turnPlayer('left');
      this.audioManager.playGearShift('player');
    } else if (action === 'turnRight') {
      this.turnPlayer('right');
      this.audioManager.playGearShift('player');
    }
    
    // W multiplayer, każdy skręt lokalnego gracza trzeba przekazać
    // przeciwnikowi przez sieć - to jedyny kanał synchronizacji ruchu
    // RemotePlayer (patrz ograniczenia opisane w RemotePlayer.js).
    if (this.isMultiplayer && this.multiplayerManager) {
      this.multiplayerManager.sendInput(action);
    }
  }

  turnPlayer(direction) {
    const dir = this.player.direction;
    let newDir;
    
    if (direction === 'left') {
      if (dir.x === 1) newDir = new THREE.Vector3(0, 0, -1);
      else if (dir.x === -1) newDir = new THREE.Vector3(0, 0, 1);
      else if (dir.z === 1) newDir = new THREE.Vector3(1, 0, 0);
      else if (dir.z === -1) newDir = new THREE.Vector3(-1, 0, 0);
    } else {
      if (dir.x === 1) newDir = new THREE.Vector3(0, 0, 1);
      else if (dir.x === -1) newDir = new THREE.Vector3(0, 0, -1);
      else if (dir.z === 1) newDir = new THREE.Vector3(-1, 0, 0);
      else if (dir.z === -1) newDir = new THREE.Vector3(1, 0, 0);
    }
    
    if (newDir) {
      const dangerBeforeTurn = this._minDistanceToDanger();

      this.player.direction.copy(newDir);
      const angle = Math.atan2(newDir.x, newDir.z);
      this.player.mesh.rotation.y = angle;

      if (dangerBeforeTurn < 2.0) {
        this.scoringSystem.addPerfectTurn();
      }

      return true;
    }
    return false;
  }

  checkCollisions() {
    if (!this.player || !this.opponent) return;
    
    const playerPos = this.player.position;
    const opponentPos = this.opponent.position;
    
    const gridSize = 45;
    const playerOutOfBounds = Math.abs(playerPos.x) > gridSize || Math.abs(playerPos.z) > gridSize;
    const opponentOutOfBounds = Math.abs(opponentPos.x) > gridSize || Math.abs(opponentPos.z) > gridSize;
    
    const playerKey = `${Math.floor(playerPos.x)},${Math.floor(playerPos.z)}`;
    const playerHitTrail = this.playerTrail.has(playerKey) || this.opponentTrail.has(playerKey);
    
    const opponentKey = `${Math.floor(opponentPos.x)},${Math.floor(opponentPos.z)}`;
    const opponentHitTrail = this.playerTrail.has(opponentKey) || this.opponentTrail.has(opponentKey);
    
    // Tarcza (shield) daje pełną nietykalność. Duch (ghost) pozwala przenikać
    // przez ślady, ale NIE chroni przed wyjechaniem poza granicę planszy.
    let playerDies = playerOutOfBounds || playerHitTrail;
    if (this.player.hasShield) {
      playerDies = false;
    } else if (this.player.isGhost && playerHitTrail && !playerOutOfBounds) {
      playerDies = false;
    }
    
    if (playerDies) {
      this.handlePlayerDeath();
      return;
    }
    
    if (opponentOutOfBounds || opponentHitTrail) {
      this.handleOpponentDeath();
      return;
    }
  }

  handlePlayerDeath() {
    if (this.gameOver) return;
    this.gameOver = true;
    
    this.derezzEffect.create(this.player.position, 0x00ffff);
    this.player.visible = false;
    this.player.mesh.visible = false;
    
    this.cameraController.shake(0.8, 0.5);
    this.audioManager.playDerezzSound();
    this.audioManager.stopEngineSound();
    
    const s = this.achievementSystem.stats;
    this.achievementSystem.updateStats({
      gamesLost: s.gamesLost + 1,
      currentStreak: 0,
      longestSurvival: Math.max(s.longestSurvival, this.scoringSystem.stats.timeSurvived),
      totalDistance: s.totalDistance + this.scoringSystem.stats.distanceTraveled,
      totalPowerUps: s.totalPowerUps + this.scoringSystem.stats.powerUpsCollected,
      closeCallsInGame: this.scoringSystem.stats.closeCalls,
      maxCombo: Math.max(s.maxCombo, this.scoringSystem.maxCombo)
    });
    
    // W multiplayer, "ja" zawsze najlepiej wiem, kiedy JA zginąłem - to
    // najbardziej wiarygodny sygnał do rozstrzygnięcia meczu (w
    // przeciwieństwie do lokalnie zasymulowanej śmierci PRZECIWNIKA, która
    // może się nieznacznie różnić od tego, co widzi druga strona - patrz
    // ograniczenia w RemotePlayer.js). Kodujemy zwycięzcę jako rolę w
    // pokoju (host/guest), nie jako "player"/"opponent" - to drugie byłoby
    // niejednoznaczne, bo "opponent" oznacza co innego z perspektywy
    // każdej ze stron.
    if (this.isMultiplayer && this.multiplayerManager) {
      const winnerRole = this.isHost ? 'guest' : 'host';
      this.multiplayerManager.endGame(winnerRole);
    }
    
    if (this.onGameOver) this.onGameOver({ won: false });
    
    console.log('Player died!');
    this._scheduleAutoRestart();
  }

  handleOpponentDeath() {
    if (this.gameOver) return;
    this.gameOver = true;
    
    this.derezzEffect.create(this.opponent.position, 0xff00ff);
    this.opponent.hide();

    // Symetria z handlePlayerDeath - wcześniej brakowało tu dźwięku i
    // zatrzymania silników przy wygranej, więc runda kończyła się bezgłośnie
    // tylko dla przeciwnika.
    this.audioManager.playDerezzSound();
    this.audioManager.stopEngineSound();
    
    const wonWithSpeed = this.powerUpSystem.getActiveEffects().some(e => e.type === 'speed');
    const perfectGame = this.scoringSystem.stats.closeCalls === 0;
    
    const s = this.achievementSystem.stats;
    this.achievementSystem.updateStats({
      gamesWon: s.gamesWon + 1,
      currentStreak: s.currentStreak + 1,
      winStreak: Math.max(s.winStreak, s.currentStreak + 1),
      longestSurvival: Math.max(s.longestSurvival, this.scoringSystem.stats.timeSurvived),
      totalDistance: s.totalDistance + this.scoringSystem.stats.distanceTraveled,
      totalPowerUps: s.totalPowerUps + this.scoringSystem.stats.powerUpsCollected,
      closeCallsInGame: this.scoringSystem.stats.closeCalls,
      maxCombo: Math.max(s.maxCombo, this.scoringSystem.maxCombo),
      perfectGames: s.perfectGames + (perfectGame ? 1 : 0),
      winsWithSpeedBoost: s.winsWithSpeedBoost + (wonWithSpeed ? 1 : 0)
    });
    
    if (this.isMultiplayer && this.multiplayerManager) {
      const winnerRole = this.isHost ? 'host' : 'guest';
      this.multiplayerManager.endGame(winnerRole);
    }
    
    if (this.onGameOver) this.onGameOver({ won: true });
    
    console.log('Opponent died! You win!');
    this._scheduleAutoRestart();
  }

  // Automatycznie ładuje kolejną rundę jakiś czas po zakończeniu poprzedniej
  // - niezależnie od tego, czy gracz zdąży/zdecyduje się nacisnąć RESTART
  // ręcznie. To główne zabezpieczenie przed sytuacją "runda się skończyła i
  // nic dalej się nie dzieje" (np. gdy dotyk na małym przycisku RESTART w
  // rogu ekranu z jakiegoś powodu nie trafi). Tylko single-player - w
  // multiplayer restart nie jest zsynchronizowany przez sieć (patrz komentarz
  // przy klawiszu R w main.js).
  _scheduleAutoRestart() {
    if (this.isMultiplayer) return;
    if (this._autoRestartTimer) clearTimeout(this._autoRestartTimer);
    this._autoRestartTimer = setTimeout(() => {
      this._autoRestartTimer = null;
      // Runda mogła się już zacząć ręcznie (gracz sam nacisnął R/RESTART,
      // albo przycisk "Kontynuuj" na ekranie podsumowania) zanim minął
      // czas - wtedy nic nie rób, żeby nie przerwać świeżo zaczętej rundy.
      if (!this.gameOver) return;
      this.restart(this._currentDifficulty);
    }, 9000); // było 2500 - wydłużone, żeby było na co popatrzeć na ekranie podsumowania
  }

  update(deltaTime) {
    if (!this.gameOver && this.isStarted && this.player && this.opponent) {
      // Aktualizuj gracza
      const lastPlayerPos = this.player.position.clone();
      this.player.position.add(
        this.player.direction.clone().multiplyScalar(this.player.speed * deltaTime)
      );
      this.player.mesh.position.copy(this.player.position);
      
      this.playerTrailMesh.update(this.player.position, this.player.direction);
      
      // KRYTYCZNE: dopisujemy komórkę, którą gracz WŁAŚNIE OPUŚCIŁ (lastPlayerPos),
      // NIE tę, do której właśnie wjechał. Dopisanie bieżącej komórki powodowało,
      // że checkCollisions() chwilę później wykrywał "kolizję" gracza z komórką,
      // którą sam przed chwilą dopisał do własnego śladu - czyli natychmiastową
      // śmierć na każdej klatce, w tym pierwszej po starcie gry. Znalezione
      // dopiero przy teście w prawdziwej przeglądarce (headless Chrome) - żaden
      // z wcześniejszych testów jednostkowych/build tego nie wyłapał, bo bug
      // ujawnia się wyłącznie przy realnym uruchomieniu pętli gry.
      const playerKey = `${Math.floor(this.player.position.x)},${Math.floor(this.player.position.z)}`;
      const lastPlayerKey = `${Math.floor(lastPlayerPos.x)},${Math.floor(lastPlayerPos.z)}`;
      if (playerKey !== lastPlayerKey) {
        this.playerTrail.add(lastPlayerKey);
      }
      
      // Aktualizuj AI
      const lastOpponentPos = this.opponent.position.clone();
      const lastOpponentDir = this.opponent.direction.clone();
      this.opponent.update(
        deltaTime,
        this.player.position,
        this.playerTrail,
        this.opponentTrail
      );

      // Zmiana kierunku przeciwnika (AI albo RemotePlayer w multiplayer -
      // obie klasy mają dokładnie takie samo pole .direction) - ten sam
      // "podbicie biegu" co przy skręcie gracza (handlePlayerInput), tylko
      // na głosie "opponent". Porównanie exact-equals jest bezpieczne, bo
      // kierunek to zawsze jeden z 4 dokładnych wektorów jednostkowych, nie
      // ciągła wartość zmiennoprzecinkowa.
      if (!this.opponent.direction.equals(lastOpponentDir)) {
        this.audioManager.playGearShift('opponent');
      }

      // Ten sam wzorzec (i ten sam bug przed naprawą) co dla gracza wyżej.
      const opponentKey = `${Math.floor(this.opponent.position.x)},${Math.floor(this.opponent.position.z)}`;
      const lastOpponentKey = `${Math.floor(lastOpponentPos.x)},${Math.floor(lastOpponentPos.z)}`;
      if (opponentKey !== lastOpponentKey) {
        this.opponentTrail.add(lastOpponentKey);
      }

      this.audioManager.updateEngineSound('player', this.player.speed);
      this.audioManager.updateEngineSound('opponent', this.opponent.speed);

      // Głośność silnika przeciwnika wg odległości na scenie - im dalej od
      // gracza, tym ciszej. maxAudibleDistance dobrany do rozmiaru areny
      // (±45, patrz Grid(90,45) w main.js) - przy przeciwniku w drugim
      // rogu planszy dźwięk jest już bardzo cichy, ale nigdy całkiem
      // wyciszony (floor 0.08), żeby nie znikał nagle.
      const opponentDistance = this.player.position.distanceTo(this.opponent.position);
      const maxAudibleDistance = 80;
      const proximity = Math.max(0, 1 - opponentDistance / maxAudibleDistance);
      this.audioManager.setVoiceDistanceGain('opponent', 0.08 + proximity * 0.92);

      this.cameraController.follow(this.player.mesh, deltaTime);
      
      // --- Power-upy ---
      const currentTimeMs = performance.now();
      const collected = this.powerUpSystem.update(
        currentTimeMs, this.player, this.opponent, this._gridBounds, this.opponentTrail
      );
      if (collected) {
        this.scoringSystem.addPowerUpCollected(collected);
      }
      
      // Wizualne oznaczenie aktywnych efektów na modelu gracza
      this.player.mesh.material.opacity = this.player.isGhost ? 0.4 : 1.0;
      this.player.mesh.material.emissiveIntensity = this.player.hasShield ? 1.8 : 1.1;
      
      // --- Punktacja ---
      this.scoringSystem.updateSurvivalTime(deltaTime);
      this.scoringSystem.updateDistance(this.player.position.distanceTo(lastPlayerPos));
      this.scoringSystem.updateCombo(currentTimeMs);
      
      const danger = this._minDistanceToDanger();
      if (danger < 1.5 && currentTimeMs - this._lastCloseCallTime > 500) {
        this.scoringSystem.addCloseCall(danger, currentTimeMs);
        this._lastCloseCallTime = currentTimeMs;
        this.achievementSystem.updateStats({
          closeCallsInGame: this.scoringSystem.stats.closeCalls,
          maxCombo: Math.max(this.achievementSystem.stats.maxCombo, this.scoringSystem.maxCombo)
        });
      }
      
      this.checkCollisions();
    }
    
    this.derezzEffect.update(deltaTime);
  }

  restart(difficulty = 'medium') {
    if (this._autoRestartTimer) {
      clearTimeout(this._autoRestartTimer);
      this._autoRestartTimer = null;
    }
    this._currentDifficulty = difficulty;
    this.gameOver = false;
    
    this.derezzEffect.clear();
    this.playerTrail.clear();
    this.opponentTrail.clear();
    this.powerUpSystem.clear();
    
    if (this.player) {
      this.player.position.set(-15, 0, 0);
      this.player.direction.set(1, 0, 0);
      this.player.speed = 10;
      this.player.visible = true;
      this.player.mesh.visible = true;
      this.player.mesh.position.copy(this.player.position);
      this.player.hasShield = false;
      this.player.isGhost = false;
      this.player.mesh.material.opacity = 1.0;
      this.player.mesh.material.emissiveIntensity = 1.1;
      this.playerTrailMesh.start(this.player.position, this.player.direction);
    }
    
    if (this.opponent) {
      this.opponent.reset(new THREE.Vector3(15, 0, 0));
      // setDifficulty istnieje tylko na AI (single-player) - RemotePlayer
      // (multiplayer) go nie ma, więc optional chaining zamiast wywołania
      // wprost, żeby restart() bezpiecznie działał w obu trybach.
      this.opponent.setDifficulty?.(difficulty);
    }
    
    // Restart NATYCHMIAST zaczyna nową rundę - spójnie z wersją 2D, gdzie R
    // od razu odpala kolejną rozgrywkę, zamiast zostawiać gracza w martwym
    // punkcie "zresetowane pozycje, ale trzeba jeszcze raz nacisnąć SPACJĘ".
    // gamesPlayed liczymy TU (a nie przez wywołanie startSinglePlayer()),
    // więc rośnie dokładnie raz na rundę, bez podwójnego liczenia.
    this.scoringSystem.reset();
    this.player.hasShield = false;
    this.player.isGhost = false;
    this.achievementSystem.incrementStat('gamesPlayed', 1);
    
    this.isStarted = true;
    this.audioManager.startEngineSound('player');
    this.audioManager.startEngineSound('opponent');
    
    console.log('Game restarted and round started!');
  }

  toggleCameraMode() {
    this.cameraController.nextMode();
  }

  toggleMute() {
    const currentVolume = this.audioManager.masterGain?.gain.value || 0;
    this.audioManager.setMuted(currentVolume > 0);
  }

  // Aktualizuje kolory JUŻ ISTNIEJĄCYCH obiektów (gracz/przeciwnik/ślady) na
  // podstawie aktualnego motywu - bez przebudowywania mesh'y. Bezpieczne do
  // wywołania w dowolnym momencie (np. zaraz po zmianie motywu w UI, w
  // trakcie trwającej rundy) - obowiązuje natychmiast, nie dopiero od
  // kolejnej rundy.
  applyThemeColors(p1Hex, p2Hex) {
    if (this.player && this.player.mesh) {
      this.player.mesh.material.color.set(p1Hex);
      this.player.mesh.material.emissive.set(p1Hex);
    }
    if (this.playerTrailMesh) this.playerTrailMesh.setColor(p1Hex);

    if (this.opponent && typeof this.opponent.setColor === 'function') {
      this.opponent.setColor(p2Hex);
    }
  }

  dispose() {
    if (this._autoRestartTimer) {
      clearTimeout(this._autoRestartTimer);
      this._autoRestartTimer = null;
    }
    this.audioManager.dispose();
    if (this.playerTrailMesh) this.playerTrailMesh.dispose();
    if (this.powerUpSystem) this.powerUpSystem.clear();
  }
}
