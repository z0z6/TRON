export class AchievementSystem {
  constructor() {
    this.achievements = {
      'first_blood': {
        name: 'First Blood',
        description: 'Win your first game',
        icon: '🏆',
        unlocked: false,
        condition: (stats) => stats.gamesWon >= 1
      },
      'survivor': {
        name: 'Survivor',
        description: 'Survive for 60 seconds',
        icon: '⏱️',
        unlocked: false,
        condition: (stats) => stats.longestSurvival >= 60
      },
      'close_call': {
        name: 'Close Call',
        description: 'Make 10 close calls in one game',
        icon: '😅',
        unlocked: false,
        condition: (stats) => stats.closeCallsInGame >= 10
      },
      'combo_master': {
        name: 'Combo Master',
        description: 'Reach 5x combo',
        icon: '🔥',
        unlocked: false,
        condition: (stats) => stats.maxCombo >= 5
      },
      'perfect_game': {
        name: 'Perfect Game',
        description: 'Win without taking damage',
        icon: '✨',
        unlocked: false,
        condition: (stats) => stats.perfectGames >= 1
      },
      'speed_demon': {
        name: 'Speed Demon',
        description: 'Win with speed boost active',
        icon: '⚡',
        unlocked: false,
        condition: (stats) => stats.winsWithSpeedBoost >= 1
      },
      'collector': {
        name: 'Collector',
        description: 'Collect 20 power-ups total',
        icon: '🎁',
        unlocked: false,
        condition: (stats) => stats.totalPowerUps >= 20
      },
      'veteran': {
        name: 'Veteran',
        description: 'Play 50 games',
        icon: '🎖️',
        unlocked: false,
        condition: (stats) => stats.gamesPlayed >= 50
      },
      'marathon': {
        name: 'Marathon',
        description: 'Survive for 3 minutes',
        icon: '🏃',
        unlocked: false,
        condition: (stats) => stats.longestSurvival >= 180
      },
      'untouchable': {
        name: 'Untouchable',
        description: 'Win 10 games in a row',
        icon: '👑',
        unlocked: false,
        condition: (stats) => stats.winStreak >= 10
      }
    };
    
    this.stats = this.loadStats();
    this.newlyUnlocked = [];
    this.onAchievementUnlock = null;
    
    this.loadAchievements();
  }

  // Aktualizuj statystyki
  updateStats(newStats) {
    Object.assign(this.stats, newStats);
    this.checkAchievements();
    this.saveStats();
  }

  // Increment stat
  incrementStat(statName, amount = 1) {
    if (this.stats[statName] !== undefined) {
      this.stats[statName] += amount;
      this.checkAchievements();
      this.saveStats();
    }
  }

  // Sprawdź osiągnięcia
  checkAchievements() {
    this.newlyUnlocked = [];
    
    for (const [id, achievement] of Object.entries(this.achievements)) {
      if (!achievement.unlocked && achievement.condition(this.stats)) {
        achievement.unlocked = true;
        this.newlyUnlocked.push({ id, ...achievement });
        
        if (this.onAchievementUnlock) {
          this.onAchievementUnlock({ id, ...achievement });
        }
      }
    }
    
    if (this.newlyUnlocked.length > 0) {
      this.saveAchievements();
    }
    
    return this.newlyUnlocked;
  }

  // Pobierz wszystkie osiągnięcia
  getAchievements() {
    return Object.entries(this.achievements).map(([id, a]) => ({
      id,
      ...a
    }));
  }

  // Pobierz statystyki
  getStats() {
    return { ...this.stats };
  }

  // Pobierz ostatnio odblokowane
  getNewlyUnlocked() {
    return [...this.newlyUnlocked];
  }

  // Wyczyść nowe odblokowane
  clearNewlyUnlocked() {
    this.newlyUnlocked = [];
  }

  // Zapisz osiągnięcia
  saveAchievements() {
    const unlocked = Object.entries(this.achievements)
      .filter(([_, a]) => a.unlocked)
      .map(([id, _]) => id);
    
    localStorage.setItem('tron-achievements', JSON.stringify(unlocked));
  }

  // Załaduj osiągnięcia
  loadAchievements() {
    try {
      const unlocked = JSON.parse(localStorage.getItem('tron-achievements') || '[]');
      unlocked.forEach(id => {
        if (this.achievements[id]) {
          this.achievements[id].unlocked = true;
        }
      });
    } catch (e) {
      console.warn('Failed to load achievements:', e);
    }
  }

  // Zapisz statystyki
  saveStats() {
    localStorage.setItem('tron-stats', JSON.stringify(this.stats));
  }

  // Załaduj statystyki
  loadStats() {
    try {
      const saved = JSON.parse(localStorage.getItem('tron-stats'));
      return saved || this.getDefaultStats();
    } catch (e) {
      return this.getDefaultStats();
    }
  }

  // Domyślne statystyki
  getDefaultStats() {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      totalTimePlayed: 0,
      longestSurvival: 0,
      totalDistance: 0,
      totalPowerUps: 0,
      closeCallsInGame: 0,
      maxCombo: 0,
      perfectGames: 0,
      winsWithSpeedBoost: 0,
      winStreak: 0,
      currentStreak: 0
    };
  }

  // Reset (dla testów)
  reset() {
    this.stats = this.getDefaultStats();
    Object.values(this.achievements).forEach(a => a.unlocked = false);
    localStorage.removeItem('tron-achievements');
    localStorage.removeItem('tron-stats');
  }
}
