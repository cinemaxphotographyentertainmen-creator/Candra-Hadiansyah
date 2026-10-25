export interface RegencyInfo {
  id: string;
  name: string;
  nickname: string;
  capital: string;
  coordinates: { lat: number; lng: number };
  svgCoords: { x: number; y: number };
  ethnicities: string[];
  traditionalFood: string;
  highlightCount: { destinations: number; documentaries: number };
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  regencyId: string;
  regencyName: string;
  category: 'Keraton' | 'Rumah Adat' | 'Situs Bersejarah' | 'Cagar Alam Budaya' | 'Sentra Kriya';
  shortDesc: string;
  longDesc: string;
  history: string;
  image: string;
  admissionFee: string;
  openingHours: string;
  address: string;
  etiquette: string[];
  audioGuideDuration: string;
  heritageStatus: string;
  tags: string[];
  coordinates: { lat: number; lng: number };
  recommendedStay: string;
  photographer?: string;
  panorama360?: string;
}

export interface DocumentaryFilm {
  id: string;
  title: string;
  regencyId: string;
  regencyName: string;
  category: 'Ritual & Tradisi' | 'Seni Musik & Tari' | 'Kriya & Tenun' | 'Arsitektur Leluhur' | 'Sejarah Maritim';
  synopsis: string;
  duration: string;
  releaseYear: number;
  director: string;
  production: string;
  thumbnail: string;
  videoUrl?: string;
  awards: string[];
  ethnicGroup: string;
  chapters: { title: string; timestamp: string; seconds: number }[];
  subtitles: { lang: string; label: string }[];
  curatorNotes: string;
  rating: number;
  reviewCount: number;
}

export interface CulturalPhoto {
  id: string;
  title: string;
  location: string;
  regency: string;
  category: string;
  imageUrl: string;
  photographer: string;
  cameraInfo: string;
  description: string;
}

