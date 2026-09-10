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

// === CIENIOWANIE GRADIENTOWE OD POZIOMU ARENY W DÓŁ ===
// Finalna wersja wypracowana w interaktywnej wizualizacji (rozmowa z
// użytkownikiem) - stały, WSPÓLNY dla całej sceny punkt odniesienia tuż
// NAD poziomem areny (LIGHT_HEIGHT, patrz niżej), od którego zaczyna się
// przejście - bryła ma tam jeszcze swój domyślny kolor. Przejście trwa
// PRZEZ FADE_RANGE jednostek w dół i kończy się NIE czernią, tylko
// CIEMNIEJSZĄ WERSJĄ TEGO SAMEGO KOLORU (DARKEN_FACTOR) - stąd budynki nie
// "znikają", tylko realistycznie ciemnieją, jakby to była właśnie arena
// (a nie żadne prawdziwe światło) blokująca coś nad nimi. CELOWO żadnych
// prawdziwych obliczeń oświetlenia/cieni (drogie na Androidzie) - cały
// efekt to czysto kolorystyczny gradient wstrzyknięty w shader.
const LIGHT_HEIGHT = 8;      // stały punkt odniesienia - tuż nad poziomem areny (y=0)
const FADE_RANGE = 180;      // jak daleko w dół trwa przejście
const DARKEN_FACTOR = 0.22;  // jak ciemna jest końcowa wersja koloru (nie czerń)

