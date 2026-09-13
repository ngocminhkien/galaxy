/**
 * COSMOS // OMNI-HORIZON — COSMIC EVENT ENGINE 2.0
 * Celestial Destruction Integration, Proximity Shockwaves, Player Ship Deployment
 */

class CosmicEventManager {
  constructor(scene, fleetManager) {
    this.scene = scene;
    this.fleetManager = fleetManager;
    this.activeEvents = [];
    this.autoEventsActive = true;
    this.autoEventInterval = 45;
    this.timeUntilNextEvent = 30;
    this.selectedEventTool = null;
    this.onBroadcast = null;
  }

  setBroadcastCallback(cb) {
    this.onBroadcast = cb;
  }

  broadcast(title, desc, type = 'info') {
    if (this.onBroadcast) {
      this.onBroadcast(title, desc, type);
    }
  }

  // --- KÍCH HOẠT SỰ KIỆN THEO LOẠI TẠI TỌA ĐỘ 3D ---
  triggerEvent(eventType, position = new THREE.Vector3(0, 0, 0)) {
    switch (eventType) {
      case 'player_ship':
        this.deployPlayerShipEvent(position);
        break;
      case 'fleet':
        this.spawnAlienFleetEvent(position);
        break;
      case 'supernova':
        this.spawnSupernovaEvent(position);
        break;
      case 'blackhole':
        this.spawnBlackHoleEvent(position);
        break;
      case 'solarflare':
        this.spawnSolarFlareEvent(position);
        break;
      case 'meteor':
        this.spawnMeteorEvent(position);
        break;
      case 'wormhole':
        this.spawnWormholeEvent(position);
        break;
      default:
        console.warn('Unknown event type:', eventType);
    }
  }

  // 0. TRIỆU HỒI PHI THUYỀN NGƯỜI CHƠI (DEPLOY PLAYER COMMAND SHIP)
  deployPlayerShipEvent(pos) {
    if (window.playerShip) {
      window.playerShip.deployAt(pos);
      this.broadcast(
        'CHIẾN HẠM CHỈ HUY XUẤT KÍCH',
        `Thuyền trưởng đã vào buồng lái tại tọa độ (${pos.x.toFixed(0)}, ${pos.z.toFixed(0)})! Sử dụng W, A, S, D để lái, Chuột trái/F bắn pháo, Chuột phải/E phóng ngư lôi.`,
        'info'
      );
    }
  }

