import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { CameraController } from '../CameraController.js';

function makeCamera(fov = 75) {
  return new THREE.PerspectiveCamera(fov, 16 / 9, 0.1, 1000);
}

describe('CameraController FOV kick', () => {
  it('remembers the initial camera FOV as the baseline', () => {
    const controller = new CameraController(makeCamera(75));
    expect(controller.baseFov).toBe(75);
  });

  it('does not change FOV when speedRatio is 1 (no boost)', () => {
    const camera = makeCamera(75);
    const controller = new CameraController(camera);
    controller.updateFov(1, 1 / 60);
    expect(camera.fov).toBeCloseTo(75);
  });

  it('widens FOV smoothly toward the target when boosted', () => {
    const camera = makeCamera(75);
    const controller = new CameraController(camera);

    // speedRatio 1.8 matches PowerUpSystem's single-speed-powerup multiplier.
    controller.updateFov(1.8, 1 / 60);
    expect(camera.fov).toBeGreaterThan(75);
    expect(camera.fov).toBeLessThan(75 + controller.maxFovKickDeg); // hasn't snapped instantly

    // Many frames later, it should have converged close to the target.
    // At speedRatio 1.8 the kick is (1.8-1)*maxFovKickDeg = 0.8*12 = 9.6deg
    // (the clamp to the full maxFovKickDeg only kicks in at speedRatio >= 2).
    for (let i = 0; i < 300; i++) controller.updateFov(1.8, 1 / 60);
    const expectedKick = (1.8 - 1) * controller.maxFovKickDeg;
    expect(camera.fov).toBeCloseTo(75 + expectedKick, 1);
  });

  it('clamps the kick at maxFovKickDeg even for very high speed ratios', () => {
    const camera = makeCamera(75);
    const controller = new CameraController(camera);
    for (let i = 0; i < 300; i++) controller.updateFov(10, 1 / 60); // absurdly high ratio
    expect(camera.fov).toBeCloseTo(75 + controller.maxFovKickDeg, 1);
  });

  it('eases back down toward baseFov once the boost ends', () => {
    const camera = makeCamera(75);
    const controller = new CameraController(camera);
    for (let i = 0; i < 300; i++) controller.updateFov(1.8, 1 / 60);
    const boosted = camera.fov;
    expect(boosted).toBeGreaterThan(75);

    for (let i = 0; i < 300; i++) controller.updateFov(1, 1 / 60);
    expect(camera.fov).toBeCloseTo(75, 1);
  });

  it('resetFov() snaps back instantly, unlike updateFov()', () => {
    const camera = makeCamera(75);
    const controller = new CameraController(camera);
    for (let i = 0; i < 300; i++) controller.updateFov(1.8, 1 / 60);
    expect(camera.fov).toBeGreaterThan(75);

    controller.resetFov();
    expect(camera.fov).toBe(75);
  });

  it('updateProjectionMatrix keeps the projection matrix in sync with fov', () => {
    const camera = makeCamera(75);
    const controller = new CameraController(camera);
    const matrixBefore = camera.projectionMatrix.clone();
    controller.updateFov(1.8, 1 / 60);
    expect(camera.projectionMatrix.equals(matrixBefore)).toBe(false);
  });
});
