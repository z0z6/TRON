import * as THREE from 'three';

// === REJESTR MOTYWÓW TŁA ===
// Każdy motyw to: build() -> THREE.Group (elementy sceny) i opcjonalnie
// update(group, elapsed, deltaTime) dla animowanych elementów (np. spadający
// "deszcz" w motywie matrix). Environment.js (setTheme) zarządza tym, KTÓRY
// motyw jest aktywny - ten plik zna tylko, JAK zbudować każdy z nich.
//
// Wspólny wzorzec z resztą kodu (Environment.js sprzed refaktoru): stały,
// deterministyczny seed na motyw, żeby układ elementów nie zmieniał się
// między przeładowaniami strony, ale każdy motyw miał INNY, powtarzalny
// układ.
function makeRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function disposeAwareAdd(group, obj) {
  group.add(obj);
  return obj;
}

// --- TRON CLASSIC: centra danych / superkomputery -------------------------
// To, co wcześniej było na stałe w Environment.js - dwie warstwy
// prostopadłościennych "serwerowni" w pierścieniu wokół areny, część z
// cienkimi antenami, plus drobne, świecące "diody danych" na fasadach.
function buildClassicBackground() {
  const rand = makeRand(1337);
  const group = new THREE.Group();

  function addLayer({ count, radiusMin, radiusMax, heightMin, heightMax, color, spires }) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color, fog: true });
    const layer = new THREE.InstancedMesh(geometry, material, count);
    const dummy = new THREE.Object3D();

    let spireMesh, spireCount = 0;
    if (spires) {
      const sg = new THREE.CylinderGeometry(0.15, 0.25, 1, 6);
      const sm = new THREE.MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0.9,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: false
      });
      spireMesh = new THREE.InstancedMesh(sg, sm, count);
    }

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand() * 0.15;
      const radius = radiusMin + rand() * (radiusMax - radiusMin);
      const width = 6 + rand() * 14;
      const depth = 6 + rand() * 14;
      const height = heightMin + rand() * (heightMax - heightMin);
      const px = Math.cos(angle) * radius, pz = Math.sin(angle) * radius;

      dummy.position.set(px, height / 2 - 0.55, pz);
      dummy.scale.set(width, height, depth);
      dummy.rotation.y = rand() * Math.PI;
      dummy.updateMatrix();
      layer.setMatrixAt(i, dummy.matrix);

      if (spires && rand() < 0.35) {
        const sh = 6 + rand() * 14;
        dummy.position.set(px, height - 0.55 + sh / 2, pz);
        dummy.scale.set(1, sh, 1);
        dummy.rotation.y = 0;
        dummy.updateMatrix();
        spireMesh.setMatrixAt(spireCount, dummy.matrix);
        spireCount++;
      }
    }

    disposeAwareAdd(group, layer);
    if (spires) {
      spireMesh.count = spireCount;
      disposeAwareAdd(group, spireMesh);
    }
  }

  addLayer({ count: 42, radiusMin: 85, radiusMax: 140, heightMin: 22, heightMax: 95, color: 0x22225c, spires: true });
  addLayer({ count: 50, radiusMin: 165, radiusMax: 270, heightMin: 45, heightMax: 190, color: 0x141438 });

  const lightCount = 420;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, vertexColors: true
  });
  const lights = new THREE.InstancedMesh(geometry, material, lightCount);
  const dummy = new THREE.Object3D();
  const colorA = new THREE.Color(0x00ffff).multiplyScalar(1.6);
  const colorB = new THREE.Color(0xff0055).multiplyScalar(1.6);
  for (let i = 0; i < lightCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 90 + rand() * 190;
    const height = 2 + rand() * 170;
    dummy.position.set(Math.cos(angle) * radius, height - 0.55, Math.sin(angle) * radius);
    const s = 0.6 + rand() * 1.6;
    dummy.scale.set(s, s * 0.35, 0.15);
    dummy.rotation.y = rand() * Math.PI;
    dummy.updateMatrix();
    lights.setMatrixAt(i, dummy.matrix);
    lights.setColorAt(i, rand() < 0.5 ? colorA : colorB);
  }
  lights.instanceColor.needsUpdate = true;
  disposeAwareAdd(group, lights);

  return group;
}

