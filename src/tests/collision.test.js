import { describe, it, expect } from 'vitest';
import { pointToSegmentDistance, sweepCells, cellsHitDanger, minDistanceToDanger } from '../collision.js';

describe('pointToSegmentDistance', () => {
  it('returns 0 for a point on the segment', () => {
    expect(pointToSegmentDistance({ x: 5, z: 0 }, { x: 0, z: 0 }, { x: 10, z: 0 })).toBeCloseTo(0);
  });

  it('returns perpendicular distance for a point beside the segment', () => {
    expect(pointToSegmentDistance({ x: 5, z: 3 }, { x: 0, z: 0 }, { x: 10, z: 0 })).toBeCloseTo(3);
  });

  it('clamps to the nearest endpoint when the point is beyond the segment', () => {
    expect(pointToSegmentDistance({ x: -4, z: 0 }, { x: 0, z: 0 }, { x: 10, z: 0 })).toBeCloseTo(4);
    expect(pointToSegmentDistance({ x: 14, z: 0 }, { x: 0, z: 0 }, { x: 10, z: 0 })).toBeCloseTo(4);
  });

  it('handles a zero-length segment as a point', () => {
    expect(pointToSegmentDistance({ x: 3, z: 4 }, { x: 0, z: 0 }, { x: 0, z: 0 })).toBeCloseTo(5);
  });
});

describe('sweepCells', () => {
  it('returns an empty list when movement stays in the same cell', () => {
    expect(sweepCells({ x: 0.1, z: 0.1 }, { x: 0.9, z: 0.9 })).toEqual([]);
  });

  it('returns the crossed cells for a single-axis move (typical 60fps frame)', () => {
    expect(sweepCells({ x: 0.9, z: 0 }, { x: 1.9, z: 0 })).toEqual([{ x: 1, z: 0 }]);
  });

  it('returns every intermediate cell for a multi-cell jump (slow frame / stacked speed power-up)', () => {
    // This is exactly the scenario the original bug-fix comment in Game.js describes:
    // a long frame (or 3.24x speed from two stacked power-ups) can cross several
    // cells at once - every one of them must be checked, not just the destination.
    expect(sweepCells({ x: 0, z: 0 }, { x: 3.5, z: 0 })).toEqual([
      { x: 1, z: 0 },
      { x: 2, z: 0 },
      { x: 3, z: 0 },
    ]);
  });

  it('works for negative-direction moves on both axes', () => {
    expect(sweepCells({ x: 0, z: 3 }, { x: 0, z: -1 })).toEqual([
      { x: 0, z: 2 },
      { x: 0, z: 1 },
      { x: 0, z: 0 },
      { x: 0, z: -1 },
    ]);
  });
});

describe('cellsHitDanger', () => {
  const emptyTrail = new Set();

  it('flags out-of-bounds when a swept cell exceeds the grid size', () => {
    const result = cellsHitDanger({ x: 46, z: 0 }, [{ x: 46, z: 0 }], emptyTrail, emptyTrail, null, 45);
    expect(result).toEqual({ outOfBounds: true, hitTrail: false });
  });

  it('flags a trail hit when a swept cell is in the opponent trail', () => {
    const opponentTrail = new Set(['2,0']);
    const result = cellsHitDanger({ x: 2, z: 0 }, [{ x: 2, z: 0 }], emptyTrail, opponentTrail, null, 45);
    expect(result).toEqual({ outOfBounds: false, hitTrail: true });
  });

  it('ignores own-trail cells laid down in the same frame (ownNewCellKeys)', () => {
    const ownTrail = new Set(['1,0']);
    const ownNewCellKeys = new Set(['1,0']);
    const result = cellsHitDanger({ x: 1, z: 0 }, [{ x: 1, z: 0 }], ownTrail, emptyTrail, ownNewCellKeys, 45);
    expect(result).toEqual({ outOfBounds: false, hitTrail: false });
  });

  it('still kills on stale own-trail cells not part of this frame', () => {
    const ownTrail = new Set(['1,0']);
    const ownNewCellKeys = new Set(['5,5']); // some other cell from this frame
    const result = cellsHitDanger({ x: 1, z: 0 }, [{ x: 1, z: 0 }], ownTrail, emptyTrail, ownNewCellKeys, 45);
    expect(result).toEqual({ outOfBounds: false, hitTrail: true });
  });

  it('falls back to checking the current position when sweptCells is empty', () => {
    const opponentTrail = new Set(['7,7']);
    const result = cellsHitDanger({ x: 7.5, z: 7.2 }, [], emptyTrail, opponentTrail, null, 45);
    expect(result).toEqual({ outOfBounds: false, hitTrail: true });
  });

  it('checks every swept cell, not just the last one', () => {
    const opponentTrail = new Set(['1,0']); // a trail cell in the *middle* of the sweep
    const swept = [{ x: 1, z: 0 }, { x: 2, z: 0 }, { x: 3, z: 0 }];
    const result = cellsHitDanger({ x: 3, z: 0 }, swept, emptyTrail, opponentTrail, null, 45);
    expect(result).toEqual({ outOfBounds: false, hitTrail: true });
  });
});

describe('minDistanceToDanger', () => {
  it('returns distance to the arena boundary when there is no opponent trail', () => {
    expect(minDistanceToDanger({ x: 0, z: 0 }, null, 45)).toBeCloseTo(45);
    expect(minDistanceToDanger({ x: 40, z: 0 }, null, 45)).toBeCloseTo(5);
  });

  it('returns the smaller of boundary distance and opponent-trail distance', () => {
    const opponentPoints = [{ x: 2, z: 0 }, { x: 2, z: 10 }];
    // Boundary distance here is 45 (center of arena), trail distance is 2 -> trail wins.
    expect(minDistanceToDanger({ x: 0, z: 0 }, opponentPoints, 45)).toBeCloseTo(2);
  });

  it('returns boundary distance when it is closer than the opponent trail', () => {
    const opponentPoints = [{ x: -40, z: -40 }, { x: -40, z: -30 }];
    expect(minDistanceToDanger({ x: 43, z: 0 }, opponentPoints, 45)).toBeCloseTo(2);
  });
});
