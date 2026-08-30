import * as THREE from 'three';
import { Game } from './Game.js';
import { Grid } from './Grid.js';
import { MultiplayerManager } from './MultiplayerManager.js';
import { LobbyUI } from './LobbyUI.js';
import { SynthwaveEnvironment } from './Environment.js';

const scene = new THREE.Scene();
// Tło zastępuje teraz gradientowa "kopuła nieba" z SynthwaveEnvironment -
// ten kolor to tylko awaryjny fallback, gdyby sfera nieba z jakiegoś powodu
// nie wyrenderowała się (np. bardzo stary GPU).
scene.background = new THREE.Color(0x0c0420);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 30, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

const environment = new SynthwaveEnvironment(scene);

const grid = new Grid(100, 50);
grid.setColor(0xff2f9e); // różowa siatka, zgodnie z referencyjną grafiką synthwave
scene.add(grid.mesh);

const game = new Game(scene, camera);
game.initPlayer();
game.initOpponent(new THREE.Vector3(15, 0, 0), 0xff00ff, 'medium');

// --- Multiplayer ---
const multiplayerManager = new MultiplayerManager();
const lobbyUI = new LobbyUI(multiplayerManager);
game.multiplayerManager = multiplayerManager;

// Adres serwera multiplayer - GitHub Pages nie uruchamia Node.js, więc
// backend (server.js) trzeba wdrożyć osobno (np. Render, Railway, Fly.io) i
// wskazać jego adres przez ?server=https://twoj-serwer.example.com w URL-u
// strony. Domyślnie zakłada lokalny serwer deweloperski.
const urlParams = new URLSearchParams(window.location.search);
const MULTIPLAYER_SERVER_URL = urlParams.get('server') || 'http://localhost:3000';

let multiplayerConnectAttempted = false;

async function ensureMultiplayerConnected() {
  if (multiplayerManager.isConnected) return true;
  if (multiplayerConnectAttempted) return multiplayerManager.isConnected;
  multiplayerConnectAttempted = true;

  lobbyUI.updateStatus('Łączenie z serwerem...');
  try {
    await multiplayerManager.connect(MULTIPLAYER_SERVER_URL);
    lobbyUI.updateStatus('Połączono. Utwórz pokój lub dołącz do istniejącego.');
    return true;
  } catch (err) {
    console.error('Nie udało się połączyć z serwerem multiplayer:', err);
    lobbyUI.showError('Brak połączenia z serwerem. Sprawdź adres serwera (?server=...) i spróbuj ponownie.');
    multiplayerConnectAttempted = false; // pozwól spróbować ponownie przy kolejnym otwarciu lobby
    return false;
  }
}

multiplayerManager.onPlayerJoined = () => {
  lobbyUI.showStartButton();
};

multiplayerManager.onPlayerLeft = () => {
  lobbyUI.updateStatus('Przeciwnik opuścił pokój.');
  // Jeśli mecz trwał, a przeciwnik zniknął z sieci - traktujemy to jak
  // automatyczną wygraną (nie ma z kim dalej grać).
  if (game.isMultiplayer && game.isStarted && !game.gameOver) {
    game.handleOpponentDeath();
  }
};

multiplayerManager.onGameStart = () => {
  lobbyUI.hide();
  game.startMultiplayer(multiplayerManager.isHost);
};

multiplayerManager.onPlayerInput = (data) => {
  if (game.opponent && typeof game.opponent.applyRemoteInput === 'function') {
    game.opponent.applyRemoteInput(data.action);
  }
};

multiplayerManager.onGameEnd = (data) => {
  // Własna śmierć zawsze rozstrzyga mecz lokalnie jako pierwsza (patrz
  // Game.js#handlePlayerDeath) - jeśli to zdarzenie przyszło już PO tym,
  // po prostu je ignorujemy (gameOver już true). W przeciwnym razie ufamy
  // przeciwnikowi, że to on wykrył kolizję pierwszy.
  if (game.gameOver) return;

  const localPlayerWon =
    (data.winner === 'host' && multiplayerManager.isHost) ||
    (data.winner === 'guest' && !multiplayerManager.isHost);

  if (localPlayerWon) {
    game.handleOpponentDeath();
  } else {
    game.handlePlayerDeath();
  }
};

