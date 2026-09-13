import * as THREE from 'three';
import { makeRand, disposeAwareAdd } from './shared.js';

// === GLACIER: cyberpunkowy lodowiec ===
// Wydzielone z pierwotnego BackgroundThemes.js - patrz shared.js po opis
// pomocniczych funkcji WSPÓLNYCH z innymi motywami.

// --- GLACIER: cyberpunkowy lodowiec ---------------------------------------
// Kanciaste bryły lodu (ośmiościany/stożki) w chłodnej granatowo-białej
// palecie, z jaśniejszym, świecącym konturem (EdgesGeometry) na każdej -
// to jest właśnie "cyberpunkowy" akcent na naturalnym motywie lodowca.
// UWAGA: ten motyw CELOWO zostaje przy płaskim MeshBasicMaterial i twardym
// obcięciu na poziomie podłogi - w połączeniu z Reflectorem daje to
// wrażenie, że bryły są zanurzone w tafli zamarzniętego jeziora, którego
// częścią jest sama arena. To pasuje do koncepcji lodowca i jest jedynym
// motywem, który świadomie NIE dostaje lit materiału jak amber/inne.
//
// Dwie warstwy głębi: bliższa (większe bryły, MOCNIEJ skrzący się kontur)
// i dalsza (mniejsze, SŁABIEJ skrzące) - patrz updateGlacierBackground().
// Plus powoli opadający śnieg (THREE.Points, animowany w update()).
export function buildGlacierBackground() {
  const rand = makeRand(5555);
  const group = new THREE.Group();
  const sparkles = [];

  function addIceLayer(count, radiusMin, radiusMax, scaleMul, sparkleStrength) {
    for (let i = 0; i < count; i++) {
      const isOcta = rand() < 0.5;
      const visibleHeight = (isOcta ? (12 + rand() * 24) : (14 + rand() * 30)) * scaleMul;
      const geometry = isOcta
        ? new THREE.OctahedronGeometry((6 + rand() * 14) * scaleMul, 0)
        : new THREE.ConeGeometry((5 + rand() * 10) * scaleMul, visibleHeight, 5);
      const color = rand() < 0.7 ? 0x1a3550 : 0x0d1f30;
      const material = new THREE.MeshBasicMaterial({ color, fog: true });
      const mesh = new THREE.Mesh(geometry, material);

      const angle = rand() * Math.PI * 2;
      const radius = radiusMin + rand() * (radiusMax - radiusMin);
      const px = Math.cos(angle) * radius, pz = Math.sin(angle) * radius;
      // Efekt cylindra: rozciągamy bryłę w dół (skala Y > 1, środek geometrii
      // przesunięty niżej), więc więcej jej masy ciągnie się pod posadzkę
      // zamiast kończyć się dokładnie na jej poziomie.
      const buriedExtra = (15 + rand() * 40) * scaleMul;
      const totalHeight = visibleHeight + buriedExtra;
      const yScale = totalHeight / visibleHeight;
      mesh.position.set(px, (visibleHeight - buriedExtra) / 2 - 0.55, pz);
      mesh.rotation.set(rand() * 0.3, rand() * Math.PI, rand() * 0.3);
      mesh.scale.set(0.7 + rand() * 0.6, yScale, 0.7 + rand() * 0.6);
      disposeAwareAdd(group, mesh);

      const edges = new THREE.EdgesGeometry(geometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x8fefff, transparent: true, opacity: 0.7, fog: false });
      const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
      edgeLines.position.copy(mesh.position);
      edgeLines.rotation.copy(mesh.rotation);
      edgeLines.scale.copy(mesh.scale);
      disposeAwareAdd(group, edgeLines);

      sparkles.push({ material: edgeMaterial, phase: rand() * Math.PI * 2, strength: sparkleStrength, base: 0.7 });
    }
  }

  // Bliżej sceny - większe bryły, wyraźnie mocniej skrzący się kontur.
  addIceLayer(55, 70, 170, 1.15, 1.0);
  // Dalej w tło - mniejsze, skrzą się wyraźnie słabiej.
  addIceLayer(75, 170, 340, 0.7, 0.3);

  group.userData.iceSparkles = sparkles;

  const snowCount = 340;
  const snowGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(snowCount * 3);
  const velocities = new Float32Array(snowCount);
  for (let i = 0; i < snowCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 20 + rand() * 300;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = rand() * 160;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    velocities[i] = 3 + rand() * 5;
  }
  snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const snowMaterial = new THREE.PointsMaterial({
    color: 0xdff6ff, size: 0.35, transparent: true, opacity: 0.8, fog: false, depthWrite: false
  });
  const snow = new THREE.Points(snowGeometry, snowMaterial);
  disposeAwareAdd(group, snow);

  group.userData.snow = snow;
  group.userData.snowVelocities = velocities;

  return group;
}

export function updateGlacierBackground(group, elapsed, deltaTime) {
  const snow = group.userData.snow;
  const velocities = group.userData.snowVelocities;
  if (snow) {
    const positions = snow.geometry.attributes.position.array;
    for (let i = 0; i < velocities.length; i++) {
      positions[i * 3 + 1] -= velocities[i] * deltaTime;
      if (positions[i * 3 + 1] < -1) positions[i * 3 + 1] = 160;
    }
    snow.geometry.attributes.position.needsUpdate = true;
  }

  const sparkles = group.userData.iceSparkles;
  if (sparkles) {
    for (const s of sparkles) {
      const twinkle = 0.5 + 0.5 * Math.sin(elapsed * 3 + s.phase);
      s.material.opacity = s.base * (1 - s.strength) + s.base * s.strength * twinkle;
    }
  }
}

