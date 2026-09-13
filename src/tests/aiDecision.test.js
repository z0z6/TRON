import { describe, it, expect } from 'vitest';
import {
  getGridKey,
  isCellFree,
  getTurnDirection,
  countReachableSpace,
  decideDirection
} from '../aiDecision.js';

describe('getGridKey', () => {
  it('floors coordinates into a grid cell key', () => {
    expect(getGridKey(3.7, -2.1)).toBe('3,-3');
  });
});

describe('isCellFree', () => {
  it('is free when within bounds and not in either trail', () => {
    expect(isCellFree(0, 0, new Set(), new Set())).toBe(true);
  });

  it('is not free outside the arena bounds', () => {
    expect(isCellFree(46, 0, new Set(), new Set())).toBe(false);
    expect(isCellFree(0, -46, new Set(), new Set())).toBe(false);
    expect(isCellFree(45, 0, new Set(), new Set())).toBe(true);
  });

  it('is not free when occupied by the player trail', () => {
    expect(isCellFree(5, 5, new Set(['5,5']), new Set())).toBe(false);
  });

  it('is not free when occupied by the AI\'s own trail', () => {
    expect(isCellFree(5, 5, new Set(), new Set(['5,5']))).toBe(false);
  });

  it('tolerates missing trail sets', () => {
    expect(isCellFree(5, 5, null, null)).toBe(true);
  });
});

describe('getTurnDirection', () => {
  // Ta funkcja MUSI być identyczna z Game.js#turnPlayer i RemotePlayer.js
  // #_turn (patrz komentarz nad getTurnDirection w aiDecision.js) - to
  // trzecia, niezależna kopia tej samej logiki skrętu. Wcześniej gałęzie
  // dla osi Z były tu przypadkiem zamienione między left/right (naprawiony
  // bug, patrz rozmowa/CHANGES.md) - poniższe testy sprawdzają teraz
  // POPRAWNĄ, spójną rotację o 90°, zgodną z resztą gry.
  it('turns left from every cardinal direction', () => {
    expect(getTurnDirection({ x: 1, z: 0 }, 'left')).toEqual({ x: 0, z: -1 });
    expect(getTurnDirection({ x: -1, z: 0 }, 'left')).toEqual({ x: 0, z: 1 });
    expect(getTurnDirection({ x: 0, z: 1 }, 'left')).toEqual({ x: 1, z: 0 });
    expect(getTurnDirection({ x: 0, z: -1 }, 'left')).toEqual({ x: -1, z: 0 });
  });

  it('turns right from every cardinal direction', () => {
    expect(getTurnDirection({ x: 1, z: 0 }, 'right')).toEqual({ x: 0, z: 1 });
    expect(getTurnDirection({ x: -1, z: 0 }, 'right')).toEqual({ x: 0, z: -1 });
    expect(getTurnDirection({ x: 0, z: 1 }, 'right')).toEqual({ x: -1, z: 0 });
    expect(getTurnDirection({ x: 0, z: -1 }, 'right')).toEqual({ x: 1, z: 0 });
  });

  it('composes left then right back into the original direction (proper rotation, inverse operations)', () => {
    const start = { x: 1, z: 0 };
    const left = getTurnDirection(start, 'left');
    const backToStart = getTurnDirection(left, 'right');
    expect(backToStart).toEqual(start);
  });

  it('turning left four times in a row cycles through all 4 cardinal directions and returns to start', () => {
    let dir = { x: 1, z: 0 };
    const seen = [dir];
    for (let i = 0; i < 3; i++) {
      dir = getTurnDirection(dir, 'left');
      seen.push(dir);
    }
    const final = getTurnDirection(dir, 'left');
    expect(final).toEqual({ x: 1, z: 0 }); // wraca do startu dopiero po 4 skrętach
    // Po drodze odwiedza WSZYSTKIE 4 kierunki, nie tylko 2 (to właśnie było
    // złamane w starym, buggy getTurnDirection - utykało w cyklu długości 2).
    const uniqueKeys = new Set(seen.map((d) => `${d.x},${d.z}`));
    expect(uniqueKeys.size).toBe(4);
  });
});

