/**
 * COSMOS // OMNI-HORIZON 2.0 — 3D INTERACTIVE UNIVERSE CORE
 * Expanded Catalogue (Pluto, Titan, Europa, 55 Cancri e, HD 189733b, Whirlpool M51, etc.)
 * Procedural HD Shaders, Auto-Scan with Subnautica PDA Voice, Destruction Integration
 */

// --- CƠ SỞ DỮ LIỆU THIÊN VĂN HỌC MỞ RỘNG (EXPANDED ASTRONOMICAL DATABASE) ---
const ASTRONOMICAL_DB = {
  // 1. HỆ MẶT TRỜI MỞ RỘNG (EXPANDED SOLAR SYSTEM)
  sun: {
    id: 'sun',
    name: 'Mặt Trời (Sol)',
    system: 'Hệ Mặt Trời',
    type: 'Sao lùn vàng (G2V Main Sequence)',
    diameter: '1,392,700 km (Gấp 109 lần T.Đất)',
    mass: '1.989 × 10³⁰ kg (99.86% hệ Mặt Trời)',
    temp: '5,778 K (Bề mặt) / 15,000,000 K (Lõi)',
    distance: '0 km (Trung tâm hệ sao)',
    orbitalPeriod: '230 triệu năm (Quanh tâm Ngân Hà)',
    atmosphere: '73.46% Hydro, 24.85% Heli, 0.77% Oxy',
    history: 'Hình thành cách đây 4.6 tỷ năm từ sự sụp đổ hấp dẫn của đám mây phân tử hydro. Mỗi giây chuyển hóa 600 triệu tấn hydro thành heli qua phản ứng nhiệt hạch, nuôi dưỡng toàn bộ hệ hành tinh.',
    color: '#ffb74d'
  },
  mercury: {
    id: 'mercury',
    name: 'Sao Thủy (Mercury)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh đất đá gần sao mẹ nhất',
    diameter: '4,879 km',
    mass: '3.30 × 10²³ kg (0.055 Trái Đất)',
    temp: '-180°C đến +430°C',
    distance: '57.9 triệu km từ Mặt Trời',
    orbitalPeriod: '87.97 ngày Trái Đất',
    atmosphere: 'Ngoại quyển siêu loãng (Oxy, Natri, Hydro)',
    history: 'Hành tinh nhỏ nhất hệ Mặt Trời. Không có khí quyển giữ nhiệt nên chênh lệch nhiệt độ ngày đêm lên đến 600°C. Bề mặt chi chít hố thiên thạch tương tự Mặt Trăng.',
    color: '#b0bec5'
  },
  venus: {
    id: 'venus',
    name: 'Sao Kim (Venus)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh đất đá / Địa ngục nhà kính',
    diameter: '12,104 km (95% Trái Đất)',
    mass: '4.87 × 10²⁴ kg (0.815 Trái Đất)',
    temp: '465°C (Hành tinh nóng nhất)',
    distance: '108.2 triệu km từ Mặt Trời',
    orbitalPeriod: '224.7 ngày (Tự quay nghịch chiều)',
    atmosphere: '96.5% CO₂, 3.5% N₂, mây Axit Sulfuric',
    history: 'Hiệu ứng nhà kính mất kiểm soát biến bề mặt thành chảo lửa đủ làm nóng chảy chì. Áp suất khí quyển đè nặng gấp 92 lần Trái Đất.',
    color: '#ffe082'
  },
  earth: {
    id: 'earth',
    name: 'Trái Đất (Terra)',
    system: 'Hệ Mặt Trời',
    type: 'Cái nôi sự sống / Thế giới nước lỏng',
    diameter: '12,742 km',
    mass: '5.972 × 10²⁴ kg (1.0 M⊕)',
    temp: 'Trung bình 15°C (-89°C đến +57°C)',
    distance: '149.6 triệu km (1 AU)',
    orbitalPeriod: '365.25 ngày (1 Năm)',
    atmosphere: '78.08% N₂, 20.95% O₂, 0.93% Ar, H₂O',
    history: 'Hành tinh duy nhất được xác nhận có sự sống phát triển. 71% bề mặt bao phủ bởi đại dương nước lỏng. Được bảo vệ bởi từ quyển mạnh mẽ chống bức xạ mặt trời.',
    color: '#4fc3f7'
  },
  moon: {
    id: 'moon',
    name: 'Mặt Trăng (Luna)',
    system: 'Vệ tinh Trái Đất',
    type: 'Vệ tinh tự nhiên đất đá',
    diameter: '3,474 km (27% Trái Đất)',
    mass: '7.34 × 10²² kg (0.012 Trái Đất)',
    temp: '-130°C đến +120°C',
    distance: '384,400 km từ Trái Đất',
    orbitalPeriod: '27.3 ngày (Khóa thủy triều)',
    atmosphere: 'Chân không gần như tuyệt đối',
    history: 'Hình thành sau vụ va chạm khổng lồ giữa Trái Đất non trẻ và tiền hành tinh Theia 4.5 tỷ năm trước. Lực hấp dẫn của nó tạo nên thủy triều đại dương và ổn định trục nghiêng Trái Đất.',
    color: '#cfd8dc'
  },
  mars: {
    id: 'mars',
    name: 'Sao Hỏa (Ares)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh Đỏ / Mục tiêu định cư',
    diameter: '6,779 km (53% Trái Đất)',
    mass: '6.42 × 10²³ kg (0.107 Trái Đất)',
    temp: '-140°C đến +20°C',
    distance: '227.9 triệu km từ Mặt Trời',
    orbitalPeriod: '687 ngày Trái Đất',
    atmosphere: '95.3% CO₂, 2.6% N₂, 1.9% Argon',
    history: 'Sở hữu đỉnh núi lửa cao nhất hệ Mặt Trời (Olympus Mons - cao 21.9 km). Bề mặt đỏ thẫm do oxit sắt. Có bằng chứng rõ ràng về các dòng sông và hồ nước cổ đại hàng tỷ năm trước.',
    color: '#ff7043'
  },
  jupiter: {
    id: 'jupiter',
    name: 'Sao Mộc (Zeus)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh khí khổng lồ (Gas Giant)',
    diameter: '139,820 km (Gấp 11 lần Trái Đất)',
    mass: '1.898 × 10²⁷ kg (317.8 lần Trái Đất)',
    temp: '-110°C (Tầng mây)',
    distance: '778.5 triệu km từ Mặt Trời',
    orbitalPeriod: '11.86 năm Trái Đất',
    atmosphere: '89.8% Hydro, 10.2% Heli',
    history: 'Hành tinh lớn nhất hệ Mặt Trời, đóng vai trò như "tấm khiên trọng lực" hút các thiên thạch nguy hiểm. Vết Đỏ Lớn là siêu bão xoáy đã hoành hành liên tục suốt hơn 350 năm.',
    color: '#ffcc80'
  },
  europa: {
    id: 'europa',
    name: 'Mặt trăng Europa (Jovian II)',
    system: 'Hệ Vệ tinh Sao Mộc',
    type: 'Vệ tinh băng có đại dương ngầm',
    diameter: '3,121 km',
    mass: '4.8 × 10²² kg',
    temp: '-160°C (Băng bề mặt)',
    distance: '670,900 km từ Sao Mộc',
    orbitalPeriod: '3.55 ngày',
    atmosphere: 'Oxy phân tử siêu mỏng',
    history: 'Bên dưới lớp vỏ băng nứt nẻ dày 15-25 km là một đại dương nước lỏng mặn sâu tới 100 km, chứa lượng nước gấp đôi toàn bộ đại dương Trái Đất. Ứng viên hàng đầu tìm kiếm sự sống ngoài Trái Đất.',
    color: '#e0f7fa'
  },
  saturn: {
    id: 'saturn',
    name: 'Sao Thổ (Cronus)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh khí có vành đai băng',
    diameter: '116,460 km (Gấp 9.1 lần Trái Đất)',
    mass: '5.683 × 10²⁶ kg (95.2 lần Trái Đất)',
    temp: '-140°C',
    distance: '1.434 tỷ km từ Mặt Trời',
    orbitalPeriod: '29.45 năm Trái Đất',
    atmosphere: '96.3% Hydro, 3.25% Heli',
    history: 'Nổi bật với hệ vành đai ngoạn mục cấu tạo từ hàng triệu tảng băng và bụi đá rộng 282,000 km nhưng chỉ dày khoảng 10 mét. Tỉ trọng trung bình nhẹ hơn cả nước.',
    color: '#fff59d'
  },
  titan: {
    id: 'titan',
    name: 'Mặt trăng Titan (Saturn VI)',
    system: 'Hệ Vệ tinh Sao Thổ',
    type: 'Vệ tinh có khí quyển dày & Biển Hydrocarbon',
    diameter: '5,150 km (Lớn hơn Sao Thủy)',
    mass: '1.345 × 10²³ kg',
    temp: '-179°C',
    distance: '1.22 triệu km từ Sao Thổ',
    orbitalPeriod: '15.9 ngày',
    atmosphere: '95% Nitơ, 5% Mê-tan (Áp suất 1.5 bar)',
    history: 'Nơi duy nhất ngoài Trái Đất có chất lỏng ổn định trên bề mặt: các hồ và biển chứa đầy Mê-tan và E-tan lỏng. Có chu trình mưa bão và sông ngòi bằng khí hóa lỏng.',
    color: '#ffb74d'
  },
  uranus: {
    id: 'uranus',
    name: 'Sao Thiên Vương (Caelus)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh băng khổng lồ (Ice Giant)',
    diameter: '50,724 km',
    mass: '8.681 × 10²⁵ kg (14.5 lần Trái Đất)',
    temp: '-224°C',
    distance: '2.871 tỷ km từ Mặt Trời',
    orbitalPeriod: '84 năm Trái Đất',
    atmosphere: '82.5% Hydro, 15.2% Heli, 2.3% Mêtan',
    history: 'Có trục tự quay nghiêng tới 97.77 độ — hành tinh như đang "lăn" trên quỹ đạo quanh Mặt Trời. Khí mêtan trong khí quyển tạo nên màu xanh ngọc lam huyền thoại.',
    color: '#80deea'
  },
  neptune: {
    id: 'neptune',
    name: 'Sao Hải Vương (Poseidon)',
    system: 'Hệ Mặt Trời',
    type: 'Hành tinh băng viền ngoài',
    diameter: '49,244 km',
    mass: '1.024 × 10²⁶ kg (17.1 lần Trái Đất)',
    temp: '-214°C',
    distance: '4.495 tỷ km từ Mặt Trời',
    orbitalPeriod: '164.8 năm Trái Đất',
    atmosphere: '80% Hydro, 19% Heli, 1.5% Mêtan',
    history: 'Hành tinh xa nhất hệ Mặt Trời. Nơi đây có những cơn cuồng phong siêu thanh mạnh nhất hệ Mặt Trời, đạt tốc độ khủng khiếp 2,100 km/h.',
    color: '#42a5f5'
  },
  pluto: {
    id: 'pluto',
    name: 'Sao Diêm Vương (Pluto)',
    system: 'Vành đai Kuiper',
    type: 'Hành tinh lùn băng tuyết (Dwarf Planet)',
    diameter: '2,376 km (18% Trái Đất)',
    mass: '1.30 × 10²² kg (0.002 Trái Đất)',
    temp: '-230°C',
    distance: '5.9 tỷ km từ Mặt Trời (39.5 AU)',
    orbitalPeriod: '248 năm Trái Đất',
    atmosphere: 'Nitơ, Mê-tan và CO đóng băng',
    history: 'Từng được coi là hành tinh thứ 9 cho đến năm 2006. Tàu New Horizons năm 2015 chụp được đồng bằng băng hình trái tim khổng lồ mang tên Sputnik Planitia, hé lộ một thế giới địa chất năng động bất ngờ.',
    color: '#d7ccc8'
  },

  // 2. CÁC HÀNH TINH NGOÀI HỆ KỲ BÍ (EXOTIC EXOPLANETS)
  cancri_55: {
    id: 'cancri_55',
    name: '55 Cancri e (Janssen)',
    system: 'Chòm sao Cự Giải',
    type: 'Siêu Trái Đất Kim Cương & Nham Thạch',
    diameter: '24,000 km (Gấp 1.9 lần Trái Đất)',
    mass: '8.6 lần khối lượng Trái Đất',
    temp: '2,500°C (Mặt hướng sao mẹ)',
    distance: '41 năm ánh sáng',
    orbitalPeriod: '18 giờ (Cực kỳ gần sao mẹ)',
    atmosphere: 'Hơi khoáng chất, axit hydrocyanic',
    history: 'Được mệnh danh là "Hành tinh kim cương". Do giàu carbon và chịu áp suất khủng khiếp, các nhà khoa học tính toán phần lớn lớp phủ bên trong của nó được tạo thành từ kim cương tinh khiết, bề mặt là các đại dương nham thạch sôi sục.',
    color: '#ff3d00'
  },
  hd_189733b: {
    id: 'hd_189733b',
    name: 'HD 189733b',
    system: 'Chòm sao Hồ Ly (Vulpecula)',
    type: 'Sao Mộc nóng / Mưa thủy tinh ngang',
    diameter: '160,000 km (Gấp 1.14 Sao Mộc)',
    mass: '1.16 lần Sao Mộc',
    temp: '1,000°C',
    distance: '64.5 năm ánh sáng',
    orbitalPeriod: '2.2 ngày Trái Đất',
    atmosphere: 'Khí Silicat, Natri, Hơi nước',
    history: 'Mang màu xanh lam tuyệt đẹp của đại dương sâu nhưng thực chất là một cơn ác mộng thiên văn: bầu khí quyển chứa các hạt silicat nóng chảy, kết hợp cuồng phong 8,700 km/h tạo ra những trận "mưa thủy tinh sắc nhọn bay ngang".',
    color: '#0d47a1'
  },
  kepler_186f: {
    id: 'kepler_186f',
    name: 'Kepler-186f',
    system: 'Hệ sao Kepler-186',
    type: 'Hành tinh đất đá vùng Goldilocks',
    diameter: '14,100 km (1.11 Trái Đất)',
    mass: 'Khoảng 1.4 lần Trái Đất',
    temp: '-45°C',
    distance: '582 năm ánh sáng',
    orbitalPeriod: '130 ngày',
    atmosphere: 'Nitơ, CO₂ có khả năng duy trì nhiệt',
    history: 'Hành tinh kích thước tương đương Trái Đất đầu tiên được phát hiện nằm trọn trong vùng có thể sống được quanh một ngôi sao lùn đỏ. Do ánh sáng sao mẹ thiên về dải đỏ, thực vật ở đây nếu tồn tại sẽ có màu đỏ thẫm hoặc đen thay vì xanh lục.',
    color: '#c2185b'
  },
  proxima_b: {
    id: 'proxima_b',
    name: 'Proxima Centauri b',
    system: 'Hệ 3 sao Alpha Centauri',
    type: 'Hành tinh ngoại hệ gần Trái Đất nhất',
    diameter: '13,600 km (1.07 Trái Đất)',
    mass: '1.17 khối lượng Trái Đất',
    temp: '-39°C',
    distance: '4.24 năm ánh sáng (~40 nghìn tỷ km)',
    orbitalPeriod: '11.2 ngày',
    atmosphere: 'Nghi ngờ có Nitơ hoặc bị bão từ bào mòn',
    history: 'Mục tiêu số 1 cho các phi vụ du hành liên sao của loài người. Nằm trong vùng Goldilocks của ngôi sao lùn đỏ lân cận Proxima Centauri.',
    color: '#e57373'
  },
  trappist_1e: {
    id: 'trappist_1e',
    name: 'TRAPPIST-1e',
    system: 'Hệ 7 kỳ quan TRAPPIST-1',
    type: 'Hành tinh đất đá / Ứng viên đại dương',
    diameter: '11,700 km (0.91 Trái Đất)',
    mass: '0.69 khối lượng Trái Đất',
    temp: '-22°C (Có thể có nước lỏng)',
    distance: '39.5 năm ánh sáng',
    orbitalPeriod: '6.1 ngày',
    atmosphere: 'Khí quyển ổn định giàu khí trơ',
    history: 'Chỉ số tương đồng Trái Đất (ESI) lên tới 0.85. Là ứng viên sáng giá bậc nhất trong việc tìm kiếm đại dương và sự sống ngoài Thái Dương Hệ.',
    color: '#81c784'
  },
  kepler_452b: {
    id: 'kepler_452b',
    name: 'Kepler-452b (Earth 2.0)',
    system: 'Hệ sao Kepler-452',
    type: 'Siêu Trái Đất / Anh em họ của Terra',
    diameter: '20,380 km (Gấp 1.6 lần Trái Đất)',
    mass: 'Khoảng 5 lần Trái Đất',
    temp: '-8°C',
    distance: '1,400 năm ánh sáng',
    orbitalPeriod: '385 ngày (Giống hệt Trái Đất)',
    atmosphere: 'Khí quyển dày, hoạt động núi lửa mạnh',
    history: 'Quay quanh một ngôi sao loại G có tuổi đời 6 tỷ năm (già hơn Mặt Trời 1.5 tỷ năm). Thường được coi là bức tranh dự báo tương lai xa của Trái Đất.',
    color: '#ba68c8'
  },

  // 3. ĐẠI NGÂN HÀ (GALACTIC SCALE)
  milky_way: {
    id: 'milky_way',
    name: 'Dải Ngân Hà (Milky Way)',
    system: 'Nhóm Địa Phương (Local Group)',
    type: 'Ngân hà xoắn ốc có thanh (SBbc)',
    diameter: '100,000 năm ánh sáng',
    mass: '1.5 × 10¹² khối lượng Mặt Trời',
    temp: 'Trung tâm hàng triệu K (Hố đen Sgr A*)',
    distance: 'Quê hương của nhân loại',
    orbitalPeriod: '230 triệu năm / chu kỳ quay dải sao',
    atmosphere: 'Khí Hydro, Heli, Bụi tinh vân liên sao',
    history: 'Chứa từ 100 đến 400 tỷ ngôi sao. Tại tâm là hố đen siêu khối lượng Sagittarius A* nặng gấp 4.3 triệu lần Mặt Trời.',
    color: '#80cbc4'
  },
  andromeda: {
    id: 'andromeda',
    name: 'Ngân hà Tiên Nữ (Andromeda / M31)',
    system: 'Nhóm Địa Phương (Local Group)',
    type: 'Ngân hà xoắn ốc khổng lồ (SA(s)b)',
    diameter: '220,000 năm ánh sáng',
    mass: '1.23 × 10¹² khối lượng Mặt Trời',
    temp: 'Quần tụ hàng nghìn tỷ sao',
    distance: '2.537 triệu năm ánh sáng',
    orbitalPeriod: 'Đang tiến về phía Ngân Hà với 110 km/s',
    atmosphere: 'Quầng khí khổng lồ bao trùm 2 triệu năm ánh sáng',
    history: 'Ngân hà lớn nhất nhóm địa phương, chứa 1,000 tỷ ngôi sao. Dự kiến sẽ va chạm và hợp nhất với Ngân Hà sau 4.5 tỷ năm tạo thành thiên hà Milkomeda.',
    color: '#9fa8da'
  },
  whirlpool: {
    id: 'whirlpool',
    name: 'Ngân hà Xoáy Nước (Whirlpool / M51)',
    system: 'Chòm sao Lạp Khuyển',
    type: 'Ngân hà xoắn ốc thiết kế cổ điển (SA(s)bc)',
    diameter: '76,000 năm ánh sáng',
    mass: '160 tỷ khối lượng Mặt Trời',
    temp: 'Tâm bức xạ tia X dữ dội',
    distance: '23 triệu năm ánh sáng',
    orbitalPeriod: 'Tương tác hấp dẫn với thiên hà lùn NGC 5195',
    atmosphere: 'Các nhánh xoắn ốc chứa đầy vườn ươm sao mới sinh',
    history: 'Một trong những ngân hà xoắn ốc đẹp nhất từng được chụp. Các cánh tay xoắn ốc hoàn hảo được uốn nắn bởi lực thủy triều hấp dẫn khi nó tương tác với ngân hà lùn đồng hành.',
    color: '#e040fb'
  },
  sombrero: {
    id: 'sombrero',
    name: 'Ngân hà Mũ Vành (Sombrero / M104)',
    system: 'Chòm sao Xử Nữ',
    type: 'Ngân hà thấu kính có đĩa bụi (SAa)',
    diameter: '50,000 năm ánh sáng',
    mass: '800 tỷ khối lượng Mặt Trời',
    temp: 'Lõi phát xạ cực quang',
    distance: '29.3 triệu năm ánh sáng',
    orbitalPeriod: 'Quay quanh tâm cụm Xử Nữ',
    atmosphere: 'Vành đai bụi tối hấp thụ ánh sáng',
    history: 'Hình dáng chiếc mũ rộng vành Mexico với đĩa bụi tối viền ngoài bao quanh phần phình trung tâm khổng lồ sáng rực. Tâm chứa hố đen siêu nặng gấp 1 tỷ lần Mặt Trời.',
    color: '#ffab91'
  }
};

