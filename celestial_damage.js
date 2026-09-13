/**
 * COSMOS // OMNI-HORIZON — CELESTIAL DAMAGE & PLANETARY DESTRUCTION SYSTEM 2.0
 * Physical Cracking, Shatter Debris Belts, Solar Collapse & Rogue Planets Physics
 */

class CelestialDamageManager {
  constructor(scene) {
    this.scene = scene;
    this.planetsState = new Map();
    this.debrisParticles = [];
    this.logContainer = null;
    this.sunDestroyed = false;
  }

  setLogContainer(container) {
    this.logContainer = container;
  }

  registerPlanet(planetItem) {
    this.planetsState.set(planetItem.mesh, {
      name: planetItem.data.name,
      dbKey: planetItem.data.id,
      item: planetItem,
      mesh: planetItem.mesh,
      maxHp: planetItem.data.id === 'sun' ? 250 : 100,
      hp: planetItem.data.id === 'sun' ? 250 : 100,
      destroyed: false,
      cracked: false,
      originalMaterial: planetItem.mesh.material
    });
  }

  damageBody(mesh, amount, eventType = 'supernova', epicenter = null) {
    const state = this.planetsState.get(mesh);
    if (!state || state.destroyed) return;

    state.hp = Math.max(0, state.hp - amount);
    const hpPercent = (state.hp / state.maxHp) * 100;

    // Nứt vỏ hành tinh & dung nham
    if (state.hp < (state.maxHp * 0.6) && !state.cracked) {
      state.cracked = true;
      this.applyMagmaCracks(state);
      this.logImpact(
        'VỎ THIÊN THỂ BỊ RẠN NỨT',
        `${state.name} bị chấn động dữ dội! Vết nứt dung nham xuất hiện. Giáp vỏ: ${hpPercent.toFixed(0)}%`,
        'warning'
      );
    }

    // Sụp đổ diệt vong
    if (state.hp <= 0 && !state.destroyed) {
      this.shatterPlanet(state, epicenter);
    } else {
      this.logImpact(
        'THIÊN THỂ BỊ THIỆT HẠI',
        `${state.name} chịu tác động từ [${eventType.toUpperCase()}]. Máu còn: ${hpPercent.toFixed(0)}%`,
        'danger'
      );
    }
  }

  applyMagmaCracks(state) {
    const mesh = state.mesh;
    if (mesh.material && mesh.material.isMeshStandardMaterial) {
      mesh.material.emissive = new THREE.Color(0xff3d00);
      mesh.material.emissiveIntensity = 0.9;
    }
  }

  // --- HỦY DIỆT THIÊN THỂ (SHATTER PLANET) ---
  shatterPlanet(state, epicenter) {
    state.destroyed = true;
    const mesh = state.mesh;
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);

    // KIỂM TRA ĐẶC BIỆT: NẾU ĐÂY LÀ MẶT TRỜI (THE SUN)
    if (state.dbKey === 'sun') {
      this.triggerSolarCollapse(state, worldPos);
      return;
    }

    // Với hành tinh thông thường: vỡ vụn thành vành đai thiên thạch
    mesh.visible = false;
    if (mesh.cloudLayer) mesh.cloudLayer.visible = false;
    if (mesh.moonMesh) mesh.moonMesh.visible = false;
    if (mesh.europaMesh) mesh.europaMesh.visible = false;
    if (mesh.titanMesh) mesh.titanMesh.visible = false;

    const fragmentCount = 65;
    const radius = mesh.geometry.parameters.radius || 6;

