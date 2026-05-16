# Cinevixv Backend — TikTok OAuth 2.0 API

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your TikTok Developer credentials:
   - `TIKTOK_CLIENT_KEY` — dari TikTok Developer Portal
   - `TIKTOK_CLIENT_SECRET` — dari TikTok Developer Portal
   - `TIKTOK_REDIRECT_URI` — harus HTTPS, contoh: `https://cine.vixv.biz.id/api/tiktok/callback`
   - `CORS_ORIGIN` — URL frontend kamu

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run:
   ```bash
   npm run dev    # development (auto-restart)
   npm start      # production
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tiktok/auth` | Generate TikTok OAuth URL |
| GET | `/api/tiktok/callback` | TikTok redirect callback |
| POST | `/api/tiktok/token/refresh` | Refresh access token |
| POST | `/api/tiktok/videos` | Get user's videos |
| POST | `/api/tiktok/video` | Get single video details |
| POST | `/api/tiktok/user` | Get user profile |
| POST | `/api/tiktok/user/stats` | Get user stats |
| GET | `/api/health` | Health check |

## TikTok Developer Setup

1. Daftar di https://developers.tiktok.com/
2. Buat app baru di Manage Apps
3. Tambahkan produk: **Login Kit** + **TikTok API**
4. Set Redirect URI: `https://yourdomain.com/api/tiktok/callback`
5. Submit app untuk review

## Deployment

Deploy ke Vercel, Railway, atau Render. Pastikan:
- Environment variables sudah di-set
- URL menggunakan HTTPS
- CORS_ORIGIN sesuai domain frontend
