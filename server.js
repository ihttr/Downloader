const express = require('express');
const axios = require('axios');
const path = require('path');
const { INSTAGRAM_API, YOUTUBE_API } = require('./config');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

function detectPlatform(url) {
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  return null;
}

app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  const platform = detectPlatform(url);

  if (!platform) return res.json({ success: false });

  try {
    if (platform === 'tiktok') {
      const r = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
      return res.json({ success: true, video: r.data.data.play, audio: r.data.data.music });
    }

    if (platform === 'instagram') {
      const r = await axios.get(`${INSTAGRAM_API}?url=${encodeURIComponent(url)}`);
      return res.json({ success: true, video: r.data.video });
    }

    if (platform === 'youtube') {
      const r = await axios.get(`${YOUTUBE_API}?url=${encodeURIComponent(url)}`);
      return res.json({ success: true, video: r.data.mp4, audio: r.data.mp3 });
    }

  } catch {
    return res.json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
