# ✅ SETUP SELESAI — Cinevixv

## Domain Final
```
https://cine.vixv.biz.id
```

## Yang Sudah Dikerjakan

### 1. ✅ Semua File Sudah Update Domain
- `index.html` — meta tags, canonical, OG tags
- `privacy-policy.html` — 22 section, 787 baris
- `terms-of-service.html` — 21 section, 710 baris
- `backend/.env.example` — template environment variables
- `backend/README.md` — dokumentasi backend
- `00-docs/tiktok-submission-guide.md` — panduan submit ke TikTok
- `00-docs/environment-setup.md` — panduan setup environment

### 2. ✅ Backend Siap untuk Auto-Post TikTok
Folder `backend/` berisi:
- `server.js` — Express server dengan semua endpoint TikTok API
- `package.json` — dependencies
- `vercel.json` — config deploy ke Vercel
- `.env.example` — template environment variables
- `README.md` — cara setup

**Endpoints Backend:**
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/tiktok/auth` | Generate OAuth URL |
| GET | `/api/tiktok/callback` | Handle redirect dari TikTok |
| POST | `/api/tiktok/token/refresh` | Refresh access token |
| POST | `/api/tiktok/videos` | Get user's videos |
| POST | `/api/tiktok/video` | Get single video |
| POST | `/api/tiktok/user` | Get user profile |
| POST | `/api/tiktok/user/stats` | Get user stats |
| POST | `/api/tiktok/publish` | **Auto-post video ke TikTok** |
| GET | `/api/health` | Health check |

### 3. ✅ Environment Variables yang Dibutuhkan

| Variable | Status | Keterangan |
|----------|--------|-----------|
| `TIKTOK_CLIENT_KEY` | ⚠️ BUTUH INPUT | Dari TikTok Developer Portal |
| `TIKTOK_CLIENT_SECRET` | ⚠️ BUTUH INPUT | Dari TikTok Developer Portal |
| `TIKTOK_REDIRECT_URI` | ✅ SUDAH DI-SET | `https://cine.vixv.biz.id/api/tiktok/callback` |
| `CORS_ORIGIN` | ✅ SUDAH DI-SET | `https://cine.vixv.biz.id` |
| `SESSION_SECRET` | ⚠️ BUTUH INPUT | Generate random string 32+ karakter |
| `NODE_ENV` | ✅ SUDAH DI-SET | `production` |
| `TIKTOK_TARGET_USERNAME` | ✅ SUDAH DI-SET | `cinevix` |

## Langkah Selanjutnya

### Step 1: Daftar TikTok Developer Portal
1. Buka https://developers.tiktok.com/
2. Login dengan akun TikTok @cinevix
3. Klik "Manage Apps" → "Create App"
4. Isi:
   - **App Name**: `Cinevixv`
   - **Category**: `Entertainment`
   - **Description**: (lihat `00-docs/tiktok-submission-guide.md`)
   - **Icon**: Upload logo 512x512px
5. Setelah app dibuat, buka app → tab "Configuration"
6. Copy **Client Key** dan **Client Secret**

### Step 2: Konfigurasi App di TikTok Developer
1. Tab "Configuration":
   - **Website URL**: `https://cine.vixv.biz.id`
   - **Privacy Policy URL**: `https://cine.vixv.biz.id/privacy-policy`
   - **Terms of Service URL**: `https://cine.vixv.biz.id/terms-of-service`
2. Tab "Products" → "+ Add Products":
   - Add **Login Kit**
   - Add **TikTok API**
   - Add **Content Posting API**
3. Setelah add Login Kit, set:
   - **Redirect URI**: `https://cine.vixv.biz.id/api/tiktok/callback`

### Step 3: Deploy Backend ke Vercel
1. Buat project baru di Vercel dari folder `backend/`
2. Settings → Environment Variables → Tambahkan:
   ```
   TIKTOK_CLIENT_KEY = <paste dari TikTok Developer>
   TIKTOK_CLIENT_SECRET = <paste dari TikTok Developer>
   TIKTOK_REDIRECT_URI = https://cine.vixv.biz.id/api/tiktok/callback
   CORS_ORIGIN = https://cine.vixv.biz.id
   SESSION_SECRET = <random string 32+ karakter>
   NODE_ENV = production
   TIKTOK_TARGET_USERNAME = cinevix
   ```
3. Deploy

### Step 4: Submit App untuk Review
1. Kembali ke TikTok Developer Portal
2. Buka app kamu
3. Klik "Submit for Review"
4. Tunggu 1-3 hari kerja

## File Penting

| File | Fungsi |
|------|--------|
| `00-docs/environment-setup.md` | Panduan lengkap setup environment |
| `00-docs/tiktok-submission-guide.md` | Panduan submit ke TikTok Developer |
| `backend/.env.example` | Template environment variables |
| `backend/README.md` | Dokumentasi backend API |

## Next: Diskusi Setup TikTok Developer
Setelah kamu dapat **Client Key** dan **Client Secret** dari TikTok Developer Portal, kita bisa lanjut:
1. Setup environment variables di Vercel
2. Test OAuth flow
3. Test auto-post video ke TikTok
4. Submit app untuk review
