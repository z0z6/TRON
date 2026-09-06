import * as THREE from 'three';
import gridVertexShader from './shaders/grid.vert?raw';
import gridFragmentShader from './shaders/grid.frag?raw';

export class Grid {
  constructor(size = 100, divisions = 50) {
    this.size = size;
    this.divisions = divisions;
    this.gridSize = size / divisions;
    
    // Uniforms dla shadera
    this.uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x00ffff) },
      uPulseSpeed: { value: 2.0 },
      uGridSize: { value: this.gridSize },
      // Fala światła pod przejeżdżającym motocyklem (patrz grid.frag) -
      // domyślnie daleko poza planszą (9999, 9999), żeby dopóki
      // updateRacerPositions() nie dostanie realnej pozycji (np. przeciwnik
      // jeszcze nie istnieje w multiplayer), fala nie była widoczna na
      // środku areny.
      uPlayerPos: { value: new THREE.Vector2(9999, 9999) },
      uOpponentPos: { value: new THREE.Vector2(9999, 9999) },
      uPlayerColor: { value: new THREE.Color(0x00ffff) },
      uOpponentColor: { value: new THREE.Color(0xff00ff) },
      uWaveRadius: { value: 7.0 }
    };
    
    // Materiał shaderowy
    this.material = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    // Geometria płaszczyzny
    const geometry = new THREE.PlaneGeometry(size, size, 1, 1);
    geometry.rotateX(-Math.PI / 2);
    
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.y = -0.5;
  }
  
  update(time) {
    this.uniforms.uTime.value = time;
  }
  
  // Metoda do zmiany koloru (np. przy kolizji)
  setColor(color) {
    this.uniforms.uColor.value.set(color);
  }
  
  // Metoda do zmiany prędkości pulsowania
  setPulseSpeed(speed) {
    this.uniforms.uPulseSpeed.value = speed;
  }

  // Wywoływane co klatkę z main.js - zasila shader bieżącą pozycją gracza i
  // przeciwnika (XZ), żeby fala świetlna podążała za pojazdami w czasie
  // rzeczywistym. Argumenty to obiekty THREE.Vector3 (np. game.player.position)
  // albo null/undefined, jeśli dany zawodnik jeszcze nie istnieje.
  updateRacerPositions(playerPos, opponentPos) {
    if (playerPos) this.uniforms.uPlayerPos.value.set(playerPos.x, playerPos.z);
    if (opponentPos) this.uniforms.uOpponentPos.value.set(opponentPos.x, opponentPos.z);
  }

  // Kolory fali spójne z motywem (p1/p2) - wywoływane razem z setColor()
  // przy starcie gry i przy każdej zmianie motywu w UI (theme-picker).
  setGlowColors(playerColor, opponentColor) {
    this.uniforms.uPlayerColor.value.set(playerColor);
    this.uniforms.uOpponentColor.value.set(opponentColor);
  }
}
