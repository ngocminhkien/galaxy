/**
 * COSMOS // OMNI-HORIZON — PLAYER PILOTED STARFIGHTER & ARCADE FLIGHT SIMULATOR
 * High-Detail Sharp 3D Interceptor, Mouse Aim Steering, Inertial Dampeners, Dual Weapons
 */

class PlayerShipManager {
  constructor(scene, camera, fleetManager) {
    this.scene = scene;
    this.camera = camera;
    this.fleetManager = fleetManager;

    this.active = false;
    this.mesh = null;
    this.cockpitView = false;

    // Flight Telemetry
    this.velocity = new THREE.Vector3();
    this.speed = 0;
    this.maxNormalSpeed = 70;
    this.maxBoostSpeed = 135;

    // Arcade Steering Physics (Bám theo chuột mượt mà)
    this.pitch = 0;
    this.yaw = 0;
    this.roll = 0;
    this.mouseOffset = { x: 0, y: 0 }; // Vị trí chuột so với tâm màn hình

    // Combat Stats
    this.maxHealth = 250;
    this.health = 250;
    this.maxShield = 120;
    this.shield = 120;
    this.shieldRechargeDelay = 0;
    this.score = 0;

    // Weapons
    this.primaryCooldown = 0;
    this.missileCooldown = 0;
    this.lockedTarget = null;
    this.projectiles = [];
    this.missiles = [];

    // Thruster visual lights
    this.thrusterLights = [];
    this.enginePlumes = [];

    // Inputs
    this.keys = {};
    this.mouseDownLeft = false;

    // DOM Elements
    this.hudOverlay = document.getElementById('flightHudOverlay');
    this.hpBar = document.getElementById('playerHullBar');
    this.shieldBar = document.getElementById('playerShieldBar');
    this.speedGauge = document.getElementById('playerSpeedVal');
    this.missileStatus = document.getElementById('missileStatusText');
    this.scoreDisplay = document.getElementById('playerCombatScore');
    this.lockReticle = document.getElementById('hudLockReticle');

    this.buildSharpShipMesh();
    this.bindInputs();
  }

  // --- THIẾT KẾ MÔ HÌNH PHI THUYỀN RÕ NÉT & SẮC SẢO 3D (SHARP HIGH-DETAIL MODEL) ---
  buildSharpShipMesh() {
    this.mesh = new THREE.Group();

    // 1. Thân chính kim loại Titan đa giác sắc nét (Fuselage)
    const noseGeo = new THREE.ConeGeometry(2.4, 15, 4);
    noseGeo.rotateX(Math.PI / 2);
    const darkTitanMat = new THREE.MeshStandardMaterial({
      color: 0x1a2327,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x00273f,
      emissiveIntensity: 0.35
    });
    const nose = new THREE.Mesh(noseGeo, darkTitanMat);
    this.mesh.add(nose);

    // 2. Sống lưng giáp kim loại viền Cyan phát sáng (Spine Armor & Neon Trim)
    const spineGeo = new THREE.BoxGeometry(1.6, 1.4, 12);
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const spine = new THREE.Mesh(spineGeo, darkTitanMat);
    spine.position.set(0, 0.6, -1);
    this.mesh.add(spine);

    // Đường viền Neon phát sáng chạy dọc thân
    const neonTrimGeo = new THREE.BoxGeometry(0.2, 0.2, 11);
    const neonTrimL = new THREE.Mesh(neonTrimGeo, neonCyanMat);
    neonTrimL.position.set(-0.85, 1.2, -1);
    this.mesh.add(neonTrimL);

    const neonTrimR = new THREE.Mesh(neonTrimGeo, neonCyanMat);
    neonTrimR.position.set(0.85, 1.2, -1);
    this.mesh.add(neonTrimR);

    // 3. Buồng lái kính năng lượng góc cạnh (Faceted Canopy)
    const canopyGeo = new THREE.CylinderGeometry(0.6, 1.2, 5, 4);
    canopyGeo.rotateX(Math.PI / 2);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00b0ff,
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: 0.85
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 1.2, 1.5);
    this.mesh.add(canopy);

    // 4. Cánh quét ngược sắc bén (Sharp Swept-Forward Delta Wings)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(8.5, -4);
    wingShape.lineTo(8.0, -7);
    wingShape.lineTo(0, -5);
    wingShape.closePath();

    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.2, bevelThickness: 0.2 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
    wingGeo.rotateX(Math.PI / 2);