// Wstrzykuje do shadera materiału (onBeforeCompile - standardowe API
// Three.js, bez zewnętrznych zależności) mnożnik jasności liczony wprost z
// WSPÓŁRZĘDNEJ Y W PRZESTRZENI ŚWIATA każdego fragmentu - pełna jasność
// przy y >= LIGHT_HEIGHT, płynne (smoothstep - naprawdę gradientowe, nie
// liniowe) przejście do DARKEN_FACTOR przy y <= LIGHT_HEIGHT - FADE_RANGE.
//
// Działa identycznie dla MeshStandardMaterial (budynki classic) i
// MeshBasicMaterial/LineBasicMaterial (strumienie matrix, grzbiety
// synthwave) - w Three.js WSZYSTKIE trzy kompilują się z tych samych
// modułowych fragmentów shaderów (#include <common>, <project_vertex>,
// <color_fragment>), więc jeden hak obsługuje wszystkie użyte tu materiały.
// Obsługuje też InstancedMesh (budynki) - #ifdef USE_INSTANCING uwzględnia
// macierz KONKRETNEJ instancji, nie tylko wspólnej geometrii bazowej.
function applyHorizonFade(material, fadeStartY = LIGHT_HEIGHT, fadeEndY = LIGHT_HEIGHT - FADE_RANGE, darkenFactor = DARKEN_FACTOR) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.fadeStartY = { value: fadeStartY };
    shader.uniforms.fadeEndY = { value: fadeEndY };
    shader.uniforms.darkenFactor = { value: darkenFactor };

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
    // niżej) zostawiało budynki classic (emissiveIntensity>0) "prześwitujące"
    // niewygaszoną emisją. MeshBasicMaterial/LineBasicMaterial (matrix,
    // synthwave) nie mają tej zmiennej wcale - stąd warunkowe dopisanie
    // tylko tam, gdzie faktycznie istnieje.
    const hasEmissive = shader.fragmentShader.includes('totalEmissiveRadiance');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vWorldY;\nuniform float fadeStartY;\nuniform float fadeEndY;\nuniform float darkenFactor;'
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
  float horizonFadeFactor = smoothstep(fadeEndY, fadeStartY, vWorldY);
  float darkenMix = mix(darkenFactor, 1.0, horizonFadeFactor);
  diffuseColor.rgb *= darkenMix;
  ${hasEmissive ? 'totalEmissiveRadiance *= darkenMix;' : ''}`
      );
  };
  material.needsUpdate = true;
}

// Ta sama wysokość co Reflector w Environment.js - punkt odniesienia dla
// "zakopywania" elementów tła pod posadzkę (patrz buryBelowFloor niżej).
const FLOOR_Y = -0.55;

// Arena to Grid(90, 45) w main.js - dłuższa krawędź = 90. Bryły tła (classic/
// synthwave/matrix) stoją w odległości KILKUKROTNOŚCI tej wartości od
// areny, a przestrzeń między nimi zostaje CAŁKOWICIE pusta (żaden floor,
// żaden cień - patrz _buildHorizonFadeMask w Environment.js, który maskuje
// nieskończone lustro podłogi dokładnie na granicy areny). Rozmieszczenie
// eliptyczne (nie kołowe) - szersze wzdłuż X niż Z.
const ARENA_EDGE = 90;
const ELLIPSE_X = 1.35;
const ELLIPSE_Z = 0.8;
function ellipsePoint(angle, radius) {
  return { x: Math.cos(angle) * radius * ELLIPSE_X, z: Math.sin(angle) * radius * ELLIPSE_Z };
}

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

// density (0-1, domyślnie 1 = pełna jakość) skaluje przede wszystkim liczbę
// OSOBNYCH draw calli (krawędzie budynków, szczeble) - nie liczbę diod
// (InstancedMesh, tania niezależnie od ilości) ani liczbę samych budynków
// (też InstancedMesh) - patrz PerformanceProfile.js po uzasadnienie, co
// dokładnie jest kosztowne na starym sprzęcie/sterownikach.
function buildClassicBackground(density = 1) {
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
      // (lowY=-2, arena to y=0) - wcześniej diody startowały dopiero nad
      // areną (FLOOR_Y+1.4), przez co dolna partia budynku była całkiem
      // pusta. Rozkład dalej CELOWO nierównomierny - wykładnik <1 na
      // rand() spycha większość wylosowanych wartości w górę zakresu
      // (jeszcze mocniej niż wcześniej: 0.4, nie 0.5), więc diody gęstnieją
      // przede wszystkim w górnej partii ściany (jak światła w wyższych
      // piętrach wieżowca), rzednąc w dół, aż do niemal zera tuż nad tym
      // dolnym limitem.
      const lowY = -2;
      const topY = FLOOR_Y + height;
      const heightFrac = Math.pow(rand(), 0.4);
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
      const heightFrac = Math.pow(rand(), 0.4);
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
      const diodeDensityMul = 0.6 + 0.4 * density;
      addBuildingDiodes(px, pz, dummy.rotation.y, width, depth, height, Math.max(2, Math.round((22 + Math.floor(rand() * 34)) * diodeDensityMul)));

      // Więcej szczebli niż poprzednio (5-12 zamiast 3-8) - patrz
      // addBuildingRungs powyżej. W PEŁNI skalowane przez density - to
      // OSOBNE obiekty Line (draw call na każdy), więc to one, nie diody,
      // realnie odciążają słaby sprzęt.
      addBuildingRungs(px, pz, dummy.rotation.y, width, depth, height, Math.round((5 + Math.floor(rand() * 7)) * density));

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
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, vertexColors: true
  });
  const lights = new THREE.InstancedMesh(geometry, material, lightCount);
  const dummy = new THREE.Object3D();
  const colorIndices = new Uint8Array(lightCount);
  const phases = new Float32Array(lightCount);
  for (let i = 0; i < lightCount; i++) {
    const rec = diodeRecords[i];
    dummy.position.set(rec.x, rec.y, rec.z);
    dummy.scale.set(rec.s, rec.s * 0.42, 0.12);
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
function updateClassicBackground(group, elapsed) {
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
  // Migot krawędzi grzbietów - ta sama technika co classicEdgeSparkles w
  // motywie classic (opacity materiału animowana sinusoidalnie w
  // updateSynthwaveBackground niżej), tylko że tu JEDEN materiał = CAŁY
  // grzbiet (dziesiątki segmentów w jednym LineSegments), więc migają razem,
  // a nie pojedynczo - to wystarcza, bo grzbietów jest teraz kilka, każdy z
  // WŁASNĄ fazą, więc i tak nie migają w unisono.
  const ridgeSparkles = [];

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
      const { x: rx, z: rz } = ellipsePoint(angle, radius);
      points.push(new THREE.Vector3(rx, h, rz));
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
    // Ta sama technika co przy krawędziach budynków w classic - gradient
    // liczony od szczytu grzbietu w dół, ale z darkenFactor=0 (nie
    // DARKEN_FACTOR=0.22): dno iglic ma CAŁKOWICIE zniknąć, nie tylko
    // przygasnąć, tak żeby góry realnie zlewały się z fundamentem/podłogą
    // zamiast kończyć się widoczną, przyciemnioną plamą koloru.
    applyHorizonFade(material, LIGHT_HEIGHT, LIGHT_HEIGHT - FADE_RANGE, 0);
    ridgeSparkles.push({ material, phase: rand() * Math.PI * 2, strength: 0.35 + rand() * 0.3, base: 0.85 });
    return new THREE.LineSegments(geometry, material);
  }

  // Pięć grzbietów zamiast trzech - gęściej upakowane pasmo gór, więcej
  // sylwetek nakładających się na siebie przy różnych promieniach/
  // wysokościach (więcej "brył" low-poly, większa głębia).
  disposeAwareAdd(group, buildRidge(260, 40, 0x00eaff, 26));
  disposeAwareAdd(group, buildRidge(320, 55, 0xff2f9e, 26));
  disposeAwareAdd(group, buildRidge(400, 75, 0x00eaff, 30));
  disposeAwareAdd(group, buildRidge(480, 100, 0xff2f9e, 26));
  disposeAwareAdd(group, buildRidge(560, 125, 0x00eaff, 24));

  disposeAwareAdd(group, buildStarfield(rand, 220, 0xffffff, 80, 400, 60, 220));

  group.userData.synthRidgeSparkles = ridgeSparkles;
  return group;
}

// Migot grzbietów - identyczna logika jak edgeSparkles w
// updateClassicBackground (opacity materiału jako sinusoida wokół base,
// każdy grzbiet z własną fazą).
function updateSynthwaveBackground(group, elapsed) {
  const sparkles = group.userData.synthRidgeSparkles;
  if (!sparkles) return;
  for (const s of sparkles) {
    const twinkle = 0.5 + 0.5 * Math.sin(elapsed * 2.4 + s.phase);
    s.material.opacity = s.base * (1 - s.strength) + s.base * s.strength * twinkle;
  }
}

// --- MATRIX: ściany cyfrowego deszczu -------------------------------------
// Prawdziwe znaki (cyfry/katakana-podobne symbole) wypalone w jednej,
// pionowej teksturze canvas, powielanej (RepeatWrapping) na wysokich,
// wąskich płaszczyznach ustawionych w pierścieniu wokół areny. Animacja
// "spadania" to przesuwanie texture.offset.y co klatkę - tanie, bez
// dotykania geometrii. Każda kolumna to DWIE płaszczyzny na krzyż (90°),
// żeby była widoczna z dowolnego kąta kamery, nie tylko "na wprost".
function buildMatrixCharacterTexture(rand, charSize = 26) {
  const canvas = document.createElement('canvas');
  // Szerokość canvasu skaluje się z rozmiarem znaku, żeby glify nie robiły
  // się ciasne/przycięte przy większej czcionce (wariant "dużych" strumieni).
  canvas.width = Math.round(80 * (charSize / 26));
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
  for (let y = charSize / 2; y < canvas.height; y += charSize) {
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

// density (0-1) skaluje liczbę strumieni (osobne Mesh, więc realny koszt
// draw calli - patrz PerformanceProfile.js) - szerokość poszczególnych
// strumieni zostaje bez zmian, jest mniej strumieni, nie węższe.
function buildMatrixBackground(density = 1) {
  const rand = makeRand(7331);
  const group = new THREE.Group();
  const baseTexture = buildMatrixCharacterTexture(rand, 26);
  // Wariant "dużych" strumieni - większe znaki (46px zamiast 26px), losowana
  // NIEZALEŻNIE dla części strumieni w każdej warstwie (patrz isBig w
  // addLayer niżej) i celowo dużo wolniejsza (patrz speed niżej) - efekt
  // kilku "ociężałych", grubszych sznurów znaków przebijających się przez
  // resztę, standardowej gęstości/prędkości deszczu.
  const bigTexture = buildMatrixCharacterTexture(rand, 46);
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

      // ~1 na 5 strumieni - duże znaki, wyraźnie wolniejszy spadek (35-50%
      // normalnej prędkości) i odrobinę szerszy pas (żeby duże glify miały
      // gdzie "oddychać", nie ocierały się o sąsiednią kolumnę).
      const isBig = rand() < 0.2;
      const texture = (isBig ? bigTexture : baseTexture).clone();
      texture.needsUpdate = true;
      texture.repeat.set(1, totalHeight / 14);
      texture.offset.y = rand();

      const material = new THREE.MeshBasicMaterial({
        map: texture, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide
      });
      applyHorizonFade(material);
      const width = (widthMin + rand() * (widthMax - widthMin)) * (isBig ? 1.3 : 1);
      const geometry = new THREE.PlaneGeometry(width, totalHeight);

      const cross = new THREE.Group();
      const plane1 = new THREE.Mesh(geometry, material);
      const plane2 = new THREE.Mesh(geometry, material);
      plane2.rotation.y = Math.PI / 2;
      cross.add(plane1, plane2);
      const { x: sx, z: sz } = ellipsePoint(angle, radius);
      cross.position.set(sx, centerY, sz);
      disposeAwareAdd(group, cross);

      const speed = isBig
        ? speedMin * 0.35 + rand() * (speedMax - speedMin) * 0.35
        : speedMin + rand() * (speedMax - speedMin);
      const cycleDuration = 5 + rand() * 12;
      columns.push({
        texture, material,
        speed,
        cycleDuration,
        cycleOffset: rand() * cycleDuration,
        baseOpacity: opacity
      });
    }
  }

  // Bliższa warstwa - mniej strumieni, ale szersze, jaśniejsze i szybsze.
  // Więcej i szersze niż wcześniej (było 46 strumieni, szerokość 5-9).
  addLayer(Math.max(20, Math.round(70 * density)), 300, 400, 55, 100, 0.9, 20, 45, 8, 15);
  // Środkowa warstwa (NOWA) - wypełnia lukę głębi między bliską a dalszą,
  // dodatkowo zagęszczając ścianę cyfr.
  addLayer(Math.max(15, Math.round(55 * density)), 380, 480, 60, 120, 0.65, 14, 32, 9, 16);
  // Dalsza warstwa - więcej, szersze niż wcześniej (było 64 strumienie,
  // szerokość 6-12), wciąż wolniejsze i przygaszone (głębia, paralaksa przy
  // skręcaniu kamery). Zasięg promienia przesunięty do 480-650, żeby nie
  // dublować się z nową warstwą środkową powyżej.
  addLayer(Math.max(25, Math.round(85 * density)), 480, 650, 70, 150, 0.42, 8, 20, 11, 19);

  group.userData.matrixColumns = columns;

  // Gwiazdy - deszcz sięga r=650/h=150 (patrz addLayer wyżej), więc gwiazdy
  // zaczynają się dopiero za nim. Ten motyw ma fogDensity=0.0 (bez mgły w
  // ogóle - patrz THEME_BACKGROUNDS niżej), więc bez tego pustka za
  // deszczem była całkiem czarna/pusta. Kolor ledwie muśnięty zielenią
  // (prawie biały) - to gwiazdy, nie kolejna warstwa deszczu, mają się od
  // niego odróżniać, nie z nim zlewać.
  disposeAwareAdd(group, buildStarfield(
    rand, Math.max(50, Math.round(140 * density)), 0xcdffd9, 700, 950, 170, 380
  ));

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
  classic: { build: buildClassicBackground, fogDensity: 0.0022, update: updateClassicBackground },
  synthwave: { build: buildSynthwaveBackground, fogDensity: 0.0035, update: updateSynthwaveBackground },
  matrix: { build: buildMatrixBackground, fogDensity: 0.0, update: updateMatrixBackground },
  amber: { build: buildAmberBackground, fogDensity: 0.0035, update: updateAmberBackground },
  glacier: { build: buildGlacierBackground, fogDensity: 0.005, update: updateGlacierBackground }
};
