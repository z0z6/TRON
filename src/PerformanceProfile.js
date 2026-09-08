// === WYKRYWANIE WYDAJNOŚCI SPRZĘTU + ADAPTACYJNA JAKOŚĆ ===
//
// Dwa niezależne mechanizmy, celowo rozdzielone:
//
// 1) STATYCZNY TIER (detectPerformanceTier + getQualitySettings) - decyzja
//    podjęta RAZ, na starcie, PRZED zbudowaniem sceny. Kontroluje rzeczy,
//    których nie da się bezpiecznie zmienić w locie (antialias renderera -
//    wymaga jego ponownego utworzenia) oraz gęstość tła (liczba budynków/
//    diod/krawędzi w BackgroundThemes.js - przebudowa tego w trakcie gry
//    byłaby zauważalnym "szarpnięciem").
//
// 2) DYNAMICZNY WATCHDOG (createAdaptiveQualityController) - działa CAŁY
//    CZAS w tle, mierzy rzeczywisty FPS w trakcie gry i - jeśli mimo
//    "wysokiego" tieru sprzęt jednak nie wyrabia (np. inny program zajął
//    procesor, albo heurystyka się pomyliła) - obniża jakość NAPRAWDĘ w
//    locie: piksel ratio i bloom da się bezpiecznie zmienić w dowolnym
//    momencie bez przebudowy sceny. Działa TYLKO w jedną stronę (bez
//    powrotu do wysokiej jakości) - to świadomy wybór: podnoszenie jakości
//    z powrotem ryzykowałoby ciągłe przełączanie tam i z powrotem
//    (oscylację) przy FPS balansującym w okolicy progu.

// --- 1) STATYCZNY TIER --------------------------------------------------

function detectPerformanceTierUncached() {
  // Wymuszenie z URL (?quality=low / ?quality=high) - do testowania na
  // dowolnym sprzęcie bez zgadywania, czy heurystyka trafnie go rozpozna.
  const forced = new URLSearchParams(window.location.search).get('quality');
  if (forced === 'low' || forced === 'high') return forced;

  let weakSignals = 0;
  let strongSignals = 0; // sygnały na tyle jednoznaczne, że same w sobie przesądzają o 'low'

  const ua = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  // Liczba rdzeni logicznych - stare laptopy/desktopy (Windows 7-erа) i
  // budżetowe telefony z Androidem często mają 2-4.
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 2) strongSignals++;
  else if (cores <= 4) weakSignals++;

  // navigator.deviceMemory (GB RAM, w przybliżeniu) - dostępne w
  // Chrome/Edge/Android, brak w Firefox/Safari (wtedy po prostu pomijamy
  // ten sygnał zamiast zgadywać).
  if (typeof navigator.deviceMemory === 'number') {
    if (navigator.deviceMemory <= 2) strongSignals++;
    else if (navigator.deviceMemory <= 4) weakSignals++;
  }

  // Telefon/tablet BEZ dużej liczby rdzeni - budżetowy Android jest
  // dokładnie tym profilem, o który pytasz.
  if (isMobile && cores <= 6) weakSignals++;

  // Nazwa GPU przez WEBGL_debug_renderer_info - coraz częściej zamaskowana
  // przez przeglądarki (zwraca ogólny string typu "ANGLE (Google, Vulkan)")
  // ze względów prywatności, więc traktujemy to jako BONUSOWY sygnał, nie
  // wymagany - jeśli się uda coś odczytać, dobrze, jeśli nie, po prostu nie
  // liczy się do wyniku.
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const dbgInfo = gl && gl.getExtension('WEBGL_debug_renderer_info');
    if (gl && dbgInfo) {
      const renderer = String(gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) || '').toLowerCase();
      const weakGpuMarkers = [
        'intel(r) hd graphics', 'intel(r) hd', 'swiftshader', 'llvmpipe',
        'mali-4', 'mali-t', 'adreno 3', 'adreno 4', 'powervr sgx', 'gma '
      ];
      if (weakGpuMarkers.some((m) => renderer.includes(m))) strongSignals++;
    }
  } catch (e) {
    // Brak WebGL albo zablokowane rozszerzenie - po prostu pomijamy ten
    // sygnał, reszta heurystyki i tak działa.
  }

  if (strongSignals >= 1) return 'low';
  return weakSignals >= 2 ? 'low' : 'high';
}

