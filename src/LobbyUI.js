export class LobbyUI {
  constructor(multiplayerManager) {
    this.multiplayer = multiplayerManager;
    this.isVisible = false;
    
    this.createUI();
  }

  createUI() {
    // Kontener
    this.container = document.createElement('div');
    this.container.id = 'lobby-ui';
    this.container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 20, 0.95);
      border: 2px solid #00ffff;
      border-radius: 10px;
      padding: 30px;
      color: #00ffff;
      font-family: 'Courier New', monospace;
      z-index: 1000;
      display: none;
      min-width: 400px;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    `;
    
    // Tytuł
    const title = document.createElement('h2');
    title.textContent = 'TRON MULTIPLAYER';
    title.style.cssText = `
      margin: 0 0 20px 0;
      text-align: center;
      font-size: 24px;
      text-shadow: 0 0 10px #00ffff;
    `;
    this.container.appendChild(title);
    
    // Status połączenia
    this.statusDiv = document.createElement('div');
    this.statusDiv.style.cssText = `
      margin-bottom: 20px;
      padding: 10px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      text-align: center;
    `;
    this.statusDiv.textContent = 'Connecting...';
    this.container.appendChild(this.statusDiv);
    
    // Sekcja tworzenia pokoju
    this.createRoomSection = document.createElement('div');
    this.createRoomSection.innerHTML = `
      <button id="create-room-btn" style="
        width: 100%;
        padding: 15px;
        background: #00ffff;
        color: #000;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 10px;
        font-family: 'Courier New', monospace;
      ">CREATE ROOM</button>
    `;
    this.container.appendChild(this.createRoomSection);
    
    // Sekcja dołączania do pokoju
    this.joinRoomSection = document.createElement('div');
    this.joinRoomSection.innerHTML = `
      <div style="margin-bottom: 10px;">OR JOIN EXISTING ROOM:</div>
      <input id="room-code-input" type="text" placeholder="ROOM CODE" style="
        width: 100%;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #00ffff;
        border-radius: 5px;
        color: #00ffff;
        font-size: 16px;
        margin-bottom: 10px;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
      ">
      <button id="join-room-btn" style="
        width: 100%;
        padding: 15px;
        background: transparent;
        color: #00ffff;
        border: 2px solid #00ffff;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-family: 'Courier New', monospace;
      ">JOIN ROOM</button>
    `;
    this.container.appendChild(this.joinRoomSection);
    
    // Sekcja oczekiwania
    this.waitingSection = document.createElement('div');
    this.waitingSection.style.display = 'none';
    this.waitingSection.innerHTML = `
      <div style="margin-bottom: 20px; text-align: center;">
        <div style="font-size: 18px; margin-bottom: 10px;">ROOM CODE:</div>
        <div id="room-code-display" style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 5px;
          text-shadow: 0 0 15px #00ffff;
        "></div>
      </div>
      <div id="waiting-status" style="
        text-align: center;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
      ">Waiting for opponent...</div>
      <button id="start-game-btn" style="
        width: 100%;
        padding: 15px;
        background: #00ff00;
        color: #000;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: none;
        font-family: 'Courier New', monospace;
      ">START GAME</button>
      <button id="leave-room-btn" style="
        width: 100%;
        padding: 10px;
        background: transparent;
        color: #ff0000;
        border: 1px solid #ff0000;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        margin-top: 10px;
        font-family: 'Courier New', monospace;
      ">LEAVE ROOM</button>
    `;
    this.container.appendChild(this.waitingSection);
    
    document.body.appendChild(this.container);
    
    // Event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Create room
    document.getElementById('create-room-btn').addEventListener('click', async () => {
      try {
        const response = await this.multiplayer.createRoom();
        this.showWaitingRoom(response.roomId);
      } catch (error) {
        this.showError('Failed to create room');
      }
    });
    
    // Join room
    document.getElementById('join-room-btn').addEventListener('click', async () => {
      const roomCode = document.getElementById('room-code-input').value.trim().toUpperCase();
      
      if (!roomCode) {
        this.showError('Please enter a room code');
        return;
      }
      
      try {
        await this.multiplayer.joinRoom(roomCode);
        this.showWaitingRoom(roomCode, false);
      } catch (error) {
        this.showError(error.message);
      }
    });
    
    // Start game
    document.getElementById('start-game-btn').addEventListener('click', () => {
      this.multiplayer.startGame();
      this.hide();
    });
    
    // Leave room
    document.getElementById('leave-room-btn').addEventListener('click', () => {
      this.multiplayer.leaveRoom();
      this.showMainMenu();
    });
  }

  show() {
    this.isVisible = true;
    this.container.style.display = 'block';
  }

  hide() {
    this.isVisible = false;
    this.container.style.display = 'none';
  }

  showMainMenu() {
    this.createRoomSection.style.display = 'block';
    this.joinRoomSection.style.display = 'block';
    this.waitingSection.style.display = 'none';
  }

  showWaitingRoom(roomCode, isHost = true) {
    this.createRoomSection.style.display = 'none';
    this.joinRoomSection.style.display = 'none';
    this.waitingSection.style.display = 'block';
    
    document.getElementById('room-code-display').textContent = roomCode;
    
    // Przycisk startu pokazuje się dopiero po dołączeniu przeciwnika (patrz
    // showStartButton(), wywoływane z main.js na zdarzenie 'player-joined') -
    // niezależnie od tego, czy jesteśmy hostem, czy dołączającym.
    document.getElementById('start-game-btn').style.display = 'none';
  }

  showStartButton() {
    document.getElementById('start-game-btn').style.display = 'block';
    document.getElementById('waiting-status').textContent = 'Opponent joined! Ready to start.';
  }

  updateStatus(message) {
    this.statusDiv.textContent = message;
  }

  showError(message) {
    this.statusDiv.textContent = message;
    this.statusDiv.style.color = '#ff0000';
    
    setTimeout(() => {
      this.statusDiv.style.color = '#00ffff';
    }, 3000);
  }
}
