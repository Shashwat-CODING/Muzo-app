(function () {
  // ── Extract Track ID from URL Path or Query ──
  function getTrackId() {
    const pathname = window.location.pathname;
    // Match /code/play/<id> or /play/<id>
    const match = pathname.match(/(?:\/code)?\/play\/([^/]+)/);
    if (match && match[1]) {
      return match[1];
    }
    // Fallback to query parameter 'id' or 'v'
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || params.get('v') || 'MlpG_JAcB2o';
  }

  const trackId = getTrackId();
  const deepLinkUrl = `muzo://s/${trackId}`;

  // DOM Elements
  const trackArt = document.getElementById('trackArt');
  const ambientBg = document.getElementById('ambientBg');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtists = document.getElementById('trackArtists');
  const trackAlbum = document.getElementById('trackAlbum');
  const explicitBadge = document.getElementById('explicitBadge');
  const audioPlayer = document.getElementById('audioPlayer');
  
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  
  const progressBar = document.getElementById('progressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  
  const shareBtn = document.getElementById('shareBtn');
  
  const navOpenMuzoBtn = document.getElementById('navOpenMuzoBtn');
  const mainOpenMuzoBtn = document.getElementById('mainOpenMuzoBtn');

  // Setup Deep Link buttons
  if (navOpenMuzoBtn) navOpenMuzoBtn.href = deepLinkUrl;
  if (mainOpenMuzoBtn) mainOpenMuzoBtn.href = deepLinkUrl;

  // Format Seconds to MM:SS
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // ── 1. Fetch Track Metadata ──
  async function fetchMetadata() {
    const metadataApiUrl = `https://shashwatidr-img.hf.space/api/metadata/${trackId}`;
    try {
      const res = await fetch(metadataApiUrl);
      if (!res.ok) throw new Error('Metadata API response error');
      const data = await res.json();

      // Normalize title & artists (handles both response formats)
      const title = data.title || data.name || 'Unknown Track';
      let artistText = '';
      if (Array.isArray(data.artists_data) && data.artists_data.length > 0) {
        artistText = data.artists_data.map(a => a.name).join(', ');
      } else if (typeof data.artists === 'string') {
        artistText = data.artists;
      } else {
        artistText = 'Unknown Artist';
      }

      // Album name
      const albumName = (data.album && data.album.name) ? data.album.name : '';

      // High quality thumbnail selection & URL upgrading to w800-h800
      let thumbUrl = data.thumbnail || '';
      if (Array.isArray(data.thumbnails) && data.thumbnails.length > 0) {
        const sorted = [...data.thumbnails].sort((a, b) => (b.width || 0) - (a.width || 0));
        thumbUrl = sorted[0].url || thumbUrl;
      }
      if (thumbUrl) {
        thumbUrl = thumbUrl.replace(/=w\d+-h\d+/, '=w800-h800');
      }

      // Update DOM with Metadata
      document.title = `${title} • ${artistText} — Muzo`;
      trackTitle.textContent = title;
      trackArtists.textContent = artistText;
      trackAlbum.textContent = albumName ? `Album: ${albumName}` : '';
      
      if (thumbUrl) {
        trackArt.src = thumbUrl;
        ambientBg.style.backgroundImage = `url('${thumbUrl}')`;
      }

      // Update meta tags for link preview (Song name & Song thumbnail)
      const ogTitle = document.getElementById('ogTitle');
      const ogDesc = document.getElementById('ogDesc');
      const ogImage = document.getElementById('ogImage');
      const twTitle = document.getElementById('twTitle');
      const twDesc = document.getElementById('twDesc');
      const twImage = document.getElementById('twImage');

      if (ogTitle) ogTitle.content = title;
      if (ogDesc) ogDesc.content = artistText ? `Listen to ${title} by ${artistText} on Muzo` : `Listen to ${title} on Muzo`;
      if (twTitle) twTitle.content = title;
      if (twDesc) twDesc.content = artistText ? `Listen to ${title} by ${artistText} on Muzo` : `Listen to ${title} on Muzo`;
      
      if (thumbUrl) {
        if (ogImage) ogImage.content = thumbUrl;
        if (twImage) twImage.content = thumbUrl;
      }

      if (data.is_explicit) {
        explicitBadge.style.display = 'inline-block';
      } else {
        explicitBadge.style.display = 'none';
      }

      // Pre-populate duration if provided
      if (data.duration_seconds) {
        totalDurationEl.textContent = formatTime(data.duration_seconds);
        progressBar.max = data.duration_seconds;
      }

    } catch (err) {
      console.warn('Failed to load metadata, using defaults:', err);
    }
  }

  // ── 2. Fetch Audio Stream URL ──
  async function fetchStream() {
    const streamApiUrl = `https://mlc.kouzu.in/api/stream?id=${trackId}`;
    try {
      const res = await fetch(streamApiUrl);
      if (!res.ok) throw new Error('Stream API response error');
      const data = await res.json();

      if (data && data.url) {
        audioPlayer.src = data.url;
        // Optionally update track/artist from stream endpoint if missing
        if (trackTitle.textContent.includes('skeleton')) {
          if (data.name) trackTitle.textContent = data.name;
          if (data.artist) trackArtists.textContent = data.artist;
        }
      } else {
        throw new Error('No stream URL returned');
      }
    } catch (err) {
      console.error('Error fetching stream URL:', err);
    }
  }

  // ── 3. Audio Player Logic & Controls ──
  function togglePlay() {
    if (!audioPlayer.src) return;
    if (audioPlayer.paused) {
      audioPlayer.play().catch(e => console.error('Play blocked:', e));
    } else {
      audioPlayer.pause();
    }
  }

  audioPlayer.addEventListener('play', () => {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  });

  audioPlayer.addEventListener('pause', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  });

  const progressFill = document.getElementById('progressFill');

  function updateProgressFill() {
    if (progressBar.max && progressBar.max > 0) {
      const percentage = (progressBar.value / progressBar.max) * 100;
      if (progressFill) {
        progressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
      }
    }
  }

  audioPlayer.addEventListener('loadedmetadata', () => {
    if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
      totalDurationEl.textContent = formatTime(audioPlayer.duration);
      progressBar.max = audioPlayer.duration;
      updateProgressFill();
    }
  });

  audioPlayer.addEventListener('timeupdate', () => {
    if (!isNaN(audioPlayer.currentTime)) {
      currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
      progressBar.value = audioPlayer.currentTime;
      updateProgressFill();
    }
  });

  progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value;
    updateProgressFill();
  });

  playPauseBtn.addEventListener('click', togglePlay);

  // Share action
  shareBtn.addEventListener('click', () => {
    const shareData = {
      title: document.title,
      text: `Listen to ${trackTitle.textContent} on Muzo`,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.warn);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  });

  // ── Initialize ──
  fetchMetadata();
  fetchStream();
})();
