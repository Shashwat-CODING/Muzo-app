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
  const progressFill = document.getElementById('progressFill');
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

  // ── Global Error Interceptor & Copiable Error Banner ──
  const logs = [];
  
  function captureLog(type, args) {
    const msg = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
    const entry = `[${new Date().toLocaleTimeString()}] [${type.toUpperCase()}] ${msg}`;
    logs.push(entry);
  }

  const originalConsoleError = console.error;
  console.error = function (...args) {
    captureLog('error', args);
    showErrorOverlay(args.join(' '));
    originalConsoleError.apply(console, args);
  };

  window.addEventListener('error', function (e) {
    const errorMsg = e.error ? (e.error.stack || e.error.message) : `${e.message} at ${e.filename}:${e.lineno}`;
    captureLog('window.error', [errorMsg]);
    showErrorOverlay(errorMsg);
  });

  window.addEventListener('unhandledrejection', function (e) {
    const reason = e.reason ? (e.reason.stack || e.reason.message || e.reason) : 'Unhandled promise rejection';
    captureLog('promise.rejection', [reason]);
    showErrorOverlay(reason);
  });

  function showErrorOverlay(errorText) {
    let banner = document.getElementById('errorBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'errorBanner';
      banner.className = 'error-banner';
      banner.innerHTML = `
        <div class="error-header">
          <div class="error-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Playback Error Logs</span>
          </div>
          <div class="error-actions">
            <button id="copyErrorBtn" class="btn-copy-error">Copy Logs</button>
            <button id="closeErrorBtn" class="btn-close-error">&times;</button>
          </div>
        </div>
        <div id="errorLogBox" class="error-box"></div>
      `;
      document.body.appendChild(banner);

      document.getElementById('closeErrorBtn').addEventListener('click', () => {
        banner.style.display = 'none';
      });

      document.getElementById('copyErrorBtn').addEventListener('click', () => {
        const fullLogs = logs.join('\n');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullLogs).then(() => {
            document.getElementById('copyErrorBtn').textContent = 'Copied!';
            setTimeout(() => {
              document.getElementById('copyErrorBtn').textContent = 'Copy Logs';
            }, 2000);
          });
        }
      });
    }

    banner.style.display = 'flex';
    const logBox = document.getElementById('errorLogBox');
    if (logBox) {
      logBox.textContent = logs.join('\n');
      logBox.scrollTop = logBox.scrollHeight;
    }
  }

  // Ensure audio element has mobile-friendly playback attributes
  if (audioPlayer) {
    audioPlayer.setAttribute('playsinline', '');
    audioPlayer.setAttribute('webkit-playsinline', '');
    audioPlayer.crossOrigin = 'anonymous';

    audioPlayer.addEventListener('error', (e) => {
      const err = audioPlayer.error;
      let errDetail = 'Unknown Audio Error';
      if (err) {
        switch (err.code) {
          case err.MEDIA_ERR_ABORTED: errDetail = 'MEDIA_ERR_ABORTED: Playback aborted by user'; break;
          case err.MEDIA_ERR_NETWORK: errDetail = 'MEDIA_ERR_NETWORK: Network error downloading stream'; break;
          case err.MEDIA_ERR_DECODE: errDetail = 'MEDIA_ERR_DECODE: Audio decoding failed'; break;
          case err.MEDIA_ERR_SRC_NOT_SUPPORTED: errDetail = `MEDIA_ERR_SRC_NOT_SUPPORTED: Audio format not supported or URL invalid (${audioPlayer.src})`; break;
        }
      }
      console.error(errDetail);
    });
  }

  // ── 1. Set Direct Audio Stream URL ──
  function setupStream() {
    if (audioPlayer) {
      audioPlayer.src = `https://mlc.kouzu.in/api/stream/listen/${trackId}`;
      audioPlayer.load();
    }
  }

  // ── 2. Custom Player Controls & Event Listeners ──
  async function togglePlay() {
    if (!audioPlayer.src) {
      setupStream();
    }
    
    if (audioPlayer.paused) {
      try {
        const promise = audioPlayer.play();
        if (promise !== undefined) {
          await promise;
        }
      } catch (e) {
        console.error('Mobile play blocked or failed:', e);
      }
    } else {
      audioPlayer.pause();
    }
  }

  if (audioPlayer) {
    audioPlayer.addEventListener('play', () => {
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    });

    audioPlayer.addEventListener('pause', () => {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    });

    function updateProgressFill() {
      if (progressBar && progressBar.max && progressBar.max > 0) {
        const percentage = (progressBar.value / progressBar.max) * 100;
        if (progressFill) {
          progressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
      }
    }

    audioPlayer.addEventListener('loadedmetadata', () => {
      if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
        if (totalDurationEl) totalDurationEl.textContent = formatTime(audioPlayer.duration);
        if (progressBar) progressBar.max = audioPlayer.duration;
        updateProgressFill();
      }
    });

    audioPlayer.addEventListener('timeupdate', () => {
      if (!isNaN(audioPlayer.currentTime)) {
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        if (progressBar) progressBar.value = audioPlayer.currentTime;
        updateProgressFill();
      }
    });

    if (progressBar) {
      progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
        updateProgressFill();
      });
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlay);
  }

  // Share action
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareData = {
        title: document.title,
        text: `Listen to ${trackTitle ? trackTitle.textContent : 'Music'} on Muzo`,
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(console.warn);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    });
  }

  // ── Initialize ──
  setupStream();
})();
