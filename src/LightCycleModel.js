import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// === MODEL MOTOCYKLA ŚWIETLNEGO (GLTF) ===
// "Blue Light Cycle" by AnthonyJR (https://sketchfab.com/AnthonyJR),
// licencja CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/):
// https://sketchfab.com/3d-models/blue-light-cycle-3ca1b404b9af4c3eb5e46be7dbf3f91c
// Wymóg licencji: podać autora i link przy dystrybucji - patrz CREDITS.md.
//
// Plik leży w src/public/models/lightcycle/ (scene.gltf + scene.bin) - Vite
// kopiuje zawartość public/ 1:1 do wyjścia builda (patrz src/vite.config.js),
// więc ścieżka runtime to po prostu BASE_URL + 'models/lightcycle/scene.gltf'.
//
// Model NIE MA tekstur (tylko płaskie kolory PBR) ani animacji/kości, więc
// zwykłe Object3D.clone(true) wystarcza za każdym razem, gdy potrzebny jest
// nowy motocykl - JEDYNY haczyk to materiały: Mesh.clone() kopiuje
// `.material` przez REFERENCJĘ, nie głęboko, więc bez ręcznego klonowania
// wszystkie motocykle (gracz/AI/przeciwnik sieciowy) współdzieliłyby jeden
// materiał "Light" i zmiana koloru jednego zmieniałaby wszystkie na raz.

const MODEL_URL = `${import.meta.env.BASE_URL}models/lightcycle/scene.gltf`;

// Rozmiar modelu POLICZONY z pełnej, złożonej hierarchii węzłów (THREE.Box3
// na wczytanej scenie) - w plikach Sketchfaba transformacje siedzą częściowo
// w węzłach pośrednich (widoczna macierz ze skalą x0.01 na jednym z nich),
// więc surowe min/max z samych accessorów geometrii by skłamały. Realny
// bbox: X (długość) ~0.266, Y (wysokość) ~0.0707, Z (szerokość) ~0.068.
// Gra oczekuje motocykla o długości ok. 2 jednostek (dawny
// BoxGeometry(1, 0.5, 2)) i przodu wzdłuż LOKALNEJ osi +Z (patrz
// Game.js/AI.js: rotation.y = atan2(dx, dz)) - model ma dłuższą oś wzdłuż
// X, stąd obrót 90°.
const MODEL_SCALE = 7.508; // 2 / 0.266 (docelowa długość / rzeczywista długość modelu)
const MODEL_ROTATION_Y = Math.PI / 2;
// Środek geometrii NIE pokrywa się z punktem (0,0,0) modelu (pivot offset z
// eksportu) - po przeskalowaniu i obrocie to +0.335 wzdłuż lokalnego Z i
// -0.044 wzdłuż Y (patrz wyliczenia w komentarzu przy createLightCycleMesh).
// Te dwie stałe centrują sylwetkę na osi Z i stawiają koła dokładnie na
// y=0 (poziom siatki), zamiast motocykl "pływał" w losowym miejscu.
const MODEL_OFFSET_Y = 0.044;
const MODEL_OFFSET_Z = 0.335;