multiplayerManager.onError = (error) => {
  lobbyUI.showError(`Błąd sieci: ${error.message || error}`);
};

let lastTime = performance.now();

const scoreValueEl = document.getElementById('scoreValue');
const comboValueEl = document.getElementById('comboValue');
const effectsHudEl = document.getElementById('effectsHud');
const toastHudEl = document.getElementById('toastHud');
const touchStartBtnEl = document.getElementById('touchStartBtn');

const EFFECT_LABELS = {
  shield: '🛡️ TARCZA',
  speed: '⚡ PRĘDKOŚĆ',
  ghost: '👻 DUCH',
  bomb: '💣 BOMBA'
};

// --- Toast osiągnięć ---
// Kolejka na wypadek odblokowania kilku osiągnięć w tej samej klatce (np. przy
// pierwszej wygranej, gdy kilka warunków spełnia się naraz) - pokazujemy je
// jedno po drugim, zamiast nadpisywać.
const achievementToastEl = document.getElementById('achievementToast');
const achievementIconEl = document.getElementById('achievementIcon');
const achievementNameEl = document.getElementById('achievementName');
const achievementDescEl = document.getElementById('achievementDesc');

const achievementQueue = [];
let achievementToastBusy = false;

function showNextAchievementToast() {
  if (achievementToastBusy || achievementQueue.length === 0) return;
  achievementToastBusy = true;

  const achievement = achievementQueue.shift();
  achievementIconEl.textContent = achievement.icon;
  achievementNameEl.textContent = `OSIĄGNIĘCIE: ${achievement.name}`;
  achievementDescEl.textContent = achievement.description;
  achievementToastEl.classList.add('show');

  setTimeout(() => {
    achievementToastEl.classList.remove('show');
    setTimeout(() => {
      achievementToastBusy = false;
      showNextAchievementToast();
    }, 400); // czas na dokończenie animacji fade-out przed pokazaniem kolejnego
  }, 3500);
}

game.achievementSystem.onAchievementUnlock = (achievement) => {
  achievementQueue.push(achievement);
  showNextAchievementToast();
};

function updateScoreHud() {
  const stats = game.scoringSystem.getStats();

  scoreValueEl.textContent = stats.score;
  comboValueEl.textContent = stats.combo > 0 ? `COMBO x${stats.multiplier}` : '';

  // Przycisk dotykowy START/URUCHOM CYKL ma sens tylko, dopóki runda się nie
  // zaczęła - inaczej zostaje bezużytecznie na środku ekranu, zasłaniając
  // widok gry (tap podczas gry i tak nic by nie zrobił, patrz guard w
  // listenerze, ale wizualnie to zbędny bałagan).
  touchStartBtnEl.style.display = game.isStarted ? 'none' : '';

  const activeEffects = game.powerUpSystem.getActiveEffects();
  effectsHudEl.innerHTML = '';
  for (const effect of activeEffects) {
    const el = document.createElement('div');
    el.className = 'effect';
    const seconds = Math.ceil(effect.remainingTime / 1000);
    el.textContent = `${EFFECT_LABELS[effect.type] || effect.type} ${seconds}s`;
    effectsHudEl.appendChild(el);
  }

  // Pokaż najnowszy "floating text" (np. "CLOSE CALL! +150") jako krótki toast
  // zamiast pełnej animacji 3D - prostsze i równie czytelne.
  const latest = stats.floatingTexts[stats.floatingTexts.length - 1];
  if (latest) {
    toastHudEl.textContent = latest.subtext ? `${latest.text} (${latest.subtext})` : latest.text;
    toastHudEl.style.opacity = latest.opacity !== undefined ? latest.opacity : 1;
  } else {
    toastHudEl.textContent = '';
  }
}