describe('countReachableSpace', () => {
  it('counts the full open arena when nothing blocks it', () => {
    const count = countReachableSpace(0, 0, new Set(), new Set(), 400);
    expect(count).toBe(400); // hits the limit - open arena is much bigger than 400 cells
  });

  it('is capped by a small limit', () => {
    const count = countReachableSpace(0, 0, new Set(), new Set(), 10);
    expect(count).toBe(10);
  });

  it('counts a small enclosed pocket exactly, below the limit', () => {
    // Buduje zamkniętą "kieszeń" 1x3 wokół (0,0): otwarte (-1,0),(0,0),(1,0),
    // reszta otoczona śladem.
    const walls = new Set();
    for (let x = -2; x <= 2; x++) {
      walls.add(`${x},1`);
      walls.add(`${x},-1`);
    }
    walls.add('-2,0');
    walls.add('2,0');

    const count = countReachableSpace(0, 0, walls, new Set(), 400);
    expect(count).toBe(3); // (-1,0), (0,0), (1,0)
  });

  it('counts a fully walled-off single cell as 1', () => {
    const walls = new Set(['1,0', '-1,0', '0,1', '0,-1']);
    const count = countReachableSpace(0, 0, walls, new Set(), 400);
    expect(count).toBe(1);
  });
});

