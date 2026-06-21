export interface RepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  version: string;
  downloadUrl: string;
  downloadCount: number;
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  contributions: number;
}

const FALLBACK_STATS: RepoStats = {
  stars: 48,
  forks: 12,
  openIssues: 2,
  version: "v3.4.0",
  downloadUrl: "https://github.com/Shashwat-CODING/Muzo/releases/download/v3.4.0/Muzo-v3.4.0-release.apk",
  downloadCount: 1024,
};

const FALLBACK_CONTRIBUTORS: Contributor[] = [
  {
    login: "Shashwat-CODING",
    avatarUrl: "https://github.com/Shashwat-CODING.png",
    htmlUrl: "https://github.com/Shashwat-CODING",
    contributions: 52,
  },
  {
    login: "Hexer10",
    avatarUrl: "https://github.com/Hexer10.png",
    htmlUrl: "https://github.com/Hexer10",
    contributions: 12,
  },
  {
    login: "anandnet",
    avatarUrl: "https://github.com/anandnet.png",
    htmlUrl: "https://github.com/anandnet",
    contributions: 8,
  },
  {
    login: "n-ce",
    avatarUrl: "https://github.com/n-ce.png",
    htmlUrl: "https://github.com/n-ce",
    contributions: 5,
  },
];

export async function fetchRepoStats(): Promise<RepoStats> {
  try {
    const repoRes = await fetch("https://api.github.com/repos/Shashwat-CODING/Muzo");
    if (!repoRes.ok) throw new Error("Failed to fetch repo stats");
    const repoData = await repoRes.json();

    let version = FALLBACK_STATS.version;
    let downloadUrl = FALLBACK_STATS.downloadUrl;
    let downloadCount = FALLBACK_STATS.downloadCount;

    try {
      const releaseRes = await fetch("https://api.github.com/repos/Shashwat-CODING/Muzo/releases/latest");
      if (releaseRes.ok) {
        const releaseData = await releaseRes.json();
        version = releaseData.tag_name || version;
        
        // Find APK in assets
        const apkAsset = releaseData.assets?.find((asset: any) => asset.name.endsWith(".apk"));
        if (apkAsset) {
          downloadUrl = apkAsset.browser_download_url;
          downloadCount = apkAsset.download_count || 0;
        } else if (releaseData.html_url) {
          downloadUrl = releaseData.html_url;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch release data, using defaults", e);
    }

    return {
      stars: repoData.stargazers_count ?? FALLBACK_STATS.stars,
      forks: repoData.forks_count ?? FALLBACK_STATS.forks,
      openIssues: repoData.open_issues_count ?? FALLBACK_STATS.openIssues,
      version,
      downloadUrl,
      downloadCount,
    };
  } catch (err) {
    console.warn("GitHub API error, using fallback data", err);
    return FALLBACK_STATS;
  }
}

export async function fetchContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch("https://api.github.com/repos/Shashwat-CODING/Muzo/contributors");
    if (!res.ok) throw new Error("Failed to fetch contributors");
    const data = await res.json();
    
    return data.map((item: any) => ({
      login: item.login,
      avatarUrl: item.avatar_url,
      htmlUrl: item.html_url,
      contributions: item.contributions,
    }));
  } catch (err) {
    console.warn("Failed to fetch contributors, using fallbacks", err);
    return FALLBACK_CONTRIBUTORS;
  }
}

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  download_count: number;
  size: number;
}

export interface Release {
  tagName: string;
  name: string;
  publishedAt: string;
  body: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
}

const FALLBACK_RELEASES: Release[] = [
  {
    tagName: "v4.0.0",
    name: "Muzo v4.0.0 - Production Release",
    publishedAt: "2026-06-20T10:00:00Z",
    body: "### Features\n- **Ad-free & Offline cache**\n- **Word-by-word karaoke lyrics**\n- **Spotify Playlist Imports**\n- **Beautiful Grayscale Minimal UI**\n\n### Fixes\n- Audio pitch issues solved\n- Low latency audio pipeline optimizations",
    htmlUrl: "https://github.com/Shashwat-CODING/Muzo/releases/tag/v4.0.0",
    assets: [
      {
        name: "Muzo-v4.0.0-release.apk",
        browser_download_url: "https://github.com/Shashwat-CODING/Muzo/releases/download/v4.0.0/Muzo-v4.0.0-release.apk",
        download_count: 1250,
        size: 24500000,
      }
    ]
  },
  {
    tagName: "v3.4.0",
    name: "Muzo v3.4.0 - Stable Release",
    publishedAt: "2026-05-15T09:00:00Z",
    body: "### What's New\n- SQLite local cache manager\n- Gesture controller for volume & skip\n- Background download manager integration",
    htmlUrl: "https://github.com/Shashwat-CODING/Muzo/releases/tag/v3.4.0",
    assets: [
      {
        name: "Muzo-v3.4.0-release.apk",
        browser_download_url: "https://github.com/Shashwat-CODING/Muzo/releases/download/v3.4.0/Muzo-v3.4.0-release.apk",
        download_count: 850,
        size: 23800000,
      }
    ]
  }
];

export async function fetchReleases(): Promise<Release[]> {
  try {
    const res = await fetch("https://api.github.com/repos/Shashwat-CODING/Muzo/releases");
    if (!res.ok) throw new Error("Failed to fetch releases");
    const data = await res.json();
    return data.map((item: any) => ({
      tagName: item.tag_name,
      name: item.name || item.tag_name,
      publishedAt: item.published_at,
      body: item.body || "",
      htmlUrl: item.html_url,
      assets: (item.assets || []).map((asset: any) => ({
        name: asset.name,
        browser_download_url: asset.browser_download_url,
        download_count: asset.download_count || 0,
        size: asset.size || 0,
      })),
    }));
  } catch (err) {
    console.warn("Failed to fetch releases, using fallbacks", err);
    return FALLBACK_RELEASES;
  }
}

