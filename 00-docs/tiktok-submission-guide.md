# TikTok Developer App Submission Guide — Cinevixv

## App Information untuk Submit

### App Name
```
Cinevixv — Film & Series Review Platform
```

### App Category
```
Entertainment
```

### App Description (untuk TikTok Developer Portal)
```
Cinevixv adalah platform konten berbahasa Indonesia yang menerbitkan artikel ulasan, pembahasan, dan rekomendasi film serta series. Aplikasi ini menggunakan TikTok API untuk:

1. Menampilkan konten video TikTok terkait ulasan film/series di website kami
2. Memposting konten artikel dan video ulasan ke akun TikTok resmi @cinevix
3. Mengambil informasi profil publik untuk menampilkan konten creator

Kami hanya mengakses data publik yang diperlukan untuk fungsi-fungsi di atas. Tidak ada data sensitif yang dikumpulkan atau disimpan.

Website: https://cine.vixv.biz.id
TikTok: @cinevix
```

### App Icon
- Buat icon 512x512px dengan logo Cinevixv
- Format: PNG dengan background transparan atau solid

## URLs yang Diperlukan

| Field | URL |
|-------|-----|
| Website URL | `https://cine.vixv.biz.id` |
| Privacy Policy URL | `https://cine.vixv.biz.id/privacy-policy` |
| Terms of Service URL | `https://cine.vixv.biz.id/terms-of-service` |
| Redirect URI | `https://cine.vixv.biz.id/api/tiktok/callback` |

## Products to Add

1. **Login Kit** — untuk autentikasi pengguna
2. **TikTok API** — untuk mengakses video dan profil
3. **Content Posting API** — untuk auto-post video ke TikTok

## Scopes yang Dibutuhkan

```
user.info.basic
user.info.profile
user.info.stats
video.list
video.publish
```

## Checklist Sebelum Submit

- [ ] Website sudah live dengan HTTPS di `https://cine.vixv.biz.id`
- [ ] Privacy Policy sudah ada dan accessible di `/privacy-policy`
- [ ] Terms of Service sudah ada dan accessible di `/terms-of-service`
- [ ] App icon sudah di-upload
- [ ] App description sudah diisi
- [ ] Redirect URI sudah di-set: `https://cine.vixv.biz.id/api/tiktok/callback`
- [ ] Login Kit, TikTok API, dan Content Posting API sudah di-add
- [ ] Semua URL menggunakan HTTPS
- [ ] Backend API sudah deployed dan accessible

## Tips agar Approved

1. **Website harus profesional** — Cinevixv sudah memiliki desain yang clean dan profesional
2. **Privacy Policy harus detail** — Sudah mencakup semua aspek yang diperlukan TikTok
3. **Terms of Service harus jelas** — Sudah mencakup penggunaan TikTok API
4. **App description harus jelas** — Jelaskan dengan spesifik apa yang dilakukan app kamu
5. **Tidak ada konten yang melanggar** — Pastikan semua konten di website sesuai guidelines TikTok
6. **Redirect URI harus accessible** — TikTok akan test redirect URI kamu

## Setelah Submit

- TikTok biasanya mereview dalam 1-3 hari kerja
- Status akan berubah dari "Staging" → "Under Review" → "Live in Production"
- Jika ditolak, baca alasan penolakan dan perbaiki sesuai feedback
- Pastikan semua URL accessible dan tidak ada error 404

## Environment Variables untuk Production

```env
TIKTOK_CLIENT_KEY=dari_tiktok_developer_portal
TIKTOK_CLIENT_SECRET=dari_tiktok_developer_portal
TIKTOK_REDIRECT_URI=https://cine.vixv.biz.id/api/tiktok/callback
CORS_ORIGIN=https://cine.vixv.biz.id
SESSION_SECRET=generate_random_string_32_chars
NODE_ENV=production
TIKTOK_TARGET_USERNAME=cinevix
```

## Deployment Checklist

### Frontend (Vercel)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set domain `cine.vixv.biz.id` di Vercel
4. Pastikan SSL/HTTPS aktif

### Backend (Vercel)
1. Deploy folder `backend/` sebagai project terpisah di Vercel
2. Set environment variables di Vercel dashboard
3. Set domain yang sama atau subdomain untuk API
4. Test endpoint `/api/health`

### TikTok Developer Portal
1. Daftar di https://developers.tiktok.com/
2. Create app baru
3. Isi semua informasi app
4. Add products: Login Kit + TikTok API + Content Posting API
5. Set Redirect URI: `https://cine.vixv.biz.id/api/tiktok/callback`
6. Submit untuk review