// ==========================================================================
// TRÌNH ĐIỀU PHỐI VŨ TRỤ 2.0 (COSMOS APP 2.0)
// ==========================================================================
class CosmosApp {
  constructor() {
    this.container = document.getElementById('canvasContainer');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();

    // Groups
    this.solarGroup = new THREE.Group();
    this.exoplanetGroup = new THREE.Group();
    this.galaxyGroup = new THREE.Group();

    // State
    this.timeScale = 1.0;
    this.currentScaleMode = 'solar';
    this.planets = [];
    this.currentFocusTarget = null;
    this.targetCameraPos = new THREE.Vector3();
    this.targetLookAtPos = new THREE.Vector3();
    this.isWarpingCamera = false;

    // Subsystems
    this.fleetManager = null;
    this.eventManager = null;
    this.damageManager = null;
    this.playerShip = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // DOM References
    this.hudPanel = document.getElementById('holoHudPanel');
    this.hudName = document.getElementById('hudName');
    this.hudType = document.getElementById('hudType');
    this.hudDiameter = document.getElementById('hudDiameter');
    this.hudMass = document.getElementById('hudMass');
    this.hudTemp = document.getElementById('hudTemp');
    this.hudDist = document.getElementById('hudDist');
    this.hudPeriod = document.getElementById('hudPeriod');
    this.hudAtmo = document.getElementById('hudAtmo');
    this.hudHistory = document.getElementById('hudHistory');
    this.hudWireframeCanvas = document.getElementById('hudWireframe');
    this.hudCloseBtn = document.getElementById('hudCloseBtn');
    this.hudWarpBtn = document.getElementById('hudWarpBtn');
    this.hudScanBtn = document.getElementById('hudScanBtn');
    this.targetCrosshair = document.getElementById('targetCrosshair');
    this.targetLabel = document.getElementById('targetCrosshairLabel');
    this.broadcastBanner = document.getElementById('broadcastBanner');
    this.bannerTitle = document.getElementById('bannerTitle');
    this.bannerDesc = document.getElementById('bannerDesc');

    this.init();
  }

