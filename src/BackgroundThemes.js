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
// Generuje teksturę "fasady z oknami" (canvas) - współdzielona przez
// wszystkie budynki danej warstwy (InstancedMesh ma jeden materiał na
// wszystkie instancje), ale każdy budynek dostaje inny fragment/gęstość
// przez własny texture.repeat... a że InstancedMesh nie pozwala na
// per-instance repeat, kompensujemy to różnicami w skali budynków (patrz
// addLayer) i losowym wzorem okien w samej teksturze.
function buildWindowFacadeTexture(rand) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b0b26';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const cols = 6, rows = 16;
  const cw = canvas.width / cols, ch = canvas.height / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.5) continue; // nie każde okno "istnieje" - nieregularna fasada
      const lit = rand() < 0.55;
      ctx.fillStyle = lit ? 'rgba(150,225,255,0.95)' : 'rgba(40,55,95,0.6)';
      ctx.fillRect(c * cw + 1, r * ch + 1, cw - 2, ch - 2);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 5);
  return texture;
}

function buildClassicBackground() {
  const rand = makeRand(1337);
  const group = new THREE.Group();
  const facadeTexture = buildWindowFacadeTexture(rand);

  function addLayer({ count, radiusMin, radiusMax, heightMin, heightMax, color, spires }) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // MeshStandardMaterial zamiast MeshBasicMaterial - reaguje na światła
    // sceny (ambient + directional z main.js), więc każda ściana budynku
    // dostaje inny odcień zależnie od kąta do światła (góra jaśniejsza,
    // boki w cieniu) zamiast być jednolitą, płaską plamą koloru. Tekstura
    // okien (map) dokłada realny detal powierzchni.
    const material = new THREE.MeshStandardMaterial({
      color,
      map: facadeTexture,
      roughness: 0.75,
      metalness: 0.15,
      emissive: color,
      emissiveIntensity: 0.15, // odrobina "własnego" blasku, żeby ciemna strona budynku nie ginęła całkiem w czerni
      fog: true
    });
    const layer = new THREE.InstancedMesh(geometry, material, count);
    layer.instanceMatrix.setUsage(THREE.StaticDrawUsage);
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

    // Delikatna, losowa wariacja jasności KAŻDEGO budynku (instanceColor -
    // mnoży kolor bazowy materiału per-instancja) - bez tego, mimo
    // oświetlenia, całe pole wciąż wyglądałoby zbyt jednolicie.
    const baseColor = new THREE.Color(color);

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
      layer.setColorAt(i, baseColor.clone().multiplyScalar(0.75 + rand() * 0.5));

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
    layer.instanceColor.needsUpdate = true;

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

// Generuje teksturę słońca (canvas, radialny gradient) - daje realne
// wrażenie "kuli światła" zamiast płaskiego jednokolorowego kółka, i
// opcjonalnie wypala w niej poziome pasy (synthwave - "przysłonięte" słońce).
function buildSunTexture(rand, { core, mid, stripes }) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const c = size / 2;

  const gradient = ctx.createRadialGradient(c, c, 0, c, c, c);
  gradient.addColorStop(0, core);
  gradient.addColorStop(0.55, mid);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();

  if (stripes) {
    ctx.fillStyle = 'rgba(8,3,18,0.92)';
    for (let i = 0; i < 6; i++) {
      const y = size * (0.28 + rand() * 0.52);
      ctx.fillRect(0, y, size, 4 + rand() * 7);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Buduje słońce + JEGO WŁASNE, jawnie zaprojektowane odbicie - celowo NIE
// polegamy na automatycznym lustrze podłogi (Environment.js/Reflector) dla
// tego elementu, bo addytywny blending w połączeniu z normalnym blendingiem
// reflektora dawał efekt "wiszącej", oderwanej od horyzontu plamy. Zamiast
// tego odbicie to osobny mesh: odwrócony w pionie, wyraźnie przygaszony,
// ustawiony dokładnie tyle samo pod poziomem podłogi, ile słońce jest nad
// nim - czyli geometrycznie poprawne, ale w pełni kontrolowane.
function buildSunWithReflection(rand, { core, mid, stripes, radius, skyY, opacity }) {
  const group = new THREE.Group();
  const floorY = -0.55; // ta sama wysokość co Reflector w Environment.js
  const texture = buildSunTexture(rand, { core, mid, stripes });

  const material = new THREE.MeshBasicMaterial({
    map: texture, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
  });
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), material);
  sun.position.set(0, skyY, -260);
  group.add(sun);

  const reflection = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), material.clone());
  reflection.material.opacity = opacity * 0.3;
  reflection.scale.y = -1;
  reflection.position.set(0, 2 * floorY - skyY, -260);
  group.add(reflection);

  return group;
}

