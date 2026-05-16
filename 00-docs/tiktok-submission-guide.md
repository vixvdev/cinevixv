# TIKTOK SUBMISSION GUIDE — FINAL

## STEP 1: CREATE APP
1. Pilih **Individual**.
2. Klik **Confirm**.

## STEP 2: ISI FORM
1. **App Name:** `cinevixv`
2. **Category:** `Entertainment`
3. **Description:** `Platform ulasan film & series Indonesia. Auto-post konten editorial ke TikTok & tampilkan video TikTok di website.`
4. **Terms of Service URL:** `https://cine.vixv.biz.id/terms-of-service`
5. **Privacy Policy URL:** `https://cine.vixv.biz.id/privacy-policy`
6. **Web/Desktop URL:** `https://cine.vixv.biz.id`

## STEP 3: VERIFIKASI DOMAIN
1. Klik **Verify** di sebelah URL `https://cine.vixv.biz.id`.
2. Pilih metode **File Upload**.
3. Download file `.txt` dari TikTok.
4. File sudah ada di website kamu: `https://cine.vixv.biz.id/tiktokRXfBPt040CEMj00XwbxnLoADaYKhXJRu.txt`.
5. Klik **Verify**.

## STEP 4: URL PROPERTIES
1. Masukkan **Redirect URI**:
   `https://cinevixv-api.vercel.app/api/tiktok/callback`
2. Klik **Save**.

## STEP 5: PRODUCTS & SCOPES
1. **Add Products:** Login Kit, Content Posting API, Display API, Embed Videos.
2. **Add Scopes:**
   - user.info.basic
   - user.info.profile
   - video.publish
   - video.upload
   - video.list
   - user.info.stats

## STEP 6: SUBMIT
1. Upload **Demo Video** (rekam layar flow login & post).
2. Upload **App Icon** (1024x1024px).
3. Klik **Submit for Review**.

## STEP 7: UPDATE BACKEND (Vercel)
Masuk ke project `cinevixv-api` → Settings → Environment Variables.
Update/Add:
- `CORS_ORIGIN` = `https://cine.vixv.biz.id`
- `TIKTOK_REDIRECT_URI` = `https://cinevixv-api.vercel.app/api/tiktok/callback`
