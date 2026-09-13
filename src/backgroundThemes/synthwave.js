import * as THREE from 'three';
import { makeRand, disposeAwareAdd, applyHorizonFade, LIGHT_HEIGHT, FADE_RANGE, ellipsePoint, buildSunWithReflection, buildStarfield } from './shared.js';

// === SYNTHWAVE: retro-zachód słońca ===
// Wydzielone z pierwotnego BackgroundThemes.js - patrz shared.js po opis
// pomocniczych funkcji WSPÓLNYCH z innymi motywami.

// Gradientowe niebo - duża, płaska płaszczyzna daleko za całą resztą sceny
// (ten sam wzorzec co słońce: pojedynczy, nieruchomy plane zamiast pełnej
// kopuły/sfery, bo kamera w tej grze nigdy nie odwraca się o 180° od areny -
// patrz sun.position w buildSunWithReflection). Tekstura to pionowy
// gradient wypalony na canvasie (2×256px, rozciągnięty przez UV - nie
// potrzeba więcej rozdzielczości dla gładkiego przejścia).
// Kolory DOKŁADNIE z specyfikacji: #1a0033 (ciemny fiolet) u góry (zenit),
// przez #6600cc w połowie, do #ff0080 (magenta) nisko, blisko horyzontu.
function buildSynthwaveSky() {
  const canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, '#1a0033');
  gradient.addColorStop(0.55, '#6600cc');
  gradient.addColorStop(1, '#ff0080');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2, 256);

  const texture = new THREE.CanvasTexture(canvas);
  // CELOWO bez fog:false tutaj - w przeciwieństwie do słońca/gwiazd, niebo
  // MA prawo lekko zlewać się z mgłą sceny (to i tak ta sama rodzina barw),
  // a to niebo samo w sobie JEST tłem, więc pełne krycie mgłą nie ma
  // znaczenia wizualnego (nic za nim nie ma).
  const material = new THREE.MeshBasicMaterial({ map: texture });
  // Wysoko i szeroko (2200×700), wyśrodkowane w okolicy wysokości słońca
  // (skyY=50 w buildSunWithReflection) - górna część gradientu (fiolet)
  // rozciąga się ponad szczyty gór, dolna (róż) schodzi w okolice
  // horyzontu/podstawy gór, dokładnie tam, gdzie wg specyfikacji ma być
  // różowo-fioletowa poświata.
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(2200, 700), material);
  sky.position.set(0, 50, -750); // za najdalszym grzbietem (r=560, patrz buildRidge niżej) i za słońcem (z=-260)
  return sky;
}