let cachedTier = null;
// Wynik nie zmienia się w trakcie sesji (sprzęt nie zmienia się w locie) -
// liczymy raz i zapamiętujemy, żeby nie odpalać WebGL-owego sondowania przy
// każdym wywołaniu (np. przy każdej zmianie motywu w UI).
export function detectPerformanceTier() {
  if (cachedTier === null) cachedTier = detectPerformanceTierUncached();
  return cachedTier;
}

// Konkretne ustawienia dla danego tieru - main.js czyta to RAZ, na starcie,
// przed utworzeniem renderera (antialias trzeba znać już przy konstrukcji).
export function getQualitySettings(tier) {
  if (tier === 'low') {
    return {
      tier,
      pixelRatioCap: 1,
      antialias: false,
      bloom: false,
      // Mnożnik liczby budynków/diod/krawędzi/strumieni w
      // BackgroundThemes.js (patrz density w buildClassicBackground /
      // buildMatrixBackground) - NIE dotyczy samej rozgrywki (siatka,
      // motocykle, ślady), tylko dekoracyjnego tła.
      sceneDensity: 0.45
    };
  }
  return {
    tier,
    pixelRatioCap: Math.min(window.devicePixelRatio || 1, 2), // strop 2x nawet na "wysokim" tierze - 3x na telefonach nie daje już zauważalnej różnicy, tylko kosztuje
    antialias: true,
    bloom: true,
    sceneDensity: 1
  };
}

// --- 2) DYNAMICZNY WATCHDOG ----------------------------------------------

// Mierzy rzeczywisty FPS w oknach kroczących (WINDOW_FRAMES klatek) i, jeśli
// średnia w oknie spadnie poniżej progu przez kilka okien pod rząd, obniża
// jakość renderowania NAPRAWDĘ w locie (bez przebudowy sceny - tylko
// pixelRatio i bloom, oba bezpieczne do zmiany w dowolnym momencie).
// Świadomie NIE dotyka gęstości tła (sceneDensity) - przebudowa
// BackgroundThemes w trakcie gry byłaby zauważalnym "szarpnięciem" na
// ekranie, więc to zostaje decyzją WYŁĄCZNIE statyczną (patrz wyżej).
export function createAdaptiveQualityController({ renderer, composer, bloomPass }) {
  const WINDOW_FRAMES = 90; // ~1.5s przy 60fps, ~3s przy 30fps - wystarczająco długo, żeby nie reagować na pojedynczy zacinający się klatkę (np. wczytywanie tekstury), ale wystarczająco krótko, żeby nie czekać wiecznie
  const FPS_THRESHOLD = 40;
  const BAD_WINDOWS_TO_DOWNGRADE = 3; // ~4.5-9s sumarycznie sub-40fps, zanim faktycznie coś zmienimy - zapobiega nadgorliwej reakcji na chwilowy spadek (np. wczytywanie/GC)

  let frameCount = 0;
  let frameTimeSum = 0;
  let badWindowStreak = 0;
  let downgraded = false;

  function downgrade() {
    if (downgraded) return;
    downgraded = true;

    const newRatio = Math.max(1, renderer.getPixelRatio() * 0.6);
    renderer.setPixelRatio(newRatio);
    composer.setPixelRatio(newRatio);

    if (bloomPass) bloomPass.enabled = false;

    // eslint-disable-next-line no-console
    console.info('[TRON] Wykryto niski FPS - obniżam jakość renderowania (pixelRatio, bloom).');
  }

  return {
    // Wołane raz na klatkę z animate() w main.js, z tym samym deltaTime,
    // którego gra i tak już używa - żadnego dodatkowego pomiaru czasu.
    sample(deltaTime) {
      if (downgraded || deltaTime <= 0) return;

      frameCount++;
      frameTimeSum += deltaTime;

      if (frameCount >= WINDOW_FRAMES) {
        const avgFps = frameCount / frameTimeSum;
        if (avgFps < FPS_THRESHOLD) {
          badWindowStreak++;
          if (badWindowStreak >= BAD_WINDOWS_TO_DOWNGRADE) downgrade();
        } else {
          badWindowStreak = 0;
        }
        frameCount = 0;
        frameTimeSum = 0;
      }
    },
    get isDowngraded() { return downgraded; }
  };
}