// --- SYNTHWAVE: low-poly góry z linii + kultowe zachodzące słońce --------
function buildSynthwaveBackground() {
  const rand = makeRand(4242);
  const group = new THREE.Group();

  // Jedno, wyraźne, ale niedominujące słońce (umiarkowana opacity zamiast
  // 0.85) - z odbiciem na podłodze (patrz buildSunWithReflection wyżej).
  disposeAwareAdd(group, buildSunWithReflection(rand, {
    core: '#fff0f8', mid: '#ff5fa8', stripes: true, radius: 60, skyY: 50, opacity: 0.55
  }));

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
// Prawdziwe znaki (cyfry/katakana-podobne symbole) wypalone w jednej,
// pionowej teksturze canvas, powielanej (RepeatWrapping) na wysokich,
// wąskich płaszczyznach ustawionych w pierścieniu wokół areny. Animacja
// "spadania" to tylko przesuwanie texture.offset.y co klatkę - tanie, bez
// dotykania geometrii. Każda kolumna to DWIE płaszczyzny na krzyż (90°),
// żeby była widoczna z dowolnego kąta kamery, nie tylko "na wprost".
function buildMatrixCharacterTexture(rand) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const chars = '01アイウエオカキクケコサシスセソタチツテト';
  for (let y = 16; y < canvas.height; y += 32) {
    const ch = chars[Math.floor(rand() * chars.length)];
    const bright = rand();
    ctx.fillStyle = bright < 0.15 ? '#eaffea' : '#3dff6e';
    ctx.globalAlpha = 0.5 + rand() * 0.5;
    ctx.fillText(ch, canvas.width / 2, y);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function buildMatrixBackground() {
  const rand = makeRand(7331);
  const group = new THREE.Group();
  const baseTexture = buildMatrixCharacterTexture(rand);

  const columnsCount = 46;
  const columns = [];

  for (let c = 0; c < columnsCount; c++) {
    const angle = (c / columnsCount) * Math.PI * 2 + rand() * 0.05;
    const radius = 90 + rand() * 170;
    const height = 55 + rand() * 85;

    // Własny klon tekstury per kolumna - każda potrzebuje NIEZALEŻNEGO
    // texture.offset.y (prędkość/faza), więc nie może być to jeden
    // współdzielony obiekt Texture (offset jest właściwością tekstury, nie
    // materiału).
    const texture = baseTexture.clone();
    texture.needsUpdate = true;
    texture.repeat.set(1, height / 16);
    texture.offset.y = rand();

    const material = new THREE.MeshBasicMaterial({
      map: texture, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
    });
    const geometry = new THREE.PlaneGeometry(7, height);

    const cross = new THREE.Group();
    const plane1 = new THREE.Mesh(geometry, material);
    const plane2 = new THREE.Mesh(geometry, material);
    plane2.rotation.y = Math.PI / 2;
    cross.add(plane1, plane2);
    cross.position.set(Math.cos(angle) * radius, height / 2 - 0.55, Math.sin(angle) * radius);
    disposeAwareAdd(group, cross);

    columns.push({ texture, speed: 0.12 + rand() * 0.3 });
  }

  group.userData.matrixColumns = columns;
  return group;
}

function updateMatrixBackground(group, elapsed, deltaTime) {
  const columns = group.userData.matrixColumns;
  if (!columns) return;
  for (const col of columns) {
    col.texture.offset.y -= col.speed * deltaTime;
  }
}

// --- AMBER: krajobraz vaporwave --------------------------------------------
// Ciepłe, gradientowe słońce (bez prążków - to odróżnia je od synthwave) +
// unoszące się, obracające się druciane "święte geometrie" (piramidy,
// torusy) charakterystyczne dla estetyki vaporwave.
function buildAmberBackground() {
  const rand = makeRand(9001);
  const group = new THREE.Group();

  disposeAwareAdd(group, buildSunWithReflection(rand, {
    core: '#fff6e0', mid: '#ffb347', stripes: false, radius: 58, skyY: 52, opacity: 0.55
  }));

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
    color: 0xdff6ff, size: 0.35, transparent: true, opacity: 0.8, fog: false, depthWrite: false
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