// --- SYNTHWAVE: low-poly góry z linii + kultowe zachodzące słońce --------
function buildSynthwaveBackground() {
  const rand = makeRand(4242);
  const group = new THREE.Group();

  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xff5fa8, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
  });
  const sun = new THREE.Mesh(new THREE.CircleGeometry(70, 48), sunMaterial);
  sun.position.set(0, 55, -260);
  disposeAwareAdd(group, sun);

  // Poziome, ciemne pasy "przez" tarczę słońca - kultowy detal z grafik
  // synthwave (słońce jakby prążkowane/przysłonięte).
  const stripeMaterial = new THREE.MeshBasicMaterial({ color: 0x1a0a2e, fog: false });
  for (let i = 0; i < 7; i++) {
    const y = -50 + i * 16 + rand() * 4;
    const w = Math.sqrt(Math.max(0, 70 * 70 - y * y)) * 2;
    if (w < 5) continue;
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(w, 5 + rand() * 3), stripeMaterial);
    stripe.position.set(0, 55 + y, -259.5);
    disposeAwareAdd(group, stripe);
  }

  // Góry - kontur (LineSegments, nie wypełnione trójkąty), żeby wyglądały
  // jak fluorescencyjne linie na tle ciemnego nieba, nie pełne bryły.
  function buildRidge(radius, baseHeight, color, segments) {
    const points = [];
    const step = (Math.PI * 2) / segments;
    for (let i = 0; i <= segments; i++) {
      const angle = i * step;
      const h = baseHeight * (0.4 + rand() * 0.6);
      points.push(new THREE.Vector3(Math.cos(angle) * radius, h, Math.sin(angle) * radius));
    }
    const positions = [];
    for (let i = 0; i < points.length - 1; i++) {
      positions.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
      if (i % 2 === 0) {
        positions.push(points[i].x, points[i].y, points[i].z, points[i].x, -1, points[i].z);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85, fog: true });
    return new THREE.LineSegments(geometry, material);
  }

  disposeAwareAdd(group, buildRidge(220, 60, 0x00eaff, 28));
  disposeAwareAdd(group, buildRidge(280, 95, 0xff2f9e, 22));

  return group;
}

// --- MATRIX: ściany cyfrowego deszczu -------------------------------------
// Przybliżenie spadającego kodu bez renderowania prawdziwych znaków -
// drobne, jasne prostokąty w pionowych "kolumnach", z jaśniejszą "głową"
// każdej smugi i gasnącym ogonem, animowane w update() przez bezpośrednią
// mutację translacji Y w macierzy instancji (tanie - bez decompose/recompose).
function buildMatrixBackground() {
  const rand = makeRand(7331);
  const group = new THREE.Group();

  const columnsCount = 60;
  const dropsPerColumn = 22;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    side: THREE.DoubleSide, vertexColors: true
  });
  const drops = new THREE.InstancedMesh(geometry, material, columnsCount * dropsPerColumn);
  drops.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const columns = [];
  const dummy = new THREE.Object3D();
  let idx = 0;
  for (let c = 0; c < columnsCount; c++) {
    const angle = (c / columnsCount) * Math.PI * 2 + rand() * 0.05;
    const radius = 95 + rand() * 160;
    const speed = 20 + rand() * 30;
    const baseColor = rand() < 0.15 ? new THREE.Color(0xccffcc) : new THREE.Color(0x22ff55);
    columns.push({ radius, angle, speed, startIdx: idx });

    for (let d = 0; d < dropsPerColumn; d++) {
      const y = -20 + d * 9 + rand() * 4;
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      dummy.rotation.y = -angle; // zwrócone mniej więcej w stronę areny
      const s = 1.2 + rand() * 0.8;
      dummy.scale.set(s, s * 1.4, 1);
      dummy.updateMatrix();
      drops.setMatrixAt(idx, dummy.matrix);
      const fade = 1 - d / dropsPerColumn; // "głowa" smugi jaśniejsza, ogon gaśnie
      drops.setColorAt(idx, baseColor.clone().multiplyScalar(0.4 + fade * 1.4));
      idx++;
    }
  }
  drops.instanceColor.needsUpdate = true;
  disposeAwareAdd(group, drops);

  group.userData.matrixColumns = columns;
  group.userData.matrixMesh = drops;
  group.userData.dropsPerColumn = dropsPerColumn;
  group.userData.tmpMatrix = new THREE.Matrix4();

  return group;
}

