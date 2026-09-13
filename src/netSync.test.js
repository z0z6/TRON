import { describe, it, expect } from 'vitest';
import { reconcilePosition, SNAP_DISTANCE, DEFAULT_CORRECTION_FACTOR } from '../netSync.js';

describe('reconcilePosition', () => {
  it('returns the same position unchanged when there is no drift', () => {
    const result = reconcilePosition({ x: 5, z: -3 }, { x: 5, z: -3 });
    expect(result).toEqual({ x: 5, z: -3, snapped: false });
  });

  it('nudges the position toward the authoritative one by the correction factor', () => {
    const result = reconcilePosition({ x: 0, z: 0 }, { x: 4, z: 0 }, 0.25);
    expect(result.x).toBeCloseTo(1);
    expect(result.z).toBeCloseTo(0);
    expect(result.snapped).toBe(false);
  });

  it('works along both axes at once', () => {
    const result = reconcilePosition({ x: 0, z: 0 }, { x: 3, z: 4 }, 0.5);
    expect(result.x).toBeCloseTo(1.5);
    expect(result.z).toBeCloseTo(2);
    expect(result.snapped).toBe(false);
  });

  it('uses the default correction factor when none is given', () => {
    const result = reconcilePosition({ x: 0, z: 0 }, { x: 4, z: 0 });
    expect(result.x).toBeCloseTo(4 * DEFAULT_CORRECTION_FACTOR);
  });

  it('hard-snaps when drift exceeds SNAP_DISTANCE', () => {
    const result = reconcilePosition({ x: 0, z: 0 }, { x: SNAP_DISTANCE + 1, z: 0 }, 0.1);
    expect(result).toEqual({ x: SNAP_DISTANCE + 1, z: 0, snapped: true });
  });

  it('does not snap when drift is exactly at the threshold', () => {
    const result = reconcilePosition({ x: 0, z: 0 }, { x: SNAP_DISTANCE, z: 0 }, 0.5);
    expect(result.snapped).toBe(false);
    expect(result.x).toBeCloseTo(SNAP_DISTANCE * 0.5);
  });

  it('never overshoots the authoritative position for a single correction step', () => {
    const result = reconcilePosition({ x: 10, z: 10 }, { x: 8, z: 12 }, 0.25);
    expect(result.x).toBeLessThan(10);
    expect(result.x).toBeGreaterThan(8);
    expect(result.z).toBeGreaterThan(10);
    expect(result.z).toBeLessThan(12);
  });
});
