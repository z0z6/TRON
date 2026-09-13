import * as THREE from 'three';
import { makeRand, disposeAwareAdd, buryBelowFloor, buildSunWithReflection } from './shared.js';

// === AMBER: krajobraz vaporwave ===
// Wydzielone z pierwotnego BackgroundThemes.js - patrz shared.js po opis
// pomocniczych funkcji WSPÓLNYCH z innymi motywami.

// --- AMBER: krajobraz vaporwave --------------------------------------------
// Ciepłe, gradientowe słońce (bez prążków - to odróżnia je od synthwave) +
// unoszące się, obracające się druciane "święte geometrie" (piramidy,
// torusy) + pierścień pylonów/kolumn + bryły gruntowe (jak w glacier, tylko
// w ciepłej palecie). WAŻNE: kolumny i bryły gruntowe używają
// MeshStandardMaterial (reaguje na directionalLight z main.js, zawieszone
// wysoko nad sceną), a nie płaskiego MeshBasicMaterial - inaczej twarde
// obcięcie geometrii na poziomie podłogi (tam, gdzie znika pod nieprzezro-
// czystym Reflectorem) wygląda jak zanurzenie w tafli jeziora zamiast
// naturalnego, oświetlonego z góry obiektu zawieszonego w przestrzeni. Ten
// "zanurzony" wygląd jest CELOWY i zostaje TYLKO w motywie glacier
// (pasuje do lodowego jeziora) - tu ma zniknąć.
export function buildAmberBackground() {
  const rand = makeRand(9001);
  const group = new THREE.Group();

  disposeAwareAdd(group, buildSunWithReflection(rand, {
    core: '#fff6e0', mid: '#ffb347', stripes: false, radius: 58, skyY: 52, opacity: 0.55
  }));

  const shapes = [];
  const shapesCount = 26;
  for (let i = 0; i < shapesCount; i++) {
    const isTorus = rand() < 0.5;
    const geometry = isTorus
      ? new THREE.TorusGeometry(4 + rand() * 6, 0.4, 8, 20)
      : new THREE.ConeGeometry(4 + rand() * 5, 8 + rand() * 8, 4);
    const color = rand() < 0.5 ? 0xff6ec7 : 0xffb347;
    const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.8, fog: true });
    const mesh = new THREE.Mesh(geometry, material);
    const angle = rand() * Math.PI * 2;
    const radius = 100 + rand() * 220;
    mesh.position.set(Math.cos(angle) * radius, 15 + rand() * 70, Math.sin(angle) * radius);
    mesh.rotation.set(rand() * Math.PI, rand() * Math.PI, 0);
    mesh.userData.spin = 0.1 + rand() * 0.3;
    disposeAwareAdd(group, mesh);
    shapes.push(mesh);
  }
  group.userData.amberShapes = shapes;

  // --- Bryły gruntowe - ten sam pomysł co lodowe bryły w glacier (kanciaste
  // kształty, zakopane pod posadzką, świecący kontur), ale w ciepłej
  // palecie i z LIT materiałem (patrz komentarz na górze funkcji), więc
  // światło z main.js daje płynne przejście jasny-góra/ciemny-dół zamiast
  // twardego ucięcia. Dwie warstwy głębi - bliższa większa i mocniej
  // skrząca się, dalsza mniejsza i słabsza (ten sam wzorzec co glacier). ---
  const groundSparkles = [];
  function addGroundLayer(count, radiusMin, radiusMax, scaleMul, sparkleStrength) {
    for (let i = 0; i < count; i++) {
      const isOcta = rand() < 0.5;
      const visibleHeight = (isOcta ? (10 + rand() * 20) : (12 + rand() * 26)) * scaleMul;
      const geometry = isOcta
        ? new THREE.OctahedronGeometry((6 + rand() * 12) * scaleMul, 0)
        : new THREE.ConeGeometry((5 + rand() * 9) * scaleMul, visibleHeight, 5);
      const color = rand() < 0.5 ? 0xffb347 : 0xff8f6e;
      const material = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.12, roughness: 0.55, metalness: 0.1, fog: true
      });
      const mesh = new THREE.Mesh(geometry, material);

      const angle = rand() * Math.PI * 2;
      const radius = radiusMin + rand() * (radiusMax - radiusMin);
      const buriedExtra = (15 + rand() * 35) * scaleMul;
      const totalHeight = visibleHeight + buriedExtra;
      const yScale = totalHeight / visibleHeight;
      mesh.position.set(
        Math.cos(angle) * radius,
        (visibleHeight - buriedExtra) / 2 - 0.55,
        Math.sin(angle) * radius
      );
      mesh.rotation.set(rand() * 0.3, rand() * Math.PI, rand() * 0.3);
      mesh.scale.set(0.7 + rand() * 0.6, yScale, 0.7 + rand() * 0.6);
      disposeAwareAdd(group, mesh);

      const edges = new THREE.EdgesGeometry(geometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffe0b3, transparent: true, opacity: 0.7, fog: false });
      const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
      edgeLines.position.copy(mesh.position);
      edgeLines.rotation.copy(mesh.rotation);
      edgeLines.scale.copy(mesh.scale);
      disposeAwareAdd(group, edgeLines);

      groundSparkles.push({ material: edgeMaterial, phase: rand() * Math.PI * 2, strength: sparkleStrength, base: 0.7 });
    }
  }
  addGroundLayer(30, 70, 160, 1.1, 0.85);   // bliżej sceny - większe, mocniej skrzące
  addGroundLayer(42, 160, 300, 0.65, 0.3);  // dalej - mniejsze, słabiej skrzące
  group.userData.amberGroundSparkles = groundSparkles;

  // Pylony/kolumny - w przeciwieństwie do unoszących się kształtów, te
  // faktycznie "stoją" i są zakopane pod posadzką. LIT materiał (patrz
  // komentarz na górze funkcji) zamiast płaskiego wireframe.
  const columnCount = 22;
  for (let i = 0; i < columnCount; i++) {
    const angle = (i / columnCount) * Math.PI * 2 + rand() * 0.1;
    const radius = 70 + rand() * 45;
    const visibleHeight = 22 + rand() * 22;
    const { centerY, totalHeight } = buryBelowFloor(rand, visibleHeight, 20, 50);
    const geometry = new THREE.CylinderGeometry(2, 2.6, totalHeight, 12);
    const material = new THREE.MeshStandardMaterial({
      color: rand() < 0.5 ? 0xff9ecf : 0xffcf8a,
      emissive: rand() < 0.5 ? 0xff9ecf : 0xffcf8a,
      emissiveIntensity: 0.1,
      roughness: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      fog: true
    });
    const col = new THREE.Mesh(geometry, material);
    col.position.set(Math.cos(angle) * radius, centerY, Math.sin(angle) * radius);
    disposeAwareAdd(group, col);
  }

  return group;
}

export function updateAmberBackground(group, elapsed, deltaTime) {
  const shapes = group.userData.amberShapes;
  if (shapes) {
    for (const mesh of shapes) {
      mesh.rotation.y += mesh.userData.spin * deltaTime;
      mesh.rotation.x += mesh.userData.spin * 0.4 * deltaTime;
    }
  }

  const sparkles = group.userData.amberGroundSparkles;
  if (sparkles) {
    for (const s of sparkles) {
      const twinkle = 0.5 + 0.5 * Math.sin(elapsed * 3 + s.phase);
      s.material.opacity = s.base * (1 - s.strength) + s.base * s.strength * twinkle;
    }
  }
}