export const REGION_LIST: RegencyInfo[] = [
  {
    id: 'pontianak',
    name: 'Kota Pontianak',
    nickname: 'Kota Khatulistiwa',
    capital: 'Pontianak',
    coordinates: { lat: -0.0263, lng: 109.3425 },
    svgCoords: { x: 195, y: 220 },
    ethnicities: ['Melayu', 'Tionghoa (Teochew)', 'Dayak', 'Bugis', 'Jawa'],
    traditionalFood: 'Sotong Pangkong, Kwe Tiaw Polo, Bubur Pedas Pontianak',
    highlightCount: { destinations: 5, documentaries: 3 },
    description: 'Kota yang dilintasi tepat garis Khatulistiwa di muara Sungai Kapuas dan Landak, didirikan oleh Sultan Syarif Abdurrahman Alkadrie pada 1771.'
  },
  {
    id: 'singkawang',
    name: 'Kota Singkawang',
    nickname: 'Kota Seribu Kelenteng',
    capital: 'Singkawang',
    coordinates: { lat: 0.9056, lng: 108.9869 },
    svgCoords: { x: 175, y: 140 },
    ethnicities: ['Tionghoa (Hakka)', 'Dayak', 'Melayu (Tidayu)'],
    traditionalFood: 'Choipan Singkawang, Rujak Ebi, Kembang Tahu',
    highlightCount: { destinations: 4, documentaries: 3 },
    description: 'Pusat akulturasi harmonis Tidayu (Tionghoa, Dayak, Melayu) terkenal di dunia lewat kemegahan festival Cap Go Meh dan ritual Tatung.'
  },
  {
    id: 'sambas',
    name: 'Kabupaten Sambas',
    nickname: 'Serambi Mekkah Kalbar',
    capital: 'Sambas',
    coordinates: { lat: 1.3615, lng: 109.3045 },
    svgCoords: { x: 200, y: 70 },
    ethnicities: ['Melayu Sambas', 'Dayak Salako', 'Tionghoa'],
    traditionalFood: 'Bubur Pedas Sambas Asli, Paceri Nanas',
    highlightCount: { destinations: 3, documentaries: 2 },
    description: 'Kawasan pesisir utara dengan warisan Kesultanan Alwatzikhoebillah dan sentra maestro Tenun Songket Benang Emas Lunggi Sambas bertaraf dunia.'
  },
  {
    id: 'bengkayang',
    name: 'Kabupaten Bengkayang',
    nickname: 'Bumi Sebalo Berperbatasan',
    capital: 'Bengkayang',
    coordinates: { lat: 0.8225, lng: 109.6644 },
    svgCoords: { x: 245, y: 135 },
    ethnicities: ['Dayak Bidayuh', 'Dayak Bakati', 'Melayu', 'Tionghoa'],
    traditionalFood: 'Lemang Sungki, Tuak Manis Beras Ketan',
    highlightCount: { destinations: 3, documentaries: 2 },
    description: 'Wilayah perbatasan RI-Malaysia yang melestarikan arsitektur sakral Rumah Adat Baluk bundar dan tradisi sakral ritual Nyobeng di Jagoi Babang.'
  },
  {
    id: 'landak',
    name: 'Kabupaten Landak',
    nickname: 'Bumi Intan & Adat Dayak',
    capital: 'Ngabang',
    coordinates: { lat: 0.3872, lng: 109.9573 },
    svgCoords: { x: 280, y: 195 },
    ethnicities: ['Dayak Kanayatn', 'Melayu Landak'],
    traditionalFood: 'Lemang Batang Bambu, Dange Daun Pisang',
    highlightCount: { destinations: 3, documentaries: 2 },
    description: 'Pusat kebudayaan Dayak Kanayatn dengan rumah panjang Radakng Sahapm tertua serta Keraton Kesultanan Ismahayana Ngabang.'
  },
  {
    id: 'mempawah',
    name: 'Kabupaten Mempawah',
    nickname: 'Bumi Galaherang',
    capital: 'Mempawah',
    coordinates: { lat: 0.3667, lng: 109.1833 },
    svgCoords: { x: 185, y: 180 },
    ethnicities: ['Melayu Mempawah', 'Bugis Opu', 'Dayak', 'Tionghoa'],
    traditionalFood: 'Pengkang Bakar Santan Asli Peniti',
    highlightCount: { destinations: 3, documentaries: 2 },
    description: 'Pusat Kesultanan Amantubillah Mempawah yang merayakan upacara bahari tolak bala Robo-Robo dan makam pahlawan Opu Daeng Manambon.'
  },
  {
    id: 'sanggau',
    name: 'Kabupaten Sanggau',
    nickname: 'Bumi Daranante',
    capital: 'Kapuas Sanggau',
    coordinates: { lat: 0.1256, lng: 110.5912 },
    svgCoords: { x: 350, y: 220 },
    ethnicities: ['Dayak Hibun', 'Dayak Tayan', 'Melayu Sanggau'],
    traditionalFood: 'Kue Lapis Belacan Sanggau, Ikan Asam Pedas Tempoyak',
    highlightCount: { destinations: 3, documentaries: 1 },
    description: 'Terkenal dengan Keraton Surya Negara, tradisi Paradje’ Pesaka Negeri, serta keindahan cagar budaya Rumah Adat Dayak Tayan di tepian Kapuas.'
  },
  {
    id: 'sekadau',
    name: 'Kabupaten Sekadau',
    nickname: 'Bumi Lawang Kuari',
    capital: 'Sekadau',
    coordinates: { lat: 0.0383, lng: 110.9511 },
    svgCoords: { x: 410, y: 230 },
    ethnicities: ['Dayak Mualang', 'Melayu Sekadau', 'Dayak Ketungau'],
    traditionalFood: 'Ikan Baung Bakar Bambu, Kue Bingka Sekadau',
    highlightCount: { destinations: 2, documentaries: 1 },
    description: 'Menyimpan situs arkeologis ceruk bertulis Lawang Kuari dan kekayaan tarian sakral Dayak Mualang Ajat Temu Datun.'
  },
  {
    id: 'sintang',
    name: 'Kabupaten Sintang',
    nickname: 'Bumi Senentang',
    capital: 'Sintang',
    coordinates: { lat: 0.0706, lng: 111.4984 },
    svgCoords: { x: 480, y: 225 },
    ethnicities: ['Dayak Desa', 'Dayak Ensaid', 'Melayu Sintang'],
    traditionalFood: 'Kecalok Fermentasi Udang, Lempok Durian Asli Sintang',
    highlightCount: { destinations: 4, documentaries: 3 },
    description: 'Pertemuan legendaris dua sungai besar Kapuas dan Melawi di bawah naungan monolit raksasa Bukit Kelam dan sentra tenun ikat Ensaid Panjang.'
  },
  {
    id: 'melawi',
    name: 'Kabupaten Melawi',
    nickname: 'Bumi Untung Berkat Bersama',
    capital: 'Nanga Pinoh',
    coordinates: { lat: -0.3392, lng: 111.6974 },
    svgCoords: { x: 480, y: 290 },
    ethnicities: ['Dayak Kebahan', 'Dayak Limbai', 'Melayu Pinoh'],
    traditionalFood: 'Pecel Sambal Daun Kesum, Lemang Nanga Pinoh',
    highlightCount: { destinations: 2, documentaries: 1 },
    description: 'Kawasan eksotis pedalaman hulu dengan rumah panggung adat Dusun Pelanjau dan tugu bersejarah perjuangan Raden Tumenggung Setia Pahlawan.'
  },
  {
    id: 'kapuas_hulu',
    name: 'Kabupaten Kapuas Hulu',
    nickname: 'Jantung Hati Borneo (Heart of Borneo)',
    capital: 'Putussibau',
    coordinates: { lat: 0.8523, lng: 112.9329 },
    svgCoords: { x: 590, y: 170 },
    ethnicities: ['Dayak Iban', 'Dayak Tamambaloh', 'Dayak Kayan', 'Melayu Danau'],
    traditionalFood: 'Kerupuk Basah Putussibau, Ikan Semah Bakar Madu',
    highlightCount: { destinations: 4, documentaries: 4 },
    description: 'Kawasan paru-paru dunia dengan Danau Sentarum, cagar biosfer UNESCO, tenun ikat Iban bersertifikasi internasional, dan rumah betang asli berpenghuni.'
  },
  {
    id: 'ketapang',
    name: 'Kabupaten Ketapang',
    nickname: 'Bumi Ale-Ale',
    capital: 'Ketapang',
    coordinates: { lat: -1.8488, lng: 109.9758 },
    svgCoords: { x: 290, y: 380 },
    ethnicities: ['Melayu Matan', 'Dayak Simpang', 'Tionghoa'],
    traditionalFood: 'Kerang Ale-Ale Asam Pedas, Jenjorong Ketapang',
    highlightCount: { destinations: 3, documentaries: 2 },
    description: 'Pusat Kerajaan Matan Tanjungpura abad ke-14 dengan makam keramat sembilan dan tradisi maritim Tumpang Negeri yang penuh khidmat.'
  },
  {
    id: 'kayong_utara',
    name: 'Kabupaten Kayong Utara',
    nickname: 'Bumi Bertuah Bahari',
    capital: 'Sukadana',
    coordinates: { lat: -1.2501, lng: 109.9528 },
    svgCoords: { x: 260, y: 320 },
    ethnicities: ['Melayu Sukadana', 'Dayak Karimata', 'Bugis'],
    traditionalFood: 'Sotong Masak Hitam Sukadana, Lempok Durian Kayong',
    highlightCount: { destinations: 2, documentaries: 1 },
    description: 'Kabupaten bahari berlatar belakang Taman Nasional Gunung Palung, keindahan Masjid Terapung Oesman Al-Khair, dan jejak Kerajaan Simpang.'
  },
  {
    id: 'kubu_raya',
    name: 'Kabupaten Kubu Raya',
    nickname: 'Bumi Seribu Parit',
    capital: 'Sungai Raya',
    coordinates: { lat: -0.1558, lng: 109.3986 },
    svgCoords: { x: 215, y: 250 },
    ethnicities: ['Melayu Kubu', 'Bugis', 'Dayak', 'Jawa', 'Tionghoa'],
    traditionalFood: 'Asam Pedas Ikan Kakap Sungai Raya, Air Kelapa Pandan',
    highlightCount: { destinations: 3, documentaries: 2 },
    description: 'Pintu gerbang udara Kalimantan Barat di Bandara Supadio, cagar alam mangrove purba Batu Ampar, dan Keraton Kesultanan Kubu Alaydrus.'
  }
];

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'keraton_kadriah',
    name: 'Keraton Kadriah Kesultanan Pontianak',
    regencyId: 'pontianak',
    regencyName: 'Kota Pontianak',
    category: 'Keraton',
    shortDesc: 'Istana kayu belian bersejarah pusat Kesultanan Pontianak yang didirikan pada tahun 1771.',
    longDesc: 'Keraton Kadriah merupakan istana kesultanan Melayu yang seluruh bangunannya didirikan dari kayu belian (kayu besi/ulin) berkualitas tinggi. Didirikan oleh Sultan Syarif Abdurrahman Alkadrie, istana megah berwarna kuning keemasan ini menghadap langsung ke arah Sungai Kapuas Kecil dan Sungai Landak. Di dalamnya tersimpan singgasana raja, cermin Prancis antik misterius, pedang pusaka, busana kebesaran sultan, dan kitab Al-Quran tulisan tangan sultan pertama.',
    history: 'Didirikan pada tanggal 23 Oktober 1771 oleh Syarif Abdurrahman Alkadrie, pendiri Kota Pontianak. Keraton ini menjadi saksi diplomasi masa kolonial hingga penandatanganan integrasi kedaulatan ke dalam Negara Kesatuan Republik Indonesia oleh Sultan Hamid II, perancang lambang negara Garuda Pancasila.',
    image: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    admissionFee: 'Rp 10.000 / orang (Sukarela donasi pelestarian)',
    openingHours: 'Selasa - Minggu: 09:00 - 17:00 WIB (Senin tutup)',
    address: 'Jl. Tj. Raya 1, Kampung Beting, Kelurahan Dalam Bugis, Pontianak Timur',
    etiquette: [
      'Berpakaian sopan dan tertutup (menghormati adab istana kesultanan)',
      'Lepas alas kaki saat menaiki tangga ruang utama singgasana',
      'Dilarang menyentuh cermin antik dan benda pusaka kaca tanpa izin pemandu keraton',
      'Minta izin sebelum mengambil foto di area altar singgasana utama'
    ],
    audioGuideDuration: '6 Menit 40 Detik',
    heritageStatus: 'Cagar Budaya Peringkat Nasional (No. Reg. CB.142)',
    tags: ['Kesultanan', 'Melayu', 'Arsitektur Belian', 'Sultan Hamid II', 'Sungai Kapuas'],
    coordinates: { lat: -0.0275, lng: 109.3486 },
    recommendedStay: '1.5 - 2 Jam'
  },
  {
    id: 'rumah_betang_radakng_pontianak',
    name: 'Rumah Betang Radakng Pontianak',
    regencyId: 'pontianak',
    regencyName: 'Kota Pontianak',
    category: 'Rumah Adat',
    shortDesc: 'Replika rumah panjang adat Dayak termegah dengan panjang 138 meter dan tinggi tiang 7 meter.',
    longDesc: 'Rumah Radakng Pontianak di Kawasan Perkampungan Budaya Sutoyo merupakan rumah adat panggung Dayak terpanjang di Indonesia. Mengadopsi arsitektur tradisional suku Dayak Kanayatn, bangunan ini ditopang ratusan tiang kayu ulin dengan ukiran patung burung enggang gading (hornbill) serta ukiran taring naga penolak bala. Tempat ini menjadi pusat pagelaran akbar Pekan Gawai Dayak Kalimantan Barat setiap bulan Mei.',
    history: 'Diresmikan oleh Gubernur Kalimantan Barat Cornelis pada tahun 2013 sebagai simbol pemersatu lebih dari 400 sub-suku Dayak di Kalimantan Barat dan museum hidup kebudayaan hulu.',
    image: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
    admissionFee: 'Rp 5.000 / orang',
    openingHours: 'Setiap Hari: 08:00 - 18:00 WIB',
    address: 'Jl. Sutan Syahrir No. 1, Kota Baru, Kec. Pontianak Selatan',
    etiquette: [
      'Menjaga kebersihan selasar kayu ulin dan tidak membuang puntung rokok',
      'Bersikap santun saat perayaan ritual adat Naik Dango / Gawai berlangsung',
      'Gunakan alas kaki datar untuk kenyamanan berjalan di atas kayu'
    ],
    audioGuideDuration: '5 Menit 15 Detik',
    heritageStatus: 'Pusat Pelestarian Kebudayaan Daerah Kalbar',
    tags: ['Dayak', 'Rumah Panjang', 'Pekan Gawai', 'Kayu Ulin', 'Ornamen Hornbill'],
    coordinates: { lat: -0.0421, lng: 109.3245 },
    recommendedStay: '1 - 2 Jam'
  },
  {
    id: 'marga_tjhia_singkawang',
    name: 'Cagar Budaya Rumah Keluarga Marga Tjhia',
    regencyId: 'singkawang',
    regencyName: 'Kota Singkawang',
    category: 'Situs Bersejarah',
    shortDesc: 'Kompleks hunian tradisional Tionghoa Hakka abad ke-19 di tepian Sungai Singkawang.',
    longDesc: 'Didirikan oleh Tjhia Hiap Seng pada tahun 1902, Rumah Marga Tjhia memadukan arsitektur tradisional Tiongkok Selatan dengan adaptasi tropis nusantara. Terdiri dari gerbang depan berdinding batu bata asli, ruang altar sembahyang leluhur dengan ukiran kayu jati bertinta emas, serta halaman tengah terbuka (Siheyuan / Skywell) untuk sirkulasi udara dan penampungan berkah hujan.',
    history: 'Tjhia Hiap Seng adalah saudagar perantau asal Meixian Tiongkok yang merintis perdagangan dan pelabuhan Singkawang. Rumah ini kini dirawat generasi kelima dan tetap menyajikan kue tradisional choipan resep turun-temurun.',
    image: '/src/assets/images/doc_capgomeh_singkawang_1792942703322.jpg',
    admissionFee: 'Donasi sukarela ke kotak pemeliharaan leluhur',
    openingHours: 'Setiap Hari: 08:00 - 17:30 WIB',
    address: 'Jl. Budi Utomo No. 45, Kel. Condong, Singkawang Barat',
    etiquette: [
      'Menghormati keluarga pemilik rumah dan orang yang sedang bersembahyang',
      'Tidak menggeser atau menyentuh dupa dan perlengkapan altar leluhur',
      'Dianjurkan mencicipi choipan buatan keluarga di beranda belakang tepi sungai'
    ],
    audioGuideDuration: '4 Menit 50 Detik',
    heritageStatus: 'Cagar Budaya Resmi Kota Singkawang No. 04/SK/CB/2014',
    tags: ['Tionghoa Hakka', 'Arsitektur Siheyuan', 'Cap Go Meh', 'Sejarah Singkawang'],
    coordinates: { lat: 0.9062, lng: 108.9831 },
    recommendedStay: '1 Jam'
  },
  {
    id: 'keraton_alwatzikhoebillah_sambas',
    name: 'Keraton Alwatzikhoebillah Sambas',
    regencyId: 'sambas',
    regencyName: 'Kabupaten Sambas',
    category: 'Keraton',
    shortDesc: 'Pusat kemaharajaan Melayu Islam Sambas di muara percabangan Sungai Subah dan Sambas.',
    longDesc: 'Dikenal sebagai Istana Sambas, kompleks istana ini dikelilingi pagar kayu belian dengan tiga gapura utama: Jembatan Rantai, Tiang Dua Belas, dan Balairung Sari. Memiliki koleksi meriam peninggalan VOC Belanda, kaca patri khas Eropa, serta ruang tenun pusaka tempat lahirnya motif kain tenun songket Sambas Benang Emas Lunggi yang termasyhur.',
    history: 'Didirikan oleh Raden Sulaiman bergelar Sultan Muhammad Shafiuddin I pada tahun 1675. Keraton ini merupakan benteng kebudayaan Islam dan jalur sutra maritim di Laut Natuna Utara.',
    image: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    admissionFee: 'Rp 10.000 / orang',
    openingHours: 'Setiap Hari: 08:30 - 16:30 WIB (Jumat istirahat shalat)',
    address: 'Kelurahan Dalam Kaum, Kecamatan Sambas, Kabupaten Sambas',
    etiquette: [
      'Wajib mengenakan kain selendang atau pakaian sopan tertutup',
      'Ucapkan salam saat memasuki balairung keraton',
      'Didampingi abdi dalem keraton untuk penjelasan sejarah benda pusaka'
    ],
    audioGuideDuration: '7 Menit 10 Detik',
    heritageStatus: 'Cagar Budaya Peringkat Nasional',
    tags: ['Melayu Sambas', 'Tenun Lunggi', 'Meriam Kuno', 'Sungai Sambas'],
    coordinates: { lat: 1.3628, lng: 109.3089 },
    recommendedStay: '1.5 Jam'
  },
  {
    id: 'betang_lunsa_hilir_kapuas_hulu',
    name: 'Rumah Betang Lunsa Hilir Dayak Tamambaloh',
    regencyId: 'kapuas_hulu',
    regencyName: 'Kabupaten Kapuas Hulu',
    category: 'Rumah Adat',
    shortDesc: 'Rumah panjang adat Dayak Tamambaloh tertua yang masih aktif dihuni puluhan keluarga.',
    longDesc: 'Terletak di lembah Sungai Embaloh, Rumah Betang Lunsa Hilir merupakan mahakarya kayu ulin setinggi 5 meter dari tanah dengan tangga batang kayu tunggal (tangke). Di rumah panggung ini, adat kekeluargaan hidup sangat kental; warga berkumpul di selasar terbuka (sodok) untuk menganyam manik-manik, memainkan sape\', dan menggelar musyawarah adat tetua.',
    history: 'Diperkirakan telah berdiri lebih dari 150 tahun secara turun-temurun dan pernah selamat dari kebakaran besar karena berkah spiritual leluhur suku Tamambaloh.',
    image: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
    admissionFee: 'Donasi adat desa Rp 20.000 / tamu',
    openingHours: '08:00 - 17:00 WIB (Perlu konfirmasi Temenggung Adat setempat)',
    address: 'Desa Lunsa Hilir, Kecamatan Embaloh Hulu, Kapuas Hulu',
    etiquette: [
      'Minta izin kepada Kepala Adat / Temenggung sebelum masuk',
      'Jangan melangkahi sesajen atau ukiran tiang pelindung di pintu masuk bilik',
      'Cicipi hidangan teh atau tuak beras yang disuguhkan sebagai tanda penghormatan tamu'
    ],
    audioGuideDuration: '8 Menit 30 Detik',
    heritageStatus: 'Warisan Cagar Budaya Hidup (Living Heritage) Kalbar',
    tags: ['Dayak Tamambaloh', 'Heart of Borneo', 'Rumah Panjang Asli', 'Sape'],
    coordinates: { lat: 0.9856, lng: 112.8712 },
    recommendedStay: '2 - 3 Jam'
  },
  {
    id: 'keraton_amantubillah_mempawah',
    name: 'Keraton Amantubillah Mempawah',
    regencyId: 'mempawah',
    regencyName: 'Kabupaten Mempawah',
    category: 'Keraton',
    shortDesc: 'Pusat Kesultanan Mempawah yang memadukan darah kebangsawanan Bugis Luwu dan Melayu.',
    longDesc: 'Keraton Amantubillah di Mempawah bercirikan warna hijau toska dan kuning emas khas bangsawan pesisir. Didirikan oleh Opu Daeng Manambon, seorang putra mahkota dari Kerajaan Luwu Sulawesi Selatan yang mempersunting Putri Kesumba dari Kerajaan Matan. Di istana ini setiap tahun diadakan tradisi sakral Robo-Robo untuk memohon keselamatan dari marabahaya.',
    history: 'Didirikan pada tahun 1761 setelah Opu Daeng Manambon memindahkan pusat pemerintahan ke muara Mempawah. Menjadi jembatan peradaban Bugis dan Melayu di Kalimantan Barat.',
    image: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    admissionFee: 'Rp 5.000 / orang',
    openingHours: 'Senin - Minggu: 08:30 - 16:30 WIB',
    address: 'Kelurahan Pulau Pedalaman, Kecamatan Mempawah Timur',
    etiquette: [
      'Menjaga sikap takzim di area makam para raja dan ruang pusaka',
      'Berpakaian sopan celana/rok panjang'
    ],
    audioGuideDuration: '5 Menit 45 Detik',
    heritageStatus: 'Cagar Budaya Peringkat Provinsi',
    tags: ['Bugis Melayu', 'Robo-Robo', 'Opu Daeng Manambon', 'Pusaka'],
    coordinates: { lat: 0.3541, lng: 109.1912 },
    recommendedStay: '1 - 1.5 Jam'
  },
  {
    id: 'baluk_bengkayang',
    name: 'Rumah Adat Baluk Sebujit Jagoi Babang',
    regencyId: 'bengkayang',
    regencyName: 'Kabupaten Bengkayang',
    category: 'Rumah Adat',
    shortDesc: 'Rumah bundar sakral Dayak Bidayuh setinggi 12 meter tempat penyimpanan tengkorak leluhur Nyobeng.',
    longDesc: 'Rumah Adat Baluk memiliki arsitektur unik berbentuk lingkaran kerucut yang disangga tiang-tiang kayu ulin setinggi 12 meter di atas bukit perbatasan. Rumah ini bukan tempat tinggal harian, melainkan balai sakral untuk upacara Nyobeng, ritual membersihkan tengkorak peninggalan perang masa lampau sebagai simbol perdamaian abadi suku Dayak Bidayuh.',
    history: 'Arsitektur Baluk mencerminkan kosmologi Dayak Bidayuh bahwa alam semesta berbentuk lingkaran tanpa sudut. Didirikan ratusan tahun lalu oleh nenek moyang di Desa Sinar Baru Sebujit.',
    image: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
    admissionFee: 'Tiket masuk desa adat Rp 15.000',
    openingHours: 'Setiap Hari: 08:00 - 17:00 WIB',
    address: 'Desa Sinar Baru, Sebujit, Kec. Jagoi Babang, Bengkayang',
    etiquette: [
      'Wanita yang sedang berhalangan/haid dilarang menaiki tangga ruang sakral atas',
      'Lepas topi dan alas kaki saat menaiki tangga melingkar Baluk',
      'Dilarang berbicara kasar atau mengejek benda-benda pusaka leluhur'
    ],
    audioGuideDuration: '7 Menit 05 Detik',
    heritageStatus: 'Warisan Budaya Takbenda (WBTB) Nasional Indonesia',
    tags: ['Dayak Bidayuh', 'Ritual Nyobeng', 'Arsitektur Bundar', 'Perbatasan RI'],
    coordinates: { lat: 1.2845, lng: 109.9123 },
    recommendedStay: '2 Jam'
  },
  {
    id: 'ensaid_panjang_sintang',
    name: 'Rumah Betang & Sentra Tenun Ikat Ensaid Panjang',
    regencyId: 'sintang',
    regencyName: 'Kabupaten Sintang',
    category: 'Sentra Kriya',
    shortDesc: 'Komunitas penenun perempuan Dayak Iban & Desa yang mempertahankan pewarna alami akar kayu.',
    longDesc: 'Rumah Betang Ensaid Panjang di Kabupaten Sintang adalah rumah panggung kayu sepanjang 120 meter yang dihuni oleh 28 kepala keluarga. Di sinilah tradisi tenun ikat Dayak dengan pewarna organik alami (seperti daun rengas, akar mengkudu, dan kunyit hutan) dipertahankan. Setiap motif tenun mengandung doa perlindungan, status sosial, dan filosofi hubungan manusia dengan hutan rimba.',
    history: 'Tradisi menenun di Ensaid Panjang telah berlangsung berabad-abad dan mendapatkan penghargaan internasional dari UNESCO dan World Crafts Council.',
    image: '/src/assets/images/doc_sape_kalbar_1792942702442.jpg',
    admissionFee: 'Rp 10.000 / orang',
    openingHours: 'Setiap Hari: 08:00 - 17:00 WIB',
    address: 'Desa Ensaid Panjang, Kecamatan Kelam Permai, Sintang',
    etiquette: [
      'Minta izin sebelum memotret penenun yang sedang merapalkan mantra doa motif',
      'Hargai nilai tenun asli berbahan pewarna alami yang memakan waktu pembuatan berbulan-bulan'
    ],
    audioGuideDuration: '6 Menit 10 Detik',
    heritageStatus: 'Pusat Warisan Tenun Tradisional Terpilih Kemendikbudristek',
    tags: ['Tenun Ikat', 'Pewarna Alami', 'Dayak Desa', 'Bukit Kelam', 'Kriya'],
    coordinates: { lat: 0.1121, lng: 111.6214 },
    recommendedStay: '2 - 3 Jam'
  },
  {
    id: 'radakng_sahapm_landak',
    name: 'Rumah Radakng Sahapm Landak',
    regencyId: 'landak',
    regencyName: 'Kabupaten Landak',
    category: 'Rumah Adat',
    shortDesc: 'Rumah betang asli terpanjang yang berdiri sejak tahun 1875 dengan 35 pintu bilik keluarga.',
    longDesc: 'Rumah Radakng Sahapm di Pahauman Kabupaten Landak merupakan rumah betang peninggalan asli tertua di Kalimantan Barat yang masih tegak berdiri dengan panjang 186 meter. Terbuat dari kayu belian pilihan dengan arsitektur bertiang tinggi 6 meter untuk melindungi warga dari bahaya binatang buas pada masa lampau.',
    history: 'Dibangun pada tahun 1875 oleh nenek moyang suku Dayak Kanayatn Banyuke. Hingga kini, sistem kekerabatan dan peradilan adat Dayak masih kerap diselenggarakan di panto balai utama.',
    image: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
    admissionFee: 'Donasi sukarela desa Rp 10.000',
    openingHours: 'Setiap Hari: 08:00 - 17:00 WIB',
    address: 'Dusun Sahapm, Desa Saham, Kec. Sengah Temila, Landak',
    etiquette: [
      'Menghormati keluarga penghuni bilik',
      'Gunakan alas kaki yang bersih atau lepas sepatu di teras tangga kayu'
    ],
    audioGuideDuration: '5 Menit 50 Detik',
    heritageStatus: 'Cagar Budaya Resmi Tingkat Provinsi Kalimantan Barat',
    tags: ['Dayak Kanayatn', 'Kayu Belian 1875', 'Sejarah Pahauman', 'Living Museum'],
    coordinates: { lat: 0.3124, lng: 109.6543 },
    recommendedStay: '1.5 Jam'
  },
  {
    id: 'keraton_matan_ketapang',
    name: 'Keraton Matan Tanjungpura Ketapang',
    regencyId: 'ketapang',
    regencyName: 'Kabupaten Ketapang',
    category: 'Keraton',
    shortDesc: 'Pusat Kerajaan Matan peninggalan kemaharajaan Hindu-Buddha & Islam tertua di Kalimantan Barat.',
    longDesc: 'Keraton Matan di Mulia Kerta Ketapang menyimpan silsilah kerajaan Tanjungpura yang tercatat dalam kitab Negarakertagama era Majapahit abad ke-14. Kompleks keraton bergaya Melayu pesisir ini menyimpan meriam kuno "Padam Pelita", tempat tidur kebesaran raja bertahtakan kain beludru kuning, mahkota replika, dan prasasti tembaga berhuruf Kawi kuno.',
    history: 'Kerajaan Tanjungpura didirikan sekitar abad ke-13, lalu bertransformasi menjadi Kesultanan Matan Islam di bawah pimpinan Sultan Muhammad Saifiuddin pada abad ke-17.',
    image: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    admissionFee: 'Rp 5.000 / orang',
    openingHours: 'Selasa - Minggu: 09:00 - 16:00 WIB',
    address: 'Kelurahan Mulia Kerta, Kec. Benua Kayong, Kabupaten Ketapang',
    etiquette: [
      'Berpakaian sopan dan tertutup',
      'Tidak duduk di atas singgasana utama yang disakralkan keluarga kerajaan'
    ],
    audioGuideDuration: '6 Menit 30 Detik',
    heritageStatus: 'Cagar Budaya Nasional Peninggalan Tanjungpura',
    tags: ['Tanjungpura', 'Keraton Matan', 'Majapahit', 'Melayu Ketapang'],
    coordinates: { lat: -1.8541, lng: 109.9832 },
    recommendedStay: '1 - 2 Jam'
  },
  {
    id: 'lawang_kuari_sekadau',
    name: 'Situs Tebing Batu Bertulis Lawang Kuari',
    regencyId: 'sekadau',
    regencyName: 'Kabupaten Sekadau',
    category: 'Situs Bersejarah',
    shortDesc: 'Ceruk batu karst sakral di tepi Sungai Sekadau tempat pertapaan Patih Loh Gender.',
    longDesc: 'Situs Lawang Kuari adalah gua batu cadas alami di tebing Sungai Sekadau yang berjarak sekitar 1 km dari muara Sungai Kapuas. Tempat ini dikeramatkan oleh masyarakat Dayak Mualang dan Melayu Sekadau sebagai tempat bertapa tokoh legendaris Patih Loh Gender dari Kerajaan Sekadau abad ke-15.',
    history: 'Di dalam ceruk batu terdapat guratan tulisan dan simbol kuno yang dipercaya menjadi gerbang gaib perlindungan warga Sekadau saat menghadapi serangan musuh zaman dahulu.',
    image: '/src/assets/images/doc_sape_kalbar_1792942702442.jpg',
    admissionFee: 'Sewa perahu klotok penyeberangan Rp 15.000 - 25.000',
    openingHours: 'Setiap Hari: 07:00 - 17:00 WIB',
    address: 'Tepian Sungai Sekadau, Seberang Dusun Selalong, Sekadau',
    etiquette: [
      'Menjaga ketenangan dan tidak berkata takabur di dekat mulut gua',
      'Dilarang mencoret-coret permukaan batu tebing bersejarah'
    ],
    audioGuideDuration: '4 Menit 40 Detik',
    heritageStatus: 'Situs Cagar Budaya Alam Sekadau',
    tags: ['Gua Karst', 'Legenda Patih Loh', 'Sungai Sekadau', 'Mistik Sejarah'],
    coordinates: { lat: 0.0412, lng: 110.9587 },
    recommendedStay: '1 Jam'
  },
  {
    id: 'masjid_terapung_oesman_kayong',
    name: 'Masjid Apung Oesman Al-Khair & Jejak Sukadana',
    regencyId: 'kayong_utara',
    regencyName: 'Kabupaten Kayong Utara',
    category: 'Situs Bersejarah',
    shortDesc: 'Masjid megah terapung di atas Laut Karimata berdekatan dengan tapak Kerajaan Simpang Sukadana.',
    longDesc: 'Masjid Oesman Al-Khair berdiri kokoh di atas tiang pancang laut Teluk Sukadana dengan latar belakang panorama perbukitan Gunung Palung. Memiliki kubah beraksen maroko dan kaligrafi nusantara. Kawasan sekitarnya merupakan pusat historis Pelabuhan Sukadana dan Kerajaan Simpang yang masyhur pada abad ke-16.',
    history: 'Diresmikan oleh Presiden Joko Widodo pada perhelatan Sail Selat Karimata 2016 sebagai ikon kebangkitan bahari dan peradaban maritim Kalbar.',
    image: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    admissionFee: 'Gratis (Wisata Religi & Budaya Terbuka)',
    openingHours: 'Buka 24 Jam untuk ibadah dan wisata arsitektur',
    address: 'Jl. Kota Karang, Sutera, Kec. Sukadana, Kabupaten Kayong Utara',
    etiquette: [
      'Menjaga kesucian tempat ibadah',
      'Berpakaian muslim/muslimah yang sopan'
    ],
    audioGuideDuration: '4 Menit 20 Detik',
    heritageStatus: 'Ikon Wisata Budaya Bahari Kalbar',
    tags: ['Wisata Bahari', 'Sukadana', 'Selat Karimata', 'Arsitektur Apung'],
    coordinates: { lat: -1.2489, lng: 109.9541 },
    recommendedStay: '1 Jam'
  }
];

