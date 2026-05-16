require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 4000;

/* ═══════════════════════════════════════════
   MIDDLEWARE
   ═══════════════════════════════════════════ */

// Security headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS - allow frontend to access API
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Session for CSRF protection
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60000 // 1 minute for OAuth flow
  }
}));

/* ═══════════════════════════════════════════
   TIKTOK OAUTH 2.0 ENDPOINTS
   ═══════════════════════════════════════════ */

/**
 * GET /api/tiktok/auth
 * Generates TikTok OAuth 2.0 authorization URL
 * Redirects user to TikTok login page
 */
app.get('/api/tiktok/auth', (req, res) => {
  try {
    // Generate CSRF state token
    const csrfState = Math.random().toString(36).substring(2) + Date.now().toString(36);
    res.cookie('csrfState', csrfState, {
      maxAge: 300000, // 5 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Build TikTok authorization URL
    const authUrl = 'https://www.tiktok.com/v2/auth/authorize/';
    const params = {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      scope: 'user.info.basic,user.info.profile,user.info.stats,video.list',
      response_type: 'code',
      redirect_uri: process.env.TIKTOK_REDIRECT_URI,
      state: csrfState
    };

    const url = `${authUrl}?${querystring.stringify(params)}`;
    res.json({ url });
  } catch (error) {
    console.error('Error generating auth URL:', error.message);
    res.status(500).json({ error: 'Failed to generate authorization URL' });
  }
});

/**
 * GET /api/tiktok/callback
 * TikTok redirects here after user authorizes
 * Receives authorization code and exchanges for access token
 */
app.get('/api/tiktok/callback', async (req, res) => {
  try {
    const { code, state, error, error_description } = req.query;

    // Check for error from TikTok
    if (error) {
      console.error('TikTok auth error:', error, error_description);
      return res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/?error=${encodeURIComponent(error_description || error)}`);
    }

    if (!code) {
      return res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/?error=No authorization code received`);
    }

    // Verify CSRF state
    const storedState = req.cookies.csrfState;
    if (!storedState || storedState !== state) {
      console.error('CSRF state mismatch');
      return res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/?error=Invalid state parameter`);
    }

    // Clear CSRF cookie
    res.clearCookie('csrfState');

    // Exchange authorization code for access token
    const tokenEndpoint = 'https://open.tiktokapis.com/v2/oauth/token/';
    const tokenParams = {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code: decodeURIComponent(code),
      grant_type: 'authorization_code',
      redirect_uri: process.env.TIKTOK_REDIRECT_URI
    };

    const tokenResponse = await axios.post(
      tokenEndpoint,
      querystring.stringify(tokenParams),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache'
        }
      }
    );

    const { access_token, refresh_token, open_id, expires_in, scope } = tokenResponse.data;

    if (!access_token) {
      throw new Error('No access token received from TikTok');
    }

    // Fetch user profile info
    const userInfoEndpoint = 'https://open.tiktokapis.com/v2/user/info/';
    const userInfoResponse = await axios.get(userInfoEndpoint, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    const userInfo = userInfoResponse.data.data.user;

    // Redirect to frontend with success (in production, store tokens securely)
    // For demo purposes, we redirect with a flag. In production, set httpOnly cookies.
    res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/?tiktok_auth=success&username=${encodeURIComponent(userInfo?.display_name || 'user')}`);

  } catch (error) {
    console.error('Error in TikTok callback:', error.message);
    if (error.response) {
      console.error('TikTok API error:', error.response.data);
    }
    res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/?error=Authentication failed. Please try again.`);
  }
});

/**
 * POST /api/tiktok/token/refresh
 * Refreshes an expired access token using refresh token
 */
app.post('/api/tiktok/token/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const tokenEndpoint = 'https://open.tiktokapis.com/v2/oauth/token/';
    const params = {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    };

    const response = await axios.post(
      tokenEndpoint,
      querystring.stringify(params),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

/**
 * POST /api/tiktok/videos
 * Fetches user's TikTok videos using access token
 */
app.post('/api/tiktok/videos', async (req, res) => {
  try {
    const { access_token, max_count = 20, cursor = 0 } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    const videosEndpoint = 'https://open.tiktokapis.com/v2/video/list/';
    const fields = 'id,title,video_description,duration,cover_image_url,embed_link,share_url,create_time';

    const response = await axios.post(
      `${videosEndpoint}?fields=${fields}`,
      {
        max_count: Math.min(max_count, 20),
        cursor: cursor
      },
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    if (error.response) {
      console.error('TikTok API error:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

/**
 * POST /api/tiktok/video
 * Fetches a single video's details
 */
app.post('/api/tiktok/video', async (req, res) => {
  try {
    const { access_token, video_id } = req.body;

    if (!access_token || !video_id) {
      return res.status(400).json({ error: 'Access token and video ID are required' });
    }

    const videoEndpoint = 'https://open.tiktokapis.com/v2/video/query/';
    const fields = 'id,title,video_description,duration,cover_image_url,embed_link,share_url,create_time,like_count,comment_count,share_count,view_count';

    const response = await axios.post(
      `${videoEndpoint}?fields=${fields}`,
      {
        filters: { video_ids: [video_id] }
      },
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

/**
 * POST /api/tiktok/user
 * Fetches authenticated user's profile info
 */
app.post('/api/tiktok/user', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    const userInfoEndpoint = 'https://open.tiktokapis.com/v2/user/info/';

    const response = await axios.get(userInfoEndpoint, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

/**
 * POST /api/tiktok/user/stats
 * Fetches user's stats (follower count, following count, etc.)
 */
app.post('/api/tiktok/user/stats', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    const statsEndpoint = 'https://open.tiktokapis.com/v2/user/info/stats/';

    const response = await axios.get(statsEndpoint, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user stats:', error.message);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

/* ═══════════════════════════════════════════
   HEALTH CHECK
   ═══════════════════════════════════════════ */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'cinevixv-backend',
    timestamp: new Date().toISOString(),
    tiktok_api: 'configured'
  });
});

/* ═══════════════════════════════════════════
   ERROR HANDLING
   ═══════════════════════════════════════════ */

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

/* ═══════════════════════════════════════════
   START SERVER
   ═══════════════════════════════════════════ */

app.listen(PORT, () => {
  console.log(`╔══════════════════════════════════════╗`);
  console.log(`║  Cinevixv Backend Server Running     ║`);
  console.log(`║  Port: ${PORT}                          ║`);
  console.log(`║  Environment: ${process.env.NODE_ENV || 'development'}              ║`);
  console.log(`║  TikTok API: Configured              ║`);
  console.log(`╚══════════════════════════════════════╝`);
});
