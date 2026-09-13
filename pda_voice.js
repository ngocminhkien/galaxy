/**
 * COSMOS // OMNI-HORIZON — COMMAND AI VOICE ENGINE (AI CHỈ HUY)
 * Synthetic female robotic AI voice with high-tech chime notifications
 */

class CommandAIVoice {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.enabled = true;
    this.speaking = false;
    this.selectedVoice = null;
    this.subtitleElement = null;
    this.subtitleTimeout = null;

    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      this.selectedVoice = voices.find(v => 
        (v.lang.includes('en') || v.lang.includes('US') || v.lang.includes('GB')) && 
        (v.name.includes('Zira') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Female'))
      ) || voices[0];
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  setSubtitleElement(el) {
    this.subtitleElement = el;
  }

  playAiChime() {
    if (window.CosmosAudio && window.CosmosAudio.ctx && window.CosmosAudio.enabled) {
      const ctx = window.CosmosAudio.ctx;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(880.00, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  }

  speak(text, subtitleText = null) {
    if (!this.enabled) return;
    this.showSubtitle(subtitleText || text);
    this.playAiChime();

    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    utterance.pitch = 0.95;
    utterance.rate = 0.98;
    utterance.volume = 0.9;

    utterance.onstart = () => { this.speaking = true; };
    utterance.onend = () => { this.speaking = false; };
    utterance.onerror = () => { this.speaking = false; };

    this.synth.speak(utterance);
  }

  showSubtitle(text) {
    if (!this.subtitleElement) {
      this.subtitleElement = document.getElementById('pdaSubtitleBanner');
    }
    if (!this.subtitleElement) return;

    const subText = document.getElementById('pdaSubtitleText');
    if (subText) subText.textContent = text;

    this.subtitleElement.classList.add('active');
    clearTimeout(this.subtitleTimeout);
    this.subtitleTimeout = setTimeout(() => {
      this.subtitleElement.classList.remove('active');
    }, 6000);
  }

  onEnterShip() {
    this.speak(
      "Welcome aboard, Captain. Flight stabilizers active. Primary plasma cannons charged. Systems nominal.",
      "[AI CHỈ HUY] \"Welcome aboard, Captain. Flight stabilizers active. All systems nominal.\""
    );
  }

  onScanPlanet(planetName, key) {
    const scripts = {
      sun: {
        voice: "Scanning stellar core. Sol class G2V yellow dwarf. Core fusion stable. Extreme thermal radiation detected.",
        sub: "[AI CHỈ HUY] \"Scanning Sol. Class G2V yellow dwarf. Extreme thermal radiation detected.\""
      },
      earth: {
        voice: "New planetary entry added to databank. Terra. Nitrogen oxygen atmosphere confirmed. Sentient civilization active.",
        sub: "[AI CHỈ HUY] \"New planetary entry: Terra. Nitrogen-oxygen atmosphere confirmed. Sentient life detected.\""
      },
      mars: {
        voice: "Scanning Ares. Iron oxide crust confirmed. Olympus Mons caldera detected. Subsurface water ice suspected.",
        sub: "[AI CHỈ HUY] \"Scanning Mars. Iron oxide crust confirmed. Subsurface water ice suspected.\""
      },
      jupiter: {
        voice: "Massive gas giant: Jupiter. Great Red Spot storm active for centuries. Radiation belts critical.",
        sub: "[AI CHỈ HUY] \"Jupiter catalogued. Great Red Spot vortex active. Severe radiation belt.\""
      },
      saturn: {
        voice: "Spectacular ring system catalogued: Saturn. Composition: water ice and silicates. Low density planetoid.",
        sub: "[AI CHỈ HUY] \"Saturn catalogued. Giant ice-ring structure confirmed.\""
      },
      blackhole: {
        voice: "Warning. Gravitational singularity detected. Extreme space-time curvature. Approach with utmost caution.",
        sub: "[AI CHỈ HUY] \"Warning: Extreme gravitational singularity. Spacetime distortion detected.\""
      },
      supernova: {
        voice: "Warning. High energy supernova shockwave detected. Gamma ray burst propagating across space.",
        sub: "[AI CHỈ HUY] \"Warning: Supernova explosion detected. Shockwave propagating.\""
      },
      cancri_55: {
        voice: "Exotic exoplanet 55 Cancri e scanned. Carbon rich super-Earth. Diamond mantle and surface lava oceans confirmed.",
        sub: "[AI CHỈ HUY] \"55 Cancri e scanned. Diamond mantle and molten lava oceans confirmed.\""
      },
      hd_189733b: {
        voice: "Cataclysmic gas world HD 189733b detected. Silicate particle glass storms reaching hypersonic velocity.",
        sub: "[AI CHỈ HUY] \"HD 189733b scanned. Hypersonic glass storms and cobalt atmosphere.\""
      }
    };

    if (scripts[key]) {
      this.speak(scripts[key].voice, scripts[key].sub);
    } else {
      this.speak(
        `Scanning celestial body: ${planetName}. Telemetry and spectral data successfully synced to databank.`,
        `[AI CHỈ HUY] \"Scanning ${planetName}. Telemetry data synced to databank.\""
      );
    }
  }

  onPlanetDestroyed(planetName) {
    this.speak(
      `Catastrophic planetary failure confirmed. Crust of ${planetName} fractured. Debris field generated.`,
      `[AI CHỈ HUY] \"CẢNH BÁO: ${planetName} đã bị phá hủy thành vành đai thiên thạch mảnh vỡ!\"`
    );
  }

  onSunDestroyed() {
    this.speak(
      "Critical emergency alert. Solar core disrupted. Solar gravitational well collapsed. Planetary orbits destabilized. Deep freeze protocol initiated across all worlds.",
      "[AI CHỈ HUY] \"CẢNH BÁO CẤP TỐI CAO: Mặt Trời đã tắt! Trọng lực biến mất, các hành tinh văng khỏi quỹ đạo và rơi vào Kỷ Băng Hà Vĩnh Cửu!\""
    );
  }

  onShieldCritical() {
    this.speak(
      "Warning. Shield integrity critical. Evade incoming fire.",
      "[AI CHỈ HUY] \"Cảnh báo: Khiên năng lượng nguy cấp! Hãy né tránh hỏa lực!\""
    );
  }

  onTargetLocked(targetName) {
    this.speak(
      `Quantum lock established on ${targetName}. Torpedoes primed.`,
      `[AI CHỈ HUY] \"Khóa mục tiêu thành công: ${targetName}. Ngư lôi sẵn sàng!\"`
    );
  }
}

window.pdaVoice = new CommandAIVoice();
