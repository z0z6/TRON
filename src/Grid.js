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
      uGridSize: { value: this.gridSize }
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
}
