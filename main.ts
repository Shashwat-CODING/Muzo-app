Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Handle static assets
  if (pathname === "/play.css") {
    return serveStaticFile(req, pathname, "text/css; charset=utf-8");
  }
  if (pathname === "/play.js") {
    return serveStaticFile(req, pathname, "application/javascript; charset=utf-8");
  }
  if (pathname === "/logo.webp") {
    return serveStaticFile(req, pathname, "image/webp");
  }
  if (pathname === "/muzo.svg") {
    return serveStaticFile(req, pathname, "image/svg+xml");
  }

  // Handle /code/play/<id>, /play/<id>, or /play?id=<id> routes
  if (pathname.startsWith("/code/play") || pathname.startsWith("/play")) {
    const match = pathname.match(/(?:\/code)?\/play\/([^/]+)/);
    let trackId = match ? match[1] : url.searchParams.get("id") || url.searchParams.get("v");

    if (!trackId) {
      trackId = "MlpG_JAcB2o";
    }

    // Fetch metadata from API
    let title = "Muzo Player — Stream Music";
    let artistText = "";
    let albumName = "";
    let thumbUrl = "";
    let isExplicit = false;

    try {
      const metaRes = await fetch(`https://shashwatidr-img.hf.space/api/metadata/${trackId}`);
      if (metaRes.ok) {
        const data = await metaRes.json();
        title = data.title || data.name || "Muzo Player — Stream Music";

        if (Array.isArray(data.artists_data) && data.artists_data.length > 0) {
          artistText = data.artists_data.map((a) => a.name).join(", ");
        } else if (typeof data.artists === "string") {
          artistText = data.artists;
        }

        if (data.album && data.album.name) {
          albumName = data.album.name;
        }

        thumbUrl = data.thumbnail || "";
        if (Array.isArray(data.thumbnails) && data.thumbnails.length > 0) {
          const sorted = [...data.thumbnails].sort((a, b) => (b.width || 0) - (a.width || 0));
          thumbUrl = sorted[0].url || thumbUrl;
        }
        if (thumbUrl) {
          thumbUrl = thumbUrl.replace(/=w\d+-h\d+/, "=w500-h500");
        }

        isExplicit = !!data.is_explicit;
      }
    } catch (err) {
      console.error("Deno Deploy metadata fetch error:", err);
    }

    const pageTitle = artistText ? `${title} • ${artistText} — Muzo` : `${title} — Muzo`;
    const descriptionText = artistText ? `Listen to ${title} by ${artistText} on Muzo` : `Listen to ${title} on Muzo`;
    const deepLinkUrl = `muzo://s/${trackId}`;

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(pageTitle)}</title>

  <!-- Server-rendered OpenGraph & Twitter Meta Tags for Link Previews -->
  <meta property="og:type" content="music.song" />
  <meta property="og:title" id="ogTitle" content="${escapeHtml(title)}" />
  <meta property="og:description" id="ogDesc" content="${escapeHtml(descriptionText)}" />
  ${thumbUrl ? `<meta property="og:image" id="ogImage" content="${escapeHtml(thumbUrl)}" />` : `<meta property="og:image" id="ogImage" content="" />`}
  <meta property="og:site_name" content="Muzo" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" id="twTitle" content="${escapeHtml(title)}" />
  <meta name="twitter:description" id="twDesc" content="${escapeHtml(descriptionText)}" />
  ${thumbUrl ? `<meta name="twitter:image" id="twImage" content="${escapeHtml(thumbUrl)}" />` : `<meta name="twitter:image" id="twImage" content="" />`}

  <link rel="icon" type="image/webp" href="/logo.webp" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/play.css" />