export const DOCUMENTARIES_DATA: DocumentaryFilm[] = [
  {
    id: 'doc_sape_melodi',
    title: 'Melodi Senyap Dawai Sape\': Merawat Suara Hutan Borneo',
    regencyId: 'kapuas_hulu',
    regencyName: 'Kabupaten Kapuas Hulu & Pontianak',
    category: 'Seni Musik & Tari',
    synopsis: 'Dokumenter puitis menyelami kehidupan Pak Uyau, seorang maestro pembuat dan pemain Sape\' Dayak Kenyah di pedalaman Kapuas Hulu. Film ini menelusuri pencarian sebatang kayu pohon Adau di rimba Kalimantan, pemahatan lekuk tubuh instrumen dengan mandau, hingga dawai kawat pertama kali dipetik mengalunkan nada-nada magis penyembuh duka.',
    duration: '42 Menit',
    releaseYear: 2025,
    director: 'Aria Kusuma & Tim Sinema Khatulistiwa',
    production: 'Borneo Heritage Documentaries & Disporapar Kalbar',
    thumbnail: '/src/assets/images/doc_sape_kalbar_1792942702442.jpg',
    awards: [
      'Pemenang Film Dokumenter Etnografi Terbaik - Festival Film Budaya Nusantara',
      'Official Selection - Asian Indigenous Heritage Film Showcase 2025'
    ],
    ethnicGroup: 'Dayak Kenyah & Dayak Kayan',
    chapters: [
      { title: 'Prolog: Suara Angin di Lembah Kapuas', timestamp: '00:00', seconds: 0 },
      { title: 'Menemukan Kayu Adau di Hutan Adat', timestamp: '06:15', seconds: 375 },
      { title: 'Sentuhan Mandau & Ukiran Lekuk Dayak', timestamp: '15:30', seconds: 930 },
      { title: 'Filosofi Tangga Nada Pentatonik Sape\'', timestamp: '24:45', seconds: 1485 },
      { title: 'Dawai untuk Generasi Mendatang', timestamp: '35:20', seconds: 2120 }
    ],
    subtitles: [
      { lang: 'id', label: 'Bahasa Indonesia' },
      { lang: 'en', label: 'English' }
    ],
    curatorNotes: 'Dokumenter ini tidak sekadar merekam musik, melainkan merefleksikan hubungan spiritual antara hutan Kalimantan yang lestari dengan alat musik yang dilahirkan dari rahimnya.',
    rating: 4.95,
    reviewCount: 342
  },
  {
    id: 'doc_capgomeh_tatung',
    title: 'Tatung: Meniti Pedang, Menjaga Harmoni Singkawang',
    regencyId: 'singkawang',
    regencyName: 'Kota Singkawang',
    category: 'Ritual & Tradisi',
    synopsis: 'Potret mendalam perayaan Cap Go Meh di Kota Singkawang, di mana ratusan Tatung yang dirasuki roh para panglima perang Tiongkok dan leluhur Dayak berparade meniti mata pedang dan jarum baja tanpa terluka. Film ini membongkar rahasia akulturasi sejati antara komunitas Tionghoa Hakka dan Dayak Kanayatn yang telah bersaudara selama dua ratus tahun.',
    duration: '48 Menit',
    releaseYear: 2024,
    director: 'Bong Kim Shin & Hendra Wijaya',
    production: 'Tidayu Cultural Lens Studio',
    thumbnail: '/src/assets/images/doc_capgomeh_singkawang_1792942703322.jpg',
    awards: [
      'Film Dokumenter Budaya Favorit Penonton - Festival Film Indonesia (FFI)',
      'Dokumentasi Resmi Warisan Budaya Takbenda (WBTB) Nasional'
    ],
    ethnicGroup: 'Tionghoa Hakka & Dayak Kanayatn (Tidayu)',
    chapters: [
      { title: 'Garam & Dupa: Ritual Cuci Jalan Klenteng', timestamp: '00:00', seconds: 0 },
      { title: 'Memanggil Roh Pendekar Leluhur', timestamp: '08:40', seconds: 520 },
      { title: 'Persaudaraan Saudara Angkat Dayak & Tionghoa', timestamp: '19:20', seconds: 1160 },
      { title: 'Prosesi Akbar di Alun-Alun Singkawang', timestamp: '31:10', seconds: 1870 },
      { title: 'Damai di Bawah Naungan Khatulistiwa', timestamp: '41:00', seconds: 2460 }
    ],
    subtitles: [
      { lang: 'id', label: 'Bahasa Indonesia' },
      { lang: 'en', label: 'English' }
    ],
    curatorNotes: 'Karya visual bertenaga tinggi yang memperlihatkan toleransi paling otentik di Nusantara: ketika dupa klenteng dan lantunan mantra Dayak bersatu dalam pawai perdamaian.',
    rating: 4.98,
    reviewCount: 512
  },
  {
    id: 'doc_ensaid_tenun',
    title: 'Garis Leluhur Ensaid Panjang: Rahasia Tenun Ikat Alami',
    regencyId: 'sintang',
    regencyName: 'Kabupaten Sintang',
    category: 'Kriya & Tenun',
    synopsis: 'Di sebuah rumah betang panjang pedalaman Sintang, ibu-ibu Dayak Desa menenun kain ikat menggunakan pewarna daun tarum biru dan akar mengkudu merah. Film dokumenter ini membongkar rahasia motif mistis seperti "Burung Ruai" dan "Ribu Naga" yang hanya boleh ditenun oleh wanita yang telah bermimpi dan mendapatkan restu leluhur.',
    duration: '35 Menit',
    releaseYear: 2025,
    director: 'Maria Fransiska Dayun',
    production: 'Yayasan Tenun Tradisional Borneo',
    thumbnail: '/src/assets/images/doc_sape_kalbar_1792942702442.jpg',
    awards: [
      'Special Jury Prize - World Crafts Documentary Festival Geneva',
      'Penghargaan Cagar Kriya Nusantara 2025'
    ],
    ethnicGroup: 'Dayak Desa & Dayak Iban',
    chapters: [
      { title: 'Pagi Hari di Selasar Rumah Betang', timestamp: '00:00', seconds: 0 },
      { title: 'Mencari Akar Mengkudu di Kaki Bukit Kelam', timestamp: '07:15', seconds: 435 },
      { title: 'Resep Rahasia Ramuan Fermentasi Warna', timestamp: '14:50', seconds: 890 },
      { title: 'Mimpi Nenek Moyang dalam Lembaran Benang', timestamp: '23:30', seconds: 1410 },
      { title: 'Menjaga Warisan dari Kepunahan', timestamp: '30:00', seconds: 1800 }
    ],
    subtitles: [
      { lang: 'id', label: 'Bahasa Indonesia' },
      { lang: 'en', label: 'English' }
    ],
    curatorNotes: 'Dokumentasi penting tentang kearifan ekologis nenek moyang dalam memanfaatkan flora hutan tropis tanpa merusak alam demi menciptakan mahakarya seni tekstil.',
    rating: 4.91,
    reviewCount: 218
  },
  {
    id: 'doc_megastruktur_radakng',
    title: 'Megastruktur Ulin: Arsitektur Rumah Panjang Borneo',
    regencyId: 'landak',
    regencyName: 'Kabupaten Landak & Kapuas Hulu',
    category: 'Arsitektur Leluhur',
    synopsis: 'Eksplorasi teknik konstruksi arsitektur kayu besi (Ulin) suku Dayak pada Rumah Radakng Sahapm Landak dan Betang Lunsa Hilir Kapuas Hulu. Bagaimana rumah panggung tanpa paku besi ini mampu bertahan lebih dari 150 tahun melawan cuaca ekstrem tropis dan gempa bumi, serta bagaimana sistem hidup bersama 40 keluarga membentuk tata nilai demokrasi komunal.',
    duration: '38 Menit',
    releaseYear: 2024,
    director: 'Ir. Dedy Pranoto & Tim Arsitektur Adat Nusantara',
    production: 'Balai Pelestarian Kebudayaan Wilayah XII',
    thumbnail: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
    awards: [
      'Nominasi Dokumenter Arsitektur Terbaik - International Heritage Film Awards',
      'Piala Citra Dokumenter Sains & Budaya'
    ],
    ethnicGroup: 'Dayak Kanayatn & Dayak Tamambaloh',
    chapters: [
      { title: 'Kayu Besi: Kekuatan Misterius Pohon Ulin', timestamp: '00:00', seconds: 0 },
      { title: 'Struktur Pasak Kayu Tanpa Logam Paku', timestamp: '09:20', seconds: 560 },
      { title: 'Selasar Terbuka: Demokrasi Hidup Bersama', timestamp: '18:40', seconds: 1120 },
      { title: 'Ancaman Modernitas & Upaya Restorasi Adat', timestamp: '28:15', seconds: 1695 },
      { title: 'Pesan Perdamaian dari Rumah Panjang', timestamp: '34:00', seconds: 2040 }
    ],
    subtitles: [
      { lang: 'id', label: 'Bahasa Indonesia' },
      { lang: 'en', label: 'English' }
    ],
    curatorNotes: 'Sangat direkomendasikan bagi pecinta arsitektur vernakular dan sosiologi masyarakat adat pedalaman Kalimantan.',
    rating: 4.93,
    reviewCount: 289
  },
  {
    id: 'doc_robo_robo_mempawah',
    title: 'Robo-Robo: Doa Laut Kesultanan Amantubillah Mempawah',
    regencyId: 'mempawah',
    regencyName: 'Kabupaten Mempawah',
    category: 'Ritual & Tradisi',
    synopsis: 'Napak tilas upacara bahari tradisional Robo-Robo yang diadakan setiap hari Rabu terakhir bulan Safar di Muara Kuala Mempawah. Menampilkan arak-arakan perahu hias kesultanan, tradisi makan bersama ketupat colet di atas perahu nelayan, serta lantunan azan dan doa selamat tolak bala yang telah berlangsung sejak kedatangan Opu Daeng Manambon tahun 1737.',
    duration: '28 Menit',
    releaseYear: 2024,
    director: 'Syahrul Ramadhan & Laskar Melayu Visual',
    production: 'Dinas Kebudayaan Mempawah & Kemendikbud',
    thumbnail: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    awards: [
      'Anugerah Warisan Budaya Takbenda Kemendikbudristek RI',
      'Best Maritime Documentary - Festival Bahari Nusantara'
    ],
    ethnicGroup: 'Melayu Mempawah & Bugis Opu',
    chapters: [
      { title: 'Sejarah Kedatangan Opu Daeng Manambon', timestamp: '00:00', seconds: 0 },
      { title: 'Persiapan Ketupat Colet & Sesaji Adat', timestamp: '05:30', seconds: 330 },
      { title: 'Arak-arakan Perahu Diraja Menuju Muara', timestamp: '12:15', seconds: 735 },
      { title: 'Tepung Tawar & Doa Tolak Bala di Laut', timestamp: '19:40', seconds: 1180 },
      { title: 'Makan Bersama Nelayan Sepanjang Sungai', timestamp: '24:00', seconds: 1440 }
    ],
    subtitles: [
      { lang: 'id', label: 'Bahasa Indonesia' },
      { lang: 'en', label: 'English' }
    ],
    curatorNotes: 'Film ini menangkap kehangatan masyarakat pesisir Kalbar yang memuliakan sungai dan laut sebagai sumber rezeki dan simbol kebersamaan tanpa sekat strata sosial.',
    rating: 4.88,
    reviewCount: 176
  },
  {
    id: 'doc_keraton_kadriah_pontianak',
    title: 'Jejak Meriam & Sultan: Sejarah Kesultanan Kadriah Pontianak',
    regencyId: 'pontianak',
    regencyName: 'Kota Pontianak',
    category: 'Sejarah Maritim',
    synopsis: 'Kisah pendirian Kesultanan Kadriah Pontianak di muara Sungai Kapuas dan Sungai Landak pada tahun 1771 oleh Syarif Abdurrahman Alkadrie. Film ini menyingkap misteri tembakan meriam pengusir perompak, peranan cermin pusaka pemberian Raja Prancis Louis XVI, hingga jejak diplomasi Sultan Hamid II yang merancang Lambang Negara Republik Indonesia Elang Rajawali Garuda Pancasila.',
    duration: '34 Menit',
    releaseYear: 2025,
    director: 'Rizki Fadillah Alkadrie',
    production: 'Yayasan Kadriah & Studio Sejarah Khatulistiwa',
    thumbnail: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    awards: [
      'Dokumenter Sejarah Terbaik - Festival Sejarah Nusantara',
      'Piala Garuda Emas Film Edukasi Kebangsaan'
    ],
    ethnicGroup: 'Melayu Pontianak, Arab Hadhrami, Bugis',
    chapters: [
      { title: 'Beting Sungai Kapuas: Titik Nol Khatulistiwa', timestamp: '00:00', seconds: 0 },
      { title: 'Dentuman Meriam & Berdirinya Istana Kayu', timestamp: '06:40', seconds: 400 },
      { title: 'Pusaka Cermin Prancis & Singgasana Sultan', timestamp: '14:20', seconds: 860 },
      { title: 'Sultan Hamid II & Kelahiran Lambang Garuda', timestamp: '22:10', seconds: 1330 },
      { title: 'Warisan Toleransi di Tepian Kapuas', timestamp: '29:30', seconds: 1770 }
    ],
    subtitles: [
      { lang: 'id', label: 'Bahasa Indonesia' },
      { lang: 'en', label: 'English' }
    ],
    curatorNotes: 'Sebuah tribut berharga bagi sejarah kebangsaan Indonesia yang mengingatkan kita bahwa simbol pemersatu bangsa Garuda Pancasila berakar dari bumi Khatulistiwa Kalimantan Barat.',
    rating: 4.96,
    reviewCount: 420
  }
];