function updateMatrixBackground(group, elapsed, deltaTime) {
  const { matrixColumns, matrixMesh, dropsPerColumn, tmpMatrix } = group.userData;
  if (!matrixMesh) return;
  const RANGE = 220; // wysokość, po jakiej smuga zawija się z powrotem na górę
  for (const col of matrixColumns) {
    const dy = col.speed * deltaTime;
    for (let d = 0; d < dropsPerColumn; d++) {
      const i = col.startIdx + d;
      matrixMesh.getMatrixAt(i, tmpMatrix);
      // Translacja Y zawsze siedzi w elements[13] niezależnie od
      // rotacji/skali (kolejność TRS) - taniej niż pełny decompose/recompose
      // dla ~1300 instancji na klatkę.
      let y = tmpMatrix.elements[13] - dy;
      if (y < -30) y += RANGE;
      tmpMatrix.elements[13] = y;
      matrixMesh.setMatrixAt(i, tmpMatrix);
    }
  }
  matrixMesh.instanceMatrix.needsUpdate = true;
}

// --- AMBER: krajobraz vaporwave --------------------------------------------
// Ciepłe, gradientowe słońce (bez prążków - to odróżnia je od synthwave) +
// unoszące się, obracające się druciane "święte geometrie" (piramidy,
// torusy) charakterystyczne dla estetyki vaporwave.
function buildAmberBackground() {
  const rand = makeRand(9001);
  const group = new THREE.Group();

  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffb347, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
  });
  const sun = new THREE.Mesh(new THREE.CircleGeometry(65, 48), sunMaterial);
  sun.position.set(0, 60, -250);
  disposeAwareAdd(group, sun);

  const shapes = [];
  const shapesCount = 16;
  for (let i = 0; i < shapesCount; i++) {
    const isTorus = rand() < 0.5;
    const geometry = isTorus
      ? new THREE.TorusGeometry(4 + rand() * 6, 0.4, 8, 20)
      : new THREE.ConeGeometry(4 + rand() * 5, 8 + rand() * 8, 4);
    const color = rand() < 0.5 ? 0xff6ec7 : 0xffb347;
    const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.8, fog: true });
    const mesh = new THREE.Mesh(geometry, material);
    const angle = rand() * Math.PI * 2;
    const radius = 100 + rand() * 180;
    mesh.position.set(Math.cos(angle) * radius, 15 + rand() * 60, Math.sin(angle) * radius);
    mesh.rotation.set(rand() * Math.PI, rand() * Math.PI, 0);
    mesh.userData.spin = 0.1 + rand() * 0.3;
    disposeAwareAdd(group, mesh);
    shapes.push(mesh);
  }
  group.userData.amberShapes = shapes;

  return group;
}

function updateAmberBackground(group, elapsed, deltaTime) {
  const shapes = group.userData.amberShapes;
  if (!shapes) return;
  for (const mesh of shapes) {
    mesh.rotation.y += mesh.userData.spin * deltaTime;
    mesh.rotation.x += mesh.userData.spin * 0.4 * deltaTime;
  }
}

