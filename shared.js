/* ═══════════════════════════════════════════════
   CINEVIXV — SHARED DATA STORE
   localStorage keys:
     cvx_videos   → array of video objects
     cvx_articles → array of article objects
   ═══════════════════════════════════════════════ */

const CVX = (() => {

  /* ── DEFAULT VIDEOS ── */
  const DEFAULT_VIDEOS = [
    { id:'7640035101795011841', url:'https://www.tiktok.com/@cinevix/video/7640035101795011841', title:'', series:'', thumbnail:'', description:'', fetched:false },
    { id:'7640035092244565249', url:'https://www.tiktok.com/@cinevix/video/7640035092244565249', title:'', series:'', thumbnail:'', description:'', fetched:false },
    { id:'7640034576135359745', url:'https://www.tiktok.com/@cinevix/video/7640034576135359745', title:'', series:'', thumbnail:'', description:'', fetched:false },
    { id:'7640034485047725328', url:'https://www.tiktok.com/@cinevix/video/7640034485047725328', title:'', series:'', thumbnail:'', description:'', fetched:false },
    { id:'7640034529700302081', url:'https://www.tiktok.com/@cinevix/video/7640034529700302081', title:'', series:'', thumbnail:'', description:'', fetched:false },
  ];

  /* ── DEFAULT ARTICLES ── */
  const DEFAULT_ARTICLES = [
    {
      id: 'a1',
      title: 'Nightmares and Daydreams — Mimpi Buruk yang Bikin Nggak Bisa Tidur',
      category: 'Thriller · Netflix',
      platform: 'Netflix',
      date: '19 Mei 2025',
      desc: 'Serial Netflix karya Joko Anwar. 6 episode antologi horor yang saling terhubung dengan cara tak terduga.',
      body: `<p>Serial antologi horor karya Joko Anwar ini hadir dalam 6 episode yang masing-masing berdiri sendiri, namun saling terhubung lewat benang merah yang baru terungkap di akhir.</p>
<p>Setiap episode membawa kita ke dunia yang berbeda — dari rumah tua di pinggiran kota, apartemen mewah Jakarta, hingga desa terpencil yang menyimpan rahasia gelap. Joko Anwar berhasil membangun atmosfer mencekam yang konsisten sepanjang serial.</p>
<h3>Yang Bikin Beda</h3>
<p>Berbeda dari horor Indonesia kebanyakan, Nightmares and Daydreams lebih mengandalkan psychological horror daripada jump scare. Penonton diajak merasakan ketidaknyamanan yang perlahan merayap.</p>
<p>Visual cinematography-nya luar biasa — setiap frame terasa seperti lukisan gelap yang hidup. Scoring musiknya juga patut diacungi jempol.</p>
<h3>Verdict</h3>
<p>Wajib tonton untuk penggemar horor yang ingin sesuatu yang lebih dari sekadar menakut-nakuti. Rating: 8.5/10</p>`,
      tiktokUrl: 'https://tiktok.com/@cinevix',
      thumb: ''
    },
    {
      id: 'a2',
      title: 'Keluarga Ini Adopsi Anak Misterius — Siapa Sebenarnya Dia?',
      category: 'Horor · Series',
      platform: 'Lokal',
      date: '18 Mei 2025',
      desc: 'Satu keluarga mengadopsi anak yang tidak mereka kenal. Hidup mereka berubah drastis selamanya.',
      body: `<p>Sebuah keluarga kelas menengah di Jakarta memutuskan mengadopsi seorang anak laki-laki yang ditemukan sendirian di depan rumah mereka. Tidak ada yang tahu asal-usulnya.</p>
<p>Awalnya semua tampak normal. Tapi perlahan, kejadian-kejadian aneh mulai terjadi. Benda-benda bergerak sendiri, mimpi buruk yang sama dialami seluruh anggota keluarga, dan anak itu — selalu tersenyum.</p>
<h3>Kekuatan Cerita</h3>
<p>Yang membuat serial ini kuat adalah character development yang solid. Kita benar-benar peduli dengan keluarga ini sebelum semuanya mulai hancur. Itu yang membuat setiap kejadian horor terasa lebih berat.</p>
<p>Akting anak pemeran utama luar biasa natural — justru ketenangan dia yang paling menakutkan.</p>
<h3>Verdict</h3>
<p>Slow burn horror yang rewarding. Butuh kesabaran di 2 episode pertama, tapi setelah itu tidak bisa berhenti. Rating: 8/10</p>`,
      tiktokUrl: 'https://tiktok.com/@cinevix',
      thumb: ''
    },
    {
      id: 'a3',
      title: '5 Film Thriller Jakarta yang Wajib Ditonton Tahun Ini',
      category: 'Rekomendasi',
      platform: 'Berbagai',
      date: '17 Mei 2025',
      desc: 'Dari gang sempit Glodok sampai apartemen mewah Sudirman — thriller lokal makin berani.',
      body: `<p>Sinema thriller Indonesia sedang dalam masa keemasan. Tahun ini saja sudah ada setidaknya 5 film yang layak masuk daftar tonton wajib.</p>
<h3>1. Glodok Malam Itu</h3>
<p>Set di kawasan Glodok yang ikonik, film ini memadukan misteri pembunuhan dengan konflik sosial yang kompleks. Sinematografi malam hari Jakarta-nya memukau.</p>
<h3>2. Lantai 33</h3>
<p>Thriller psikologis yang terjadi dalam satu malam di sebuah gedung perkantoran. Claustrophobic dan intens dari menit pertama.</p>
<h3>3. Bayangan Sudirman</h3>
<p>Corporate thriller yang mengangkat isu korupsi dan pengkhianatan di dunia bisnis Jakarta. Twist-nya tidak tertebak.</p>
<h3>4. Malam Terakhir</h3>
<p>Road thriller yang dimulai dari sebuah taksi online. Penumpang dan pengemudi sama-sama menyimpan rahasia.</p>
<h3>5. Rumah di Ujung Gang</h3>
<p>Home invasion thriller yang sederhana tapi efektif. Eksekusinya rapi dan tegang sepanjang durasi.</p>`,
      tiktokUrl: 'https://tiktok.com/@cinevix',
      thumb: ''
    },
    {
      id: 'a4',
      title: 'Rekomendasi K-Drama Mei 2025 yang Lagi Hits',
      category: 'Drama · Korea',
      platform: 'iQIYI',
      date: '16 Mei 2025',
      desc: 'Drama Korea terbaik bulan ini yang wajib masuk watchlist kamu.',
      body: `<p>Mei 2025 jadi bulan yang luar biasa untuk K-Drama. Ada beberapa judul yang langsung viral dan bikin FYP penuh spoiler.</p>
<h3>My Lovely Liar Season 2</h3>
<p>Kelanjutan dari season pertama yang sukses. Chemistry antara dua lead masih sama kuatnya, dengan plot yang lebih kompleks dan twist yang lebih berani.</p>
<h3>The Midnight Romance in Hagwon</h3>
<p>Romance drama yang berlatar di dunia bimbingan belajar. Ringan, manis, dan bikin senyum-senyum sendiri.</p>
<h3>Hierarchy</h3>
<p>Drama sekolah elite yang gelap dan penuh intrik. Vibes-nya mirip Sky Castle tapi dengan eksekusi yang lebih modern.</p>`,
      tiktokUrl: 'https://tiktok.com/@cinevix',
      thumb: ''
    },
    {
      id: 'a5',
      title: 'Andor Season 2 — Akhirnya Worth the Hype?',
      category: 'Sci-Fi · Disney+',
      platform: 'Disney+',
      date: '15 Mei 2025',
      desc: 'Season kedua Andor hadir dengan ekspektasi yang sangat tinggi. Apakah berhasil?',
      body: `<p>Andor Season 1 dianggap sebagai salah satu konten Star Wars terbaik yang pernah dibuat. Season 2 datang dengan beban ekspektasi yang luar biasa berat.</p>
<h3>Apakah Berhasil?</h3>
<p>Jawaban singkat: Ya. Season 2 tidak hanya mempertahankan kualitas season pertama, tapi dalam beberapa aspek bahkan melampauinya.</p>
<p>Pacing yang lebih cepat di season ini membuat cerita terasa lebih urgen. Kita tahu ke mana Cassian Andor akan berakhir — tapi perjalanannya tetap membuat kita terpaku di layar.</p>
<h3>Highlight</h3>
<p>Episode 4-6 adalah puncak dari season ini. Sebuah arc yang berdiri sendiri namun punya dampak emosional yang luar biasa terhadap keseluruhan cerita.</p>
<h3>Verdict</h3>
<p>Wajib tonton, bahkan untuk yang bukan fans Star Wars sekalipun. Ini adalah political thriller yang kebetulan berlatar di galaksi jauh. Rating: 9/10</p>`,
      tiktokUrl: 'https://tiktok.com/@cinevix',
      thumb: ''
    },
    {
      id: 'a6',
      title: '10 Film Horor Indonesia Terbaik — Dari Paling Kuno Sampai Terbaru',
      category: 'Horor · Review',
      platform: 'Prime Video',
      date: '14 Mei 2025',
      desc: 'Perjalanan horor Indonesia dari era klasik hingga modern yang wajib kamu tahu.',
      body: `<p>Horor Indonesia punya sejarah panjang dan kaya. Dari film-film klasik era 80an hingga produksi modern yang mendunia, ini adalah 10 yang terbaik.</p>
<h3>Era Klasik</h3>
<p><strong>1. Pengabdi Setan (1980)</strong> — Original yang mendefinisikan horor Indonesia. Atmosfernya masih terasa hingga hari ini.</p>
<p><strong>2. Sundel Bolong (1981)</strong> — Suzzanna di puncak karirnya. Ikonik dan tak tergantikan.</p>
<p><strong>3. Nyi Blorong (1982)</strong> — Mitologi lokal yang diadaptasi dengan sangat baik untuk layar lebar.</p>
<h3>Era Modern</h3>
<p><strong>4. Pengabdi Setan (2017)</strong> — Remake yang berhasil menghormati original sekaligus membawa sesuatu yang baru.</p>
<p><strong>5. KKN di Desa Penari (2022)</strong> — Fenomena yang membuktikan horor Indonesia bisa bersaing di level internasional.</p>
<p><strong>6. Impetigore (2019)</strong> — Joko Anwar di puncak kreativitasnya. Slow burn yang mematikan.</p>
<p><strong>7. Perempuan Tanah Jahanam (2019)</strong> — Sama dengan Impetigore, ini adalah karya masterclass.</p>
<p><strong>8. Pengabdi Setan 2: Communion (2022)</strong> — Sekuel yang berani mengambil risiko dan berhasil.</p>
<p><strong>9. Siksa Kubur (2024)</strong> — Joko Anwar lagi. Konsisten menghasilkan karya terbaik.</p>
<p><strong>10. Badarawuhi di Desa Penari (2024)</strong> — Spin-off yang berdiri kokoh sebagai film tersendiri.</p>`,
      tiktokUrl: 'https://tiktok.com/@cinevix',
      thumb: ''
    }
  ];

  /* ── STORAGE HELPERS ── */
  const getVideos   = () => { try { const s = localStorage.getItem('cvx_videos');   return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_VIDEOS));   } catch { return JSON.parse(JSON.stringify(DEFAULT_VIDEOS));   } };
  const getArticles = () => { try { const s = localStorage.getItem('cvx_articles'); return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_ARTICLES)); } catch { return JSON.parse(JSON.stringify(DEFAULT_ARTICLES)); } };
  const saveVideos   = v => localStorage.setItem('cvx_videos',   JSON.stringify(v));
  const saveArticles = a => localStorage.setItem('cvx_articles', JSON.stringify(a));

  /* ── TIKTOK oEMBED ── */
  async function fetchOembed(url) {
    try {
      // Try TikTok's public oEmbed endpoint directly
      const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
      if (!r.ok) throw new Error('oembed failed');
      return await r.json();
    } catch {
      return null;
    }
  }

  /* ── EXTRACT VIDEO ID ── */
  const getVid = url => { const m = url.match(/video\/(\d+)/); return m ? m[1] : null; };

  /* ── DETECT SERIES FROM TITLE ── */
  function detectSeries(title = '') {
    const t = title.toUpperCase();
    if (t.includes('NIGHTMARES') || t.includes('DAYDREAM')) return 'Nightmares & Daydreams';
    if (t.includes('KELUARGA') && (t.includes('ADOPSI') || t.includes('MISTERIUS'))) return 'Keluarga Misterius';
    if (t.includes('THRILLER') && t.includes('JAKARTA')) return 'Thriller Jakarta';
    if (t.includes('KDRAMA') || t.includes('K-DRAMA') || t.includes('KOREA')) return 'K-Drama';
    if (t.includes('ANDOR') || t.includes('STAR WARS')) return 'Sci-Fi';
    if (t.includes('HOROR') || t.includes('HORROR')) return 'Horor';
    // fallback: first segment before dash/dot
    const clean = title.replace(/\(.*?\)/g, '').split(/[—\-·|]/)[0].trim();
    return clean.substring(0, 28) || 'Lainnya';
  }

  /* ── FETCH & ENRICH ALL VIDEOS ── */
  async function enrichVideos(onProgress) {
    const videos = getVideos();
    let changed = false;
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      if (!v.fetched) {
        const data = await fetchOembed(v.url);
        if (data) {
          videos[i] = {
            ...v,
            title:       data.title || '',
            thumbnail:   data.thumbnail_url || '',
            description: data.title || '',
            series:      detectSeries(data.title || ''),
            author:      data.author_name || '@cinevix',
            fetched:     true
          };
          changed = true;
          if (onProgress) onProgress(videos);
        }
      }
    }
    if (changed) saveVideos(videos);
    return videos;
  }

  return { getVideos, getArticles, saveVideos, saveArticles, enrichVideos, getVid, detectSeries, fetchOembed };
})();
