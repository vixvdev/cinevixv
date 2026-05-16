# Environment Setup Guide — Cinevixv

## Domain Final
```
https://cine.vixv.biz.id
```

## Environment Variables yang Dibutuhkan

### 1. TikTok Developer Credentials (WAJIB)
Kamu harus daftar dulu di TikTok Developer Portal untuk dapat ini:

| Variable | Cara Dapat | Contoh |
|----------|-----------|--------|
| `TIKTOK_CLIENT_KEY` | TikTok Developer Portal → Manage Apps → Your App → Client Key | `aw6f7g8h9j0k1l2m3n4p5q` |
| `TIKTOK_CLIENT_SECRET` | TikTok Developer Portal → Manage Apps → Your App → Client Secret | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4p5q6` |

**Cara dapat:**
1. Buka https://developers.tiktok.com/
2. Login dengan akun TikTok kamu
3. Klik "Manage Apps" → "Create App"
4. Isi nama app: `Cinevixv`
5. Pilih kategori: `Entertainment`
6. Setelah app dibuat, buka app kamu → tab "Configuration"
7. Copy "Client Key" dan "Client Secret"

### 2. Session Secret (WAJIB)
Generate random string untuk keamanan session:

**Cara generate di Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Atau gunakan string random apapun minimal 32 karakter.

### 3. Variable yang Sudah Otomatis (TIDAK PERLU DIUBAH)

| Variable | Nilai | Keterangan |
|----------|-------|-----------|
| `TIKTOK_REDIRECT_URI` | `https://cine.vixv.biz.id/api/tiktok/callback` | Sudah di-set |
| `CORS_ORIGIN` | `https://cine.vixv.biz.id` | Sudah di-set |
| `PORT` | `4000` | Sudah di-set |
| `NODE_ENV` | `production` | Sudah di-set |
| `TIKTOK_TARGET_USERNAME` | `cinevix` | Username TikTok untuk auto-post |

## Cara Setup di Vercel

### Frontend (Root Project)
1. Buka Vercel Dashboard → Project kamu
2. Settings → Environment Variables
3. Tidak perlu variable khusus untuk frontend

### Backend (backend/ folder)
1. Deploy folder `backend/` sebagai project terpisah di Vercel
2. Settings → Environment Variables
3. Tambahkan variable berikut:

```
TIKTOK_CLIENT_KEY = <paste client key dari TikTok>
TIKTOK_CLIENT_SECRET = <paste client secret dari TikTok>
TIKTOK_REDIRECT_URI = https://cine.vixv.biz.id/api/tiktok/callback
CORS_ORIGIN = https://cine.vixv.biz.id
SESSION_SECRET = <paste random string 32+ karakter>
NODE_ENV = production
TIKTOK_TARGET_USERNAME = cinevix
```

## Langkah-langkah Lengkap

### Step 1: Daftar TikTok Developer
1. Buka https://developers.tiktok.com/
2. Login dengan akun TikTok @cinevix
3. Klik "Manage Apps" → "Create App"
4. Isi form:
   - **App Name**: `Cinevixv`
   - **Category**: `Entertainment`
   - **Description**: (lihat di tiktok-submission-guide.md)
   - **Icon**: Upload logo Cinevixv 512x512px
5. Klik "Create"

### Step 2: Konfigurasi App di TikTok Developer
1. Buka app yang baru dibuat
2. Tab "Configuration":
   - **Website URL**: `https://cine.vixv.biz.id`
   - **Privacy Policy URL**: `https://cine.vixv.biz.id/privacy-policy`
   - **Terms of Service URL**: `https://cine.vixv.biz.id/terms-of-service`
3. Tab "Products" → "+ Add Products":
   - Add **Login Kit**
   - Add **TikTok API**
   - Add **Content Posting API**
4. Setelah add Login Kit, set:
   - **Redirect URI**: `https://cine.vixv.biz.id/api/tiktok/callback`
5. Copy **Client Key** dan **Client Secret**

### Step 3: Deploy Backend ke Vercel
1. Buat project baru di Vercel dari folder `backend/`
2. Set environment variables (lihat tabel di atas)
3. Deploy
4. Catat URL backend (contoh: `https://cinevixv-backend.vercel.app`)

### Step 4: Update CORS di Backend
Jika backend URL berbeda dari frontend, update `CORS_ORIGIN` di environment variables backend.

### Step 5: Submit App untuk Review
1. Kembali ke TikTok Developer Portal
2. Buka app kamu
3. Klik "Submit for Review"
4. Tunggu 1-3 hari kerja

## Testing Setelah Deploy

### Test Health Endpoint
```bash
curl https://your-backend-url.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "service": "cinevixv-backend",
  "timestamp": "2025-05-16T...",
  "tiktok_api": "configured"
}
```

### Test OAuth Flow
1. Buka `https://cine.vixv.biz.id`
2. Klik tombol "Login with TikTok" (jika ada)
3. Harus redirect ke TikTok login page
4. Setelah login, redirect kembali ke website

## Troubleshooting

### Redirect URI Mismatch
- Pastikan Redirect URI di TikTok Developer Portal SAMA PERSIS dengan `TIKTOK_REDIRECT_URI` di environment variables
- Harus diakhiri dengan `/api/tiktok/callback`
- Harus menggunakan HTTPS

### CORS Error
- Pastikan `CORS_ORIGIN` di backend sesuai dengan domain frontend
- Jika frontend dan backend di domain berbeda, set `CORS_ORIGIN` ke domain frontend

### App Not Approved
- Pastikan Privacy Policy dan Terms of Service accessible (tidak 404)
- Pastikan website sudah live dan profesional
- Baca alasan penolakan dan perbaiki sesuai feedback