// --- GLACIER: cyberpunkowy lodowiec ---------------------------------------
// Kanciaste bryły lodu (ośmiościany/stożki) w chłodnej granatowo-białej
// palecie, z jaśniejszym, świecącym konturem (EdgesGeometry) na każdej -
// to jest właśnie "cyberpunkowy" akcent na naturalnym motywie lodowca.
// Plus powoli opadający śnieg (THREE.Points, animowany w update()).
function buildGlacierBackground() {
  const rand = makeRand(5555);
  const group = new THREE.Group();

  const count = 60;
  for (let i = 0; i < count; i++) {
    const isOcta = rand() < 0.5;
    const geometry = isOcta
      ? new THREE.OctahedronGeometry(6 + rand() * 14, 0)
      : new THREE.ConeGeometry(5 + rand() * 10, 14 + rand() * 30, 5);
    const color = rand() < 0.7 ? 0x1a3550 : 0x0d1f30;
    const material = new THREE.MeshBasicMaterial({ color, fog: true });
    const mesh = new THREE.Mesh(geometry, material);

    const angle = rand() * Math.PI * 2;
    const radius = 90 + rand() * 190;
    const height = geometry.parameters.height || (10 + rand() * 20);
    mesh.position.set(Math.cos(angle) * radius, height / 2 - 0.55, Math.sin(angle) * radius);
    mesh.rotation.set(rand() * 0.3, rand() * Math.PI, rand() * 0.3);
    mesh.scale.set(0.7 + rand() * 0.6, 1, 0.7 + rand() * 0.6);
    disposeAwareAdd(group, mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x8fefff, transparent: true, opacity: 0.7, fog: false });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    edgeLines.position.copy(mesh.position);
    edgeLines.rotation.copy(mesh.rotation);
    edgeLines.scale.copy(mesh.scale);
    disposeAwareAdd(group, edgeLines);
  }

  const snowCount = 300;
  const snowGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(snowCount * 3);
  const velocities = new Float32Array(snowCount);
  for (let i = 0; i < snowCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 20 + rand() * 260;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = rand() * 150;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    velocities[i] = 3 + rand() * 5;
  }
  snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const snowMaterial = new THREE.PointsMaterial({
    color: 0xdff6ff, size: 1.4, transparent: true, opacity: 0.8, fog: false, depthWrite: false
  });
  const snow = new THREE.Points(snowGeometry, snowMaterial);
  disposeAwareAdd(group, snow);

  group.userData.snow = snow;
  group.userData.snowVelocities = velocities;

  return group;
}

function updateGlacierBackground(group, elapsed, deltaTime) {
  const snow = group.userData.snow;
  const velocities = group.userData.snowVelocities;
  if (!snow) return;
  const positions = snow.geometry.attributes.position.array;
  for (let i = 0; i < velocities.length; i++) {
    positions[i * 3 + 1] -= velocities[i] * deltaTime;
    if (positions[i * 3 + 1] < -1) positions[i * 3 + 1] = 150;
  }
  snow.geometry.attributes.position.needsUpdate = true;
}

// === PUBLICZNY REJESTR ===
// fogDensity per motyw - KOLOR mgły dalej pochodzi z theme.bg (main.js),
// tu ustalamy tylko, jak "gęsto"/szybko tło znika w oddali dla danego
// klimatu (matrix: bez mgły w ogóle, ostre krawędzie jak w filmie; glacier:
// gęściej, jak zamglona, mroźna dal).
export const THEME_BACKGROUNDS = {
  classic: { build: buildClassicBackground, fogDensity: 0.004 },
  synthwave: { build: buildSynthwaveBackground, fogDensity: 0.0035 },
  matrix: { build: buildMatrixBackground, fogDensity: 0.0, update: updateMatrixBackground },
  amber: { build: buildAmberBackground, fogDensity: 0.0035, update: updateAmberBackground },
  glacier: { build: buildGlacierBackground, fogDensity: 0.005, update: updateGlacierBackground }
};
