import * as THREE from 'three';
import { makeRand, disposeAwareAdd, applyHorizonFade, FLOOR_Y, ellipsePoint, buryBelowFloor, buildStarfield } from './shared.js';

// === CLASSIC: neonowe miasto (motyw domyślny) ===
// Wydzielone z pierwotnego BackgroundThemes.js - patrz shared.js po opis
// pomocniczych funkcji WSPÓLNYCH z innymi motywami.

// --- Miękka tekstura "diody" (współdzielona, budowana raz) ----------------
// Zamiast twardego, prostokątnego boxa (poprzednia wersja) - okrągły,
// gasnący ku brzegom gradient (ta sama sztuczka co sprite cząsteczek w
// Effects.js/getParticleSpriteTexture), naciągnięty na płaską geometrię
// (patrz addBuildingDiodes -> InstancedMesh niżej) na eliptyczny kształt
// panelu dzięki niejednorodnej skali instancji. Efekt: realne, miękkie
// "światełko" z bloomem, a nie kafelek z ostrą krawędzią.
let sharedDiodeGlowTexture = null;
function getDiodeGlowTexture() {
  if (sharedDiodeGlowTexture) return sharedDiodeGlowTexture;
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const c = size / 2;
  const gradient = ctx.createRadialGradient(c, c, 0, c, c, c);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.85)');
  gradient.addColorStop(0.7, 'rgba(255,255,255,0.28)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  sharedDiodeGlowTexture = new THREE.CanvasTexture(canvas);
  return sharedDiodeGlowTexture;
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

// density (0-1, domyślnie 1 = pełna jakość) skaluje przede wszystkim liczbę
// OSOBNYCH draw calli (krawędzie budynków, szczeble) - nie liczbę diod
// (InstancedMesh, tania niezależnie od ilości) ani liczbę samych budynków
// (też InstancedMesh) - patrz PerformanceProfile.js po uzasadnienie, co
// dokładnie jest kosztowne na starym sprzęcie/sterownikach.
export function buildClassicBackground(density = 1) {
  const rand = makeRand(1337);
  const group = new THREE.Group();
  const facadeTexture = buildWindowFacadeTexture(rand);

  // --- Świecące krawędzie budynków - ten sam wzorzec co lodowe bryły w
  // glacier / grunt w amber (EdgesGeometry + LineSegments, opacity
  // animowana w updateClassicBackground()). RÓŻNICA: tam każda bryła miała
  // WŁASNĄ, inną geometrię (ośmiościan/stożek), więc EdgesGeometry musiała
  // być liczona per-obiekt. Tu WSZYSTKIE budynki to ten sam bazowy sześcian
  // (patrz InstancedMesh niżej) - więc EdgesGeometry liczymy RAZ i
  // współdzielimy między wszystkimi LineSegments (różni je tylko transform,
  // tak jak różne instancje InstancedMesh różni tylko ich macierz).
  const edgeBoxGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
  const EDGE_COLORS = [0x33ffff, 0xffffff, 0xffe135]; // cyjan / biel / żółty
  const classicEdgeSparkles = [];

  // --- Poprzeczne "szczeble" światła NA ścianach, między pionowymi
  // krawędziami budynku - jak szyny danych na obudowie serwerowni. Ta sama
  // sztuczka współdzielonej geometrii co edgeBoxGeometry: jeden odcinek
  // jednostkowy (-0.5,0,0)-(0.5,0,0), skalowany per-instancja (scale.x =
  // długość). WAŻNE: insetFraction < 1 w addBuildingRungs celowo zostawia
  // margines po obu końcach, żeby te krótkie linie NIE dotykały pionowych
  // krawędzi ściany (rozdzielone, nie zlewające się w jedną całość).
  const rungGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)
  ]);

  // --- Diody danych - zbierane TU, przypięte wprost do ścian KONKRETNYCH
  // budynków (patrz addBuildingDiodes wołane wewnątrz addLayer poniżej), a
  // nie losowo w przestrzeni jak wcześniej. To był powód, dla którego
  // poprzednio prawie nie było ich widać: przy czysto losowej pozycji w
  // promieniu/wysokości pokrywającej się z bryłami budynków większość diod
  // lądowała WEWNĄTRZ nieprzezroczystej geometrii budynku i był zasłaniana
  // przez test głębi (MeshStandardMaterial pisze do bufora głębi). Teraz
  // każda dioda ma pozycję i rotację wyliczoną analitycznie z konkretnej
  // ściany konkretnego budynku (WALL_EPS wysuwa ją odrobinę na zewnątrz od
  // powierzchni), więc zawsze renderuje się PRZED ścianą, nigdy w niej.
  const WALL_EPS = 0.18;
  const diodeRecords = [];
  const DIODE_COLORS = [
    new THREE.Color(0x00ffff).multiplyScalar(1.9), // cyjan
    new THREE.Color(0xff00ff).multiplyScalar(1.9), // magenta
    new THREE.Color(0xffffff).multiplyScalar(1.6)  // biel
  ];

  function addBuildingDiodes(px, pz, rotY, width, depth, height, count) {
    for (let d = 0; d < count; d++) {
      const face = Math.floor(rand() * 4); // 0:+x 1:-x 2:+z 3:-z (lokalne osie budynku, przed rotacją)
      const marginW = width * 0.42;
      const marginD = depth * 0.42;
      let localX, localZ;
      if (face === 0) { localX = width / 2 + WALL_EPS; localZ = (rand() * 2 - 1) * marginD; }
      else if (face === 1) { localX = -width / 2 - WALL_EPS; localZ = (rand() * 2 - 1) * marginD; }
      else if (face === 2) { localZ = depth / 2 + WALL_EPS; localX = (rand() * 2 - 1) * marginW; }
      else { localZ = -depth / 2 - WALL_EPS; localX = (rand() * 2 - 1) * marginW; }

      // Obrót lokalnego punktu ściany o rotację budynku (rotY) - dokładnie
      // ta sama macierz obrotu wokół Y, co Three.js stosuje do samej bryły.
      const worldX = px + Math.cos(rotY) * localX - Math.sin(rotY) * localZ;
      const worldZ = pz + Math.sin(rotY) * localX + Math.cos(rotY) * localZ;
      // Zakres pionowy diody: zaczyna się NIECO PONIŻEJ poziomu areny
      // (lowY=-2, arena to y=0). Rozkład dalej CELOWO nierównomierny -
      // wykładnik <1 na rand() spycha wylosowane wartości w górę zakresu,
      // więc diody wciąż GĘSTNIEJĄ ku górze ściany (jak światła w wyższych
      // piętrach wieżowca) - ale mniej drastycznie niż poprzednio (0.6, nie
      // 0.4): dolna partia budynku, bliżej areny, ma teraz WYRAŹNIE więcej
      // świateł niż wcześniej, zamiast być niemal pusta.
      const lowY = -2;
      const topY = FLOOR_Y + height;
      // Wykładnik obniżony z 0.8 do 0.55 - jeszcze wyraźniejsze gęstnienie
      // ku wierzchołkowi budynku (na życzenie: więcej diod skupionych
      // bliżej szczytu bryły, mniej w partii przyziemnej), start zakresu
      // (lowY) zostaje bez zmian - tuż poniżej poziomu areny.
      const heightFrac = Math.pow(rand(), 0.55);
      const worldY = lowY + heightFrac * (topY - lowY);

      // Panel diody leży płasko na ścianie: jego "szeroka" oś biegnie
      // WZDŁUŻ ściany (stąd +90° na ścianach x, bez obrotu na ścianach z).
      const panelRotY = rotY + (face < 2 ? Math.PI / 2 : 0);
      const s = 1.1 + rand() * 3.0;
      const r = rand();
      const colorIndex = r < 0.42 ? 0 : (r < 0.78 ? 1 : 2); // ~42% cyjan, ~36% magenta, ~22% biel

      diodeRecords.push({ x: worldX, y: worldY, z: worldZ, rotY: panelRotY, s, colorIndex });
    }
  }

  // Krótkie, poziome linie świetlne W POPRZEK ściany, między dwiema
  // pionowymi krawędziami tego budynku - NIE dotykają ani krawędzi
  // bocznych (insetFraction < 1 obcina długość z obu stron), ani górnej/
  // dolnej (worldY liczony z większym marginesem niż przy diodach).
  function addBuildingRungs(px, pz, rotY, width, depth, height, count) {
    for (let r = 0; r < count; r++) {
      const face = Math.floor(rand() * 4); // 0:+x 1:-x 2:+z 3:-z
      const spanFull = face < 2 ? depth : width; // "szerokość" TEJ ściany
      const insetFraction = 0.5 + rand() * 0.25; // 50-75% szerokości ściany - reszta to margines po bokach
      const spanLen = spanFull * insetFraction;

      let localX, localZ;
      if (face === 0) { localX = width / 2 + WALL_EPS; localZ = 0; }
      else if (face === 1) { localX = -width / 2 - WALL_EPS; localZ = 0; }
      else if (face === 2) { localZ = depth / 2 + WALL_EPS; localX = 0; }
      else { localZ = -depth / 2 - WALL_EPS; localX = 0; }

      const worldX = px + Math.cos(rotY) * localX - Math.sin(rotY) * localZ;
      const worldZ = pz + Math.sin(rotY) * localX + Math.cos(rotY) * localZ;
      // Ta sama zasada co przy diodach (patrz addBuildingDiodes) - zakres
      // zaczyna się nieco poniżej poziomu areny (lowY=-2) i jest mocno
      // przechylony ku górze (wykładnik 0.4), więc szczeble też gęstnieją
      // najmocniej tam, gdzie już jest najwięcej diod, i rzednąc w dół.
      const lowY = -2;
      const topY = FLOOR_Y + height;
      // Wykładnik obniżony z 0.4 do 0.28 - szczeble mają teraz jeszcze
      // wyraźniej rosnącą liczebność w stronę wierzchołka bryły.
      const heightFrac = Math.pow(rand(), 0.28);
      const worldY = lowY + heightFrac * (topY - lowY);

      const rungRotY = rotY + (face < 2 ? Math.PI / 2 : 0);
      const color = EDGE_COLORS[Math.floor(rand() * EDGE_COLORS.length)];
      const material = new THREE.LineBasicMaterial({
        color, transparent: true, opacity: 0.8, fog: false,
        blending: THREE.AdditiveBlending, depthWrite: false
      });
      const line = new THREE.Line(rungGeometry, material);
      line.position.set(worldX, worldY, worldZ);
      line.rotation.y = rungRotY;
      line.scale.set(spanLen, 1, 1);
      disposeAwareAdd(group, line);
      classicEdgeSparkles.push({
        material, phase: rand() * Math.PI * 2,
        strength: 0.5 + rand() * 0.3, base: 0.75 + rand() * 0.15
      });
    }
  }

  function addLayer({ count, radiusMin, radiusMax, heightMin, heightMax, color, spires, buried, edgeSparkleStrength }) {
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
      emissiveIntensity: 0.5,
      fog: true
    });
    // Wspólny, stały punkt odniesienia (LIGHT_HEIGHT/FADE_RANGE) - tuż nad
    // areną budynek ma jeszcze domyślny kolor, w dół stopniowo ciemnieje do
    // DARKEN_FACTOR (nie czerni). Ten sam próg dla wszystkich trzech warstw
    // i dla synthwave/matrix niżej - żadnej kalibracji per-obiekt.
    applyHorizonFade(material);
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
      const { x: px, z: pz } = ellipsePoint(angle, radius);

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

      // Diody danych na ścianach TEGO konkretnego budynku - jak najwięcej
      // (6-19 na budynek), dokładnie na jego bryle (patrz addBuildingDiodes
      // powyżej), nie luźno w przestrzeni. Skalowane density TYLKO
      // łagodnie (0.6-1.0x) - to InstancedMesh, więc nawet przy dużej
      // liczbie nie generuje dodatkowych draw calli.
      // Jeszcze więcej diod niż poprzednio (22-56 zamiast 14-38 na
      // budynek) - w połączeniu z mocniejszym wykładnikiem rozkładu (0.4)
      // większość z nich ląduje w górnej partii, gdzie już było ich najwięcej.
      // Jeszcze więcej diod na budynek (55-135 zamiast 38-83) - w połączeniu
      // z mocniejszym wykładnikiem rozkładu (0.55, patrz addBuildingDiodes)
      // wyraźnie zagęszcza światła w górnej partii budynków.
      const diodeDensityMul = 0.6 + 0.4 * density;
      addBuildingDiodes(px, pz, dummy.rotation.y, width, depth, height, Math.max(3, Math.round((55 + Math.floor(rand() * 80)) * diodeDensityMul)));

      // Więcej szczebli niż poprzednio (8-17 zamiast 5-12) - patrz
      // addBuildingRungs powyżej. W PEŁNI skalowane przez density - to
      // OSOBNE obiekty Line (draw call na każdy), więc to one, nie diody,
      // realnie odciążają słaby sprzęt.
      addBuildingRungs(px, pz, dummy.rotation.y, width, depth, height, Math.round((8 + Math.floor(rand() * 10)) * density));

      // Świecąca, skrząca się krawędź TEGO budynku - ta sama technika co
      // lodowe bryły w glacier (EdgesGeometry + LineSegments, opacity
      // animowana w update()), ale geometria WSPÓLNA (edgeBoxGeometry
      // zdefiniowana raz na górze funkcji) - tu różni budynki tylko
      // transform, identycznie jak przy InstancedMesh powyżej.
      //
      // TRZY POZIOMY JASNOŚCI zamiast jednego - losowany per budynek: połowa
      // krawędzi wyraźnie PRZYCIEMNIONA (ledwo widoczna), mniejsza grupa
      // (~18%) WYRAŹNIE ROZJAŚNIONA (mocny akcent), reszta zostaje na
      // dotychczasowym, umiarkowanym poziomie (z lekką zależnością od
      // warstwy głębi przez edgeSparkleStrength - bliżej mocniej, dalej
      // słabiej, tak jak wcześniej).
      // Nie każdy budynek dostaje świecącą krawędź - tylko ~połowa (z grubsza
      // co drugia/trzecia bryła, dzięki losowości), reszta zostaje bez
      // konturu. Krawędzie i tak są teraz gęsto "obudowane" diodami/
      // szczeblami na powierzchni (patrz addBuildingDiodes/addBuildingRungs
      // wyżej), więc kontur przestał być jedynym nośnikiem detalu.
      const hasEdge = rand() < 0.5;
      if (hasEdge) {
        const edgeTierRoll = rand();
        let edgeBase, edgeStrength, isDimTier;
        if (edgeTierRoll < 0.5) {
          edgeBase = 0.1 + rand() * 0.08;
          edgeStrength = 0.25 + rand() * 0.15;
          isDimTier = true;
        } else if (edgeTierRoll < 0.68) {
          edgeBase = 0.9 + rand() * 0.1;
          edgeStrength = 0.75 + rand() * 0.2;
          isDimTier = false;
        } else {
          edgeBase = 0.4 + 0.25 * edgeSparkleStrength;
          edgeStrength = 0.4 + 0.3 * edgeSparkleStrength;
          isDimTier = false;
        }
        // Krawędzie "przyciemnione" są i tak ledwo widoczne (opacity ~0.1-
        // 0.18) - na niższej gęstości po prostu ich NIE TWORZYMY (zamiast
        // tworzyć i tak prawie niewidoczny draw call). Jasne/normalne
        // krawędzie zostają zawsze - to one realnie definiują wygląd sceny.
        if (!isDimTier || rand() < density) {
          const edgeColor = EDGE_COLORS[Math.floor(rand() * EDGE_COLORS.length)];
          const edgeMaterial = new THREE.LineBasicMaterial({
            color: edgeColor, transparent: true, opacity: edgeBase, fog: false,
            blending: THREE.AdditiveBlending, depthWrite: false
          });
          // Ten sam gradient co na powierzchni brył (applyHorizonFade), ale
          // liczony osobno DLA TEGO KONKRETNEGO budynku (od jego widocznego
          // szczytu do jego podstawy, nie od wspólnego LIGHT_HEIGHT/
          // FADE_RANGE) i z darkenFactor=0, nie DARKEN_FACTOR - krawędź ma
          // wyraźnie ciemnieć w dół i przy samej podstawie całkowicie
          // zniknąć (nie tylko przygasnąć), zamiast zlewać się z ledwo
          // przyciemnioną (0.22) fasadą.
          const edgeFadeStartY = FLOOR_Y + height * 0.55; // górna połowa: pełna jasność
          applyHorizonFade(edgeMaterial, edgeFadeStartY, FLOOR_Y, 0);
          const edgeLines = new THREE.LineSegments(edgeBoxGeometry, edgeMaterial);
          edgeLines.position.set(px, centerY, pz);
          edgeLines.rotation.y = dummy.rotation.y;
          edgeLines.scale.set(width, totalHeight, depth);
          disposeAwareAdd(group, edgeLines);
          classicEdgeSparkles.push({
            material: edgeMaterial, phase: rand() * Math.PI * 2,
            strength: edgeStrength, base: edgeBase
          });
        }
      }

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
  // szczegółu i wyraźniejsza paralaksa przy skręcaniu kamery. Krawędzie
  // skrzą się mocniej bliżej kamery, słabiej w oddali - ten sam wzorzec co
  // addIceLayer() w glacier.
  addLayer({ count: 60, radiusMin: 300, radiusMax: 380, heightMin: 22, heightMax: 95, color: 0x4a4ab8, spires: true, buried: [220, 340], edgeSparkleStrength: 0.9 });
  addLayer({ count: 75, radiusMin: 380, radiusMax: 500, heightMin: 45, heightMax: 190, color: 0x38387a, spires: true, buried: [260, 380], edgeSparkleStrength: 0.55 });
  addLayer({ count: 60, radiusMin: 500, radiusMax: 650, heightMin: 70, heightMax: 260, color: 0x28285a, buried: [320, 460], edgeSparkleStrength: 0.3 });

  // --- Materializacja diod zebranych w diodeRecords (patrz
  // addBuildingDiodes) w jeden InstancedMesh, MIGOCZĄCE (nie statyczne) -
  // patrz updateClassicBackground(). Liczba wynika z sumy diod przypiętych
  // do wszystkich 195 budynków powyżej (zwykle ~1800-2400 - maksymalnie
  // dużo, bez sztywnego limitu narzuconego z góry). ---
  const lightCount = diodeRecords.length;
  // PlaneGeometry + miękka teksturowana poświata (getDiodeGlowTexture)
  // zamiast BoxGeometry - diody renderują się teraz jako gasnące ku
  // brzegom plamki światła, nie twarde prostokąty. side: DoubleSide, bo
  // przy skrajnych kątach kamery (bardzo blisko/pod ścianą) mogłaby się
  // pojawić od tyłu płaszczyzny, w przeciwieństwie do boxa, który zawsze
  // miał widoczną ściankę z obu stron.
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, map: getDiodeGlowTexture(), transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, vertexColors: true, side: THREE.DoubleSide
  });
  const lights = new THREE.InstancedMesh(geometry, material, lightCount);
  const dummy = new THREE.Object3D();
  const colorIndices = new Uint8Array(lightCount);
  const phases = new Float32Array(lightCount);
  for (let i = 0; i < lightCount; i++) {
    const rec = diodeRecords[i];
    dummy.position.set(rec.x, rec.y, rec.z);
    // Bez skali Z (0.12 dawniej dla grubości boxa) - płaszczyzna nie ma
    // głębi, sama tekstura daje wrażenie miękkiej poświaty zamiast krawędzi.
    dummy.scale.set(rec.s, rec.s * 0.42, 1);
    dummy.rotation.y = rec.rotY;
    dummy.updateMatrix();
    lights.setMatrixAt(i, dummy.matrix);
    colorIndices[i] = rec.colorIndex;
    phases[i] = rand() * Math.PI * 2;
    lights.setColorAt(i, DIODE_COLORS[rec.colorIndex]);
  }
  lights.instanceColor.needsUpdate = true;
  disposeAwareAdd(group, lights);

  group.userData.classicLights = lights;
  group.userData.classicLightColorIndices = colorIndices;
  group.userData.classicLightPhases = phases;
  group.userData.classicDiodeColors = DIODE_COLORS;
  group.userData.classicTwinkleCursor = 0;
  group.userData.classicScratchColor = new THREE.Color();
  group.userData.classicEdgeSparkles = classicEdgeSparkles;

  // Gwiazdy - najdalsza warstwa budynków sięga r=650/h=260 (patrz addLayer
  // wyżej), więc gwiazdy zaczynają się dopiero za nią (r 700-950,
  // h 160-380), żeby nigdy nie "przebijały" przez sylwetki budynków.
  // Delikatny cyjanowy odcień zamiast czystej bieli - spójny z paletą
  // motywu (theme.p1), zamiast wyglądać jak przypadkowa domieszka innego
  // klimatu. Skalowane tą samą `density` co budynki - na "low" tierze
  // proporcjonalnie mniej punktów.
  disposeAwareAdd(group, buildStarfield(
    rand, Math.max(60, Math.round(160 * density)), 0xaee8ff, 700, 950, 160, 380
  ));

  return group;
}

