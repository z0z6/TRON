import * as THREE from 'three';

// Pomocnicze funkcje i stałe WSPÓLNE dla więcej niż jednego motywu tła -
// wydzielone z pierwotnego (1515-liniowego) BackgroundThemes.js na osobne
// pliki per motyw (classic.js/synthwave.js/matrix.js/amber.js/glacier.js),
// żeby łatwiej było dalej rozwijać/dodawać motywy. Ten plik NIE eksportuje
// żadnego motywu samodzielnie - patrz index.js po publiczny rejestr
// THEME_BACKGROUNDS, dokładnie taki sam jak przed podziałem.

export function makeRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function disposeAwareAdd(group, obj) {
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
export const LIGHT_HEIGHT = 8;      // stały punkt odniesienia - tuż nad poziomem areny (y=0)
export const FADE_RANGE = 180;      // jak daleko w dół trwa przejście
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
export function applyHorizonFade(material, fadeStartY = LIGHT_HEIGHT, fadeEndY = LIGHT_HEIGHT - FADE_RANGE, darkenFactor = DARKEN_FACTOR) {
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
export const FLOOR_Y = -0.55;

// Arena to Grid(90, 45) w main.js - dłuższa krawędź = 90. Bryły tła (classic/
// synthwave/matrix) stoją w odległości KILKUKROTNOŚCI tej wartości od
// areny, a przestrzeń między nimi zostaje CAŁKOWICIE pusta (żaden floor,
// żaden cień - patrz _buildHorizonFadeMask w Environment.js, który maskuje
// nieskończone lustro podłogi dokładnie na granicy areny). Rozmieszczenie
// eliptyczne (nie kołowe) - szersze wzdłuż X niż Z.
const ELLIPSE_X = 1.35;
const ELLIPSE_Z = 0.8;
export function ellipsePoint(angle, radius) {
  return { x: Math.cos(angle) * radius * ELLIPSE_X, z: Math.sin(angle) * radius * ELLIPSE_Z };
}

// === EFEKT "CYLINDRA" ===
// Rozszerza pion elementu W DÓŁ, POD poziom podłogi, zachowując jego
// pierwotny "widoczny" wierzchołek na tej samej wysokości co wcześniej.
// Dzięki temu posadzka wygląda jak cienki dysk zawieszony w środku dużo
// wyższego cylindra tła, a nie jak sufit stojący dokładnie na fundamencie
// każdego obiektu - reszta świata ciągnie się dalej w dół, poza zasięgiem
// wzroku. Zwraca {centerY, totalHeight} do użycia jako position.y/scale.y.
export function buryBelowFloor(rand, visibleHeight, minBuried, maxBuried) {
  const buried = minBuried + rand() * (maxBuried - minBuried);
  const topY = FLOOR_Y + visibleHeight;
  const totalHeight = visibleHeight + buried;
  const centerY = topY - totalHeight / 2;
  return { centerY, totalHeight };
}

// === SŁOŃCE I GWIAZDY (WSPÓLNE: synthwave + amber używają słońca;
// synthwave + matrix używają gwiazd/strumieni jako tła punktowego) ===
// Generuje teksturę słońca (canvas, radialny gradient) - daje realne
// wrażenie "kuli światła" zamiast płaskiego jednokolorowego kółka, i
// opcjonalnie wypala w niej poziome pasy (synthwave - "przysłonięte" słońce).
function buildSunTexture(rand, { core, mid, stripes, verticalGradient }) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const c = size / 2;

  if (verticalGradient) {
    // Tarcza wypełniona PIONOWYM (góra->dół) gradientem zamiast
    // promienistym (od środka) - użytkownik chciał barw mieszających się
    // w osi pionowej, nie koncentrycznie. Najpierw wypełnienie kołowego
    // obszaru gradientem liniowym...
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2);
    ctx.clip();
    const vGradient = ctx.createLinearGradient(0, 0, 0, size);
    vGradient.addColorStop(0, core);
    vGradient.addColorStop(1, mid);
    ctx.fillStyle = vGradient;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();

    // ...potem osobna, radialna maska alpha (destination-in: zachowuje to,
    // co już narysowane, ale przycina jego PRZEZROCZYSTOŚĆ), żeby krawędź
    // tarczy miękko gasła zamiast być twardo "wyciętą nożyczkami" - bez
    // tego pionowy gradient kończyłby się ostrym okręgiem.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    const alphaMask = ctx.createRadialGradient(c, c, 0, c, c, c);
    alphaMask.addColorStop(0, 'rgba(0,0,0,1)');
    alphaMask.addColorStop(0.78, 'rgba(0,0,0,1)');
    alphaMask.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = alphaMask;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();
  } else {
    const gradient = ctx.createRadialGradient(c, c, 0, c, c, c);
    gradient.addColorStop(0, core);
    gradient.addColorStop(0.55, mid);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2);
    ctx.fill();
  }

  if (stripes) {
    // Kolorowe pasy (żółty -> pomarańczowy -> fioletowy) skupione w DOLNEJ
    // części tarczy słońca - klasyczny "retro sunset" wygląd. Poprzednia
    // wersja rysowała losowe, CIEMNE (maskujące) paski rozrzucone po całej
    // tarczy; to nie dawało efektu kolorowych warstw, tylko dziury w
    // gradiencie. Teraz paski schodzą w dół od połowy tarczy, z lukami
    // między nimi (przez które prześwituje gradient tła), więc czytają się
    // jako odrębne, kolorowe warstwy, nie jedna plama.
    const stripeColors = ['#ff0040', '#ff3366', '#ff6600', '#ffcc00'];
    let y = size * 0.52;
    const bottomLimit = size * 0.98;
    let i = 0;
    while (y < bottomLimit) {
      const thickness = 3 + rand() * 9;
      const gap = 2 + rand() * 7;
      ctx.fillStyle = stripeColors[i % stripeColors.length];
      ctx.globalAlpha = 0.78 + rand() * 0.2;
      ctx.fillRect(0, y, size, thickness);
      y += thickness + gap;
      i++;
    }
    ctx.globalAlpha = 1;
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
export function buildSunWithReflection(rand, { core, mid, stripes, radius, skyY, opacity, verticalGradient }) {
  const group = new THREE.Group();
  const texture = buildSunTexture(rand, { core, mid, stripes, verticalGradient });

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
export function buildStarfield(rand, count, color, radiusMin, radiusMax, heightMin, heightMax, size = 1.1) {
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
    color, size, transparent: true, opacity: 0.7, fog: false, depthWrite: false
  });
  return new THREE.Points(geometry, material);
}