  init() {
    // 1. Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020208, 0.00012);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.5, 300000);
    this.camera.position.set(0, 240, 520);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.container.appendChild(this.renderer.domElement);

    if (window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxDistance = 160000;
      this.controls.minDistance = 8;
    }

    const ambientLight = new THREE.AmbientLight(0x282845, 1.4);
    this.scene.add(ambientLight);

    this.createCosmicStarfield();
    this.scene.add(this.solarGroup);
    this.scene.add(this.exoplanetGroup);
    this.scene.add(this.galaxyGroup);

    // 2. Initialize Subsystems (Damage, Fleet, Event, Player Ship)
    this.damageManager = new CelestialDamageManager(this.scene);
    window.celestialDamage = this.damageManager;

    this.fleetManager = new FleetManager(this.scene);
    this.eventManager = new CosmicEventManager(this.scene, this.fleetManager);
    this.eventManager.setBroadcastCallback((title, desc, type) => this.showBroadcast(title, desc, type));

    this.playerShip = new PlayerShipManager(this.scene, this.camera, this.fleetManager);
    window.playerShip = this.playerShip;

    // 3. Build Celestial Bodies
    this.buildSolarSystem();
    this.buildExoplanetSystems();
    this.buildGalaxies();

    // 4. Register planets with Damage Manager
    this.planets.forEach(p => this.damageManager.registerPlanet(p));

    // 5. Setup Listeners & UI
    this.setupEventListeners();
    this.setupUIBindings();

    this.animate();
  }

