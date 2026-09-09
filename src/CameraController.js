import * as THREE from 'three';

export class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.target = new THREE.Vector3();
    this.offset = new THREE.Vector3(0, 15, -20);
    this.lookAtOffset = new THREE.Vector3(0, 0, 5);
    
    this.smoothSpeed = 5.0;
    this.currentMode = 'follow'; // 'follow', 'topDown', 'firstPerson'

    // --- FOV kick (sensacja prędkości przy power-upie speed) ---
    // baseFov to punkt odniesienia, do którego wraca kamera, gdy prędkość
    // znowu jest normalna (speedRatio === 1) - zapamiętany raz, przy
    // starcie, żeby zadziałało niezależnie od tego, jaki FOV ktoś ustawił
    // w main.js. maxFovKickDeg to górna granica poszerzenia (przy
    // speedRatio 1.8 z PowerUpSystem.js efekt jest wyraźny, ale nie
    // karykaturalny). fovSmoothSpeed kontroluje jak szybko FOV "dogania"
    // cel - osobno od smoothSpeed pozycji kamery, żeby dało się je stroić
    // niezależnie.
    this.baseFov = camera.fov;
    this.maxFovKickDeg = 12;
    this.fovSmoothSpeed = 6.0;
    
    // Tryby kamery. Offsety podane w LOKALNEJ przestrzeni motocykla (Z ujemne = za pojazdem,
    // Z dodatnie = przed pojazdem) - w follow() są obracane o aktualny kąt jazdy (rotation.y),
    // dzięki czemu kamera poprawnie podąża za motocyklem również po skręcie.
    this.modes = {
      follow: {
        offset: new THREE.Vector3(0, 15, -20),
        lookAtOffset: new THREE.Vector3(0, 0, 5)
      },
      topDown: {
        offset: new THREE.Vector3(0, 40, 0.1),
        lookAtOffset: new THREE.Vector3(0, 0, 0)
      },
      firstPerson: {
        offset: new THREE.Vector3(0, 2, 0),
        lookAtOffset: new THREE.Vector3(0, 0, 10)
      }
    };
  }

  // Śledź obiekt (gracza)
  follow(targetObject, deltaTime) {
    if (!targetObject) return;

    const targetPosition = targetObject.position || targetObject;
    const targetRotationY = targetObject.rotation ? targetObject.rotation.y : 0;
    const yAxis = new THREE.Vector3(0, 1, 0);

    // Obróć offsety o aktualny kąt jazdy motocykla - bez tego kamera trzymałaby
    // stały offset w przestrzeni świata i "zostawałaby" po niewłaściwej stronie
    // za każdym razem, gdy motocykl skręci.
    const rotatedOffset = this.offset.clone().applyAxisAngle(yAxis, targetRotationY);
    const rotatedLookAtOffset = this.lookAtOffset.clone().applyAxisAngle(yAxis, targetRotationY);

    // Oblicz pożądaną pozycję kamery
    const desiredPosition = new THREE.Vector3();
    desiredPosition.copy(targetPosition).add(rotatedOffset);
    
    // Smooth interpolation
    this.camera.position.lerp(desiredPosition, this.smoothSpeed * deltaTime);
    
    // Kamera patrzy na gracza z przesunięciem w kierunku ruchu
    const lookAtPosition = new THREE.Vector3();
    lookAtPosition.copy(targetPosition).add(rotatedLookAtOffset);
    
    this.camera.lookAt(lookAtPosition);
  }

  // Przełącz tryb kamery
  setMode(mode) {
    if (this.modes[mode]) {
      this.currentMode = mode;
      this.offset.copy(this.modes[mode].offset);
      this.lookAtOffset.copy(this.modes[mode].lookAtOffset);
      
      // Dla first-person, zmniejsz smooth speed dla szybszej reakcji
      if (mode === 'firstPerson') {
        this.smoothSpeed = 10.0;
      } else {
        this.smoothSpeed = 5.0;
      }
    }
  }

  // Przełącz na następny tryb
  nextMode() {
    const modes = Object.keys(this.modes);
    const currentIndex = modes.indexOf(this.currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.setMode(modes[nextIndex]);
  }

  // "FOV kick" - poszerza pole widzenia proporcjonalnie do tego, o ile
  // gracz jedzie szybciej niż normalnie (speedRatio = aktualna prędkość /
  // bazowa prędkość, patrz wywołanie w Game.js update()). speedRatio 1.0
  // (brak boosta) sprowadza FOV z powrotem do baseFov. Płynne dochodzenie
  // do celu (zamiast skoku) tym samym wzorcem co follow() dla pozycji
  // kamery - inny współczynnik wygładzania (fovSmoothSpeed), bo FOV chcemy
  // zmieniać wyraźnie szybciej niż pozycję, żeby czuć boost "od razu".
  updateFov(speedRatio, deltaTime) {
    const kick = THREE.MathUtils.clamp((speedRatio - 1) * this.maxFovKickDeg, 0, this.maxFovKickDeg);
    const targetFov = this.baseFov + kick;
    const t = Math.min(1, this.fovSmoothSpeed * deltaTime);
    this.camera.fov += (targetFov - this.camera.fov) * t;
    this.camera.updateProjectionMatrix();
  }

  // Reset natychmiastowy (bez wygładzania) - wywoływane na starcie nowej
  // rundy. Bez tego, jeśli poprzednia runda skończyła się śmiercią W
  // TRAKCIE boosta prędkości, FOV zostawałby "zamrożony" szeroki między
  // rundami (update() w Game.js, a więc i updateFov(), nie jest wołane,
  // gdy gameOver === true - patrz warunek na początku Game.update()).
  resetFov() {
    this.camera.fov = this.baseFov;
    this.camera.updateProjectionMatrix();
  }

  // Camera shake (wywoływane z zewnątrz)
  shake(intensity = 0.5, duration = 0.3) {
    const originalPosition = this.camera.position.clone();
    let time = 0;
    
    const shakeAnimation = () => {
      time += 0.016;
      if (time < duration) {
        const shakeIntensity = intensity * (1 - time / duration);
        this.camera.position.x = originalPosition.x + (Math.random() - 0.5) * shakeIntensity;
        this.camera.position.y = originalPosition.y + (Math.random() - 0.5) * shakeIntensity;
        this.camera.position.z = originalPosition.z + (Math.random() - 0.5) * shakeIntensity;
        requestAnimationFrame(shakeAnimation);
      } else {
        this.camera.position.copy(originalPosition);
      }
    };
    
    shakeAnimation();
  }

  // Aktualizuj offset (dla customizacji)
  setOffset(x, y, z) {
    this.offset.set(x, y, z);
  }

  // Ustaw prędkość wygładzania
  setSmoothSpeed(speed) {
    this.smoothSpeed = speed;
  }
}
