export const SITE_URL = "https://www.galeobeauty.com";

export function toAbsoluteUrl(url: string): string {
    if (/^https?:\/\//i.test(url)) {
        return url;
    }

    if (!url.startsWith("/")) {
        return `${SITE_URL}/${url}`;
    }

    return `${SITE_URL}${url}`;
}