export const APP_INFO = {
  name: 'Pusaka Khatulistiwa: Budaya & Sinema Kalbar',
  version: '2.5.0 (Edisi Studio Kreatif 2026)',
  size: '42 MB',
  installs: '100.000+',
  rating: 4.95,
  reviewsCount: '14.8 rb ulasan',
  badge: 'Pilihan Editor Budaya Nusantara',
  developer: 'Cinemax Photography Entertainment x Balai Pelestarian Kebudayaan Wil. XII Kalbar',
  contentRating: 'Semua Umur (Edukasi, Sinematografi & Pariwisata Budaya)',
  lastUpdated: 'Oktober 2026',
  whatsNew: [
    'Studio Editor Budaya: Pengguna & Kreator dapat menyunting atau menambah destinasi & film dokumenter',
    'Eksplorasi Galeri Etnofotografi resolusi tinggi karya fotografer kebudayaan Kalbar',
    'Penambahan katalog cagar budaya lengkap seluruh 14 Kabupaten & Kota di Kalbar',
    'Fitur Bioskop Dokumenter 4K dengan subtitle bilingual & chapter timeline interaktif',
    'Simulator Instrumen Dawai Sape\' Pentatonik Dayak interaktif bersuara alami',
    'Mode Tampilan 360° Panorama virtual cagar budaya'
  ]
};