// --- Blob shadow ---
// Tani zamiennik prawdziwych cieni (shadowMap): bez niego motocykle
// "unosiły się" nad areną bez żadnego kontaktu wizualnego z podłożem.
// Zamiast kosztownego (i przy 60fps arcade'owej grze niepotrzebnego)
// PCFSoftShadowMap, to zwykły płaski dysk z miękką, radialną teksturą
// (jasny/nieprzezroczysty środek gasnący do pełnej przezroczystości na
// brzegu) narysowany tuż nad płaszczyzną y=0. Tekstura jest tworzona RAZ i
// współdzielona między wszystkimi motocyklami (ten sam wzorzec co
// getParticleSpriteTexture() w Effects.js) - bezpieczne, bo dispose()
// materiału NIE dispose'uje przypisanych mu tekstur.
let sharedShadowBlobTexture = null;
function getShadowBlobTexture() {
  if (sharedShadowBlobTexture) return sharedShadowBlobTexture;

  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
  gradient.addColorStop(0.7, 'rgba(0,0,0,0.22)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  sharedShadowBlobTexture = new THREE.CanvasTexture(canvas);
  return sharedShadowBlobTexture;
}

const SHADOW_BLOB_RADIUS = 1.6; // dopasowany do długości motocykla (~2 jednostki, patrz MODEL_SCALE wyżej)
const SHADOW_BLOB_Y = 0.02; // ledwie nad y=0 - unika z-fightingu z podłożem areny, niezauważalne wizualnie

// Geometria współdzielona (tak samo jak geometrie modelu GLTF - patrz
// komentarz w AI.js/RemotePlayer.js dispose()) - identyczna dla każdego
// motocykla (stały promień/segmenty), więc nie ma powodu alokować nowej
// za każdym razem. NIGDY nie jest disposowana per-instancja z tego samego
// powodu, co geometrie GLTF: zniszczyłoby to cień u WSZYSTKICH innych,
// wciąż żywych motocykli. Materiał (w createShadowBlobMesh() poniżej)
// zostaje NADAL tworzony świeżo za każdym razem - to on jest bezpiecznie
// disposowany per-instancja przez istniejącą pętlę traverse() w
// AI.js/RemotePlayer.js.
let sharedShadowBlobGeometry = null;
function getShadowBlobGeometry() {
  if (!sharedShadowBlobGeometry) {
    sharedShadowBlobGeometry = new THREE.CircleGeometry(SHADOW_BLOB_RADIUS, 24);
  }
  return sharedShadowBlobGeometry;
}

function createShadowBlobMesh() {
  const material = new THREE.MeshBasicMaterial({
    map: getShadowBlobTexture(),
    transparent: true,
    depthWrite: false,
    toneMapped: false // to zwykła, płaska czerń z alpha - nie chcemy, żeby filmowy tone mapping (main.js) cokolwiek jej robił, tak jak neonom
  });
  const mesh = new THREE.Mesh(getShadowBlobGeometry(), material);
  mesh.rotation.x = -Math.PI / 2; // CircleGeometry domyślnie leży w płaszczyźnie XY - obrót kładzie ją płasko na podłożu (XZ)
  mesh.position.y = SHADOW_BLOB_Y;
  mesh.renderOrder = -1; // rysuj PRZED resztą (motocykl/ślady), żeby cień nigdy niczego wizualnie nie "przebijał"
  return mesh;
}

let templatePromise = null;
let template = null;

// Ładuje model RAZ (współdzielony Promise, kolejne wywołania dostają ten
// sam wynik bez powtórnego fetcha) - main.js wywołuje to i CZEKA (await)
// zanim stworzy gracza/AI, żeby createLightCycleMesh() mogło zostać zwykłą,
// synchroniczną funkcją wszędzie indziej (Game.js/AI.js/RemotePlayer.js nie
// muszą wiedzieć, że cokolwiek jest ładowane asynchronicznie).
export function preloadLightCycleTemplate() {
  if (templatePromise) return templatePromise;

  const loader = new GLTFLoader();
  templatePromise = new Promise((resolve, reject) => {
    loader.load(
      MODEL_URL,
      (gltf) => {
        template = gltf.scene;
        resolve(template);
      },
      undefined,
      (error) => {
        console.error('Nie udało się wczytać modelu motocykla (scene.gltf):', error);
        reject(error);
      }
    );
  });
  return templatePromise;
}

function createFallbackMesh(color) {
  // Awaryjny, bardzo prosty motocykl na wypadek, gdyby createLightCycleMesh()
  // zostało wywołane ZANIM preloadLightCycleTemplate() zdążyło się
  // zakończyć (nie powinno się zdarzyć przy normalnym starcie gry - main.js
  // czeka na model przed stworzeniem gracza/AI - ale lepiej pokazać
  // cokolwiek niż wywalić całą grę wyjątkiem).
  const geometry = new THREE.BoxGeometry(1, 0.5, 2);
  const material = new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: 1.1, transparent: true
  });
  return new THREE.Mesh(geometry, material);
}

