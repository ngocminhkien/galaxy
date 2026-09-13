/**
 * COSMOS // OMNI-HORIZON — AUTONOMOUS ALIEN FLEET & COMBAT SYSTEM 2.0
 * 3D Floating Health Bars, Multi-stage Destruction, Player Targeting, Dogfights
 */

class FleetManager {
  constructor(scene) {
    this.scene = scene;
    this.ships = [];
    this.projectiles = [];
    this.particles = [];
    this.nextShipId = 1;

    this.initGeometries();
  }

  initGeometries() {
    // Terran Fighter Geometry (Multi-hull interceptor)
    const terranGroup = new THREE.Group();
    const cone = new THREE.ConeGeometry(2.2, 10, 5);
    cone.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(cone, new THREE.MeshStandardMaterial({
      color: 0x90caf9,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0288d1,
      emissiveIntensity: 0.4
    }));
    terranGroup.add(body);

    const wings = new THREE.BoxGeometry(11, 0.3, 4);
    const wingMesh = new THREE.Mesh(wings, new THREE.MeshStandardMaterial({ color: 0x37474f }));
    wingMesh.position.set(0, 0, -1);
    terranGroup.add(wingMesh);
    this.terranTemplate = terranGroup;

    // Void Raider Geometry (Spiked stealth dreadnought)
    const voidGroup = new THREE.Group();
    const octa = new THREE.OctahedronGeometry(4.5, 0);
    octa.scale(0.8, 0.4, 2.2);
    const voidBody = new THREE.Mesh(octa, new THREE.MeshStandardMaterial({
      color: 0x212121,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xd50000,
      emissiveIntensity: 0.6
    }));
    voidGroup.add(voidBody);
    this.voidTemplate = voidGroup;

    // Shield bubble
    this.shieldGeo = new THREE.SphereGeometry(7.5, 16, 16);
    this.terranShieldMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0, wireframe: true });
    this.voidShieldMat = new THREE.MeshBasicMaterial({ color: 0xff1744, transparent: true, opacity: 0, wireframe: true });
  }

  // --- TRIỆU HỒI HẠM ĐỘI CHIẾN ĐẤU (SPAWN FLEET DOGFIGHT) ---
  spawnIncursion(centerPos = new THREE.Vector3(0, 0, 0), countPerSide = 3) {
    // Terran Vanguard
    for (let i = 0; i < countPerSide; i++) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 80 - 70,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 80
      );
      this.spawnShip('terran', centerPos.clone().add(offset));
    }

    // Void Reapers
    for (let i = 0; i < countPerSide; i++) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 80 + 70,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 80
      );
      this.spawnShip('void', centerPos.clone().add(offset));
    }

    if (window.CosmosAudio) window.CosmosAudio.playWarpJump();
    if (window.pdaVoice) {
      window.pdaVoice.speak("Hostile alien fleet jump signature detected.", "[AI CHỈ HUY] \"CẢNH BÁO: Tín hiệu bước nhảy của hạm đội ngoài hành tinh đã xuất hiện!\"");
    }
  }

  spawnShip(faction, position) {
    const isTerran = faction === 'terran';
    const mesh = new THREE.Group();

    // Body Clone
    const template = isTerran ? this.terranTemplate.clone() : this.voidTemplate.clone();
    mesh.add(template);

    // Engine exhaust glow light
    const engineGlow = new THREE.PointLight(isTerran ? 0x00e5ff : 0xff1744, 2.0, 30);
    engineGlow.position.set(0, 0, -4.5);
    mesh.add(engineGlow);

    // Shield sphere
    const shieldMesh = new THREE.Mesh(this.shieldGeo, isTerran ? this.terranShieldMat.clone() : this.voidShieldMat.clone());
    mesh.add(shieldMesh);

    // 3D FLOATING HEALTH BAR SPRITE (THANH MÁU NỔI 3D TRÊN ĐẦU PHI THUYỀN)
    const hpSprite = this.createHealthBarSprite(faction);
    hpSprite.position.set(0, 8, 0);
    mesh.add(hpSprite);

    mesh.position.copy(position);
    this.scene.add(mesh);

    const ship = {
      id: this.nextShipId++,
      faction: faction,
      mesh: mesh,
      hpSprite: hpSprite,
      shieldMesh: shieldMesh,
      engineGlow: engineGlow,
      maxHealth: isTerran ? 120 : 160,
      health: isTerran ? 120 : 160,
      shield: 80,
      maxShield: 80,
      shieldHitTimer: 0,
      maxSpeed: isTerran ? 42 : 36,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8),
      state: 'PATROL',
      target: null,
      fireCooldown: Math.random() * 1.5,
      evadeTimer: 0,
      patrolAnchor: position.clone(),
      operationalLife: 65.0 + Math.random() * 25.0, // Tồn tại 65 - 90 giây trước khi rút lui
      warpingOut: false,
      alive: true
    };

    this.updateHealthBarSprite(ship);
    this.ships.push(ship);
    return ship;
  }

  // --- TẠO SPRITE THANH MÁU 3D BẰNG CANVAS ---
  createHealthBarSprite(faction) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 36;
    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(16, 4.5, 1);
    sprite.userData = { canvas, texture };
    return sprite;
  }

  updateHealthBarSprite(ship) {
    const sprite = ship.hpSprite;
    if (!sprite || !sprite.userData) return;
    const canvas = sprite.userData.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isTerran = ship.faction === 'terran';
    const hpRatio = Math.max(0, ship.health / ship.maxHealth);
    const shieldRatio = Math.max(0, ship.shield / ship.maxShield);

    // Nền viền đen
    ctx.fillStyle = 'rgba(4, 10, 20, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = isTerran ? '#00e5ff' : '#ff1744';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    // Tên tàu & Phe
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = isTerran ? '#80deea' : '#ff8a80';
    ctx.fillText(`${ship.faction.toUpperCase()}-${ship.id}`, 6, 11);

    // Thanh Shield (Xanh dương / Đỏ)
    ctx.fillStyle = isTerran ? '#00e5ff' : '#ff3d00';
    ctx.fillRect(6, 14, (canvas.width - 12) * shieldRatio, 6);

    // Thanh Hull (Xanh lục / Đỏ khi thấp)
    ctx.fillStyle = hpRatio > 0.35 ? '#10b981' : '#f43f5e';
    ctx.fillRect(6, 23, (canvas.width - 12) * hpRatio, 7);

    sprite.userData.texture.needsUpdate = true;
  }

  // --- CẬP NHẬT CHIẾN ĐẤU & AI ---
  update(delta) {
    // 1. Cập nhật tàu
    for (let i = this.ships.length - 1; i >= 0; i--) {
      const ship = this.ships[i];
      if (!ship.alive) {
        this.scene.remove(ship.mesh);
        this.ships.splice(i, 1);
        continue;
      }

      // Đếm ngược thời gian tác chiến của hạm đội (Tự động biến mất sau thời gian quy định)
      ship.operationalLife -= delta;

      // 3.5 giây cuối: Kích hoạt động cơ Hyperspace tăng tốc cực đại chuẩn bị biến mất
      if (ship.operationalLife <= 3.5 && !ship.warpingOut) {
        ship.warpingOut = true;
        if (ship.engineGlow) ship.engineGlow.intensity = 8.0;
        if (window.CosmosAudio) window.CosmosAudio.playWarpJump();
      }

      if (ship.warpingOut) {
        const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(ship.mesh.quaternion).normalize();
        ship.mesh.position.addScaledVector(fwd, delta * 420);
        ship.mesh.scale.z += delta * 15;
      }

      // Hết thời gian: Biến mất hoàn toàn kèm chớp sáng warp jump
      if (ship.operationalLife <= 0) {
        this.createWarpFlash(ship.mesh.position, ship.faction === 'terran' ? 0x00e5ff : 0xff1744);
        this.scene.remove(ship.mesh);
        this.ships.splice(i, 1);

        if (this.ships.length === 0) {
          if (window.pdaVoice) {
            window.pdaVoice.speak("Hostile warp signatures dissipated. All alien fleets have jumped out of system.", "[AI CHỈ HUY] \"Hạm đội ngoài hành tinh đã kích hoạt bước nhảy siêu không gian và rút lui khỏi chiến trường!\"");
          }
          if (window.celestialDamage) {
            window.celestialDamage.logImpact(
              'HẠM ĐỘI ALIEN RÚT LUI',
              'Hết thời gian tác chiến, các phi thuyền ngoài hành tinh đã kích hoạt bước nhảy siêu không gian rời khỏi hệ sao!',
              'info'
            );
          }
        }
        continue;
      }

      this.updateShipAI(ship, delta);
    }

    // 2. Cập nhật đạn Laser
    for (let j = this.projectiles.length - 1; j >= 0; j--) {
      const proj = this.projectiles[j];
      proj.mesh.position.addScaledVector(proj.velocity, delta);
      proj.lifetime -= delta;

      let hit = false;
      // Va chạm với tàu khác
      for (const target of this.ships) {
        if (target.alive && target.faction !== proj.faction) {
          if (proj.mesh.position.distanceTo(target.mesh.position) < 8) {
            this.applyDamage(target, proj.damage, proj.mesh.position);
            hit = true;
            break;
          }
        }
      }

      // Va chạm với phi thuyền người chơi
      if (!hit && window.playerShip && window.playerShip.active && proj.faction === 'void') {
        if (proj.mesh.position.distanceTo(window.playerShip.mesh.position) < 9) {
          window.playerShip.takeDamage(proj.damage);
          hit = true;
        }
      }

      if (hit || proj.lifetime <= 0) {
        this.scene.remove(proj.mesh);
        this.projectiles.splice(j, 1);
      }
    }

    // 3. Cập nhật khói lửa nổ
    for (let k = this.particles.length - 1; k >= 0; k--) {
      const p = this.particles[k];
      p.mesh.position.addScaledVector(p.velocity, delta);
      p.lifetime -= delta;
      p.mesh.material.opacity = Math.max(0, p.lifetime / p.maxLife);

      if (p.lifetime <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(k, 1);
      }
    }
  }

  updateShipAI(ship, delta) {
    if (ship.shieldHitTimer > 0) {
      ship.shieldHitTimer -= delta;
      ship.shieldMesh.material.opacity = Math.max(0, ship.shieldHitTimer * 2.5);
    } else {
      ship.shieldMesh.material.opacity = 0;
      if (ship.shield < ship.maxShield) {
        ship.shield = Math.min(ship.maxShield, ship.shield + delta * 9);
        this.updateHealthBarSprite(ship);
      }
    }

    // Quét mục tiêu: Ưu tiên nhắm tàu người chơi nếu là phe Void!
    if (ship.faction === 'void' && window.playerShip && window.playerShip.active && Math.random() < 0.25) {
      ship.target = { mesh: window.playerShip.mesh, alive: true, isPlayer: true };
    } else if (!ship.target || !ship.target.alive) {
      ship.target = this.findNearestEnemy(ship);
    }

    const steerForce = new THREE.Vector3();

    if (ship.target) {
      const toEnemy = ship.target.mesh.position.clone().sub(ship.mesh.position);
      const dist = toEnemy.length();

      if (dist < 220) {
        ship.state = 'ATTACK';
        // Vòng lượn tấn công (dogfight strafe)
        const sideVec = new THREE.Vector3().crossVectors(toEnemy, new THREE.Vector3(0, 1, 0)).normalize();
        steerForce.copy(toEnemy.normalize().multiplyScalar(ship.maxSpeed * 0.7).add(sideVec.multiplyScalar(ship.maxSpeed * 0.5)));

        ship.mesh.lookAt(ship.target.mesh.position);

        ship.fireCooldown -= delta;
        if (ship.fireCooldown <= 0) {
          this.fireLaser(ship, ship.target);
          ship.fireCooldown = Math.random() * 0.7 + 0.4;
        }
      } else {
        ship.state = 'CHASE';
        steerForce.copy(toEnemy.normalize().multiplyScalar(ship.maxSpeed));
      }
    } else {
      // Tuần tra tự do
      ship.state = 'PATROL';
      const toAnchor = ship.patrolAnchor.clone().sub(ship.mesh.position);
      if (toAnchor.length() > 180) {
        steerForce.copy(toAnchor.normalize().multiplyScalar(ship.maxSpeed));
      } else {
        steerForce.set(
          Math.sin(Date.now() * 0.001 + ship.id) * 12,
          Math.cos(Date.now() * 0.0015 + ship.id) * 9,
          Math.sin(Date.now() * 0.002 + ship.id) * 12
        );
      }
    }

    ship.velocity.lerp(steerForce, delta * 2.5);
    ship.mesh.position.addScaledVector(ship.velocity, delta);

    if (ship.state !== 'ATTACK' && ship.velocity.lengthSq() > 1) {
      ship.mesh.lookAt(ship.mesh.position.clone().add(ship.velocity));
    }
  }

  findNearestEnemy(ship) {
    let nearest = null;
    let minDist = 900;
    for (const other of this.ships) {
      if (other.alive && other.faction !== ship.faction) {
        const d = ship.mesh.position.distanceTo(other.mesh.position);
        if (d < minDist) {
          minDist = d;
          nearest = other;
        }
      }
    }
    return nearest;
  }

  fireLaser(shooter, target) {
    const isTerran = shooter.faction === 'terran';
    const boltGeo = new THREE.CylinderGeometry(0.35, 0.35, 9, 6);
    boltGeo.rotateX(Math.PI / 2);
    const boltMat = new THREE.MeshBasicMaterial({ color: isTerran ? 0x00e5ff : 0xff1744 });
    const bolt = new THREE.Mesh(boltGeo, boltMat);

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(shooter.mesh.quaternion).normalize();
    bolt.position.copy(shooter.mesh.position).addScaledVector(forward, 6);
    bolt.quaternion.copy(shooter.mesh.quaternion);

    this.scene.add(bolt);
    this.projectiles.push({
      mesh: bolt,
      velocity: forward.multiplyScalar(175),
      faction: shooter.faction,
      damage: isTerran ? 24 : 32,
      lifetime: 2.2
    });

    if (window.CosmosAudio) window.CosmosAudio.playLaserFire(shooter.faction);
  }

  applyDamage(target, amount, hitPoint) {
    if (target.shield > 0) {
      target.shield -= amount;
      target.shieldHitTimer = 0.25;
      if (target.shield < 0) {
        target.health += target.shield;
        target.shield = 0;
      }
    } else {
      target.health -= amount;
    }

    this.updateHealthBarSprite(target);

    // Kiểm tra hết máu -> Nổ tung
    if (target.health <= 0 && target.alive) {
      this.destroyShip(target);
    }
  }

  destroyShip(ship) {
    ship.alive = false;
    const pos = ship.mesh.position.clone();
    const colorHex = ship.faction === 'terran' ? 0x00e5ff : 0xff1744;

    // Sinh ra mảnh vỡ kim loại
    for (let i = 0; i < 24; i++) {
      const geo = new THREE.TetrahedronGeometry(Math.random() * 1.8 + 0.6);
      const mat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      this.particles.push({
        mesh: mesh,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 65, (Math.random() - 0.5) * 65, (Math.random() - 0.5) * 65),
        lifetime: Math.random() * 1.4 + 0.6,
        maxLife: 2.0
      });
    }

    // Chớp sáng
    const flash = new THREE.PointLight(colorHex, 5, 140);
    flash.position.copy(pos);
    this.scene.add(flash);
    setTimeout(() => this.scene.remove(flash), 200);

    if (window.CosmosAudio) window.CosmosAudio.playExplosion(1.4);

    if (window.celestialDamage) {
      window.celestialDamage.logImpact(
        'CHIẾN HẠM BỊ TIÊU DIỆT',
        `Tàu chiến ${ship.faction.toUpperCase()}-${ship.id} đã phát nổ thành các mảnh vỡ sau khi hết giáp và vỏ bọc!`,
        'danger'
      );
    }
  }

  createWarpFlash(pos, colorHex) {
    const flash = new THREE.PointLight(colorHex, 6, 140);
    flash.position.copy(pos);
    this.scene.add(flash);
    setTimeout(() => this.scene.remove(flash), 250);
  }
}

window.FleetManager = FleetManager;