  // --- BẦU TRỜI SAO VĨ ĐẠI (COSMIC STARFIELD) ---
  createCosmicStarfield() {
    const starCount = 16000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const palette = [
      new THREE.Color(0x90caf9),
      new THREE.Color(0xffffff),
      new THREE.Color(0xffe082),
      new THREE.Color(0xff8a80),
      new THREE.Color(0xce93d8),
      new THREE.Color(0x80deea)
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 15000 + Math.random() * 85000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 3.6, vertexColors: true, transparent: true, opacity: 0.88 });
    this.scene.add(new THREE.Points(geo, mat));
  }

  // --- XÂY DỰNG HỆ MẶT TRỜI MỞ RỘNG (EXPANDED SOLAR SYSTEM) ---
  buildSolarSystem() {
    // 1. Mặt Trời
    const sunGeo = new THREE.SphereGeometry(28, 48, 48);
    const sunCanvas = this.generateHDTexture('sun');
    const sunMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sunCanvas) });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData = { dbKey: 'sun' };

    const sunLight = new THREE.PointLight(0xfff7e6, 3.4, 60000, 0.4);
    sunMesh.add(sunLight);

    // Corona Quầng Nhật Hoa
    const coronaGeo = new THREE.SphereGeometry(34, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({ color: 0xff9800, transparent: true, opacity: 0.35, side: THREE.BackSide });
    sunMesh.add(new THREE.Mesh(coronaGeo, coronaMat));

    this.solarGroup.add(sunMesh);
    this.planets.push({ mesh: sunMesh, data: ASTRONOMICAL_DB.sun, orbitRadius: 0, orbitSpeed: 0, rotSpeed: 0.003, angle: 0 });

    // 2. Danh sách hành tinh & vệ tinh
    const configs = [
      { key: 'mercury', radius: 3.4, dist: 52, speed: 0.035, rot: 0.01 },
      { key: 'venus',   radius: 6.2, dist: 80, speed: 0.024, rot: -0.006 },
      { key: 'earth',   radius: 6.6, dist: 118, speed: 0.018, rot: 0.02, hasClouds: true, hasMoon: true },
      { key: 'mars',    radius: 4.8, dist: 165, speed: 0.013, rot: 0.018 },
      { key: 'jupiter', radius: 17.5, dist: 245, speed: 0.008, rot: 0.04, hasEuropa: true },
      { key: 'saturn',  radius: 14.5, dist: 340, speed: 0.005, rot: 0.035, hasRings: true, hasTitan: true },
      { key: 'uranus',  radius: 8.8,  dist: 430, speed: 0.003, rot: 0.025 },
      { key: 'neptune', radius: 8.5,  dist: 520, speed: 0.002, rot: 0.022 },
      { key: 'pluto',   radius: 2.4,  dist: 600, speed: 0.0014, rot: 0.015 }
    ];

    configs.forEach(cfg => {
      const dbData = ASTRONOMICAL_DB[cfg.key];
      const geo = new THREE.SphereGeometry(cfg.radius, 36, 36);
      const canvas = this.generateHDTexture(cfg.key);
      const mat = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(canvas),
        roughness: 0.7,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { dbKey: cfg.key };

      // Trái Đất: Mây & Mặt Trăng
      if (cfg.hasClouds) {
        const cloudGeo = new THREE.SphereGeometry(cfg.radius + 0.3, 32, 32);
        const cloudCanvas = this.generateCloudTexture();
        const cloudMesh = new THREE.Mesh(cloudGeo, new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(cloudCanvas),
          transparent: true,
          opacity: 0.5
        }));
        mesh.add(cloudMesh);
        mesh.cloudLayer = cloudMesh;
      }

      if (cfg.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(1.6, 16, 16);
        const moonCanvas = this.generateHDTexture('moon');
        const moon = new THREE.Mesh(moonGeo, new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(moonCanvas) }));
        moon.position.set(15, 2, 0);
        moon.userData = { dbKey: 'moon' };
        mesh.add(moon);
        mesh.moonMesh = moon;
        this.planets.push({ mesh: moon, data: ASTRONOMICAL_DB.moon, orbitRadius: 0, orbitSpeed: 0, rotSpeed: 0.01, angle: 0 });
      }

      // Sao Mộc: Mặt trăng Europa
      if (cfg.hasEuropa) {
        const europaGeo = new THREE.SphereGeometry(1.8, 16, 16);
        const europaCanvas = this.generateHDTexture('europa');
        const europa = new THREE.Mesh(europaGeo, new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(europaCanvas) }));
        europa.position.set(26, 3, 0);
        europa.userData = { dbKey: 'europa' };
        mesh.add(europa);
        mesh.europaMesh = europa;
        this.planets.push({ mesh: europa, data: ASTRONOMICAL_DB.europa, orbitRadius: 0, orbitSpeed: 0, rotSpeed: 0.012, angle: 0 });
      }

      // Sao Thổ: Vành đai & Titan
      if (cfg.hasRings) {
        const ringGeo = new THREE.RingGeometry(cfg.radius * 1.4, cfg.radius * 2.6, 64);
        const ringCanvas = this.generateRingTexture();
        const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(ringCanvas),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88
        }));
        ringMesh.rotation.x = Math.PI / 2.3;
        mesh.add(ringMesh);
      }

      if (cfg.hasTitan) {
        const titanGeo = new THREE.SphereGeometry(2.2, 16, 16);
        const titanCanvas = this.generateHDTexture('titan');
        const titan = new THREE.Mesh(titanGeo, new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(titanCanvas) }));
        titan.position.set(34, -2, 0);
        titan.userData = { dbKey: 'titan' };
        mesh.add(titan);
        mesh.titanMesh = titan;
        this.planets.push({ mesh: titan, data: ASTRONOMICAL_DB.titan, orbitRadius: 0, orbitSpeed: 0, rotSpeed: 0.01, angle: 0 });
      }

      this.createOrbitPath(cfg.dist, this.solarGroup);
      this.solarGroup.add(mesh);
      this.planets.push({
        mesh: mesh,
        data: dbData,
        orbitRadius: cfg.dist,
        orbitSpeed: cfg.speed,
        rotSpeed: cfg.rot,
        angle: Math.random() * Math.PI * 2
      });
    });

    this.createAsteroidBelt(200, 225, 750, this.solarGroup);
  }

  // --- XÂY DỰNG CÁC HỆ SAO NGOẠI HÀNH TINH (EXOTIC EXOPLANETS) ---
  buildExoplanetSystems() {
    this.exoplanetGroup.position.set(2400, 0, -3400);

    const exoConfigs = [
      { key: 'cancri_55',   radius: 8.5, offset: new THREE.Vector3(-450, 40, -150), color: 0xff3d00 },
      { key: 'hd_189733b',  radius: 11.5, offset: new THREE.Vector3(-180, -30, 250), color: 0x0d47a1 },
      { key: 'kepler_186f', radius: 6.2, offset: new THREE.Vector3(120, 50, -320), color: 0xc2185b },
      { key: 'proxima_b',   radius: 5.8, offset: new THREE.Vector3(380, 20, 180), color: 0xef5350 },
      { key: 'trappist_1e', radius: 5.4, offset: new THREE.Vector3(560, -40, -120), color: 0x81c784 },
      { key: 'kepler_452b', radius: 9.2, offset: new THREE.Vector3(750, 60, 280), color: 0xab47bc }
    ];

    exoConfigs.forEach(cfg => {
      const geo = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const canvas = this.generateHDTexture(cfg.key);
      const mat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvas), roughness: 0.65 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(cfg.offset);
      mesh.userData = { dbKey: cfg.key };

      // Hologram ring
      const markerGeo = new THREE.RingGeometry(cfg.radius * 1.5, cfg.radius * 1.7, 32);
      const marker = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color: cfg.color, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
      marker.rotation.x = Math.PI / 2;
      mesh.add(marker);

      this.exoplanetGroup.add(mesh);
      this.planets.push({ mesh: mesh, data: ASTRONOMICAL_DB[cfg.key], orbitRadius: 0, orbitSpeed: 0, rotSpeed: 0.015, angle: 0 });
    });
  }

  // --- XÂY DỰNG ĐẠI NGÂN HÀ (GALAXIES) ---
  buildGalaxies() {
    this.galaxyGroup.position.set(-8500, 1600, -9500);

    const galaxyConfigs = [
      { key: 'milky_way', arms: 4, stars: 3000, radius: 480, color: 0x80cbc4, pos: new THREE.Vector3(0, 0, 0) },
      { key: 'andromeda', arms: 2, stars: 3800, radius: 700, color: 0x9fa8da, pos: new THREE.Vector3(1500, 250, -900) },
      { key: 'whirlpool', arms: 2, stars: 2800, radius: 420, color: 0xe040fb, pos: new THREE.Vector3(-1400, -200, 1000) },
      { key: 'sombrero',  arms: 1, stars: 2000, radius: 380, color: 0xffab91, pos: new THREE.Vector3(1200, -400, 1600) }
    ];

    galaxyConfigs.forEach(gCfg => {
      const group = new THREE.Group();
      group.position.copy(gCfg.pos);

      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(gCfg.stars * 3);
      const cols = new Float32Array(gCfg.stars * 3);
      const baseCol = new THREE.Color(gCfg.color);

      for (let i = 0; i < gCfg.stars; i++) {
        const r = Math.pow(Math.random(), 2) * gCfg.radius;
        const armOffset = ((i % gCfg.arms) * (2 * Math.PI)) / gCfg.arms;
        const angle = (r / gCfg.radius) * Math.PI * 3.5 + armOffset;

        pos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * (r * 0.25);
        pos[i * 3 + 1] = (Math.random() - 0.5) * (35 / (1 + r * 0.02));
        pos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * (r * 0.25);

        const c = new THREE.Color();
        c.lerpColors(new THREE.Color(0xffffff), baseCol, r / gCfg.radius);
        cols[i * 3] = c.r;
        cols[i * 3 + 1] = c.g;
        cols[i * 3 + 2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const mat = new THREE.PointsMaterial({ size: 4.0, vertexColors: true, transparent: true, opacity: 0.88, blending: THREE.AdditiveBlending });
      group.add(new THREE.Points(geo, mat));

      // Core
      const coreMesh = new THREE.Mesh(
        new THREE.SphereGeometry(20, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
      );
      coreMesh.userData = { dbKey: gCfg.key };
      group.add(coreMesh);

      this.galaxyGroup.add(group);
      this.planets.push({ mesh: coreMesh, data: ASTRONOMICAL_DB[gCfg.key], orbitRadius: 0, orbitSpeed: 0, rotSpeed: 0.002, angle: 0 });
    });
  }

  createOrbitPath(radius, parentGroup) {
    const segments = 128;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 3);
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    parentGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x37474f, transparent: true, opacity: 0.4 })));
  }

  createAsteroidBelt(minR, maxR, count, parentGroup) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = minR + Math.random() * (maxR - minR);
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    parentGroup.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 1.8, color: 0x90a4ae, transparent: true, opacity: 0.75 })));
  }

  // --- SINH TEXTURE PROCEDURAL ĐỘ NÉT CAO (HD PROCEDURAL TEXTURES) ---
  generateHDTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);

    switch (type) {
      case 'sun':
        grad.addColorStop(0, '#ff9800'); grad.addColorStop(0.5, '#ffeb3b'); grad.addColorStop(1, '#ff5722');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = 'rgba(216, 67, 21, 0.45)';
        for (let i = 0; i < 45; i++) {
          ctx.beginPath(); ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 12 + 2, 0, Math.PI * 2); ctx.fill();
        }
        break;

      case 'mercury':
        grad.addColorStop(0, '#9e9e9e'); grad.addColorStop(1, '#616161');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = '#424242';
        for (let i = 0; i < 80; i++) {
          ctx.beginPath(); ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 7 + 1, 0, Math.PI * 2); ctx.fill();
        }
        break;

      case 'venus':
        grad.addColorStop(0, '#ffecb3'); grad.addColorStop(0.5, '#ffe082'); grad.addColorStop(1, '#ffca28');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        ctx.strokeStyle = 'rgba(255, 179, 0, 0.35)'; ctx.lineWidth = 14;
        for (let j = 0; j < 20; j++) {
          ctx.beginPath(); ctx.moveTo(0, j * 16); ctx.bezierCurveTo(150, j * 16 + 20, 350, j * 16 - 20, 512, j * 16); ctx.stroke();
        }
        break;

      case 'earth':
        ctx.fillStyle = '#0d47a1'; ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = '#2e7d32';
        for (let i = 0; i < 28; i++) {
          ctx.beginPath(); ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 65 + 20, Math.random() * 40 + 15, Math.random() * Math.PI, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 512, 22); ctx.fillRect(0, 234, 512, 22);
        break;

      case 'moon':
        ctx.fillStyle = '#90a4ae'; ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = '#546e7a';
        for (let i = 0; i < 60; i++) {
          ctx.beginPath(); ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 9 + 2, 0, Math.PI * 2); ctx.fill();
        }
        break;

      case 'mars':
        grad.addColorStop(0, '#d84315'); grad.addColorStop(0.5, '#bf360c'); grad.addColorStop(1, '#e64a19');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = 'rgba(62, 39, 35, 0.45)';
        for (let i = 0; i < 35; i++) {
          ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 80 + 20, Math.random() * 15 + 5);
        }
        break;

      case 'jupiter':
        for (let y = 0; y < 256; y += 12) {
          ctx.fillStyle = (y / 12) % 2 === 0 ? '#d7ccc8' : '#bcaaa4';
          ctx.fillRect(0, y, 512, 12);
        }
        // Vết Đỏ Lớn
        ctx.fillStyle = '#c62828';
        ctx.beginPath(); ctx.ellipse(330, 150, 35, 20, 0, 0, Math.PI * 2); ctx.fill();
        break;

      case 'europa':
        ctx.fillStyle = '#e0f7fa'; ctx.fillRect(0, 0, 512, 256);
        ctx.strokeStyle = 'rgba(141, 110, 99, 0.5)'; ctx.lineWidth = 1.5;
        for (let i = 0; i < 30; i++) {
          ctx.beginPath(); ctx.moveTo(Math.random() * 512, Math.random() * 256); ctx.lineTo(Math.random() * 512, Math.random() * 256); ctx.stroke();
        }
        break;

      case 'titan':
        grad.addColorStop(0, '#ff9800'); grad.addColorStop(1, '#e65100');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        // Biển Mêtan đen thẫm
        ctx.fillStyle = '#263238';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath(); ctx.ellipse(Math.random() * 512, Math.random() * 100 + 40, Math.random() * 35 + 10, Math.random() * 20 + 8, 0, 0, Math.PI * 2); ctx.fill();
        }
        break;

      case 'pluto':
        ctx.fillStyle = '#bcaaa4'; ctx.fillRect(0, 0, 512, 256);
        // Đồng bằng hình trái tim Sputnik Planitia
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(230, 130, 28, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(265, 130, 28, 0, Math.PI * 2); ctx.fill();
        break;

      case 'cancri_55':
        // Dung nham rực cháy & Vết kim cương lấp lánh
        grad.addColorStop(0, '#ff3d00'); grad.addColorStop(0.5, '#dd2c00'); grad.addColorStop(1, '#212121');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = '#ffe57f';
        for (let i = 0; i < 40; i++) {
          ctx.beginPath(); ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 6 + 1, 0, Math.PI * 2); ctx.fill();
        }
        break;

      case 'hd_189733b':
        // Xanh lam Cobalt & Mưa thủy tinh
        grad.addColorStop(0, '#0d47a1'); grad.addColorStop(0.5, '#1565c0'); grad.addColorStop(1, '#1976d2');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 1;
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * 512; const y = Math.random() * 256;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 25, y + 5); ctx.stroke();
        }
        break;

      case 'kepler_186f':
        // Rừng đỏ thẫm / Đỏ sẫm
        grad.addColorStop(0, '#880e4f'); grad.addColorStop(0.5, '#ad1457'); grad.addColorStop(1, '#4a148c');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
        break;

      default:
        grad.addColorStop(0, '#7b1fa2'); grad.addColorStop(1, '#00e5ff');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
    }
    return canvas;
  }

  generateCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath(); ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 45 + 10, Math.random() * 15 + 5, 0, 0, Math.PI * 2); ctx.fill();
    }
    return canvas;
  }

  generateRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 1;
    const ctx = canvas.getContext('2d');
    for (let x = 0; x < 256; x++) {
      const alpha = Math.sin((x / 256) * Math.PI) * 0.85;
      ctx.fillStyle = `rgba(240, 220, 180, ${alpha * (x % 6 === 0 ? 0.25 : 0.85)})`;
      ctx.fillRect(x, 0, 1, 1);
    }
    return canvas;
  }

  // --- RAYCASTING & TỰ ĐỘNG QUÉT THIÊN THỂ (AUTO-SCAN + SUBNAUTICA VOICE) ---
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.checkHover();
    });

    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.sci-fi-ui') || e.target.closest('.event-deck') || e.target.closest('.hud-panel') || e.target.closest('.combat-log-container')) {
        return;
      }

      // Kích hoạt sự kiện hoặc tàu chiến tại tọa độ click
      if (this.eventManager && this.eventManager.selectedEventTool) {
        this.spawnEventAtClick(e);
        return;
      }

      this.checkSelection();
    });
  }

  checkHover() {
    if (this.playerShip && this.playerShip.active) return; // Đang lái tàu thì không hover
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Chỉ lấy các hành tinh còn sống và chưa bị phá hủy
    const activePlanets = this.planets.filter(p => {
      if (p.destroyed) return false;
      if (p.mesh.userData && p.mesh.userData.destroyed) return false;
      if (!p.mesh.visible) return false;
      if (this.damageManager && this.damageManager.isBodyDestroyed(p.mesh)) return false;
      return true;
    });
    const meshes = activePlanets.map(p => p.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    for (let i = 0; i < intersects.length; i++) {
      const hit = intersects[i].object;
      if (!hit.visible || hit.userData.destroyed) continue;
      if (hit.parent && (!hit.parent.visible || hit.parent.userData.destroyed)) continue;

      const key = hit.userData.dbKey || (hit.parent && hit.parent.userData.dbKey);
      if (!key) continue;

      // Kiểm tra nếu thiên thể đã bị phá hủy thì bỏ qua không hover
      if (this.damageManager && (this.damageManager.isKeyDestroyed(key) || this.damageManager.isBodyDestroyed(hit))) {
        continue;
      }

      if (ASTRONOMICAL_DB[key]) {
        this.targetCrosshair.style.display = 'block';
        this.targetLabel.textContent = ASTRONOMICAL_DB[key].name;
        document.body.style.cursor = 'pointer';
        return;
      }
    }

    this.targetCrosshair.style.display = 'none';
    if (!this.eventManager || !this.eventManager.selectedEventTool) {
      document.body.style.cursor = 'default';
    }
  }

  checkSelection() {
    if (this.playerShip && this.playerShip.active) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Chỉ lấy các hành tinh còn sống và chưa bị phá hủy
    const activePlanets = this.planets.filter(p => {
      if (p.destroyed) return false;
      if (p.mesh.userData && p.mesh.userData.destroyed) return false;
      if (!p.mesh.visible) return false;
      if (this.damageManager && this.damageManager.isBodyDestroyed(p.mesh)) return false;
      return true;
    });
    const meshes = activePlanets.map(p => p.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    for (let i = 0; i < intersects.length; i++) {
      const hit = intersects[i].object;
      if (!hit.visible || hit.userData.destroyed) continue;
      if (hit.parent && (!hit.parent.visible || hit.parent.userData.destroyed)) continue;

      const key = hit.userData.dbKey || (hit.parent && hit.parent.userData.dbKey);
      if (!key) continue;

      // KIỂM TRA: Nếu thiên thể đã bị phá hủy thì tuyệt đối không cho nhấn để xem thông tin
      if (this.damageManager && (this.damageManager.isKeyDestroyed(key) || this.damageManager.isBodyDestroyed(hit))) {
        continue;
      }

      if (ASTRONOMICAL_DB[key]) {
        this.selectAndAutoScan(key, hit);
        return;
      }
    }
  }

  // Tự động quét khi click vào hành tinh
  selectAndAutoScan(key, mesh) {
    // Không cho phép quét hoặc mở thông tin nếu thiên thể đã bị phá hủy
    if (this.damageManager && (this.damageManager.isKeyDestroyed(key) || this.damageManager.isBodyDestroyed(mesh))) {
      return;
    }
    if (mesh.userData?.destroyed || (mesh.parent && mesh.parent.userData?.destroyed)) {
      return;
    }

    const data = ASTRONOMICAL_DB[key];
    this.currentFocusTarget = mesh;

    // 1. Điền dữ liệu vào Hologram HUD
    this.hudName.textContent = data.name;
    this.hudType.textContent = data.type;
    this.hudDiameter.textContent = data.diameter;
    this.hudMass.textContent = data.mass;
    this.hudTemp.textContent = data.temp;
    this.hudDist.textContent = data.distance;
    this.hudPeriod.textContent = data.orbitalPeriod;
    this.hudAtmo.textContent = data.atmosphere;
    this.hudHistory.textContent = data.history;

    this.hudPanel.classList.add('active');

    // 2. Camera trượt mượt mà đến góc quan sát
    this.warpCameraToTarget(mesh);

    // 3. Giọng AI Chỉ Huy tự động quét và đọc thông tin!
    if (window.pdaVoice) {
      window.pdaVoice.onScanPlanet(data.name, key);
    }

    // 4. Vẽ mô hình Wireframe quét động
    this.renderWireframeScan(data.color);

    if (this.damageManager) {
      this.damageManager.logImpact('QUÉT THIÊN THỂ TỰ ĐỘNG', `Hệ thống quang phổ đã phân tích thành công [${data.name}]. Dữ liệu đã đồng bộ.`, 'info');
    }
  }

  // Xử lý khi một thiên thể bị phá hủy: đóng HUD nếu đang xem thiên thể đó
  onCelestialDestroyed(key) {
    const focusKey = this.currentFocusTarget ? 
      (this.currentFocusTarget.userData?.dbKey || this.currentFocusTarget.parent?.userData?.dbKey) : null;
    
    if (focusKey === key || key === 'sun') {
      this.currentFocusTarget = null;
      if (this.hudPanel) this.hudPanel.classList.remove('active');
      if (this.targetCrosshair) this.targetCrosshair.style.display = 'none';
      document.body.style.cursor = 'default';
    }
  }

  warpCameraToTarget(targetMesh) {
    if (!targetMesh) return;
    const worldPos = new THREE.Vector3();
    targetMesh.getWorldPosition(worldPos);

    const boundingBox = new THREE.Box3().setFromObject(targetMesh);
    const size = boundingBox.getSize(new THREE.Vector3()).length();
    const distance = Math.max(22, size * 2.6);

    this.targetLookAtPos.copy(worldPos);
    this.targetCameraPos.copy(worldPos).add(new THREE.Vector3(distance * 0.8, distance * 0.5, distance));
    this.isWarpingCamera = true;

    if (window.CosmosAudio) window.CosmosAudio.playWarpJump();
  }

  renderWireframeScan(colorHex = '#00e5ff') {
    const canvas = this.hudWireframeCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 38;

    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 1.5;

    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.4, Math.PI / 6, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.4, r, Math.PI / 6, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.beginPath();
    ctx.moveTo(cx - r - 10, cy); ctx.lineTo(cx + r + 10, cy);
    ctx.moveTo(cx, cy - r - 10); ctx.lineTo(cx, cy + r + 10);
    ctx.stroke();
  }

  spawnEventAtClick(e) {
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const target = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(plane, target);

    if (target) {
      this.eventManager.triggerEvent(this.eventManager.selectedEventTool, target);
      this.clearSelectedEventTool();
    }
  }

  setSelectedEventTool(toolType) {
    if (this.eventManager.selectedEventTool === toolType) {
      this.clearSelectedEventTool();
      return;
    }
    this.eventManager.selectedEventTool = toolType;
    document.body.style.cursor = 'crosshair';

    document.querySelectorAll('.event-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.event-btn[data-event="${toolType}"]`);
    if (btn) btn.classList.add('active');

    this.showBroadcast('HỒNG TÂM CHIẾN THUẬT SẴN SÀNG', `Nhấp vào bất kỳ vị trí nào trong không gian để kích hoạt: [${toolType.toUpperCase()}]`, 'info');
    if (window.CosmosAudio) window.CosmosAudio.playUiBeep(1400);
  }

  clearSelectedEventTool() {
    this.eventManager.selectedEventTool = null;
    document.body.style.cursor = 'default';
    document.querySelectorAll('.event-btn').forEach(b => b.classList.remove('active'));
  }

  showBroadcast(title, desc, type = 'info') {
    this.bannerTitle.textContent = title;
    this.bannerDesc.textContent = desc;
    this.broadcastBanner.className = `broadcast-banner active ${type}`;
    setTimeout(() => { this.broadcastBanner.classList.remove('active'); }, 6500);
  }

  setupUIBindings() {
    this.hudCloseBtn.addEventListener('click', () => {
      this.hudPanel.classList.remove('active');
      if (window.CosmosAudio) window.CosmosAudio.playUiBeep(800);
    });

    this.hudWarpBtn.addEventListener('click', () => {
      if (this.currentFocusTarget) this.warpCameraToTarget(this.currentFocusTarget);
    });

    this.hudScanBtn.addEventListener('click', () => {
      if (window.CosmosAudio) window.CosmosAudio.playUiBeep(1600);
      this.showBroadcast('QUÉT NĂNG LƯỢNG CAO CẤP', 'Dữ liệu quang phổ học và thành phần từ trường đã được đồng bộ.', 'info');
      if (window.pdaVoice) window.pdaVoice.speak("Deep spectral analysis complete. Data synchronized.", "[AI CHỈ HUY] \"Dữ liệu quang phổ đã đồng bộ vào nhật ký hạm đội.\"");
    });

    // Scale Switchers
    document.querySelectorAll('.scale-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-scale');
        this.switchCosmicScale(mode);
        document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Time Speeds
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.timeScale = parseFloat(btn.getAttribute('data-speed'));
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (window.CosmosAudio) window.CosmosAudio.playUiBeep(1000);
      });
    });

    // Event Deck
    document.querySelectorAll('.event-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const evType = btn.getAttribute('data-event');
        this.setSelectedEventTool(evType);
      });
    });

    // Sound
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const on = window.CosmosAudio.toggleSound();
        soundBtn.style.opacity = on ? '1' : '0.4';
      });
    }

    // Auto Events
    const autoEventCheckbox = document.getElementById('autoEventToggle');
    if (autoEventCheckbox) {
      autoEventCheckbox.addEventListener('change', (e) => {
        this.eventManager.autoEventsActive = e.target.checked;
        this.showBroadcast('HỆ THỐNG SỰ KIỆN TỰ ĐỘNG', e.target.checked ? 'Đã bật chế độ sinh biến cố ngẫu nhiên.' : 'Đã tạm dừng biến cố ngẫu nhiên.', 'info');
      });
    }
  }

  switchCosmicScale(mode) {
    this.currentScaleMode = mode;
    if (window.CosmosAudio) window.CosmosAudio.playWarpJump();

    switch (mode) {
      case 'solar':
        this.targetCameraPos.set(0, 260, 520);
        this.targetLookAtPos.set(0, 0, 0);
        this.isWarpingCamera = true;
        this.showBroadcast('ĐIỀU HƯỚNG TỌA ĐỘ', 'Đã chuyển góc nhìn về Hệ Mặt Trời.', 'info');
        break;
      case 'exoplanets':
        this.targetCameraPos.set(2400, 260, -2800);
        this.targetLookAtPos.set(2400, 0, -3400);
        this.isWarpingCamera = true;
        this.showBroadcast('NHẢY BƯỚC LIÊN SAO', 'Đến các Hành Tinh Kỳ Bí (55 Cancri e, HD 189733b, Kepler-186f).', 'info');
        break;
      case 'galaxy':
        this.targetCameraPos.set(-8500, 2400, -7200);
        this.targetLookAtPos.set(-8500, 1600, -9500);
        this.isWarpingCamera = true;
        this.showBroadcast('QUY MÔ ĐẠI NGÂN HÀ', 'Quan sát Ngân Hà (Milky Way), Andromeda, Whirlpool và Sombrero.', 'info');
        break;
    }
  }

  // --- VÒNG LẶP RENDER CHÍNH (ANIMATION LOOP 60-120FPS) ---
  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const effectiveDelta = delta * this.timeScale;

    // 1. Chuyển động hành tinh
    this.planets.forEach(p => {
      p.mesh.rotation.y += p.rotSpeed * effectiveDelta * 20;

      if (p.isRogue && p.rogueVelocity) {
        // HÀNH TINH LANG THANG (ROGUE PLANET): Không còn lực hấp dẫn mặt trời, bay thẳng theo tiếp tuyến vào không gian sâu!
        p.mesh.position.addScaledVector(p.rogueVelocity, effectiveDelta);
      } else if (p.orbitRadius > 0) {
        p.angle += p.orbitSpeed * effectiveDelta * 0.4;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitRadius;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitRadius;
      }

      if (p.mesh.cloudLayer) p.mesh.cloudLayer.rotation.y += 0.004 * effectiveDelta * 20;
      if (p.mesh.moonMesh) {
        const a = Date.now() * 0.0015 * this.timeScale;
        p.mesh.moonMesh.position.set(Math.cos(a) * 15, 0, Math.sin(a) * 15);
      }
      if (p.mesh.europaMesh) {
        const a = Date.now() * 0.002 * this.timeScale;
        p.mesh.europaMesh.position.set(Math.cos(a) * 26, 0, Math.sin(a) * 26);
      }
      if (p.mesh.titanMesh) {
        const a = Date.now() * 0.001 * this.timeScale;
        p.mesh.titanMesh.position.set(Math.cos(a) * 34, 0, Math.sin(a) * 34);
      }
    });

    // 2. Cập nhật Hạm đội AI, Sự kiện, Phá hủy thiên thể, Phi thuyền người chơi
    if (this.fleetManager) this.fleetManager.update(effectiveDelta);
    if (this.eventManager) this.eventManager.update(delta);
    if (this.damageManager) this.damageManager.update(effectiveDelta);
    if (this.playerShip) this.playerShip.update(delta);

    // 3. Camera Smooth Warp
    if (this.isWarpingCamera && (!this.playerShip || !this.playerShip.active)) {
      this.camera.position.lerp(this.targetCameraPos, 0.06);
      if (this.controls) this.controls.target.lerp(this.targetLookAtPos, 0.08);
      if (this.camera.position.distanceTo(this.targetCameraPos) < 2.0) {
        this.isWarpingCamera = false;
      }
    }

    // 4. Update OrbitControls khi không lái tàu
    if (this.controls && (!this.playerShip || !this.playerShip.active)) {
      this.controls.enabled = true;
      this.controls.update();
    } else if (this.controls) {
      this.controls.enabled = false;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cosmos = new CosmosApp();
});