describe('decideDirection', () => {
  const openSettings = { lookahead: 400, decisionIntervalMs: 180, mistakeChance: 0, chaseWeight: 0 };

  // W pełni otwartej planszy 'straight' ma przewagę remisołamacza (+2), więc
  // samo zamknięcie 'left' w kieszeni NIE wystarczy, żeby 'right' wygrało -
  // trzeba też wykluczyć 'straight' z kandydatów w ogóle (blokując jego
  // lądowanie), żeby test jednoznacznie sprawdzał wybór na podstawie
  // przestrzeni, a nie remisołamacza.
  function blockStraightAndPocketLeft(position, direction) {
    const straightLanding = { x: position.x + direction.x * 2, z: position.z + direction.z * 2 };
    const leftDir = getTurnDirection(direction, 'left');
    const leftLanding = { x: position.x + leftDir.x * 2, z: position.z + leftDir.z * 2 };

    return new Set([
      getGridKey(straightLanding.x, straightLanding.z),
      getGridKey(leftLanding.x + 1, leftLanding.z),
      getGridKey(leftLanding.x - 1, leftLanding.z),
      getGridKey(leftLanding.x, leftLanding.z + 1),
      getGridKey(leftLanding.x, leftLanding.z - 1)
    ]);
  }

  it('prefers the direction with more open space when boxed in on one side', () => {
    const position = { x: 0, z: 0 };
    const direction = { x: 1, z: 0 };
    const playerTrail = blockStraightAndPocketLeft(position, direction);

    const result = decideDirection({
      position,
      direction,
      playerPosition: { x: 1000, z: 1000 }, // daleko, chaseWeight i tak =0
      playerTrail,
      aiTrail: new Set(),
      settings: openSettings,
      needsUrgentDecision: false
    });

    expect(result).toBe('right');
  });

  it('returns null when every candidate direction is blocked', () => {
    const aiTrail = new Set();
    // Zablokuj wprost, lewo i prawo względem kierunku +x (patrz nearAheadDist=2).
    aiTrail.add('2,0'); // wprost
    aiTrail.add('0,2'); // lewo (skręt w lewo z +x to +z)
    aiTrail.add('0,-2'); // prawo (skręt w prawo z +x to -z)

    const result = decideDirection({
      position: { x: 0, z: 0 },
      direction: { x: 1, z: 0 },
      playerPosition: { x: 0, z: 0 },
      playerTrail: new Set(),
      aiTrail,
      settings: openSettings,
      needsUrgentDecision: true
    });

    expect(result).toBeNull();
  });

  it('picks null (straight) as a tie-breaker bonus in a fully open field', () => {
    const result = decideDirection({
      position: { x: 0, z: 0 },
      direction: { x: 1, z: 0 },
      playerPosition: { x: 100, z: 100 },
      playerTrail: new Set(),
      aiTrail: new Set(),
      settings: openSettings,
      needsUrgentDecision: false
    });

    expect(result).toBeNull(); // "null" = jazda na wprost, nie brak wyniku - patrz asercja niżej dla kontrastu
  });

  it('chaseWeight pulls the choice toward the direction that closes distance to the player', () => {
    const chaseSettings = { lookahead: 400, decisionIntervalMs: 90, mistakeChance: 0, chaseWeight: 5 };
    const position = { x: 0, z: 0 };
    const direction = { x: 1, z: 0 };
    const rightDir = getTurnDirection(direction, 'right');
    // Postaw gracza daleko w kierunku, w który prowadzi candidate 'right' -
    // niezależnie od tego, jaki to fizycznie kierunek, TO powinno wygrać
    // dzięki chaseWeight, mimo że w pełni otwartej planszy bez chaseWeight
    // wygrałaby jazda na wprost (bonus za prostą, patrz test wyżej).
    const playerPosition = { x: rightDir.x * 50, z: rightDir.z * 50 };

    const result = decideDirection({
      position,
      direction,
      playerPosition,
      playerTrail: new Set(),
      aiTrail: new Set(),
      settings: chaseSettings,
      needsUrgentDecision: false
    });

    expect(result).toBe('right');
  });

  it('mistakeChance can override the best choice when triggered', () => {
    const mistakeSettings = { lookahead: 400, decisionIntervalMs: 320, mistakeChance: 1, chaseWeight: 0 };
    // Ta sama sytuacja co w teście przestrzeni wyżej (prawo wyraźnie lepsze)
    // - ale random() zawsze < mistakeChance=1, więc mechanizm pomyłki ZAWSZE
    // się uruchamia. Wstrzyknięty random zwraca 0 - Math.floor(0 *
    // scored.length) zawsze wybiera pierwszy posortowany wpis, czyli wciąż
    // najlepszy - to pokazuje, że tor "pomyłki" faktycznie się wykonuje
    // (inny kod path niż zwykłe scored[0].turn), nie że wynik akurat się
    // nie zmienił.
    const position = { x: 0, z: 0 };
    const direction = { x: 1, z: 0 };
    const playerTrail = blockStraightAndPocketLeft(position, direction);

    let randomCalls = 0;
    const random = () => { randomCalls++; return 0; };

    const result = decideDirection({
      position,
      direction,
      playerPosition: { x: 1000, z: 1000 },
      playerTrail,
      aiTrail: new Set(),
      settings: mistakeSettings,
      needsUrgentDecision: false,
      random
    });

    expect(randomCalls).toBeGreaterThan(0); // dowód, że tor mistakeChance faktycznie się wykonał
    expect(result).toBe('right');
  });

  it('mistakeChance is ignored when the decision is urgent', () => {
    const mistakeSettings = { lookahead: 400, decisionIntervalMs: 320, mistakeChance: 1, chaseWeight: 0 };
    const position = { x: 0, z: 0 };
    const direction = { x: 1, z: 0 };
    const playerTrail = blockStraightAndPocketLeft(position, direction);

    let randomCalls = 0;
    const random = () => { randomCalls++; return 0; };

    decideDirection({
      position,
      direction,
      playerPosition: { x: 1000, z: 1000 },
      playerTrail,
      aiTrail: new Set(),
      settings: mistakeSettings,
      needsUrgentDecision: true, // <- nagła sytuacja, margines błędu wyłączony
      random
    });

    expect(randomCalls).toBe(0);
  });
});
