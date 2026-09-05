import * as THREE from 'three';

// Buduje bardziej szczegółowy, stylizowany model motocykla świetlnego wraz
// z kierowcą, złożony z prostych brył - rama/aura energetyczna, owiewka,
// dwa koła ze świecącą obręczą i uproszczona sylwetka kierowcy z wizjerem.
// UWAGA: to NIE jest fotorealistyczny model (brak tekstur PBR, brak
// rzeźbionej geometrii) - taki wymagałby gotowego pliku GLTF/GLB, którego
// nie da się tu wygenerować proceduralnie. To, co poniżej, to najbardziej
// szczegółowa wersja, jaką da się złożyć z prostych brył Three.js.
//
// Zwraca THREE.Group z doczepioną właściwością `.material` (getter
// wskazujący na materiał głównej aury energetycznej - `body`), żeby cały
// istniejący kod efektów (Game.js - tarcza/duch, Customization.js - zmiana
// koloru) działał BEZ ŻADNYCH zmian, mimo że motocykl to teraz kilkanaście
// brył, nie jedna.
export function createLightCycleMesh(color) {
  const group = new THREE.Group();

  // --- Rdzeń/aura energetyczna - JEDYNY element, którym steruje reszta gry
  // (emissiveIntensity przy tarczy/duchu, opacity, zmiana koloru) ---
  const bodyGeometry = new THREE.BoxGeometry(0.7, 0.32, 1.6);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.1,
    transparent: true
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.32;
  group.add(body);

  // --- Owiewka/kokpit - węższy, pochylony klin nad rdzeniem ---
  const cowlGeometry = new THREE.ConeGeometry(0.32, 0.85, 4);
  const cowlMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    emissive: color,
    emissiveIntensity: 0.3
  });
  const cowl = new THREE.Mesh(cowlGeometry, cowlMaterial);
  cowl.rotation.z = Math.PI / 2;
  cowl.rotation.y = Math.PI / 4;
  cowl.scale.set(1, 1.5, 1);
  cowl.position.set(0, 0.42, 0.55);
  group.add(cowl);

  // --- Koła - ciemne dyski z cienką, świecącą obręczą (osobny torus, żeby
  // obręcz mogła świecić niezależnie od gumy) ---
  const wheelGeometry = new THREE.CylinderGeometry(0.34, 0.34, 0.16, 16);
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
  const rimGeometry = new THREE.TorusGeometry(0.34, 0.02, 8, 20);
  const rimMaterial = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.4
  });

  function addWheel(zOffset) {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(0, 0.34, zOffset);
    group.add(wheel);

    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.position.set(0, 0.34, zOffset);
    group.add(rim);
  }
  addWheel(0.68);
  addWheel(-0.62);

  // --- Kierowca - uproszczona sylwetka w pozycji wyścigowej (pochylony do
  // przodu, głowa nad kokpitem), z cienkim, świecącym wizjerem kasku ---
  const riderMaterial = new THREE.MeshStandardMaterial({ color: 0x080808 });

  const torsoGeometry = new THREE.CapsuleGeometry(0.15, 0.42, 4, 8);
  const torso = new THREE.Mesh(torsoGeometry, riderMaterial);
  torso.rotation.x = Math.PI / 2.5; // pochylenie do przodu, typowe dla pozycji wyścigowej
  torso.position.set(0, 0.66, -0.1);
  group.add(torso);

  const headGeometry = new THREE.SphereGeometry(0.14, 12, 12);
  const head = new THREE.Mesh(headGeometry, riderMaterial);
  head.position.set(0, 0.83, -0.42);
  group.add(head);

  const visorGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.05);
  const visorMaterial = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 2.0
  });
  const visor = new THREE.Mesh(visorGeometry, visorMaterial);
  visor.position.set(0, 0.83, -0.49);
  group.add(visor);

  // Kompatybilność wsteczna: Game.js/AI.js/Customization.js odwołują się do
  // `mesh.material.emissiveIntensity`, `.opacity`, `.emissive.set()` itd.,
  // zakładając JEDEN materiał (tak jak wcześniej przy zwykłym Box Mesh) -
  // ten getter przekierowuje te odwołania na materiał aury (`body`), więc
  // tarcza/duch/zmiana koloru nadal działają bez dotykania tamtych plików.
  Object.defineProperty(group, 'material', {
    get() { return bodyMaterial; }
  });

  return group;
}
