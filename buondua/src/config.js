let BASE_URL = "https://buondua.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function galleryUrl(url) {
    return normalizeUrl(url).replace(/\?page=\d+$/, "");
}