function animate(currentTime) {
  requestAnimationFrame(animate);
  
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  
  const timeInSeconds = currentTime * 0.001;
  grid.update(timeInSeconds);
  
  game.update(deltaTime);
  updateScoreHud();
  
  renderer.render(scene, camera);
}

animate(performance.now());

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Sterowanie dotykowe (telefony/tablety) ---
// Te same akcje co klawiatura wyżej, tylko wywoływane dotykiem zamiast
// zdarzeń 'keydown'. Używamy touchstart (nie click), żeby uniknąć typowego
// dla mobile opóźnienia ~300ms między dotykiem a syntetycznym 'click'.
document.querySelectorAll('.turn-btn').forEach((btn) => {
  const action = btn.dataset.turn === 'left' ? 'turnLeft' : 'turnRight';
  const press = (e) => {
    e.preventDefault();
    btn.classList.add('pressed');
    game.handlePlayerInput(action);
  };
  const release = (e) => {
    e.preventDefault();
    btn.classList.remove('pressed');
  };
  btn.addEventListener('touchstart', press, { passive: false });
  btn.addEventListener('touchend', release, { passive: false });
  btn.addEventListener('touchcancel', release, { passive: false });
  btn.addEventListener('click', press); // fallback np. do testów w DevTools
});

document.getElementById('touchStartBtn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!game.isStarted) game.startSinglePlayer('medium');
}, { passive: false });

document.getElementById('fnRestart3d').addEventListener('touchstart', (e) => {
  e.preventDefault();
  // Ta sama zasada co klawisz R - restart nie jest zsynchronizowany przez
  // sieć, więc w multiplayer go blokujemy (patrz komentarz przy klawiszu R).
  if (!game.isMultiplayer) game.restart('medium');
}, { passive: false });

document.getElementById('fnCamera3d').addEventListener('touchstart', (e) => {
  e.preventDefault();
  game.toggleCameraMode();
}, { passive: false });

document.getElementById('fnMute3d').addEventListener('touchstart', (e) => {
  e.preventDefault();
  game.toggleMute();
}, { passive: false });

document.getElementById('fnLobby3d').addEventListener('touchstart', (e) => {
  e.preventDefault();
  ensureMultiplayerConnected().then((connected) => {
    if (connected) lobbyUI.show();
  });
}, { passive: false });

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    game.handlePlayerInput('turnLeft');
  }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    game.handlePlayerInput('turnRight');
  }
  
  if (e.key === ' ' || e.key === 'Enter') {
    if (!game.isStarted) {
      game.startSinglePlayer('medium');
    }
  }
  
  if (e.key === 'r' || e.key === 'R') {
    // Restart nie jest zsynchronizowany przez sieć - w trybie multiplayer
    // resetowałby pozycję lokalnie, podczas gdy prawdziwy przeciwnik nic by
    // o tym nie wiedział i dalej jechał tam, gdzie faktycznie jest. Zamiast
    // tego, po zakończonym meczu multiplayer, gracz wraca do lobby (patrz
    // klawisz L) i zaczyna nowy mecz od nowego 'game-start'.
    if (!game.isMultiplayer) {
      game.restart('medium');
    }
  }
  
  if (e.key === 'c' || e.key === 'C') {
    game.toggleCameraMode();
  }
  
  if (e.key === 'm' || e.key === 'M') {
    game.toggleMute();
  }
  
  if (e.key === 'l' || e.key === 'L') {
    ensureMultiplayerConnected().then((connected) => {
      if (connected) lobbyUI.show();
    });
  }
});

window.addEventListener('beforeunload', () => {
  game.dispose();
  multiplayerManager.disconnect();
});

console.log(`
=== TRON LIGHT CYCLES ===
Naciśnij SPACJĘ aby rozpocząć grę (single-player)
Strzałki/A,D: Skręcanie
R: Restart (tylko single-player)
C: Zmień kamerę
M: Wycisz dźwięk
L: Otwórz lobby multiplayer

Sprawdź konsolę dla debugowania!
`);
