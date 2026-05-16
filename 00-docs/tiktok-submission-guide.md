# TikTok Developer App Submission Guide — Cinevixv

## ✅ Domain Final: `https://cine.vixv.biz.id`

Website sudah live dan stabil di custom domain. Gunakan URL ini untuk submission.

**Website URL:** `https://cine.vixv.biz.id`
**Backend API:** `https://cinevixv-api.vercel.app`

---

## App Information untuk Submit

### App Name
```
cinevixv
```

### App Category
```
Entertainment
```

### App Description (untuk TikTok Developer Portal)
```
Platform ulasan film & series Indonesia. Auto-post konten editorial ke TikTok & tampilkan video TikTok di website.
```

### App Icon
- Buat icon 1024x1024px dengan logo Cinevixv
- Format: PNG dengan background transparan atau solid

## URLs yang Diperlukan

| Field | URL |
|-------|-----|
| Website URL | `https://cine.vixv.biz.id` |
| Privacy Policy URL | `https://cine.vixv.biz.id/privacy-policy` |
| Terms of Service URL | `https://cine.vixv.biz.id/terms-of-service` |
| Redirect URI | `https://cinevixv-api.vercel.app/api/tiktok/callback` |

> **Catatan:** Redirect URI mengarah ke backend (`cinevixv-api.vercel.app`), bukan frontend.

## Products to Add

1. **Login Kit** — untuk autentikasi pengguna
2. **Content Posting API** — untuk auto-post video ke TikTok
3. **Display API** — untuk menampilkan video TikTok publik
4. **Embed Videos** — untuk embed video di artikel

## Scopes yang Dibutuhkan

### Login Kit
- `user.info.basic`
- `user.info.profile`

### Content Posting API
- `video.publish`
- `video.upload`

### Display API
- `video.list`
- `user.info.stats`

### Embed Videos
- (Tidak perlu scope tambahan)

## Checklist Sebelum Submit

- [ ] Website sudah live dengan HTTPS di `https://cine.vixv.biz.id`
- [ ] Privacy Policy sudah ada dan accessible di `/privacy-policy`
- [ ] Terms of Service sudah ada dan accessible di `/terms-of-service`
- [ ] App icon sudah di-upload (1024x1024px)
- [ ] App description sudah diisi
- [ ] Redirect URI sudah di-set: `https://cinevixv-api.vercel.app/api/tiktok/callback`
- [ ] Login Kit, Content Posting API, Display API, dan Embed Videos sudah di-add
- [ ] Scopes sudah di-add sesuai tabel di atas
- [ ] Semua URL menggunakan HTTPS
- [ ] Backend API sudah deployed dan endpoint `/api/health` accessible
- [ ] Demo video sudah di-upload
- [ ] Domain `cine.vixv.biz.id` sudah terverifikasi di TikTok

## Tips agar Approved

1. **Website harus profesional** — Cinevixv sudah memiliki desain yang clean dan profesional
2. **Privacy Policy harus detail** — Sudah mencakup semua aspek yang diperlukan TikTok
3. **Terms of Service harus jelas** — Sudah mencakup penggunaan TikTok API
4. **App description harus jelas** — Jelaskan dengan spesifik apa yang dilakukan app kamu
5. **Tidak ada konten yang melanggar** — Pastikan semua konten di website sesuai guidelines TikTok
6. **Redirect URI harus accessible** — TikTok akan test redirect URI kamu
7. **Demo video harus jelas** — Tunjukkan seluruh flow integrasi dari awal sampai akhir

## Setelah Submit

- TikTok biasanya mereview dalam 1-3 hari kerja
- Status akan berubah dari "Staging" → "Under Review" → "Live in Production"
- Jika ditolak, baca alasan penolakan dan perbaiki sesuai feedback
- Pastikan semua URL accessible dan tidak ada error 404

## Environment Variables untuk Production (Backend)

```env
TIKTOK_CLIENT_KEY=awy25ycngo53z89l
TIKTOK_CLIENT_SECRET=rwPgv0Lue5Z9tS80GOZvZwa1DvMMZ68V
TIKTOK_REDIRECT_URI=https://cinevixv-api.vercel.app/api/tiktok/callback
CORS_ORIGIN=https://cine.vixv.biz.id
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
NODE_ENV=production
TIKTOK_TARGET_USERNAME=cinevix
```

> **PENTING:** `CORS_ORIGIN` harus `https://cine.vixv.biz.id` agar frontend bisa komunikasi dengan backend.

## Deployment Checklist

### Frontend (Vercel)
1. ✅ Code sudah di-push ke GitHub
2. ✅ Project sudah di-deploy di Vercel
3. ✅ Domain `cine.vixv.biz.id` sudah aktif dan verified

### Backend (Vercel)
1. ✅ Deploy folder `backend/` sebagai project terpisah di Vercel
2. ✅ Set environment variables di Vercel dashboard (lihat tabel di atas)
3. ✅ Test endpoint `/api/health`
4. ✅ Pastikan redirect URI accessible

### TikTok Developer Portal
1. Daftar di https://developers.tiktok.com/
2. Create app baru
3. Isi semua informasi app (gunakan URL `cine.vixv.biz.id`)
4. Add products: Login Kit + Content Posting API + Display API + Embed Videos
5. Add scopes sesuai tabel di atas
6. Set Redirect URI: `https://cinevixv-api.vercel.app/api/tiktok/callback`
7. Verifikasi domain `cine.vixv.biz.id` (via File Upload)
8. Upload demo video
9. Submit untuk review

## Verifikasi Domain TikTok

Karena kita menggunakan custom domain, TikTok meminta verifikasi kepemilikan.

1. Di form TikTok, klik **Verify** pada URL `https://cine.vixv.biz.id`.
2. Pilih metode **File Upload**.
3. Download file `.txt` dari TikTok.
4. File verifikasi sudah ada di repo kita: `public/tiktokTvfwY91BNkcUlWvN4Gja0CffIbKWdFk6.txt`.
5. Pastikan file ini accessible di `https://cine.vixv.biz.id/tiktokTvfwY91BNkcUlWvN4Gja0CffIbKWdFk6.txt`.
6. Klik **Verify** di TikTok.