  // 1. SIÊU TÂN TINH BÙNG NỔ (SUPERNOVA BLAST)
  spawnSupernovaEvent(pos) {
    this.broadcast(
      'CẢNH BÁO: SIÊU TÂN TINH BÙNG NỔ',
      `Ngôi sao sụp đổ tại (${pos.x.toFixed(0)}, ${pos.z.toFixed(0)}), giải phóng năng lượng tàn phá bán kính 400 đơn vị thiên văn!`,
      'danger'
    );

    if (window.CosmosAudio) window.CosmosAudio.playSupernova();
    if (window.pdaVoice) window.pdaVoice.speak("Catastrophic stellar explosion detected. High radiation shockwave expanding.", "[AI CHỈ HUY] \"CẢNH BÁO: Bán kính sóng xung kích Siêu Tân Tinh đang mở rộng!\"");

    // Tác động hủy diệt thiên thể lân cận!
    if (window.celestialDamage) {
      window.celestialDamage.applyProximityDamage(pos, 380, 110, 'supernova');
    }

    // Shockwave particle sphere
    const count = 400;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = Math.random() * 90 + 50;

      velocities.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      ));

      const col = new THREE.Color();
      col.setHSL(Math.random() * 0.2 + 0.5, 0.95, 0.65);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 5.0,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending
    });

    const pSystem = new THREE.Points(geo, mat);
    this.scene.add(pSystem);

    const bubbleGeo = new THREE.SphereGeometry(6, 32, 32);
    const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.9 });
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    bubble.position.copy(pos);
    this.scene.add(bubble);

    const flash = new THREE.PointLight(0xffeb3b, 15, 800);
    flash.position.copy(pos);
    this.scene.add(flash);

    this.activeEvents.push({
      type: 'supernova',
      mesh: pSystem,
      bubble: bubble,
      light: flash,
      velocities: velocities,
      age: 0,
      lifetime: 5.5,
      update: (ev, delta) => {
        ev.age += delta;
        const progress = ev.age / ev.lifetime;

        ev.bubble.scale.addScalar(delta * 28);
        ev.bubble.material.opacity = (1 - progress) * 0.85;

        const posArr = ev.mesh.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          posArr[i * 3] += ev.velocities[i].x * delta;
          posArr[i * 3 + 1] += ev.velocities[i].y * delta;
          posArr[i * 3 + 2] += ev.velocities[i].z * delta;
        }
        ev.mesh.geometry.attributes.position.needsUpdate = true;
        ev.mesh.material.opacity = (1 - progress);
        ev.light.intensity = Math.max(0, (1 - progress) * 15);

        if (ev.age >= ev.lifetime) {
          this.scene.remove(ev.mesh);
          this.scene.remove(ev.bubble);
          this.scene.remove(ev.light);
          return false;
        }
        return true;
      }
    });
  }

  // 2. HỐ ĐEN VŨ TRỤ (BLACK HOLE SINGULARITY)
  spawnBlackHoleEvent(pos) {
    this.broadcast(
      'DỊ THƯỜNG TRỌNG LỰC: HỐ ĐEN KÍCH HOẠT',
      `Kỳ dị không-thời gian tại (${pos.x.toFixed(0)}, ${pos.z.toFixed(0)})! Lực hấp dẫn đang xé toạc các thiên thể lân cận.`,
      'warning'
    );

    if (window.CosmosAudio) window.CosmosAudio.playExplosion(2.0);
    if (window.pdaVoice) window.pdaVoice.onScanPlanet('Black Hole', 'blackhole');

    // Gây sát thương nứt vỡ nếu sinh hố đen ngay sát một hành tinh
    if (window.celestialDamage) {
      window.celestialDamage.applyProximityDamage(pos, 260, 95, 'blackhole');
    }

    const group = new THREE.Group();
    group.position.copy(pos);

    const coreGeo = new THREE.SphereGeometry(8, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const ringGeo = new THREE.RingGeometry(8.5, 11.5, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
    const photonRing = new THREE.Mesh(ringGeo, ringMat);
    photonRing.rotation.x = Math.PI / 2;
    group.add(photonRing);

    const diskCount = 500;
    const diskGeo = new THREE.BufferGeometry();
    const diskPos = new Float32Array(diskCount * 3);
    const diskCols = new Float32Array(diskCount * 3);
    const diskRadii = [];
    const diskAngles = [];
    const diskSpeeds = [];

    for (let i = 0; i < diskCount; i++) {
      const r = Math.random() * 32 + 11;
      const angle = Math.random() * Math.PI * 2;
      diskRadii.push(r);
      diskAngles.push(angle);
      diskSpeeds.push(3.0 / Math.sqrt(r));

      diskPos[i * 3] = Math.cos(angle) * r;
      diskPos[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      diskPos[i * 3 + 2] = Math.sin(angle) * r;

      const col = new THREE.Color();
      col.setHSL(0.08 + (r / 40) * 0.08, 1.0, 0.65);
      diskCols[i * 3] = col.r;
      diskCols[i * 3 + 1] = col.g;
      diskCols[i * 3 + 2] = col.b;
    }

    diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
    diskGeo.setAttribute('color', new THREE.BufferAttribute(diskCols, 3));

    const diskMat = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });

    const accretionDisk = new THREE.Points(diskGeo, diskMat);
    group.add(accretionDisk);
    this.scene.add(group);

    this.activeEvents.push({
      type: 'blackhole',
      group: group,
      disk: accretionDisk,
      diskRadii: diskRadii,
      diskAngles: diskAngles,
      diskSpeeds: diskSpeeds,
      centerPos: pos,
      age: 0,
      lifetime: 20.0,
      update: (ev, delta) => {
        ev.age += delta;
        const progress = ev.age / ev.lifetime;

        const pArr = ev.disk.geometry.attributes.position.array;
        for (let i = 0; i < diskCount; i++) {
          ev.diskAngles[i] += ev.diskSpeeds[i] * delta * 2;
          pArr[i * 3] = Math.cos(ev.diskAngles[i]) * ev.diskRadii[i];
          pArr[i * 3 + 2] = Math.sin(ev.diskAngles[i]) * ev.diskRadii[i];
        }
        ev.disk.geometry.attributes.position.needsUpdate = true;
        ev.group.rotation.y += delta * 0.4;

        // Lực hút tàu xung quanh
        if (this.fleetManager && this.fleetManager.ships) {
          for (const ship of this.fleetManager.ships) {
            const d = ship.mesh.position.distanceTo(ev.centerPos);
            if (d < 220 && d > 8) {
              const pull = ev.centerPos.clone().sub(ship.mesh.position).normalize().multiplyScalar((220 - d) * delta * 0.7);
              ship.mesh.position.add(pull);
            }
          }
        }

        // Hút phi thuyền người chơi nếu ở gần
        if (window.playerShip && window.playerShip.active) {
          const pd = window.playerShip.mesh.position.distanceTo(ev.centerPos);
          if (pd < 180 && pd > 8) {
            const pull = ev.centerPos.clone().sub(window.playerShip.mesh.position).normalize().multiplyScalar((180 - pd) * delta * 0.5);
            window.playerShip.mesh.position.add(pull);
          }
        }

        if (progress > 0.85) {
          const fade = (1 - progress) / 0.15;
          ev.group.scale.setScalar(fade);
        }

        if (ev.age >= ev.lifetime) {
          this.scene.remove(ev.group);
          return false;
        }
        return true;
      }
    });
  }

  // 3. BÃO TỪ MẶT TRỜI (SOLAR FLARE CME)
  spawnSolarFlareEvent(pos) {
    this.broadcast('BÙNG PHÁT VÀNH NHẬT HOA (CME)', 'Bão plasma năng lượng cao phóng xuất làm gián đoạn mọi hệ thống liên lạc!', 'warning');
    if (window.CosmosAudio) window.CosmosAudio.playLaserFire('void');

    if (window.celestialDamage) {
      window.celestialDamage.applyProximityDamage(pos, 180, 45, 'solarflare');
    }

    const arcPoints = [];
    const radius = 45;
    for (let i = 0; i <= 20; i++) {
      const angle = (i / 20) * Math.PI;
      arcPoints.push(new THREE.Vector3(pos.x + Math.cos(angle) * radius, pos.y + Math.sin(angle) * radius * 1.6, pos.z));
    }
    const curve = new THREE.CatmullRomCurve3(arcPoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 28, 2.2, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xff6d00, transparent: true, opacity: 0.95, wireframe: true });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(tube);

    this.activeEvents.push({
      type: 'solarflare',
      mesh: tube,
      age: 0,
      lifetime: 5.0,
      update: (ev, delta) => {
        ev.age += delta;
        const progress = ev.age / ev.lifetime;
        ev.mesh.scale.addScalar(delta * 0.35);
        ev.mesh.material.opacity = 1 - progress;
        if (ev.age >= ev.lifetime) {
          this.scene.remove(ev.mesh);
          return false;
        }
        return true;
      }
    });
  }

  // 4. MƯA THIÊN THẠCH (METEOR SHOWER)
  spawnMeteorEvent(targetPos) {
    this.broadcast('MƯA THIÊN THẠCH TẬP KÍCH', `Đoàn thiên thạch rực lửa lao xuống khu vực (${targetPos.x.toFixed(0)}, ${targetPos.z.toFixed(0)})!`, 'info');
    if (window.CosmosAudio) window.CosmosAudio.playUiBeep(600);

    const meteors = [];
    for (let i = 0; i < 18; i++) {
      const geo = new THREE.DodecahedronGeometry(Math.random() * 2.5 + 1.0, 0);
      const mat = new THREE.MeshStandardMaterial({ color: 0xff3d00, emissive: 0xd50000, emissiveIntensity: 0.7 });
      const mesh = new THREE.Mesh(geo, mat);

      const spawnPos = targetPos.clone().add(new THREE.Vector3(
        (Math.random() - 0.5) * 140 - 160,
        Math.random() * 90 + 70,
        (Math.random() - 0.5) * 140 - 160
      ));
      mesh.position.copy(spawnPos);
      const velocity = targetPos.clone().sub(spawnPos).normalize().multiplyScalar(Math.random() * 55 + 65);
      this.scene.add(mesh);
      meteors.push({ mesh, velocity });
    }

    this.activeEvents.push({
      type: 'meteor',
      meteors: meteors,
      targetPos: targetPos,
      age: 0,
      lifetime: 4.8,
      update: (ev, delta) => {
        ev.age += delta;
        for (const m of ev.meteors) {
          m.mesh.position.addScaledVector(m.velocity, delta);
        }
        if (ev.age >= ev.lifetime) {
          for (const m of ev.meteors) this.scene.remove(m.mesh);
          if (window.CosmosAudio) window.CosmosAudio.playExplosion(1.5);
          // Gây sát thương va chạm thiên thể
          if (window.celestialDamage) {
            window.celestialDamage.applyProximityDamage(ev.targetPos, 140, 50, 'meteor');
          }
          return false;
        }
        return true;
      }
    });
  }

  // 5. CỔNG KHÔNG GIAN (WORMHOLE)
  spawnWormholeEvent(pos) {
    this.broadcast('MỞ CỔNG SIÊU KHÔNG GIAN', `Dịch chuyển hạm đội chiến đấu tại (${pos.x.toFixed(0)}, ${pos.z.toFixed(0)})!`, 'info');
    if (window.CosmosAudio) window.CosmosAudio.playWarpJump();

    const rings = [];
    const group = new THREE.Group();
    group.position.copy(pos);

    for (let i = 0; i < 5; i++) {
      const geo = new THREE.TorusGeometry((i + 1) * 3.8, 0.45, 8, 32);
      const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00e5ff : 0x7c4dff, wireframe: true, transparent: true, opacity: 0.85 });
      const mesh = new THREE.Mesh(geo, mat);
      rings.push(mesh);
      group.add(mesh);
    }
    this.scene.add(group);

    this.activeEvents.push({
      type: 'wormhole',
      group: group,
      rings: rings,
      pos: pos,
      spawnedFleet: false,
      age: 0,
      lifetime: 7.0,
      update: (ev, delta) => {
        ev.age += delta;
        rings.forEach((r, idx) => {
          r.rotation.z += (idx + 1) * delta * 1.8;
          r.rotation.x += Math.sin(ev.age + idx) * delta * 0.9;
        });

        if (ev.age > 2.0 && !ev.spawnedFleet) {
          ev.spawnedFleet = true;
          this.fleetManager.spawnIncursion(ev.pos, 3);
        }

        if (ev.age > 5.5) {
          const fade = (ev.lifetime - ev.age) / 1.5;
          group.scale.setScalar(Math.max(0.01, fade));
        }

        if (ev.age >= ev.lifetime) {
          this.scene.remove(ev.group);
          return false;
        }
        return true;
      }
    });
  }

  // 6. HẠM ĐỘI ALIEN (ALIEN FLEET)
  spawnAlienFleetEvent(pos) {
    this.broadcast('HẠM ĐỘI ALIEN XÂM NHẬP', 'Terran Vanguard và Void Reapers bắt đầu giao chiến hỏa lực!', 'danger');
    this.fleetManager.spawnIncursion(pos, 3);
  }

  // --- CẬP NHẬT CHU KỲ SỰ KIỆN ---
  update(delta) {
    for (let i = this.activeEvents.length - 1; i >= 0; i--) {
      const ev = this.activeEvents[i];
      const alive = ev.update(ev, delta);
      if (!alive) this.activeEvents.splice(i, 1);
    }

    if (this.autoEventsActive) {
      this.timeUntilNextEvent -= delta;
      if (this.timeUntilNextEvent <= 0) {
        this.triggerRandomEvent();
        this.timeUntilNextEvent = this.autoEventInterval + Math.random() * 25;
      }
    }
  }

  triggerRandomEvent() {
    const eventPool = ['fleet', 'supernova', 'blackhole', 'meteor', 'wormhole', 'solarflare'];
    const selected = eventPool[Math.floor(Math.random() * eventPool.length)];
    const randomPos = new THREE.Vector3(
      (Math.random() - 0.5) * 500,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 500
    );
    this.triggerEvent(selected, randomPos);
  }
}

window.CosmicEventManager = CosmicEventManager;
