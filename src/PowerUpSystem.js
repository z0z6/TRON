import * as THREE from 'three';

export class PowerUpSystem {
  constructor(scene) {
    this.scene = scene;
    this.powerUps = [];
    this.activeEffects = [];
    this.spawnInterval = 5000; // ms
    this.maxPowerUps = 5;
    this.lastSpawnTime = 0;
    
    this.types = {
      shield: {
        color: 0x00ff00,
        duration: 5000,
        symbol: '🛡️'
      },
      speed: {
        color: 0xffff00,
        duration: 3000,
        symbol: '⚡'
      },
      ghost: {
        color: 0xff00ff,
        duration: 4000,
        symbol: '👻'
      },
      bomb: {
        color: 0xff0000,
        duration: 0,
        symbol: '💣'
      }
    };
  }

  // Stwórz wizualizację power-upu
  createPowerUpMesh(type, position) {
    const config = this.types[type];
    
    // Główna geometria
    const geometry = new THREE.OctahedronGeometry(0.8);
    const material = new THREE.MeshStandardMaterial({
      color: config.color,
      emissive: config.color,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.position.y = 1;
    
    // Glow ring
    const ringGeometry = new THREE.RingGeometry(1, 1.3, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.1;
    mesh.add(ring);
    
    this.scene.add(mesh);
    return mesh;
  }

  // Spawn power-up
  spawnPowerUp(gridBounds = 40) {
    if (this.powerUps.length >= this.maxPowerUps) return;
    
    const types = Object.keys(this.types);
    const type = types[Math.floor(Math.random() * types.length)];
    
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * gridBounds * 2,
      0,
      (Math.random() - 0.5) * gridBounds * 2
    );
    
    const mesh = this.createPowerUpMesh(type, position);
    
    this.powerUps.push({
      type,
      position,
      mesh,
      spawnTime: performance.now(),
      lifetime: 15000 // 15 sekund
    });
  }

  // Sprawdź kolizję gracza z power-upem
  checkCollision(playerPosition, pickupRadius = 1.5) {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      const distance = playerPosition.distanceTo(powerUp.position);
      
      if (distance < pickupRadius) {
        this.collectPowerUp(i);
        return powerUp.type;
      }
    }
    return null;
  }

  // Zbierz power-up
  collectPowerUp(index) {
    const powerUp = this.powerUps[index];
    
    // Usuń wizualizację
    this.scene.remove(powerUp.mesh);
    powerUp.mesh.geometry.dispose();
    powerUp.mesh.material.dispose();
    
    // Usuń z listy
    this.powerUps.splice(index, 1);
    
    return powerUp.type;
  }

  // Aktywuj efekt power-upu
  activateEffect(type, player, opponent = null, opponentTrailSet = null) {
    const config = this.types[type];
    
    switch (type) {
      case 'shield':
        player.hasShield = true;
        this.activeEffects.push({
          type,
          endTime: performance.now() + config.duration,
          onExpire: () => { player.hasShield = false; }
        });
        break;
        
      case 'speed':
        const originalSpeed = player.speed;
        player.speed *= 1.8;
        this.activeEffects.push({
          type,
          endTime: performance.now() + config.duration,
          onExpire: () => { player.speed = originalSpeed; }
        });
        break;
        
      case 'ghost':
        player.isGhost = true;
        this.activeEffects.push({
          type,
          endTime: performance.now() + config.duration,
          onExpire: () => { player.isGhost = false; }
        });
        break;
        
      case 'bomb':
        // Natychmiastowy efekt - oczyść fragment śladu przeciwnika (usuwa komórki
        // z jego Setu kolizji, żeby gracz mógł bezpiecznie przez niego przejechać)
        if (opponent && opponentTrailSet) {
          this.destroyTrailSegment(opponent.getPosition(), opponentTrailSet);
        }
        break;
    }
    
    return config;
  }

  // Usuń pobliskie komórki śladu przeciwnika z jego Setu kolizji (przechowywanego
  // w Game.js). Trail.js renderuje ślad jako jedną, ciągłą wstęgę geometrii (nie
  // osobne segmenty), więc na razie efekt jest czysto kolizyjny: fragment staje
  // się bezpieczny do przejechania, ale wizualnie ściana nadal tam stoi.
  // Pełne "wybicie dziury" w geometrii wymagałoby przebudowy Trail.js na model
  // segmentowy - to dobry kandydat na kolejną iterację, jeśli efekt ma wyglądać
  // 1:1 jak w oryginalnym Tronie.
  destroyTrailSegment(opponentPosition, opponentTrailSet, radius = 5) {
    if (!opponentTrailSet) return;

    const toRemove = [];
    for (const key of opponentTrailSet) {
      const [gx, gz] = key.split(',').map(Number);
      const dx = gx - opponentPosition.x;
      const dz = gz - opponentPosition.z;
      if (Math.sqrt(dx * dx + dz * dz) < radius) {
        toRemove.push(key);
      }
    }
    toRemove.forEach(key => opponentTrailSet.delete(key));
  }

  // Aktualizuj system
  update(currentTime, player, opponent = null, gridBounds = 40, opponentTrailSet = null) {
    // Spawn nowych power-upów
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      this.spawnPowerUp(gridBounds);
      this.lastSpawnTime = currentTime;
    }
    
    // Animuj istniejące power-upy
    for (const powerUp of this.powerUps) {
      // Rotacja
      powerUp.mesh.rotation.y += 0.02;
      
      // Pulsowanie
      const scale = 1 + Math.sin(currentTime * 0.005) * 0.1;
      powerUp.mesh.scale.set(scale, scale, scale);
      
      // Sprawdź czy wygasł
      if (currentTime - powerUp.spawnTime > powerUp.lifetime) {
        this.scene.remove(powerUp.mesh);
        powerUp.mesh.geometry.dispose();
        powerUp.mesh.material.dispose();
        this.powerUps.splice(this.powerUps.indexOf(powerUp), 1);
      }
    }
    
    // Aktualizuj aktywne efekty
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      const effect = this.activeEffects[i];
      if (currentTime > effect.endTime) {
        effect.onExpire();
        this.activeEffects.splice(i, 1);
      }
    }
    
    // Sprawdź kolizje gracza z power-upami
    if (player && player.visible) {
      const collected = this.checkCollision(player.getPosition());
      if (collected) {
        this.activateEffect(collected, player, opponent, opponentTrailSet);
        return collected;
      }
    }
    
    return null;
  }

  // Wyczyść wszystko
  clear() {
    for (const powerUp of this.powerUps) {
      this.scene.remove(powerUp.mesh);
      powerUp.mesh.geometry.dispose();
      powerUp.mesh.material.dispose();
    }
    this.powerUps = [];
    
    // Wygaś wszystkie aktywne efekty
    for (const effect of this.activeEffects) {
      effect.onExpire();
    }
    this.activeEffects = [];
  }

  // Pobierz aktywne efekty (dla UI)
  getActiveEffects() {
    return this.activeEffects.map(effect => ({
      type: effect.type,
      remainingTime: Math.max(0, effect.endTime - performance.now())
    }));
  }
}