    for (let i = 0; i < fragmentCount; i++) {
      const fragSize = (Math.random() * 0.4 + 0.15) * radius;
      const fragGeo = new THREE.DodecahedronGeometry(fragSize, 0);
      const fragMat = new THREE.MeshStandardMaterial({
        color: 0x3e2723,
        emissive: Math.random() < 0.35 ? 0xff3d00 : 0x000000,
        emissiveIntensity: 0.8,
        roughness: 0.9
      });

      const fragMesh = new THREE.Mesh(fragGeo, fragMat);
      fragMesh.position.copy(worldPos).add(new THREE.Vector3(
        (Math.random() - 0.5) * radius * 2,
        (Math.random() - 0.5) * radius * 2,
        (Math.random() - 0.5) * radius * 2
      ));

      const explodeDir = fragMesh.position.clone().sub(worldPos).normalize();
      const speed = Math.random() * 40 + 18;
      const vel = explodeDir.multiplyScalar(speed);

      this.scene.add(fragMesh);
      this.debrisParticles.push({
        mesh: fragMesh,
        velocity: vel,
        rotSpeed: new THREE.Vector3(Math.random() * 3, Math.random() * 3, Math.random() * 3),
        lifetime: 50.0,
        maxLife: 50.0
      });
    }

    // Sóng xung kích nổ
    const shockGeo = new THREE.RingGeometry(radius * 0.5, radius * 1.6, 32);
    const shockMat = new THREE.MeshBasicMaterial({ color: 0xffab00, side: THREE.DoubleSide, transparent: true, opacity: 1 });
    const shockRing = new THREE.Mesh(shockGeo, shockMat);
    shockRing.position.copy(worldPos);
    shockRing.rotation.x = Math.PI / 2;
    this.scene.add(shockRing);

    const flash = new THREE.PointLight(0xff5722, 12, 450);
    flash.position.copy(worldPos);
    this.scene.add(flash);
    setTimeout(() => this.scene.remove(flash), 350);

    let ringAge = 0;
    const ringInterval = setInterval(() => {
      ringAge += 0.04;
      shockRing.scale.addScalar(0.8);
      shockRing.material.opacity = Math.max(0, 1 - ringAge / 1.5);
      if (ringAge >= 1.5) {
        clearInterval(ringInterval);
        this.scene.remove(shockRing);
      }
    }, 40);

    if (window.CosmosAudio) window.CosmosAudio.playExplosion(2.5);
    if (window.pdaVoice) window.pdaVoice.onPlanetDestroyed(state.name);

