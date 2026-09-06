import * as THREE from 'three';

export class DerezzEffect {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.shockwaves = [];
  }

  create(position, color = 0x00ffff) {
    this.createParticles(position, color);
    this.createShockwave(position, color);
  }

  createParticles(position, color) {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);
    
    const baseColor = new THREE.Color(color);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;
      
      velocities.push({
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 6 + 2,
        z: (Math.random() - 0.5) * 8
      });
      
      const variance = 0.2;
      colors[i * 3] = baseColor.r + (Math.random() - 0.5) * variance;
      colors[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * variance;
      colors[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * variance;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
    
    this.particles.push({
      points,
      velocities,
      life: 2.0,
      maxLife: 2.0,
      gravity: -9.8
    });
  }

  createShockwave(position, color) {
    const geometry = new THREE.RingGeometry(0.1, 0.3, 32);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    
    const ring = new THREE.Mesh(geometry, material);
    ring.position.copy(position);
    ring.position.y += 0.1;
    ring.rotation.x = -Math.PI / 2;
    this.scene.add(ring);
    
    this.shockwaves.push({
      ring,
      scale: 1,
      life: 1.0,
      maxLife: 1.0
    });
  }

  update(deltaTime) {
    // Aktualizuj cząsteczki
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.life -= deltaTime;
      
      if (particle.life <= 0) {
        this.scene.remove(particle.points);
        particle.points.geometry.dispose();
        particle.points.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }
      
      const positions = particle.points.geometry.attributes.position.array;
      
      for (let j = 0; j < particle.velocities.length; j++) {
        const vel = particle.velocities[j];
        vel.y += particle.gravity * deltaTime;
        
        positions[j * 3] += vel.x * deltaTime;
        positions[j * 3 + 1] += vel.y * deltaTime;
        positions[j * 3 + 2] += vel.z * deltaTime;
      }
      
      particle.points.geometry.attributes.position.needsUpdate = true;
      
      const lifeRatio = particle.life / particle.maxLife;
      particle.points.material.opacity = lifeRatio;
    }

    // Aktualizuj shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const shockwave = this.shockwaves[i];
      shockwave.life -= deltaTime;
      
      if (shockwave.life <= 0) {
        this.scene.remove(shockwave.ring);
        shockwave.ring.geometry.dispose();
        shockwave.ring.material.dispose();
        this.shockwaves.splice(i, 1);
        continue;
      }
      
      shockwave.scale += deltaTime * 15;
      shockwave.ring.scale.set(shockwave.scale, shockwave.scale, 1);
      
      const lifeRatio = shockwave.life / shockwave.maxLife;
      shockwave.ring.material.opacity = lifeRatio * 0.8;
    }
  }

  clear() {
    for (const particle of this.particles) {
      this.scene.remove(particle.points);
      particle.points.geometry.dispose();
      particle.points.material.dispose();
    }
    this.particles = [];

    for (const shockwave of this.shockwaves) {
      this.scene.remove(shockwave.ring);
      shockwave.ring.geometry.dispose();
      shockwave.ring.material.dispose();
    }
    this.shockwaves = [];
  }
}
