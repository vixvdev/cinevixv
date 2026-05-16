#  DEPLOYMENT GUIDE — Cinevixv

## Credentials Sudah Di-Set
- Client Key: `awy25ycngo53z89l`
- Client Secret: `rwPgv0Lue5Z9tS80GOZvZwa1DvMMZ68V`
- Redirect URI: `https://cine.vixv.biz.id/api/tiktok/callback`

---

## Step 1: Push ke GitHub

### Buat Repository Baru di GitHub
1. Buka https://github.com/new
2. Repository name: `vixv-cinevixv-website`
3. Public atau Private (terserah)
4. **JANGAN** centang "Add a README file"
5. Klik "Create repository"

### Push Code ke GitHub
Setelah repo dibuat, GitHub akan tampilkan command. Copy-paste ini di terminal:

```bash
cd D:\01-vixv\00-deployment\vixv-cinevixv-website
git remote add origin https://github.com/YOUR_USERNAME/vixv-cinevixv-website.git
git branch -M main
git push -u origin main
```

Ganti `YOUR_USERNAME` dengan username GitHub kamu.

---

## Step 2: Deploy Frontend ke Vercel

1. Buka https://vercel.com/new
2. Import Git Repository → pilih `vixv-cinevixv-website`
3. **Framework Preset**: Other (karena ini static HTML)
4. **Root Directory**: (kosongkan, biarkan default)
5. Klik "Deploy"

### Set Domain di Vercel
1. Setelah deploy, buka project di Vercel Dashboard
2. Settings → Domains
3. Add domain: `cine.vixv.biz.id`
4. Ikuti instruksi untuk setup DNS di provider domain kamu (biz.id)

---

## Step 3: Deploy Backend ke Vercel

### Option A: Deploy sebagai Project Terpisah (Recommended)
1. Buat repo GitHub terpisah untuk backend, atau
2. Deploy folder `backend/` sebagai project terpisah di Vercel:
   - Buka https://vercel.com/new
   - Import repo yang sama
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - Klik "Deploy"

### Set Environment Variables di Vercel Backend
1. Buka project backend di Vercel Dashboard
2. Settings → Environment Variables
3. Tambahkan variable berikut:

| Variable | Value |
|----------|-------|
| `TIKTOK_CLIENT_KEY` | `awy25ycngo53z89l` |
| `TIKTOK_CLIENT_SECRET` | `rwPgv0Lue5Z9tS80GOZvZwa1DvMMZ68V` |
| `TIKTOK_REDIRECT_URI` | `https://cine.vixv.biz.id/api/tiktok/callback` |
| `CORS_ORIGIN` | `https://cine.vixv.biz.id` |
| `SESSION_SECRET` | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6` |
| `NODE_ENV` | `production` |
| `TIKTOK_TARGET_USERNAME` | `cinevix` |

4. Redeploy setelah set environment variables

### Option B: Deploy sebagai API Routes di Project yang Sama
Jika ingin frontend dan backend dalam 1 project Vercel:
1. Pindahkan folder `backend/` ke root project
2. Rename `server.js` menjadi `api/index.js`
3. Update `vercel.json` di root:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "/api/index.js" }
     ]
   }
   ```

---

## Step 4: Test Deployment

### Test Frontend
Buka `https://cine.vixv.biz.id` — harus muncul website Cinevixv

### Test Backend Health
Buka `https://YOUR_BACKEND_URL.vercel.app/api/health`

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
1. Buka website
2. Klik CMS → Login
3. Masukkan username: `vixv`, password: `vixv`
4. Jika ada tombol "Login with TikTok", klik untuk test OAuth

---

## Step 5: Isi Form TikTok Developer

Buka file `00-docs/tiktok-form-text.md` — semua text sudah siap copy-paste.

### Yang Perlu Kamu Isi Manual di TikTok Developer Portal:
1. **App Icon** — Upload logo 1024x1024px
2. **Category** — Pilih `Entertainment`
3. **Description** — Copy dari `tiktok-form-text.md`
4. **Terms of Service URL** — `https://cine.vixv.biz.id/terms-of-service`
5. **Privacy Policy URL** — `https://cine.vixv.biz.id/privacy-policy`
6. **Products** — Add: Login Kit, Content Posting API, Display API, Embed Videos
7. **Scopes** — Add sesuai tabel di `tiktok-form-text.md`
8. **URL Properties** — Set Website URL & Redirect URI
9. **Demo Video** — Rekam video demo (lihat panduan di `tiktok-form-text.md`)
10. **App Review Explanation** — Copy dari `tiktok-form-text.md`

Setelah semua diisi, klik **"Submit for review"**

---

## Step 6: Tunggu Review

- TikTok biasanya mereview dalam 1-3 hari kerja
- Status akan berubah: Draft → Under Review → Live in Production
- Jika ditolak, baca alasan dan perbaiki sesuai feedback

---

## Troubleshooting

### Redirect URI Mismatch
Pastikan Redirect URI di TikTok Developer Portal SAMA PERSIS dengan:
`https://cine.vixv.biz.id/api/tiktok/callback`

### CORS Error
Pastikan `CORS_ORIGIN` di environment variables backend sesuai dengan domain frontend.

### App Not Approved
- Pastikan Privacy Policy dan Terms of Service accessible (tidak 404)
- Pastikan website sudah live dan profesional
- Pastikan demo video menunjukkan seluruh flow integrasi

---

## File Penting

| File | Fungsi |
|------|--------|
| `00-docs/tiktok-form-text.md` | Text untuk copy-paste ke TikTok Developer form |
| `00-docs/environment-setup.md` | Panduan setup environment variables |
| `backend/.env` | Environment variables (JANGAN commit ke git!) |
| `backend/server.js` | Backend API server |