</head>
<body>

  <!-- Background Ambient Glow Canvas -->
  <div class="ambient-bg" id="ambientBg" style="${thumbUrl ? `background-image: url('${escapeHtml(thumbUrl)}');` : ''}"></div>

  <!-- Header -->
  <header class="navbar">
    <a href="/" class="brand-link">
      <img src="/logo.webp" alt="Muzo Logo" class="brand-logo" />
      <span class="brand-name">Muzo</span>
    </a>
    <a id="navOpenMuzoBtn" href="${deepLinkUrl}" class="nav-app-btn">
      <svg width="18" height="18" viewBox="0 0 512 512"><g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor" stroke="none"><path d="M1663 3400 c-66 -15 -63 4 -63 -396 l0 -363 -22 -13 c-17 -10 -107 -14 -336 -18 -263 -4 -314 -7 -322 -20 -6 -9 -10 -174 -10 -397 0 -376 0 -382 21 -396 17 -13 69 -14 322 -11 195 3 306 9 314 16 10 8 13 80 13 330 0 260 3 324 15 347 14 29 33 41 63 41 19 0 102 -78 102 -97 0 -6 6 -16 14 -20 8 -4 38 -35 66 -68 29 -33 80 -91 115 -130 34 -38 79 -90 100 -115 20 -25 56 -67 79 -94 22 -27 57 -70 77 -96 20 -26 51 -62 70 -78 l35 -31 199 -2 200 -2 17 28 c13 22 16 42 11 90 -3 34 -2 182 2 329 7 266 7 268 30 278 33 15 65 4 105 -36 35 -34 58 -60 165 -191 32 -38 67 -79 80 -90 12 -11 35 -38 51 -60 16 -22 46 -57 67 -77 20 -20 37 -39 37 -43 0 -3 15 -21 33 -39 50 -52 80 -87 112 -133 17 -23 37 -46 45 -50 8 -4 170 -8 359 -10 299 -3 346 -2 367 12 l24 15 0 379 c0 467 16 426 -165 426 l-126 0 -47 51 c-109 116 -214 234 -281 314 -39 47 -85 102 -103 122 -18 20 -76 85 -128 145 -52 60 -108 120 -125 133 l-29 25 -211 -3 c-198 -3 -211 -4 -227 -24 -16 -18 -18 -49 -18 -327 0 -225 -3 -310 -12 -319 -7 -7 -29 -12 -50 -12 -40 0 -79 32 -143 116 -16 21 -55 66 -87 98 -32 33 -58 63 -58 68 0 4 -21 30 -47 56 -27 27 -57 60 -68 74 -11 14 -50 59 -87 99 -36 41 -81 91 -98 112 -18 21 -41 42 -51 48 -23 12 -352 20 -396 9z"/></g></svg>
      <span>Open in Muzo</span>
    </a>
  </header>

  <!-- Main Content Layout -->
  <main class="player-container">
    
    <!-- Left Column: Album Art -->
    <div class="art-column">
      <div class="art-card" id="artCard">
        <img id="trackArt" src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(title)}" class="track-artwork" />
        <div class="art-overlay"></div>
      </div>
    </div>

    <!-- Right Column: Track Info, Controls, & Deep Link CTA -->
    <div class="details-column">
      
      <div class="track-meta">
        <span class="explicit-badge" id="explicitBadge" style="${isExplicit ? "display: inline-block;" : "display: none;"}">EXPLICIT</span>
        <h1 class="track-title" id="trackTitle">${escapeHtml(title)}</h1>
        <h2 class="track-artists" id="trackArtists">${escapeHtml(artistText)}</h2>
        <p class="track-album" id="trackAlbum">${albumName ? `Album: ${escapeHtml(albumName)}` : ""}</p>
      </div>

      <!-- Player Controls Card -->
      <div class="player-card">
        <!-- Progress Bar -->
        <div class="progress-section">
          <div class="time-row">
            <span id="currentTime">0:00</span>
            <span id="totalDuration">0:00</span>
          </div>
          <div class="slider-wrapper" id="progressWrapper">
            <div class="slider-track-bg"></div>
            <div class="progress-fill" id="progressFill"></div>
            <input type="range" id="progressBar" min="0" max="100" value="0" step="0.1" aria-label="Seek track" />
          </div>
        </div>

        <!-- Controls Row -->
        <div class="controls-row">
          <!-- Share Button -->
          <button id="shareBtn" class="icon-btn" aria-label="Share Song">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>

          <!-- Play/Pause Primary CTA -->
          <button id="playPauseBtn" class="play-main-btn" aria-label="Play or Pause">
            <svg id="playIcon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <svg id="pauseIcon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>

          <!-- Spacer -->
          <div style="width: 40px;"></div>
        </div>
      </div>

      <!-- Open in Muzo App CTA Section -->
      <div class="app-cta-card">
        <div class="cta-info">
          <h3>Experience full audio quality in Muzo</h3>
          <p>Get background playback, karaoke lyrics, offline downloads & ad-free streaming.</p>
        </div>
        <a id="mainOpenMuzoBtn" href="${deepLinkUrl}" class="btn-muzo-app">
          <svg width="20" height="20" viewBox="0 0 512 512"><g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor" stroke="none"><path d="M1663 3400 c-66 -15 -63 4 -63 -396 l0 -363 -22 -13 c-17 -10 -107 -14 -336 -18 -263 -4 -314 -7 -322 -20 -6 -9 -10 -174 -10 -397 0 -376 0 -382 21 -396 17 -13 69 -14 322 -11 195 3 306 9 314 16 10 8 13 80 13 330 0 260 3 324 15 347 14 29 33 41 63 41 19 0 102 -78 102 -97 0 -6 6 -16 14 -20 8 -4 38 -35 66 -68 29 -33 80 -91 115 -130 34 -38 79 -90 100 -115 20 -25 56 -67 79 -94 22 -27 57 -70 77 -96 20 -26 51 -62 70 -78 l35 -31 199 -2 200 -2 17 28 c13 22 16 42 11 90 -3 34 -2 182 2 329 7 266 7 268 30 278 33 15 65 4 105 -36 35 -34 58 -60 165 -191 32 -38 67 -79 80 -90 12 -11 35 -38 51 -60 16 -22 46 -57 67 -77 20 -20 37 -39 37 -43 0 -3 15 -21 33 -39 50 -52 80 -87 112 -133 17 -23 37 -46 45 -50 8 -4 170 -8 359 -10 299 -3 346 -2 367 12 l24 15 0 379 c0 467 16 426 -165 426 l-126 0 -47 51 c-109 116 -214 234 -281 314 -39 47 -85 102 -103 122 -18 20 -76 85 -128 145 -52 60 -108 120 -125 133 l-29 25 -211 -3 c-198 -3 -211 -4 -227 -24 -16 -18 -18 -49 -18 -327 0 -225 -3 -310 -12 -319 -7 -7 -29 -12 -50 -12 -40 0 -79 32 -143 116 -16 21 -55 66 -87 98 -32 33 -58 63 -58 68 0 4 -21 30 -47 56 -27 27 -57 60 -68 74 -11 14 -50 59 -87 99 -36 41 -81 91 -98 112 -18 21 -41 42 -51 48 -23 12 -352 20 -396 9z"/></g></svg>
          <span>Open in Muzo App</span>
        </a>
      </div>

    </div>

  </main>

  <!-- Audio Element -->
  <audio id="audioPlayer" preload="metadata"></audio>

  <script src="/play.js"></script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  }

  // Fallback static files serving for site root / index.html
  return serveStaticFile(req, pathname === "/" ? "/index.html" : pathname);
});

async function serveStaticFile(req: Request, relPath: string, contentTypeOverride?: string) {
  try {
    const filePath = new URL(`.${relPath}`, import.meta.url);
    const file = await Deno.readFile(filePath);
    const contentType = contentTypeOverride || getContentType(relPath);
    return new Response(file, {
      headers: { "content-type": contentType },
    });
  } catch (_e) {
    return new Response("Not Found", { status: 404 });
  }
}

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "text/plain";
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
