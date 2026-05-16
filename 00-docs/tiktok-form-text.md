#  TIKTOK DEVELOPER FORM — COPY PASTE TEXT

## App Name
```
cinevixv
```

## Category
```
Entertainment
```

## Description (max 120 chars)
```
Platform ulasan film & series Indonesia. Auto-post konten editorial ke TikTok & tampilkan video TikTok di website.
```

## Terms of Service URL
```
https://cine.vixv.biz.id/terms-of-service
```

## Privacy Policy URL
```
https://cine.vixv.biz.id/privacy-policy
```

## Platforms
✅ Web (sudah dicentang)

## App Review Explanation (max 1000 chars)
```
Cinevixv adalah platform konten berbahasa Indonesia yang menerbitkan artikel ulasan, pembahasan, dan rekomendasi film serta series.

Integrasi TikTok yang kami gunakan:

1. Login Kit (OAuth 2.0): Digunakan untuk autentikasi tim editorial Cinevixv agar dapat mengelola akun TikTok resmi @cinevix dari dashboard CMS kami. User flow: klik "Login with TikTok" → redirect ke TikTok → authorize → kembali ke CMS dengan access token.

2. Content Posting API: Digunakan untuk auto-post video ulasan film/series dari CMS ke akun TikTok @cinevix. Tim editor upload video di CMS, lalu sistem otomatis publish ke TikTok dengan caption, hashtag, dan jadwal yang ditentukan.

3. Display API: Digunakan untuk menampilkan video TikTok publik terkait film/series yang sedang diulas di artikel website kami. Contoh: saat mengulas film "Nightmares & Daydreams", kami embed video TikTok resmi dari akun terkait.

4. Embed Videos: Digunakan untuk menyematkan video TikTok dalam artikel ulasan film di website cine.vixv.biz.id.

Kami hanya mengakses data yang diperlukan untuk fungsi-fungsi di atas. Tidak ada data sensitif yang dikumpulkan atau disimpan. Semua penggunaan sesuai dengan TikTok Developer Terms of Service.
```

## Products yang Harus Di-Add
1. **Login Kit**
2. **Content Posting API**
3. **Display API**
4. **Embed Videos**

## Scopes yang Harus Di-Add
Setelah add products, add scopes berikut:

### Login Kit
- `user.info.basic`
- `user.info.profile`

### Content Posting API
- `video.publish`
- `video.upload`

### Display API
- `video.list`
- `user.info.stats`

## URL Properties (di tab "URL properties")
- **Website URL**: `https://cine.vixv.biz.id`
- **Redirect URI**: `https://cine.vixv.biz.id/api/tiktok/callback`

## Demo Video
Kamu perlu rekam video demo yang menunjukkan:
1. Buka website `https://cine.vixv.biz.id`
2. Klik CMS → Login dengan TikTok
3. Proses OAuth (redirect ke TikTok → authorize → kembali)
4. Di CMS, tambah video baru → auto-post ke TikTok
5. Tampilkan video TikTok yang sudah ter-post

Format: MP4 atau MOV, max 50MB

## App Icon
Upload logo Cinevixv ukuran 1024x1024px (PNG/JPG)

---

## Checklist Sebelum Submit

- [ ] App icon sudah di-upload (1024x1024px)
- [ ] App name: `cinevixv`
- [ ] Category: `Entertainment`
- [ ] Description sudah diisi
- [ ] Terms of Service URL: `https://cine.vixv.biz.id/terms-of-service`
- [ ] Privacy Policy URL: `https://cine.vixv.biz.id/privacy-policy`
- [ ] Platform: Web (dicentang)
- [ ] Products sudah di-add: Login Kit, Content Posting API, Display API, Embed Videos
- [ ] Scopes sudah di-add sesuai tabel di atas
- [ ] URL properties sudah di-set
- [ ] Demo video sudah di-upload
- [ ] Website sudah live di `https://cine.vixv.biz.id`
- [ ] Backend sudah deployed dan endpoint `/api/health` accessible

Setelah semua checklist ✅, klik **"Submit for review"**
