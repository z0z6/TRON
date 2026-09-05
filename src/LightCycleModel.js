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

  return group;
}
