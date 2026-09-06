import * as THREE from 'three';

// === REJESTR MOTYWÓW TŁA ===
// Każdy motyw to: build() -> THREE.Group (elementy sceny) i opcjonalnie
// update(group, elapsed, deltaTime) dla animowanych elementów (np. spadający
// "deszcz" w motywie matrix, migoczące światła w classic). Environment.js
// (setTheme) zarządza tym, KTÓRY motyw jest aktywny - ten plik zna tylko,
// JAK zbudować każdy z nich.
//
// Wspólny wzorzec: stały, deterministyczny seed na motyw, żeby układ
// elementów nie zmieniał się między przeładowaniami strony, ale każdy motyw
// miał INNY, powtarzalny układ.
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

// === CIENIOWANIE GRADIENTOWE WG WYSOKOŚCI ŚWIATA (poniżej horyzontu) ===
// Wcześniejsze podejście (światło punktowe nad areną) dawało zanikanie wg
// ODLEGŁOŚCI OD PUNKTU, nie wg WYSOKOŚCI względem horyzontu - w praktyce
// nie dawało widocznego, spójnego gradientu, tylko wciąż ostre przejście
// tam, gdzie geometria znikała za nieprzezroczystym Reflectorem podłogi
// (Environment.js). To rozwiązuje problem u źródła: wstrzykuje do shadera
// materiału (onBeforeCompile - standardowe API Three.js, bez zewnętrznych
// zależności) mnożnik jasności liczony wprost z WSPÓŁRZĘDNEJ Y W PRZESTRZENI
// ŚWIATA każdego fragmentu - pełna jasność przy y >= fadeStartY (horyzont,
// czyli poziom posadzki), płynne (smoothstep - naprawdę gradientowe, nie
// liniowe) przejście do całkowitej czerni przy y <= fadeEndY.
//
// Działa identycznie dla MeshStandardMaterial (budynki classic) i
// MeshBasicMaterial/LineBasicMaterial (strumienie matrix, grzbiety
// synthwave) - w Three.js WSZYSTKIE trzy kompilują się z tych samych
// modułowych fragmentów shaderów (#include <common>, <project_vertex>,
// <color_fragment>), więc jeden hak obsługuje wszystkie użyte tu materiały.
// Obsługuje też InstancedMesh (budynki) - #ifdef USE_INSTANCING uwzględnia
// macierz KONKRETNEJ instancji, nie tylko wspólnej geometrii bazowej.
function applyHorizonFade(material, fadeStartY, fadeEndY) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.fadeStartY = { value: fadeStartY };
    shader.uniforms.fadeEndY = { value: fadeEndY };

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vWorldY;')
      .replace(
        '#include <project_vertex>',
        `#include <project_vertex>
#ifdef USE_INSTANCING
  vWorldY = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).y;
#else
  vWorldY = (modelMatrix * vec4(transformed, 1.0)).y;
#endif`
      );

    // MeshStandardMaterial liczy poświatę emisyjną (totalEmissiveRadiance)
    // NIEZALEŻNIE od diffuseColor - samo ściemnianie diffuseColor (jak
    // niżej) zostawiało budynki classic (emissiveIntensity: 0.15)
    // "prześwitujące" niewygaszoną emisją nawet głęboko pod areną, przez co
    // cały efekt był praktycznie niewidoczny. MeshBasicMaterial/
    // LineBasicMaterial (matrix, synthwave) nie mają tej zmiennej wcale -
    // stąd warunkowe dopisanie tylko tam, gdzie faktycznie istnieje.
    const hasEmissive = shader.fragmentShader.includes('totalEmissiveRadiance');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vWorldY;\nuniform float fadeStartY;\nuniform float fadeEndY;'
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
  float horizonFadeFactor = smoothstep(fadeEndY, fadeStartY, vWorldY);
  diffuseColor.rgb *= horizonFadeFactor;
  ${hasEmissive ? 'totalEmissiveRadiance *= horizonFadeFactor;' : ''}`
      );
  };
  material.needsUpdate = true;
}

// Ta sama wysokość co Reflector w Environment.js - punkt odniesienia dla
// "zakopywania" elementów tła pod posadzkę (patrz buryBelowFloor niżej).
const FLOOR_Y = -0.55;

// === EFEKT "CYLINDRA" ===
// Rozszerza pion elementu W DÓŁ, POD poziom podłogi, zachowując jego
// pierwotny "widoczny" wierzchołek na tej samej wysokości co wcześniej.
// Dzięki temu posadzka wygląda jak cienki dysk zawieszony w środku dużo
// wyższego cylindra tła, a nie jak sufit stojący dokładnie na fundamencie
// każdego obiektu - reszta świata ciągnie się dalej w dół, poza zasięgiem
// wzroku. Zwraca {centerY, totalHeight} do użycia jako position.y/scale.y.
function buryBelowFloor(rand, visibleHeight, minBuried, maxBuried) {
  const buried = minBuried + rand() * (maxBuried - minBuried);
  const topY = FLOOR_Y + visibleHeight;
  const totalHeight = visibleHeight + buried;
  const centerY = topY - totalHeight / 2;
  return { centerY, totalHeight };
}

// === TRON CLASSIC: centra danych / superkomputery ==========================
// Trzy warstwy prostopadłościennych "serwerowni" w pierścieniu wokół areny
// (bliska/średnia/daleka - więcej warstw niż wcześniej = więcej głębi),
// część z cienkimi antenami, tekstura okien na fasadach, delikatna losowa
// wariacja jasności KAŻDEGO budynku, i setki drobnych, MIGOCZĄCYCH "diod
// danych" (nie tylko statyczne punkty jak wcześniej).
function buildWindowFacadeTexture(rand) {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b0b26';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const cols = 8, rows = 22;
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

  function addLayer({ count, radiusMin, radiusMax, heightMin, heightMax, color, spires, buried }) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // MeshStandardMaterial zamiast MeshBasicMaterial - reaguje na światła
    // sceny (ambient + directional + fill/rim, patrz main.js), więc każda
    // ściana budynku dostaje inny odcień zależnie od kąta do światła (góra
    // jaśniejsza, boki w cieniu, druga strona doświetlona chłodnym fill
    // lightem) zamiast być jednolitą, płaską plamą koloru.
    const material = new THREE.MeshStandardMaterial({
      color,
      map: facadeTexture,
      roughness: 0.7,
      metalness: 0.2,
      emissive: color,
      emissiveIntensity: 0.15, // odrobina "własnego" blasku, żeby ciemna strona budynku nie ginęła całkiem w czerni
      fog: true
    });
    // Cieniowanie NIE zaczyna się na horyzoncie - większość budynku (część
    // widoczna nad areną + prawie cały zakopany fragment) zostaje w pełnym,
    // jednolitym kolorze. Gradient do czerni pojawia się dopiero tuż PRZY
    // dnie fundamentu (połowa głębokości zakopania tej warstwy, szerszy,
    // dając wrażenie budynków "gubiących się w mroku" bardzo głęboko pod
    // areną, zamiast szerokiego, widocznego przejścia od samego horyzontu.
    const maxBuried = buried[1];
    const fadeEndY = -maxBuried;
    const fadeStartY = -maxBuried * 0.5;
    applyHorizonFade(material, fadeStartY, fadeEndY);
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

      // Efekt "cylindra" - budynek sięga daleko POD posadzkę, nie tylko do
      // jej poziomu, żeby scena wyglądała jak wnętrze wielkiej rury, w
      // której podłoga jest tylko cienkim, zawieszonym diskiem.
      const { centerY, totalHeight } = buryBelowFloor(rand, height, buried[0], buried[1]);

      dummy.position.set(px, centerY, pz);
      dummy.scale.set(width, totalHeight, depth);
      dummy.rotation.y = rand() * Math.PI;
      dummy.updateMatrix();
      layer.setMatrixAt(i, dummy.matrix);
      layer.setColorAt(i, baseColor.clone().multiplyScalar(0.75 + rand() * 0.5));

      // Anteny stoją na WIDOCZNYM wierzchołku budynku (height, nie
      // totalHeight - zakopana część jest niewidoczna, więc nie ma sensu
      // stawiać na niej anteny).
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

  // Trzy warstwy głębi zamiast dwóch - bliska, średnia, daleka - więcej
  // szczegółu i wyraźniejsza paralaksa przy skręcaniu kamery.
  addLayer({ count: 60, radiusMin: 85, radiusMax: 140, heightMin: 22, heightMax: 95, color: 0x22225c, spires: true, buried: [220, 340] });
  addLayer({ count: 75, radiusMin: 165, radiusMax: 270, heightMin: 45, heightMax: 190, color: 0x141438, spires: true, buried: [260, 380] });
  addLayer({ count: 60, radiusMin: 300, radiusMax: 430, heightMin: 70, heightMax: 260, color: 0x0c0c26, buried: [320, 460] });

  // --- Diody danych - drobne, świecące kreski na fasadach, MIGOCZĄCE (nie
  // statyczne) - patrz updateClassicBackground(). Znacznie więcej niż
  // wcześniej (były 420, teraz 900) dla gęstszego, bardziej "żywego" pola. ---
  const lightCount = 900;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, vertexColors: true
  });
  const lights = new THREE.InstancedMesh(geometry, material, lightCount);
  const dummy = new THREE.Object3D();
  const colorA = new THREE.Color(0x00ffff).multiplyScalar(1.6);
  const colorB = new THREE.Color(0xff0055).multiplyScalar(1.6);
  const isA = new Uint8Array(lightCount);
  const phases = new Float32Array(lightCount);
  for (let i = 0; i < lightCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 90 + rand() * 340;
    const height = 2 + rand() * 250;
    dummy.position.set(Math.cos(angle) * radius, height - 0.55, Math.sin(angle) * radius);
    const s = 0.5 + rand() * 1.7;
    dummy.scale.set(s, s * 0.35, 0.15);
    dummy.rotation.y = rand() * Math.PI;
    dummy.updateMatrix();
    lights.setMatrixAt(i, dummy.matrix);
    const a = rand() < 0.5;
    isA[i] = a ? 1 : 0;
    phases[i] = rand() * Math.PI * 2;
    lights.setColorAt(i, a ? colorA : colorB);
  }
  lights.instanceColor.needsUpdate = true;
  disposeAwareAdd(group, lights);

  group.userData.classicLights = lights;
  group.userData.classicLightIsA = isA;
  group.userData.classicLightPhases = phases;
  group.userData.classicColorA = colorA;
  group.userData.classicColorB = colorB;
  group.userData.classicTwinkleCursor = 0;
  group.userData.classicScratchColor = new THREE.Color();

  return group;
}

// Migoczące diody - zamiast przeliczać WSZYSTKIE 900 co klatkę (kosztowne
// i niepotrzebne - oko i tak nie nadąży ocenić każdej naraz), aktualizuje
// tylko rotacyjną "porcję" (batch) na klatkę. Przy 90/klatkę cały zestaw
// odświeża się co ~10 klatek (~0.15s przy 60fps) - dalej wygląda jak ciągłe
// skrzenie się, ale dużo taniej.
function updateClassicBackground(group, elapsed) {
  const { classicLights: lights, classicLightIsA: isA, classicLightPhases: phases,
    classicColorA: colorA, classicColorB: colorB, classicScratchColor: scratch } = group.userData;
  if (!lights) return;

  const total = phases.length;
  const batch = 90;
  let cursor = group.userData.classicTwinkleCursor;
  for (let n = 0; n < batch; n++) {
    const i = (cursor + n) % total;
    const twinkle = 0.55 + 0.45 * Math.sin(elapsed * 2.2 + phases[i]);
    scratch.copy(isA[i] ? colorA : colorB).multiplyScalar(twinkle);
    lights.setColorAt(i, scratch);
  }
  group.userData.classicTwinkleCursor = (cursor + batch) % total;
  lights.instanceColor.needsUpdate = true;
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
  reflection.position.set(0, 2 * FLOOR_Y - skyY, -260);
  group.add(reflection);

  return group;
}

// Prosty gwiazdozbiór (Points) w górnej połowie nieba - tani sposób na
// dołożenie drobnego detalu/głębi bez dodatkowych draw calli (jeden Points
// na cały zestaw).
function buildStarfield(rand, count, color, radiusMin, radiusMax, heightMin, heightMax) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = radiusMin + rand() * (radiusMax - radiusMin);
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = heightMin + rand() * (heightMax - heightMin);
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color, size: 1.1, transparent: true, opacity: 0.7, fog: false, depthWrite: false
  });
  return new THREE.Points(geometry, material);
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
  // Iglice grzbietu schodzą daleko POD posadzkę (efekt cylindra) zamiast
  // kończyć się tuż przy jej poziomie.
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
        const buriedDepth = -(120 + rand() * 100);
        positions.push(points[i].x, points[i].y, points[i].z, points[i].x, buriedDepth, points[i].z);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85, fog: true });
    // Cieniowanie zaczyna się dopiero blisko dna iglic (nie od horyzontu) -
    // ta sama zasada co przy budynkach classic (patrz applyHorizonFade
    // wyżej i komentarz przy addLayer). Zakres iglic: -120 do -220.
    applyHorizonFade(material, -110, -220);
    return new THREE.LineSegments(geometry, material);
  }

  // Trzy grzbiety zamiast dwóch - bliski/średni/daleki (więcej głębi/detalu).
  disposeAwareAdd(group, buildRidge(190, 45, 0xff2f9e, 24));
  disposeAwareAdd(group, buildRidge(240, 65, 0x00eaff, 28));
  disposeAwareAdd(group, buildRidge(310, 100, 0xff2f9e, 22));

  disposeAwareAdd(group, buildStarfield(rand, 220, 0xffffff, 80, 400, 60, 220));

  return group;
}

// --- MATRIX: ściany cyfrowego deszczu -------------------------------------
// Prawdziwe znaki (cyfry/katakana-podobne symbole) wypalone w jednej,
// pionowej teksturze canvas, powielanej (RepeatWrapping) na wysokich,
// wąskich płaszczyznach ustawionych w pierścieniu wokół areny. Animacja
// "spadania" to przesuwanie texture.offset.y co klatkę - tanie, bez
// dotykania geometrii. Każda kolumna to DWIE płaszczyzny na krzyż (90°),
// żeby była widoczna z dowolnego kąta kamery, nie tylko "na wprost".
function buildMatrixCharacterTexture(rand) {
  const canvas = document.createElement('canvas');
  canvas.width = 80;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '26px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
  for (let y = 14; y < canvas.height; y += 26) {
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
  const columns = [];

  // Jedna warstwa strumieni (wywoływana dwa razy - bliżej/dalej, patrz
  // niżej). Każdy strumień ma WŁASNY cykl życia (cycleDuration/cycleOffset)
  // - płynnie "rodzi się" (jakby zaczynał spływać z góry) i "kończy"
  // (zanika), zamiast być wiecznie niezmienną pętlą - patrz
  // updateMatrixBackground().
  function addLayer(count, radiusMin, radiusMax, heightMin, heightMax, opacity, speedMin, speedMax, widthMin, widthMax) {
    for (let c = 0; c < count; c++) {
      const angle = rand() * Math.PI * 2;
      const radius = radiusMin + rand() * (radiusMax - radiusMin);
      const visibleHeight = heightMin + rand() * (heightMax - heightMin);
      // Cylinder: strumień ciągnie się daleko pod posadzkę, nie tylko do
      // jej poziomu.
      const { centerY, totalHeight } = buryBelowFloor(rand, visibleHeight, 200, 350);

      const texture = baseTexture.clone();
      texture.needsUpdate = true;
      texture.repeat.set(1, totalHeight / 14);
      texture.offset.y = rand();

      const material = new THREE.MeshBasicMaterial({
        map: texture, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
      });
      const buriedAmount = totalHeight - visibleHeight;
      const bottomWorldY = centerY - totalHeight / 2;
      // Cieniowanie zaczyna się blisko DNA TEGO KONKRETNEGO strumienia
      // (znamy jego dokładną głębokość, w przeciwieństwie do InstancedMesh
      // budynków classic, gdzie trzeba było przybliżać wg całej warstwy).
      applyHorizonFade(material, bottomWorldY + buriedAmount * 0.5, bottomWorldY);
      const width = widthMin + rand() * (widthMax - widthMin);
      const geometry = new THREE.PlaneGeometry(width, totalHeight);

      const cross = new THREE.Group();
      const plane1 = new THREE.Mesh(geometry, material);
      const plane2 = new THREE.Mesh(geometry, material);
      plane2.rotation.y = Math.PI / 2;
      cross.add(plane1, plane2);
      cross.position.set(Math.cos(angle) * radius, centerY, Math.sin(angle) * radius);
      disposeAwareAdd(group, cross);

      const cycleDuration = 5 + rand() * 12;
      columns.push({
        texture, material,
        speed: speedMin + rand() * (speedMax - speedMin),
        cycleDuration,
        cycleOffset: rand() * cycleDuration,
        baseOpacity: opacity
      });
    }
  }

  // Bliższa warstwa - mniej strumieni, ale szersze, jaśniejsze i szybsze.
  addLayer(46, 90, 160, 55, 100, 0.9, 20, 45, 5, 9);
  // Dalsza warstwa - więcej, drobniejsze, wolniejsze i przygaszone (głębia,
  // paralaksa przy skręcaniu kamery).
  addLayer(64, 170, 300, 70, 150, 0.42, 8, 20, 6, 12);

  group.userData.matrixColumns = columns;
  return group;
}

function updateMatrixBackground(group, elapsed, deltaTime) {
  const columns = group.userData.matrixColumns;
  if (!columns) return;
  for (const col of columns) {
    col.texture.offset.y -= col.speed * deltaTime;

    // Cykl życia strumienia - płynne pojawianie się (jakby zaczynał spływać
    // z góry) i zanikanie (jakby "kończył się"), zamiast wiecznie
    // niezmiennej pętli. Po dojściu do zera cykl zaczyna się od nowa w tym
    // samym miejscu - kolejny strumień "rodzi się" tam, gdzie poprzedni
    // właśnie zniknął.
    const t = (elapsed + col.cycleOffset) % col.cycleDuration;
    const fadeWindow = 1.0;
    const fadeIn = Math.min(1, t / fadeWindow);
    const fadeOut = Math.min(1, (col.cycleDuration - t) / fadeWindow);
    col.material.opacity = col.baseOpacity * Math.min(fadeIn, fadeOut);
  }
}

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
function buildAmberBackground() {
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

function updateAmberBackground(group, elapsed, deltaTime) {
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
function buildGlacierBackground() {
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

function updateGlacierBackground(group, elapsed, deltaTime) {
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

// === PUBLICZNY REJESTR ===
// fogDensity per motyw - KOLOR mgły dalej pochodzi z theme.bg (main.js),
// tu ustalamy tylko, jak "gęsto"/szybko tło znika w oddali dla danego
// klimatu (matrix: bez mgły w ogóle, ostre krawędzie jak w filmie; glacier:
// gęściej, jak zamglona, mroźna dal).
export const THEME_BACKGROUNDS = {
  classic: { build: buildClassicBackground, fogDensity: 0.004, update: updateClassicBackground },
  synthwave: { build: buildSynthwaveBackground, fogDensity: 0.0035 },
  matrix: { build: buildMatrixBackground, fogDensity: 0.0, update: updateMatrixBackground },
  amber: { build: buildAmberBackground, fogDensity: 0.0035, update: updateAmberBackground },
  glacier: { build: buildGlacierBackground, fogDensity: 0.005, update: updateGlacierBackground }
};