export function createLightCycleMesh(color) {
  if (!template) {
    console.warn('createLightCycleMesh() wywołane przed wczytaniem modelu GLTF - używam awaryjnego zastępnika.');
    return createFallbackMesh(color);
  }

  // Zewnętrzna grupa zostaje z TOŻSAMOŚCIOWĄ transformacją - to na niej
  // Game.js/AI.js/RemotePlayer.js wołają .position.copy(...) i
  // .rotation.y = ... (nadpisując CAŁKOWICIE, nie relatywnie), więc skala/
  // obrót/centrowanie modelu muszą siedzieć na WEWNĘTRZNYM dziecku, inaczej
  // pierwsza aktualizacja pozycji by je starła.
  const group = new THREE.Group();
  const inner = template.clone(true);
  inner.scale.setScalar(MODEL_SCALE);
  inner.rotation.y = MODEL_ROTATION_Y;
  inner.position.set(0, MODEL_OFFSET_Y, MODEL_OFFSET_Z);
  group.add(inner);

  // Wszystkie siatki w świeżym klonie WCIĄŻ wskazują (przez referencję) na
  // te same obiekty materiałów co szablon - Mesh.clone() kopiuje
  // `.material` płytko. Klonujemy KAŻDY napotkany materiał (nie tylko
  // "Light"), po jednym unikalnym klonie na oryginał w ramach TEGO
  // motocykla - inaczej dwa problemy: (1) zmiana koloru jednego gracza
  // zmieniałaby wszystkie, (2) dispose() jednego motocykla (AI.js/
  // RemotePlayer.js, np. przy przełączaniu AI -> przeciwnik sieciowy)
  // niszczyłby materiał używany też przez INNE, wciąż żywe motocykle.
  const materialClones = new Map(); // oryginalny materiał (z szablonu) -> klon dla TEGO motocykla
  let auraMaterial = null;

  group.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const original = obj.material;
    let clone = materialClones.get(original);
    if (!clone) {
      clone = original.clone();
      materialClones.set(original, clone);
      if (clone.name === 'Light') {
        clone.transparent = true;
        clone.color.set(color);
        clone.emissive.set(color);
        clone.emissiveIntensity = 1.1;
        auraMaterial = clone;
      }
    }
    obj.material = clone;
  });

  // Kompatybilność wsteczna: Game.js/AI.js/Customization.js odwołują się do
  // `mesh.material.emissiveIntensity`, `.opacity`, `.emissive.set()` itd.,
  // zakładając JEDEN materiał (tak jak przy dawnym prostym Box Mesh) - ten
  // getter przekierowuje te odwołania na wspólny materiał "Light" (aurę),
  // więc tarcza/duch/zmiana koloru nadal działają bez dotykania tamtych
  // plików. Reszta motocykla (czarna rama, metalowe elementy) zostaje
  // zawsze taka sama, niezależnie od koloru gracza - świadomy wybór, żeby
  // sylwetka pojazdu była spójna, a kolorem "grał" tylko świecący pas.
  Object.defineProperty(group, 'material', {
    get() { return auraMaterial; }
  });

  // Blob shadow - dodany PO pętli traverse() wyżej (celowo), żeby jej
  // logika klonowania materiałów "Light" go nie dotknęła - to zwykły,
  // odrębny materiał, nie część modelu GLTF. Dziecko GRUPY, nie `inner`:
  // `inner` niesie skalę/obrót/offset SAMEGO MODELU (patrz komentarz przy
  // MODEL_OFFSET_* wyżej), a cień ma zostać zwykłym, poziomym kołem
  // wyśrodkowanym pod całym pojazdem niezależnie od tych wewnętrznych
  // korekt.
  group.add(createShadowBlobMesh());

  return group;
}
