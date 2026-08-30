export class ScoringSystem {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.comboTimeout = 3000; // ms na utrzymanie combo
    this.multiplier = 1;
    
    this.stats = {
      closeCalls: 0,
      powerUpsCollected: 0,
      timeSurvived: 0,
      distanceTraveled: 0,
      perfectTurns: 0
    };
    
    this.floatingTexts = [];
    this.onScoreChange = null;
    this.onComboChange = null;
  }

  // Dodaj punkty za close call
  addCloseCall(distance, currentTime) {
    if (distance < 1.5) {
      this.combo++;
      this.comboTimer = currentTime;
      this.stats.closeCalls++;
      
      // Oblicz mnożnik
      this.multiplier = Math.min(5, 1 + Math.floor(this.combo / 3));
      
      // Punkty bazowe + bonus za bliskość
      const basePoints = 100;
      const proximityBonus = Math.floor((1.5 - distance) * 200);
      const points = (basePoints + proximityBonus) * this.multiplier;
      
      this.addScore(points);
      
      // Floating text
      this.addFloatingText(
        `CLOSE CALL! +${points}`,
        this.combo > 1 ? `x${this.multiplier} COMBO` : null
      );
      
      if (this.combo > this.maxCombo) {
        this.maxCombo = this.combo;
      }
      
      if (this.onComboChange) {
        this.onComboChange(this.combo, this.multiplier);
      }
      
      return points;
    }
    return 0;
  }

  // Dodaj punkty
  addScore(points) {
    this.score += points;
    if (this.onScoreChange) {
      this.onScoreChange(this.score);
    }
  }

  // Power-up zebrany
  addPowerUpCollected(type) {
    this.stats.powerUpsCollected++;
    const points = {
      shield: 50,
      speed: 75,
      ghost: 100,
      bomb: 150
    }[type] || 50;
    
    this.addScore(points);
    this.addFloatingText(`POWER UP! +${points}`);
  }

  // Aktualizuj czas przetrwania
  updateSurvivalTime(deltaTime) {
    this.stats.timeSurvived += deltaTime;
    
    // Bonus za czas co 10 sekund
    if (Math.floor(this.stats.timeSurvived) % 10 === 0 && 
        Math.floor(this.stats.timeSurvived - deltaTime) % 10 !== 0) {
      this.addScore(50);
    }
  }

  // Aktualizuj dystans
  updateDistance(distance) {
    this.stats.distanceTraveled += distance;
  }

  // Perfect turn (skręt w ostatniej chwili)
  addPerfectTurn() {
    this.stats.perfectTurns++;
    this.addScore(25);
    this.addFloatingText('PERFECT TURN! +25');
  }

  // Dodaj floating text
  addFloatingText(text, subtext = null) {
    this.floatingTexts.push({
      text,
      subtext,
      startTime: performance.now(),
      duration: 2000,
      y: 0
    });
  }

  // Aktualizuj combo timer
  updateCombo(currentTime) {
    if (this.combo > 0 && currentTime - this.comboTimer > this.comboTimeout) {
      this.combo = 0;
      this.multiplier = 1;
      if (this.onComboChange) {
        this.onComboChange(this.combo, this.multiplier);
      }
    }
    
    // Aktualizuj floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      const age = currentTime - ft.startTime;
      
      if (age > ft.duration) {
        this.floatingTexts.splice(i, 1);
      } else {
        ft.y = age / ft.duration * 50;
        ft.opacity = 1 - (age / ft.duration);
      }
    }
  }

  // Pobierz statystyki
  getStats() {
    return {
      score: this.score,
      combo: this.combo,
      maxCombo: this.maxCombo,
      multiplier: this.multiplier,
      stats: { ...this.stats },
      floatingTexts: [...this.floatingTexts]
    };
  }

  // Reset
  reset() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.multiplier = 1;
    this.floatingTexts = [];
    
    this.stats = {
      closeCalls: 0,
      powerUpsCollected: 0,
      timeSurvived: 0,
      distanceTraveled: 0,
      perfectTurns: 0
    };
    
    if (this.onScoreChange) this.onScoreChange(0);
    if (this.onComboChange) this.onComboChange(0, 1);
  }

  // Oblicz końcowy wynik
  calculateFinalScore() {
    let finalScore = this.score;
    
    // Bonusy
    finalScore += this.maxCombo * 100;
    finalScore += Math.floor(this.stats.timeSurvived) * 10;
    finalScore += this.stats.perfectTurns * 50;
    
    return finalScore;
  }
}