    this.logImpact(
      'HÀNH TINH BỊ HỦY DIỆT HOÀN TOÀN',
      `CẢNH BÁO: ${state.name} đã sụp đổ cấu trúc và vỡ vụn thành vành đai thiên thạch mảnh vỡ!`,
      'fatal'
    );
  }

  // ==========================================================================
  // VẬT LÝ THIÊN VĂN: KHI MẶT TRỜI BỊ PHÁ HỦY / BIẾN MẤT (SOLAR COLLAPSE)
  // ==========================================================================
  triggerSolarCollapse(sunState, worldPos) {
    this.sunDestroyed = true;
    const mesh = sunState.mesh;
    mesh.visible = false;

    // 1. TẮT NGUỒN SÁNG MẶT TRỜI & TOÀN BỘ HỆ CHÌM VÀO BÓNG TỐI TUYỆT ĐỐI
    mesh.traverse(child => {
      if (child.isPointLight) child.intensity = 0;
    });

    // Giảm ánh sáng môi trường để hệ Mặt Trời rơi vào đêm đen vĩnh cửu
    this.scene.traverse(obj => {
      if (obj.isAmbientLight) obj.intensity = 0.25;
    });

    // 2. GIẢI PHÓNG HÀNH TINH KHỎI QUỸ ĐẠO -> BIẾN THÀNH HÀNH TINH LANG THANG (ROGUE PLANETS)
    // Theo định luật Newton: không còn lực hướng tâm, vận tốc quỹ đạo chuyển thành vận tốc tiếp tuyến thẳng!
    if (window.cosmos && window.cosmos.planets) {
      window.cosmos.planets.forEach(p => {
        if (p.orbitRadius > 0 && p.data.system.includes('Mặt Trời')) {
          p.isRogue = true;

          // Hướng tiếp tuyến: góc vuông với bán kính
          const tangentAngle = p.angle + Math.PI / 2;
          const linearSpeed = p.orbitSpeed * 1200; // Tốc độ bay thẳng
          p.rogueVelocity = new THREE.Vector3(
            Math.cos(tangentAngle) * linearSpeed,
            (Math.random() - 0.5) * 4,
            Math.sin(tangentAngle) * linearSpeed
          );

          // 3. ĐÓNG BĂNG TOÀN CẦU (GLOBAL DEEP FREEZE -270°C)
          // Bề mặt hóa băng tuyết xanh lạnh buốt, nước đóng băng
          if (p.mesh.material && p.mesh.material.isMeshStandardMaterial) {
            p.mesh.material.color = new THREE.Color(0x80deea);
            p.mesh.material.roughness = 0.95;
            p.mesh.material.metalness = 0.05;
          }
          if (p.mesh.cloudLayer) {
            // Mây đóng băng đông đặc
            p.mesh.cloudLayer.material.color = new THREE.Color(0xb2ebf2);
            p.mesh.cloudLayer.material.opacity = 0.75;
          }
        }
      });
    }

    // 3. VỤ NỔ SIÊU BÙNG PHÁT CỦA MẶT TRỜI
    if (window.CosmosAudio) window.CosmosAudio.playSupernova();
    if (window.pdaVoice) window.pdaVoice.onSunDestroyed();

    // 4. THÔNG BÁO NHẬT KÝ CHIẾN SỰ CHI TIẾT
    this.logImpact(
      'MẶT TRỜI ĐÃ BỊ PHÁ HỦY // HỆ SAO DIỆT VONG',
      'Lực hấp dẫn mặt trời sụp đổ! 8 hành tinh văng khỏi quỹ đạo tròn theo đường thẳng tiếp tuyến vào khoảng không vũ trụ sâu thẳm, trở thành Hành Tinh Lang Thang (Rogue Planets) và chìm vào Kỷ Băng Hà Vĩnh Cửu (-270°C)!',
      'fatal'
    );
  }

  applyProximityDamage(epicenter, radius, maxDamage, eventType) {
    this.planetsState.forEach(state => {
      if (state.destroyed) return;
      const worldPos = new THREE.Vector3();
      state.mesh.getWorldPosition(worldPos);
      const dist = worldPos.distanceTo(epicenter);

      if (dist < radius) {
        const damage = Math.round((1 - dist / radius) * maxDamage);
        if (damage > 0) {
          this.damageBody(state.mesh, damage, eventType, epicenter);
        }
      }
    });
  }

  update(delta) {
    // Cập nhật mảnh vỡ thiên thạch
    for (let i = this.debrisParticles.length - 1; i >= 0; i--) {
      const p = this.debrisParticles[i];
      p.mesh.position.addScaledVector(p.velocity, delta);
      p.mesh.rotation.x += p.rotSpeed.x * delta;
      p.mesh.rotation.y += p.rotSpeed.y * delta;
      p.lifetime -= delta;
      p.velocity.multiplyScalar(1 - delta * 0.12);

      if (p.lifetime <= 0) {
        this.scene.remove(p.mesh);
        this.debrisParticles.splice(i, 1);
      }
    }
  }

  logImpact(title, message, type = 'info') {
    if (!this.logContainer) {
      this.logContainer = document.getElementById('combatLogList');
    }
    if (!this.logContainer) return;

    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    entry.innerHTML = `
      <div class="log-meta">
        <span class="log-tag">[${type.toUpperCase()}]</span>
        <span class="log-time">${timeStr}</span>
      </div>
      <div class="log-title">${title}</div>
      <div class="log-desc">${message}</div>
    `;

    this.logContainer.prepend(entry);
    while (this.logContainer.children.length > 25) {
      this.logContainer.removeChild(this.logContainer.lastChild);
    }
  }
}

window.CelestialDamageManager = CelestialDamageManager;
