export class Customization {
  constructor() {
    this.presets = {
      'classic': {
        name: 'Classic Blue',
        body: 0x00ffff,
        trail: 0x00ffff,
        glow: 0x00ffff,
        unlocked: true
      },
      'fire': {
        name: 'Fire',
        body: 0xff4500,
        trail: 0xff6347,
        glow: 0xff0000,
        unlocked: true
      },
      'matrix': {
        name: 'Matrix',
        body: 0x00ff00,
        trail: 0x00ff00,
        glow: 0x008000,
        unlocked: true
      },
      'purple': {
        name: 'Purple Haze',
        body: 0x9d00ff,
        trail: 0xbf00ff,
        glow: 0x6600cc,
        unlocked: true
      },
      'gold': {
        name: 'Gold',
        body: 0xffd700,
        trail: 0xffed4e,
        glow: 0xffa500,
        unlocked: false,
        requirement: 'Win 10 games'
      },
      'rainbow': {
        name: 'Rainbow',
        body: 0xffffff,
        trail: 0xffffff,
        glow: 0xffffff,
        rainbow: true,
        unlocked: false,
        requirement: 'Get 5x combo'
      },
      'ghost': {
        name: 'Ghost',
        body: 0x8888ff,
        trail: 0xaaaaff,
        glow: 0x4444ff,
        transparent: true,
        unlocked: false,
        requirement: 'Collect 20 power-ups'
      }
    };
    
    this.currentPreset = 'classic';
    this.customColors = null;
    
    this.loadFromStorage();
  }

  // Zastosuj preset do gracza
  applyToPlayer(player, presetName = null) {
    const preset = this.presets[presetName || this.currentPreset];
    if (!preset) return;
    
    if (player.mesh && player.mesh.material) {
      player.mesh.material.color.setHex(preset.body);
      player.mesh.material.emissive.setHex(preset.glow);
      
      if (preset.transparent) {
        player.mesh.material.transparent = true;
        player.mesh.material.opacity = 0.7;
      }
    }
    
    // Zapisz aktualny preset
    this.currentPreset = presetName || this.currentPreset;
    this.saveToStorage();
  }

  // Animacja rainbow (wywoływana w game loop)
  updateRainbow(player, currentTime) {
    const preset = this.presets[this.currentPreset];
    if (!preset.rainbow) return;
    
    const hue = (currentTime * 0.001) % 1;
    const color = this.hslToHex(hue, 1, 0.5);
    
    if (player.mesh && player.mesh.material) {
      player.mesh.material.color.setHex(color);
      player.mesh.material.emissive.setHex(color);
    }
  }

  // Konwertuj HSL na HEX
  hslToHex(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    
    if (h < 1/6) { r = c; g = x; b = 0; }
    else if (h < 2/6) { r = x; g = c; b = 0; }
    else if (h < 3/6) { r = 0; g = c; b = x; }
    else if (h < 4/6) { r = 0; g = x; b = c; }
    else if (h < 5/6) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return (r << 16) + (g << 8) + b;
  }

  // Odblokuj preset
  unlock(presetName) {
    if (this.presets[presetName]) {
      this.presets[presetName].unlocked = true;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Sprawdź czy preset jest odblokowany
  isUnlocked(presetName) {
    return this.presets[presetName]?.unlocked || false;
  }

  // Pobierz wszystkie presety
  getPresets() {
    return Object.entries(this.presets).map(([key, preset]) => ({
      id: key,
      ...preset
    }));
  }

  // Ustaw custom kolor
  setCustomColor(type, colorHex) {
    if (!this.customColors) {
      this.customColors = { ...this.presets.classic };
    }
    this.customColors[type] = colorHex;
    this.saveToStorage();
  }

  // Zapisz do localStorage
  saveToStorage() {
    const data = {
      currentPreset: this.currentPreset,
      customColors: this.customColors,
      unlockedPresets: Object.entries(this.presets)
        .filter(([_, p]) => p.unlocked)
        .map(([key, _]) => key)
    };
    localStorage.setItem('tron-customization', JSON.stringify(data));
  }

  // Załaduj z localStorage
  loadFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('tron-customization'));
      if (data) {
        this.currentPreset = data.currentPreset || 'classic';
        this.customColors = data.customColors;
        
        // Resetuj wszystkie presety
        Object.keys(this.presets).forEach(key => {
          this.presets[key].unlocked = false;
        });
        
        // Odblokuj zapisane
        if (data.unlockedPresets) {
          data.unlockedPresets.forEach(key => {
            if (this.presets[key]) {
              this.presets[key].unlocked = true;
            }
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load customization:', e);
    }
  }
}