export const CULTURAL_GALLERY: CulturalPhoto[] = [
  {
    id: 'photo_1',
    title: 'Pawai Akbar Tatung Cap Go Meh',
    location: 'Kawasan Klenteng Tri Dharma Bumi Raya',
    regency: 'Kota Singkawang',
    category: 'Ritual & Perayaan',
    imageUrl: '/src/assets/images/doc_capgomeh_singkawang_1792942703322.jpg',
    photographer: 'Cinemax Photography Studio',
    cameraInfo: 'Sony A7R V · 24-70mm f/2.8 GM · 1/800s f/4.0 ISO 200',
    description: 'Prosesi suci ratusan Tatung dalam busana kebesaran perang Tiongkok dan Dayak berbaur diiringi kepulan dupa wangi dan genderang khas Hakka.'
  },
  {
    id: 'photo_2',
    title: 'Keagungan Rumah Betang Radakng',
    location: 'Kompleks Budaya Sutoyo',
    regency: 'Kota Pontianak',
    category: 'Arsitektur Kayu Ulin',
    imageUrl: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
    photographer: 'Cinemax Photography Studio',
    cameraInfo: 'Canon EOS R5 · 16-35mm f/2.8L · 1/250s f/8.0 ISO 100',
    description: 'Struktur megah rumah panjang kayu besi ulin Kalimantan yang disangga tiang-tiang ukiran patung burung enggang gading (hornbill).'
  },
  {
    id: 'photo_3',
    title: 'Petikan Jiwa Sang Maestro Sape\'',
    location: 'Pedalaman Embaloh Hulu',
    regency: 'Kabupaten Kapuas Hulu',
    category: 'Musik Tradisional',
    imageUrl: '/src/assets/images/doc_sape_kalbar_1792942702442.jpg',
    photographer: 'Cinemax Photography Studio',
    cameraInfo: 'Fujifilm GFX 100 II · 80mm f/1.7 · 1/160s f/2.0 ISO 400',
    description: 'Potret hangat maestro Dayak memetik instrumen sape ukir kayu adau di selasar rumah panggung beralas tikar anyaman rotan.'
  },
  {
    id: 'photo_4',
    title: 'Kemegahan Istana Kuning Kesultanan Kadriah',
    location: 'Kampung Beting, Tepian Sungai Kapuas',
    regency: 'Kota Pontianak',
    category: 'Keraton & Istana Melayu',
    imageUrl: '/src/assets/images/dest_keraton_kadriah_1792942702617.jpg',
    photographer: 'Cinemax Photography Studio',
    cameraInfo: 'Nikon Z8 · 24-120mm f/4 · 1/500s f/5.6 ISO 160',
    description: 'Istana kayu belian peninggalan Sultan Syarif Abdurrahman Alkadrie tahun 1771 dengan meriam VOC di pelataran rumput hijau.'
  }
];

export function getStoredDestinations(): Destination[] {
  try {
    const raw = localStorage.getItem('pk_custom_destinations');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return DESTINATIONS_DATA;
}

export function saveStoredDestinations(data: Destination[]): void {
  try {
    localStorage.setItem('pk_custom_destinations', JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getStoredDocumentaries(): DocumentaryFilm[] {
  try {
    const raw = localStorage.getItem('pk_custom_documentaries');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return DOCUMENTARIES_DATA;
}

export function saveStoredDocumentaries(data: DocumentaryFilm[]): void {
  try {
    localStorage.setItem('pk_custom_documentaries', JSON.stringify(data));
  } catch {
    // ignore
  }
}
