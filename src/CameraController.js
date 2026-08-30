import * as THREE from 'three';

export class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.target = new THREE.Vector3();
    this.offset = new THREE.Vector3(0, 15, -20);
    this.lookAtOffset = new THREE.Vector3(0, 0, 5);
    
    this.smoothSpeed = 5.0;
    this.currentMode = 'follow'; // 'follow', 'topDown', 'firstPerson'
    
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