// --- SYNTHWAVE: low-poly góry z linii + kultowe zachodzące słońce --------
export function buildSynthwaveBackground() {
  const rand = makeRand(4242);
  const group = new THREE.Group();

  // Niebo - MUSI być dodane pierwsze (patrz buildSynthwaveSky wyżej) - to
  // po prostu daleka, płaska płaszczyzna za wszystkim innym, kolejność
  // dodania do grupy nie wpływa na depth test, ale trzyma się tu tej
  // konwencji dla czytelności (od najdalszego do najbliższego).
  disposeAwareAdd(group, buildSynthwaveSky());

  // Migot krawędzi grzbietów - ta sama technika co classicEdgeSparkles w
  // motywie classic (opacity materiału animowana sinusoidalnie w
  // updateSynthwaveBackground niżej), tylko że tu JEDEN materiał = CAŁY
  // grzbiet (dziesiątki segmentów w jednym LineSegments), więc migają razem,
  // a nie pojedynczo - to wystarcza, bo grzbietów jest teraz kilka, każdy z
  // WŁASNĄ fazą, więc i tak nie migają w unisono.
  const ridgeSparkles = [];

  // Słońce siedzi w (x=0, z=-260) - patrz buildSunWithReflection wyżej. W
  // układzie kąta używanym przez ellipsePoint (x=cos*r*ELLIPSE_X,
  // z=sin*r*ELLIPSE_Z) odpowiada to kątowi 3π/2 (cos=0, sin=-1). Ta STAŁA
  // (nie losowana per grzbiet, w przeciwieństwie do shapePhase/roughPhase
  // niżej) jest współdzielona przez WSZYSTKIE pięć grzbietów, żeby ich
  // "doliny" przy słońcu pokryły się w jedną, spójną wyrwę odsłaniającą
  // niebo, a nie pięć osobnych, przypadkowo poprzesuwanych obniżeń.
  const SUN_ANGLE = Math.PI * 1.5;
  const SUN_GAP_HALF_WIDTH = 1.05; // ~60° w każdą stronę - szeroka, wyraźna wyrwa, nie wąska szczelina
  function sunGapFactor(angle) {
    let d = Math.abs(angle - SUN_ANGLE) % (Math.PI * 2);
    if (d > Math.PI) d = Math.PI * 2 - d;
    const t = Math.min(1, d / SUN_GAP_HALF_WIDTH);
    const smooth = t * t * (3 - 2 * t); // smoothstep - płynne, nie kanciaste wejście/wyjście z doliny
    return 0.22 + 0.78 * smooth; // 0.22 dokładnie przy słońcu (mocno, ale nie do zera - dalej "teren"), 1.0 daleko od niego
  }

  // Jedno, wyraźne, ale niedominujące słońce (umiarkowana opacity zamiast
  // 0.85) - z odbiciem na podłodze (patrz buildSunWithReflection wyżej).
  // Żółto-pomarańczowa paleta (głęboki pomarańcz u góry, cieplejsza żółć u
  // dołu), barwy mieszają się gradientowo w OSI PIONOWEJ (verticalGradient:
  // true - patrz buildSunTexture), nie promieniście od środka jak wcześniej.
  disposeAwareAdd(group, buildSunWithReflection(rand, {
    core: '#ff6a00', mid: '#ffd23f', stripes: false, radius: 60, skyY: 50, opacity: 0.65, verticalGradient: true
  }));

  // Góry - kontur (LineSegments, nie wypełnione trójkąty), żeby wyglądały
  // jak fluorescencyjne linie na tle ciemnego nieba, nie pełne bryły.
  // Iglice grzbietu schodzą daleko POD posadzkę (efekt cylindra) zamiast
  // kończyć się tuż przy jej poziomie.
  function buildRidge(radius, baseHeight, color, baseSegments) {
    const points = [];
    const twoPi = Math.PI * 2;
    // Fazy losowane PER GRZBIET (nie wspólne dla wszystkich pięciu) - dzięki
    // temu każdy grzbiet ma WŁASNY, inny wzorzec tego, gdzie jest gładko, a
    // gdzie postrzępiono, zamiast identycznie powtarzającego się układu.
    const shapePhase = rand() * Math.PI * 2;
    const roughPhase = rand() * Math.PI * 2;

    // Częstotliwości obwiedni i mnożnik pofałdowania losowane PER GRZBIET
    // (nie stałe 2.3/3.7/0.65 jak wcześniej) - to właśnie one decydują,
    // GDZIE POZIOMO (pod jakimi kątami wokół areny) wypadają wzniesienia i
    // doliny danego grzbietu. Różne częstotliwości między grzbietami =
    // szczyty jednego grzbietu NIE pokrywają się w pionie ze szczytami
    // sąsiedniego - poziomy układ każdego pasma jest inny. waveMul różnicuje
    // też samą intensywność postrzępienia między grzbietami (jeden gładszy,
    // inny bardziej poszarpany), niezależnie od częstotliwości.
    const freqA = 1.7 + rand() * 1.3;
    const freqB = 3.0 + rand() * 2.0;
    const ampA = 0.36 + rand() * 0.26;
    const ampB = 0.18 + rand() * 0.24;
    const waveMul = 0.4 + rand() * 0.6;

    function roughAmountAt(angle) {
      return 0.5 + 0.5 * Math.sin(angle * 3.1 + roughPhase);
    }

    function heightAt(angle) {
      // Gładka obwiednia złożona z DWÓCH fal o różnej częstotliwości -
      // zamiast jednej, dużej "górki" na cały grzbiet, daje kilka bliżej
      // siebie leżących par wzniesienie/obniżenie (pagórek, a kawałek dalej
      // już dolina) - bardziej wyżynny, poszarpany profil, mniej
      // jednostajnie "falisty". freqA/freqB/ampA/ampB teraz losowane PER
      // GRZBIET (patrz wyżej) zamiast być stałymi 2.3/3.7/0.48/0.30 -
      // każdy grzbiet ma więc WŁASNY, inny rytm wzniesień/dolin w poziomie.
      const envelope = 0.22
        + ampA * (0.5 + 0.5 * Math.sin(angle * freqA + shapePhase))
        + ampB * (0.5 + 0.5 * Math.sin(angle * freqB + shapePhase * 1.7));
      const jagged = (rand() * 2 - 1) * roughAmountAt(angle) * waveMul;
      // Suma obwiedni i lokalnego szumu (dolny limit 0.12, żeby nawet w
      // najbardziej "zapadniętym" miejscu grzbiet nie zjechał do zera),
      // dodatkowo przemnożona przez sunGapFactor - to właśnie ono wyraźnie
      // obniża WSZYSTKIE grzbiety w kierunku słońca i w jego pobliżu,
      // odsłaniając niebo za nimi.
      return baseHeight * Math.max(0.12, envelope + jagged) * sunGapFactor(angle);
    }

    // KLUCZOWA ZMIANA: krok kątowy między punktami TEŻ się zmienia (nie
    // tylko wysokość) - tam, gdzie roughAmount (ta sama fala co wyżej) jest
    // wysoki, krok jest mały (gęsta siatka, dużo wąskich granii), tam gdzie
    // niski - krok jest duży (rzadka, wygładzona siatka, kilka szerokich
    // płaszczyzn). To właśnie daje WIDOCZNIE różną gęstość low-poly między
    // fragmentami jednego grzbietu, a nie tylko różną amplitudę szumu przy
    // wciąż tej samej liczbie wierzchołków. minStep/maxStep dają ~5x
    // rozpiętość gęstości między najgęstszą a najrzadszą strefą.
    const minStep = twoPi / (baseSegments * 2.2);
    const maxStep = twoPi / (baseSegments * 0.45);

    let angle = 0;
    while (angle < twoPi) {
      const { x: rx, z: rz } = ellipsePoint(angle, radius);
      points.push(new THREE.Vector3(rx, heightAt(angle), rz));
      const step = maxStep - (maxStep - minStep) * roughAmountAt(angle);
      angle += step;
    }
    // Domknięcie pętli - ostatni punkt DOKŁADNIE w tym samym miejscu co
    // pierwszy (angle=0), żeby grzbiet szczelnie się zamykał, bez szwu.
    const closePoint = ellipsePoint(0, radius);
    points.push(new THREE.Vector3(closePoint.x, heightAt(0), closePoint.z));

    // --- Wypełnienie: granowana bryła low-poly pod konturem ---
    // To właśnie odróżnia "kontur gór" (samą linię, jak dotąd) od
    // rozpoznawalnych, WYPEŁNIONYCH low-poly gór znanych z grafik
    // synthwave. Ta sama sekwencja punktów co linia grzbietu niżej, ale
    // teraz jako pas trójkątów schodzący od grzbietu do stałej, głębokiej
    // podstawy (i tak niewidocznej - patrz dobór wartości bazowej Y niżej).
    // Wierzchołki KAŻDEGO trójkąta są WŁASNE, nie współdzielone z
    // sąsiadami (positions dopisywane wprost, bez indeksowania) - to
    // pozwala nadać każdemu trójkątowi osobny, losowo przyciemniony
    // odcień koloru grzbietu (fillJitter), zamiast gładkiego,
    // interpolowanego gradientu. Właśnie ten "połamany", nierówny rozkład
    // jasności między sąsiednimi granami - a NIE geometria sama w sobie -
    // jest tym, co wizualnie czyta się jako "low poly" w tej estetyce.
    // Materiał jest unlit (MeshBasicMaterial) celowo: żadnego prawdziwego
    // oświetlenia w tej scenie nie ma (tylko AmbientLight w main.js), więc
    // zamiast liczyć na cieniowanie z normalnych, efekt graniastości
    // symulujemy czysto kolorystycznie, tym samym haczykiem
    // (onBeforeCompile) co reszta pliku.
    // BUG Z RUNDY 5 (znaleziony po zrzucie ekranu użytkownika): fillBaseY
    // był przypięty do tej samej, odległej głębokości (-172), co "zakopane"
    // iglice LINII konturu. Dla niewidocznej linii to nieważne - ale dla
    // WYPEŁNIONEJ, nieprzezroczystej powierzchni oznaczało to, że większość
    // ściany siedziała W ŚRODKU bardzo rozciągniętego (180 jednostek)
    // gradientu ściemniania i wciąż była częściowo jasna - gigantyczna,
    // wypełniająca ekran kolorowa "ściana" zamiast zwartej sylwetki.
    //
    // POPRAWKA Z RUNDY 9 (użytkownik: "dociągnij tekstury maksymalnie w
    // dół, do fundamentów"): dwie ODDZIELNE wartości zamiast jednej.
    // fillGeometryDepth to jak DALEKO w dół sięga sama SIATKA - celowo
    // głęboko (-200, z powrotem blisko dawnej wartości), żeby bryła zawsze
    // "dochodziła do fundamentów" niezależnie od kąta kamery, bez
    // widocznej luki. fillFadeDepth to jak szybko KOLOR gaśnie do czerni -
    // zostaje KRÓTKI (jak w poprawce z Rundy 8), żeby nie wrócił bug z
    // Rundy 5. Rozdzielenie tych dwóch rzeczy - to jest właśnie to, czego
    // brakowało: głęboka siatka, ale szybko (blisko szczytu) gasnąca do
    // czerni, więc jej głęboka część i tak jest niewidoczna, a mimo to
    // fizycznie "sięga fundamentów".
    const fillFadeDepth = Math.max(90, baseHeight * 1.8);
    const fillGeometryDepth = 200;
    const fillBaseY = -fillGeometryDepth;
    const fillBaseColor = new THREE.Color(color);
    const fillPositions = [];
    const fillColors = [];
    const jitterColor = new THREE.Color();
    const pushFillTriangle = (p1, p2, p3) => {
      fillPositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
      // Jeden losowy współczynnik na CAŁY trójkąt (nie osobny na wierzchołek)
      // - inaczej trzy różne jasności w rogach tego samego trójkąta
      // wygładziłyby się przez interpolację i efekt graniastości by zniknął.
      const jitter = 0.35 + rand() * 0.5;
      jitterColor.copy(fillBaseColor).multiplyScalar(jitter);
      for (let v = 0; v < 3; v++) fillColors.push(jitterColor.r, jitterColor.g, jitterColor.b);
    };
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      const baseA = { x: a.x, y: fillBaseY, z: a.z };
      const baseB = { x: b.x, y: fillBaseY, z: b.z };
      pushFillTriangle(a, baseA, baseB);
      pushFillTriangle(a, baseB, b);
    }
    const fillGeometry = new THREE.BufferGeometry();
    fillGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fillPositions, 3));
    fillGeometry.setAttribute('color', new THREE.Float32BufferAttribute(fillColors, 3));
    const fillMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      fog: true,
      side: THREE.DoubleSide,
      // Wypełnienie i kontur (LineSegments niżej) dzielą DOKŁADNIE te same
      // wierzchołki grzbietu - bez tego linia i powierzchnia trójkątów
      // migotałyby na granicy (z-fighting), bo leżą w tej samej płaszczyźnie
      // głębi. polygonOffset odsuwa wypełnienie o włos w głąb, żeby linia
      // konturu zawsze wygrywała test głębi i została ostro widoczna na wierzchu.
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });
    // darkenFactor=0 (nie domyślne DARKEN_FACTOR) - podstawa bryły ma
    // całkowicie zniknąć w czerni. fadeEndY = LIGHT_HEIGHT-fillFadeDepth
    // (KRÓTKI zasięg, NIE fillBaseY, który teraz jest znacznie głębiej) -
    // gradient kończy się szybko, blisko szczytu, więc głęboka reszta
    // siatki (do fillBaseY=-200) jest już całkowicie czarna/niewidoczna,
    // mimo że fizycznie tam sięga.
    applyHorizonFade(fillMaterial, LIGHT_HEIGHT, LIGHT_HEIGHT - fillFadeDepth, 0);
    disposeAwareAdd(group, new THREE.Mesh(fillGeometry, fillMaterial));

    // --- Kontur: świecąca linia grzbietu (bez zmian) ---
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
  // wysokościach (więcej "brył" low-poly, większa głębia). Grzbiet
  // NAJBLIŻSZY arenie ma teraz WYRAŹNIE niższy wierzchołek (16, wcześniej
  // 28) - na życzenie: pagórki bliżej areny mają być niżej położone.
  // baseHeight między grzbietami dalej rośnie z odległością (żeby dalsze
  // pasma wciąż wystawały ponad bliższe), ale NIE liniowo jak wcześniej -
  // skoki są teraz nierówne (16→30→46→60→86), więc różnica wysokości
  // między sąsiednimi grzbietami sama w sobie jest zróżnicowana. Liczba
  // segmentów (gęstość siatki low-poly) też przestała rosnąć w prostej
  // kolejności z promieniem - grzbiety mieszają rzadsze/gęstsze sąsiedztwo
  // (46/62/74/50/38), tak jak i same częstotliwości/amplitudy pofałdowania
  // (patrz freqA/freqB/ampA/ampB/waveMul w buildRidge powyżej) są losowane
  // OSOBNO na grzbiet - stąd większe zróżnicowanie wysokości, zagęszczenia
  // i pofałdowania między pasmami, a ich krawędzie (szczyty/doliny) wypadają
  // pod różnymi kątami względem areny, nie są ustawione w rządku. Paleta
  // spójna niebiesko-cyjanowa (dwa bliskie odcienie błękitu) - zgodnie ze
  // specyfikacją (kolor_linii: #00bfff).
  // Grzbiet NAJBLIŻSZY arenie dostaje ciepły, różowo-fioletowy odcień
  // (0xff5fa8) zamiast chłodnego błękitu - klasyczny synthwave kontrastuje
  // ciepły pierwszy plan (blisko słońca) z chłodniejszymi, dalszymi
  // pasmami. Reszta zostaje w spójnej niebiesko-cyjanowej palecie -
  // stopniowe przejście od ciepła do chłodu wraz z odległością daje więcej
  // głębi kolorystycznej niż jednolity błękit wszędzie.
  disposeAwareAdd(group, buildRidge(260, 16, 0xff5fa8, 46));
  disposeAwareAdd(group, buildRidge(320, 30, 0x2f9eff, 62));
  disposeAwareAdd(group, buildRidge(400, 46, 0x00bfff, 74));
  disposeAwareAdd(group, buildRidge(480, 60, 0x2f9eff, 50));
  disposeAwareAdd(group, buildRidge(560, 86, 0x00bfff, 38));

  // Dwie warstwy gwiazd zamiast jednej - różne rozmiary punktów (JSON:
  // "rozmiar: małe, różne wielkości"), nie jednolity rozmiar wszystkich
  // gwiazd naraz. Większość drobnych + garstka wyraźnie większych, jaśniej
  // "mrugających" gwiazd dla urozmaicenia.
  disposeAwareAdd(group, buildStarfield(rand, 220, 0xffffff, 80, 400, 60, 220, 1.1));
  disposeAwareAdd(group, buildStarfield(rand, 40, 0xffffff, 80, 400, 60, 220, 2.4));

  group.userData.synthRidgeSparkles = ridgeSparkles;
  return group;
}

// Migot grzbietów - identyczna logika jak edgeSparkles w
// updateClassicBackground (opacity materiału jako sinusoida wokół base,
// każdy grzbiet z własną fazą).
export function updateSynthwaveBackground(group, elapsed) {
  const sparkles = group.userData.synthRidgeSparkles;
  if (!sparkles) return;
  for (const s of sparkles) {
    const twinkle = 0.5 + 0.5 * Math.sin(elapsed * 2.4 + s.phase);
    s.material.opacity = s.base * (1 - s.strength) + s.base * s.strength * twinkle;
  }
}

