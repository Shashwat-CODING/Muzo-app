export interface Release {
    name: string;
    tag_name: string;
    assets: {
        name: string;
        browser_download_url: string;
        content_type: string;
        size: number;
        download_count: number;
    }[];
    published_at: string;
    html_url: string;
    body: string;
}

export async function getLatestRelease(): Promise<Release | null> {
    try {
        const res = await fetch("https://api.github.com/repos/Shashwat-CODING/Muzo/releases/latest", {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            if (res.status === 404) {
                console.warn("No latest release found or repo is private/does not exist.");
                return null;
            }
            console.error(`Failed to fetch release: ${res.status} ${res.statusText}`);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch release:", error);
        return null;
    }
}

export async function getReleases(): Promise<Release[]> {
    try {
        const res = await fetch("https://api.github.com/repos/Shashwat-CODING/Muzo/releases", {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.warn(`Failed to fetch releases list: ${res.status}`);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch releases list:", error);
        return [];
    }
}
