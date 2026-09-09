import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Trail } from '../Trail.js';

// A minimal fake scene - Trail only calls scene.add()/scene.remove(mesh),
// it never needs a real renderer, so this is enough for these tests.
function makeScene() {
  const added = [];
  return {
    added,
    add: (obj) => added.push(obj),
    remove: (obj) => {
      const i = added.indexOf(obj);
      if (i !== -1) added.splice(i, 1);
    },
  };
}

function readQuad(trail, quadIndex) {
  const offset = quadIndex * 18;
  const arr = trail._positions;
  return {
    a: { x: arr[offset + 0], y: arr[offset + 1], z: arr[offset + 2] },
    b: { x: arr[offset + 3], y: arr[offset + 4], z: arr[offset + 5] },
    bTop: { x: arr[offset + 6], y: arr[offset + 7], z: arr[offset + 8] },
  };
}

describe('Trail (buffered)', () => {
  it('starts with an empty draw range', () => {
    const trail = new Trail(makeScene(), 0x00ffff);
    expect(trail.geometry.drawRange.count).toBe(0);
  });

  it('extends the live quad in place without adding new points on straight movement', () => {
    const trail = new Trail(makeScene(), 0x00ffff);
    const start = new THREE.Vector3(0, 0, 0);
    const dir = new THREE.Vector3(1, 0, 0);
    trail.start(start, dir);

    trail.update(new THREE.Vector3(1, 0, 0), dir);
    expect(trail.points.length).toBe(2);
    expect(trail.geometry.drawRange.count).toBe(6); // 1 quad = 6 vertices

    trail.update(new THREE.Vector3(5, 0, 0), dir);
    // Still one segment - only its endpoint moved.
    expect(trail.points.length).toBe(2);
    expect(trail.geometry.drawRange.count).toBe(6);

    const quad = readQuad(trail, 0);
    expect(quad.b.x).toBeCloseTo(5);
  });

  it('locks in a corner and starts a new quad on a turn, without touching the old one', () => {
    const trail = new Trail(makeScene(), 0x00ffff);
    const start = new THREE.Vector3(0, 0, 0);
    const right = new THREE.Vector3(1, 0, 0);
    const up = new THREE.Vector3(0, 0, 1);

    trail.start(start, right);
    trail.update(new THREE.Vector3(3, 0, 0), right);
    const firstQuadBefore = readQuad(trail, 0);

    // Turn: direction changes from (1,0) to (0,1).
    trail.update(new THREE.Vector3(3, 0, 1), up);

    expect(trail.points.length).toBe(3);
    expect(trail.geometry.drawRange.count).toBe(12); // 2 quads

    const firstQuadAfter = readQuad(trail, 0);
    expect(firstQuadAfter).toEqual(firstQuadBefore); // untouched by the turn

    const secondQuad = readQuad(trail, 1);
    expect(secondQuad.a.x).toBeCloseTo(3);
    expect(secondQuad.a.z).toBeCloseTo(0);
    expect(secondQuad.b.x).toBeCloseTo(3);
    expect(secondQuad.b.z).toBeCloseTo(1);
  });

  it('grows the buffer past its initial capacity without losing earlier quads', () => {
    const trail = new Trail(makeScene(), 0x00ffff);
    const start = new THREE.Vector3(0, 0, 0);
    let dir = new THREE.Vector3(1, 0, 0);
    trail.start(start, dir);

    // Force far more turns than INITIAL_QUAD_CAPACITY (512) to trigger growth.
    const turns = 600;
    let x = 0, z = 0;
    for (let i = 0; i < turns; i++) {
      dir = i % 2 === 0 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
      if (dir.x === 1) x += 1; else z += 1;
      trail.update(new THREE.Vector3(x, 0, z), dir);
    }

    // start() already seeds 2 points; every iteration here alternates
    // direction, so each update() call locks in one more corner.
    expect(trail.points.length).toBe(turns + 2);
    expect(trail._quadCapacity).toBeGreaterThan(512);
    expect(trail.geometry.drawRange.count).toBe(trail._quadCount * 6);

    // Spot-check an early quad survived the buffer reallocation.
    const earlyQuad = readQuad(trail, 0);
    expect(earlyQuad.a.x).toBeCloseTo(0);
    expect(earlyQuad.a.z).toBeCloseTo(0);
  });

  it('resets cleanly on start() after a previous round', () => {
    const trail = new Trail(makeScene(), 0x00ffff);
    const dir = new THREE.Vector3(1, 0, 0);
    trail.start(new THREE.Vector3(0, 0, 0), dir);
    trail.update(new THREE.Vector3(5, 0, 0), dir);
    expect(trail.geometry.drawRange.count).toBe(6);

    trail.start(new THREE.Vector3(-10, 0, -10), dir);
    expect(trail.geometry.drawRange.count).toBe(0);
    expect(trail.points.length).toBe(2);
  });
});