    const leftWing = new THREE.Mesh(wingGeo, darkTitanMat);
    leftWing.position.set(0.5, 0, 1);
    this.mesh.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, darkTitanMat);
    rightWing.scale.set(-1, 1, 1);
    rightWing.position.set(-0.5, 0, 1);
    this.mesh.add(rightWing);

    // Đèn tín hiệu hai đầu cánh (Strobe lights)
    const strobeL = new THREE.PointLight(0x00e676, 2, 15);
    strobeL.position.set(-8.5, 0, -5);
    this.mesh.add(strobeL);

    const strobeR = new THREE.PointLight(0xff1744, 2, 15);
    strobeR.position.set(8.5, 0, -5);
    this.mesh.add(strobeR);

    // 5. Cụm nòng pháo kép bên cánh (Dual Heavy Plasma Cannons)
    const cannonGeo = new THREE.CylinderGeometry(0.3, 0.4, 6, 6);
    cannonGeo.rotateX(Math.PI / 2);
    const cannonL = new THREE.Mesh(cannonGeo, darkTitanMat);
    cannonL.position.set(-5.5, -0.4, 2.5);
    this.mesh.add(cannonL);

    const cannonR = new THREE.Mesh(cannonGeo, darkTitanMat);
    cannonR.position.set(5.5, -0.4, 2.5);
    this.mesh.add(cannonR);

    // 6. Ống xả động cơ ion đôi có quầng lửa phản lực rõ nét (Dual Ion Thruster Plumes)
    const thrusterGeo = new THREE.CylinderGeometry(1.1, 1.3, 3.5, 8);
    thrusterGeo.rotateX(Math.PI / 2);

    const thrusterPodL = new THREE.Mesh(thrusterGeo, darkTitanMat);
    thrusterPodL.position.set(-2.4, 0.2, -6.5);
    this.mesh.add(thrusterPodL);

    const thrusterPodR = new THREE.Mesh(thrusterGeo, darkTitanMat);
    thrusterPodR.position.set(2.4, 0.2, -6.5);
    this.mesh.add(thrusterPodR);

    // Lửa phản lực nón phát sáng (Engine Flame Plumes)
    const plumeGeo = new THREE.ConeGeometry(0.9, 5, 8);
    plumeGeo.rotateX(-Math.PI / 2);
    const plumeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.95 });

    const plumeL = new THREE.Mesh(plumeGeo, plumeMat);
    plumeL.position.set(-2.4, 0.2, -9.5);
    this.mesh.add(plumeL);
    this.enginePlumes.push(plumeL);

    const plumeR = new THREE.Mesh(plumeGeo, plumeMat);
    plumeR.position.set(2.4, 0.2, -9.5);
    this.mesh.add(plumeR);
    this.enginePlumes.push(plumeR);

    // Đèn chiếu phản lực
    const lightL = new THREE.PointLight(0x00e5ff, 3, 35);
    lightL.position.set(-2.4, 0.2, -8);
    this.mesh.add(lightL);
    this.thrusterLights.push(lightL);

    const lightR = new THREE.PointLight(0x00e5ff, 3, 35);
    lightR.position.set(2.4, 0.2, -8);
    this.mesh.add(lightR);
    this.thrusterLights.push(lightR);

    // 7. Cầu khiên năng lượng hình tổ ong (Shield Sphere)
    const shieldGeo = new THREE.SphereGeometry(11, 20, 20);
    this.shieldMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0 });
    this.shieldMesh = new THREE.Mesh(shieldGeo, this.shieldMat);
    this.mesh.add(this.shieldMesh);

    this.mesh.visible = false;
    this.scene.add(this.mesh);
  }

  // --- BỘ ĐIỀU KHIỂN ARCADE MƯỢT MÀ & DỄ LÁI (SMOOTH ARCADE CONTROLS) ---
  bindInputs() {
    // Theo dõi chuột để mũi tàu tự động hướng theo
    window.addEventListener('mousemove', (e) => {
      if (!this.active) return;
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      // Chuẩn hóa tọa độ chuột từ -1 đến 1
      this.mouseOffset.x = (e.clientX - halfW) / halfW;
      this.mouseOffset.y = (e.clientY - halfH) / halfH;
    });

    window.addEventListener('keydown', (e) => {
      if (!this.active) return;
      this.keys[e.code] = true;

      // C: Đổi camera góc nhìn thứ 3 / buồng lái
      if (e.code === 'KeyC') {
        this.cockpitView = !this.cockpitView;
        if (window.CosmosAudio) window.CosmosAudio.playUiBeep(1200);
      }

      // F: Bắn pháo chính
      if (e.code === 'KeyF') this.firePrimaryPlasma();

      // E: Bắn tên lửa Homing
      if (e.code === 'KeyE') this.fireQuantumMissile();

      // Escape: Thoát buồng lái
      if (e.code === 'Escape') this.disembark();
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    window.addEventListener('mousedown', (e) => {
      if (!this.active) return;
      if (e.button === 0) {
        this.mouseDownLeft = true;
        this.firePrimaryPlasma();
      } else if (e.button === 2) {
        this.fireQuantumMissile();
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseDownLeft = false;
    });

    window.addEventListener('contextmenu', (e) => {
      if (this.active) e.preventDefault();
    });
  }

  deployAt(position) {
    this.active = true;
    this.mesh.position.copy(position);
    this.mesh.rotation.set(0, 0, 0);
    this.mesh.visible = true;
    this.health = this.maxHealth;
    this.shield = this.maxShield;
    this.speed = 30;
    this.velocity.set(0, 0, 0);
    this.mouseOffset = { x: 0, y: 0 };

    if (this.hudOverlay) this.hudOverlay.style.display = 'block';

    if (window.pdaVoice) window.pdaVoice.onEnterShip();

    if (window.celestialDamage) {
      window.celestialDamage.logImpact(
        'PHI THUYỀN CHỈ HUY XUẤT TRẬN',
        'Bộ ổn định quán tính và ngắm bắn tự động đã kích hoạt. Thuyền trưởng đã sẵn sàng!',
        'info'
      );
    }
  }

  disembark() {
    this.active = false;
    this.mesh.visible = false;
    if (this.hudOverlay) this.hudOverlay.style.display = 'none';
  }

  // --- VŨ KHÍ 1: PHÁO PLASMA KÉP LIÊN THANH (TWIN PLASMA CANNONS) ---
  firePrimaryPlasma() {
    if (this.primaryCooldown > 0 || !this.active) return;
    this.primaryCooldown = 0.12;

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion).normalize();

    // Hai nòng pháo bên cánh
    const offsets = [-5.5, 5.5];
    offsets.forEach(offX => {
      const boltGeo = new THREE.CylinderGeometry(0.45, 0.45, 12, 6);
      boltGeo.rotateX(Math.PI / 2);
      const boltMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const bolt = new THREE.Mesh(boltGeo, boltMat);

      const sideVec = new THREE.Vector3(offX, -0.4, 4).applyQuaternion(this.mesh.quaternion);
      bolt.position.copy(this.mesh.position).add(sideVec);
      bolt.quaternion.copy(this.mesh.quaternion);

      this.scene.add(bolt);
      this.projectiles.push({
        mesh: bolt,
        velocity: forward.clone().multiplyScalar(240).add(this.velocity),
        damage: 32,
        lifetime: 2.2
      });
    });

    if (window.CosmosAudio) window.CosmosAudio.playLaserFire('terran');
  }

  // --- VŨ KHÍ 2: NGƯ LÔI TỰ KHÓA MỤC TIÊU (HOMING TORPEDOES) ---
  fireQuantumMissile() {
    if (this.missileCooldown > 0 || !this.active) return;
    if (!this.lockedTarget || !this.lockedTarget.alive) {
      if (window.CosmosAudio) window.CosmosAudio.playUiBeep(400);
      return;
    }

    this.missileCooldown = 2.2;
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion).normalize();

    const misGeo = new THREE.ConeGeometry(0.9, 6, 6);
    misGeo.rotateX(Math.PI / 2);
    const misMat = new THREE.MeshStandardMaterial({ color: 0xff1744, emissive: 0xff1744, emissiveIntensity: 0.9 });
    const misMesh = new THREE.Mesh(misGeo, misMat);
    misMesh.position.copy(this.mesh.position).addScaledVector(forward, 6);
    this.scene.add(misMesh);

    this.missiles.push({
      mesh: misMesh,
      target: this.lockedTarget,
      velocity: forward.clone().multiplyScalar(40),
      speed: 130,
      turnRate: 4.8,
      lifetime: 5.5,
      damage: 90
    });

    if (window.CosmosAudio) {
      window.CosmosAudio.playUiBeep(1800);
      window.CosmosAudio.playLaserFire('void');
    }

    if (window.pdaVoice) {
      window.pdaVoice.speak("Quantum torpedo away.", "[AI CHỈ HUY] \"Ngư lôi lượng tử đã phóng!\"");
    }
  }

  // --- CẬP NHẬT VẬT LÝ ARCADE MƯỢT MÀ (UPDATE LOOP) ---
  update(delta) {
    if (!this.active) return;

    // 1. LÁI THEO CHUỘT TRỰC QUAN (ARCADE MOUSE STEERING)
    // Tự động xoay thân tàu bám theo hướng chuột chỉ
    const targetPitch = -this.mouseOffset.y * 1.2;
    const targetYaw = -this.mouseOffset.x * 1.5;
    const targetRoll = -this.mouseOffset.x * 0.8; // Tự nghiêng cánh khi quẹo cực đẹp

    this.pitch = THREE.MathUtils.lerp(this.pitch, targetPitch, delta * 4.5);
    this.yaw = THREE.MathUtils.lerp(this.yaw, targetYaw, delta * 4.5);
    this.roll = THREE.MathUtils.lerp(this.roll, targetRoll, delta * 5.0);

    this.mesh.rotation.x = this.pitch;
    this.mesh.rotation.y += this.yaw * delta * 2.5;
    this.mesh.rotation.z = this.roll;

    // 2. ĐIỀU KHIỂN TỐC ĐỘ (W / S / SHIFT)
    const isBoosting = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
    const maxSpd = isBoosting ? this.maxBoostSpeed : this.maxNormalSpeed;

    if (this.keys['KeyW']) {
      this.speed = Math.min(maxSpd, this.speed + delta * 45);
    } else if (this.keys['KeyS']) {
      // PHANH DỪNG KHẨN CẤP (EMERGENCY BRAKE)
      this.speed = Math.max(0, this.speed - delta * 90);
    } else {
      // Tự động ổn định đà bay (Inertial Dampening)
      this.speed = THREE.MathUtils.lerp(this.speed, 25, delta * 0.8);
    }

    // Đảo cánh sang hai bên (Lateral Strafe A / D)
    const strafeSpeed = 35;
    const strafeVec = new THREE.Vector3();
    if (this.keys['KeyA']) strafeVec.x -= strafeSpeed;
    if (this.keys['KeyD']) strafeVec.x += strafeSpeed;
    if (this.keys['Space']) strafeVec.y += strafeSpeed;
    if (this.keys['ControlLeft']) strafeVec.y -= strafeSpeed;

    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion).normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.mesh.quaternion).normalize();
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.mesh.quaternion).normalize();

    this.velocity.copy(forward).multiplyScalar(this.speed);
    this.velocity.addScaledVector(right, strafeVec.x);
    this.velocity.addScaledVector(up, strafeVec.y);

    this.mesh.position.addScaledVector(this.velocity, delta);

    // 3. HIỆU ỨNG LỬA ĐỘNG CƠ PHẢN LỰC
    const plumeScale = THREE.MathUtils.lerp(0.8, isBoosting ? 2.2 : 1.2, this.speed / this.maxNormalSpeed);
    this.enginePlumes.forEach(p => p.scale.set(1, 1, plumeScale));
    this.thrusterLights.forEach(l => l.intensity = isBoosting ? 4.5 : 2.5);

    // 4. CAMERA THEO SAU MƯỢT MÀ (CHASE CAM)
    if (this.cockpitView) {
      this.camera.position.copy(this.mesh.position).add(new THREE.Vector3(0, 1.4, 2.0).applyQuaternion(this.mesh.quaternion));
      this.camera.quaternion.copy(this.mesh.quaternion);
    } else {
      const camOffset = new THREE.Vector3(0, 7, -26).applyQuaternion(this.mesh.quaternion);
      const desiredPos = this.mesh.position.clone().add(camOffset);
      this.camera.position.lerp(desiredPos, 0.15);
      this.camera.lookAt(this.mesh.position.clone().add(forward.multiplyScalar(35)));
    }

    // 5. KHÓA MỤC TIÊU HOMING & COOLDOWNS
    this.updateTargetLock();

    if (this.primaryCooldown > 0) this.primaryCooldown -= delta;
    if (this.missileCooldown > 0) this.missileCooldown -= delta;
    if (this.mouseDownLeft) this.firePrimaryPlasma();

    if (this.shieldRechargeDelay > 0) {
      this.shieldRechargeDelay -= delta;
    } else if (this.shield < this.maxShield) {
      this.shield = Math.min(this.maxShield, this.shield + delta * 15);
    }

    // 6. CẬP NHẬT ĐẠN & TÊN LỬA
    this.updateProjectiles(delta);
    this.updateMissiles(delta);

    // 7. CẬP NHẬT HUD
    this.updateFlightHUD();
  }

  updateTargetLock() {
    this.lockedTarget = null;
    let closestAngle = 0.38; // Nón ngắm 22 độ
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion).normalize();

    if (this.fleetManager && this.fleetManager.ships) {
      for (const enemy of this.fleetManager.ships) {
        if (!enemy.alive || enemy.faction === 'terran') continue;
        const toEnemy = enemy.mesh.position.clone().sub(this.mesh.position).normalize();
        const dot = forward.dot(toEnemy);
        const angle = Math.acos(Math.max(-1, Math.min(1, dot)));

        if (angle < closestAngle) {
          closestAngle = angle;
          this.lockedTarget = enemy;
        }
      }
    }

    if (this.lockReticle) {
      if (this.lockedTarget) {
        this.lockReticle.style.display = 'flex';
        this.lockReticle.classList.add('locked');
      } else {
        this.lockReticle.style.display = 'none';
        this.lockReticle.classList.remove('locked');
      }
    }
  }

  updateProjectiles(delta) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.mesh.position.addScaledVector(p.velocity, delta);
      p.lifetime -= delta;

      let hit = false;
      if (this.fleetManager && this.fleetManager.ships) {
        for (const target of this.fleetManager.ships) {
          if (target.alive && target.faction === 'void') {
            if (p.mesh.position.distanceTo(target.mesh.position) < 8.5) {
              this.fleetManager.applyDamage(target, p.damage, p.mesh.position);
              hit = true;
              if (!target.alive) this.onEnemyKilled(target);
              break;
            }
          }
        }
      }

      if (hit || p.lifetime <= 0) {
        this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }
  }

  updateMissiles(delta) {
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      const m = this.missiles[i];
      m.lifetime -= delta;

      if (m.target && m.target.alive) {
        const toTarget = m.target.mesh.position.clone().sub(m.mesh.position).normalize();
        m.velocity.lerp(toTarget.multiplyScalar(m.speed), delta * m.turnRate);
        m.mesh.lookAt(m.mesh.position.clone().add(m.velocity));
      }

      m.mesh.position.addScaledVector(m.velocity, delta);

      let hit = false;
      if (m.target && m.target.alive) {
        if (m.mesh.position.distanceTo(m.target.mesh.position) < 9.5) {
          this.fleetManager.applyDamage(m.target, m.damage, m.mesh.position);
          hit = true;
          if (!m.target.alive) this.onEnemyKilled(m.target);
        }
      }

      if (hit || m.lifetime <= 0) {
        if (hit && window.CosmosAudio) window.CosmosAudio.playExplosion(1.6);
        this.scene.remove(m.mesh);
        this.missiles.splice(i, 1);
      }
    }
  }

  onEnemyKilled(target) {
    this.score += 100;
    if (window.celestialDamage) {
      window.celestialDamage.logImpact(
        'BẮN HẠ TÀU ĐỊCH!',
        `Thuyền trưởng đã tiêu diệt tàu ${target.faction.toUpperCase()}-${target.id}! +100 Điểm`,
        'info'
      );
    }
    if (window.pdaVoice) {
      window.pdaVoice.speak("Hostile eliminated. Well done, Captain.", "[AI CHỈ HUY] \"Tàu địch bị tiêu diệt! Bắn tốt lắm, Thuyền trưởng!\"");
    }
  }

  takeDamage(amount) {
    this.shieldRechargeDelay = 3.5;
    if (this.shield > 0) {
      this.shield -= amount;
      this.shieldMat.opacity = 0.55;
      setTimeout(() => { this.shieldMat.opacity = 0; }, 180);
      if (this.shield < 0) {
        this.health += this.shield;
        this.shield = 0;
      }
    } else {
      this.health -= amount;
    }

    if (this.health <= 50 && window.pdaVoice) {
      window.pdaVoice.onShieldCritical();
    }

    if (this.health <= 0) {
      this.health = 0;
      this.disembark();
      if (window.CosmosAudio) window.CosmosAudio.playExplosion(2.5);
    }
  }

  updateFlightHUD() {
    if (this.hpBar) this.hpBar.style.width = `${Math.max(0, (this.health / this.maxHealth) * 100)}%`;
    if (this.shieldBar) this.shieldBar.style.width = `${Math.max(0, (this.shield / this.maxShield) * 100)}%`;
    if (this.speedGauge) this.speedGauge.textContent = `${Math.round(this.speed * 14)} KM/H`;
    if (this.scoreDisplay) this.scoreDisplay.textContent = `SCORE: ${this.score}`;
    if (this.missileStatus) {
      this.missileStatus.textContent = this.missileCooldown > 0 ? `RELOADING (${this.missileCooldown.toFixed(1)}s)` : 'LOCKED & READY';
      this.missileStatus.style.color = this.missileCooldown > 0 ? '#ffb300' : '#00e5ff';
    }
  }
}

window.PlayerShipManager = PlayerShipManager;