// Migoczące diody - zamiast przeliczać WSZYSTKIE co klatkę (kosztowne i
// niepotrzebne - oko i tak nie nadąży ocenić każdej naraz), aktualizuje
// tylko rotacyjną "porcję" (batch) na klatkę - cały zestaw odświeża się co
// ~10 klatek (~0.15s przy 60fps), niezależnie od tego, ile diod jest w
// sumie (batch to zawsze 10% całości).
export function updateClassicBackground(group, elapsed) {
  const { classicLights: lights, classicLightColorIndices: colorIndices, classicLightPhases: phases,
    classicDiodeColors: diodeColors, classicScratchColor: scratch, classicEdgeSparkles: edgeSparkles } = group.userData;
  if (!lights) return;

  const total = phases.length;
  const batch = Math.max(1, Math.round(total * 0.1));
  let cursor = group.userData.classicTwinkleCursor;
  for (let n = 0; n < batch; n++) {
    const i = (cursor + n) % total;
    const twinkle = 0.55 + 0.45 * Math.sin(elapsed * 2.2 + phases[i]);
    scratch.copy(diodeColors[colorIndices[i]]).multiplyScalar(twinkle);
    lights.setColorAt(i, scratch);
  }
  group.userData.classicTwinkleCursor = (cursor + batch) % total;
  lights.instanceColor.needsUpdate = true;

  // Skrzące się krawędzie budynków - ta sama technika co iceSparkles w
  // glacier (opacity materiału, nie kolor - stąd osobna pętla, bez
  // batchowania: LineBasicMaterial.opacity to jedna liczba na materiał, a
  // nie bufor per-wierzchołek jak instanceColor powyżej, więc nie ma tu
  // kosztownego przeliczania per-instancja do zaoszczędzenia).
  if (edgeSparkles) {
    for (const s of edgeSparkles) {
      const twinkle = 0.5 + 0.5 * Math.sin(elapsed * 3 + s.phase);
      s.material.opacity = s.base * (1 - s.strength) + s.base * s.strength * twinkle;
    }
  }
}

