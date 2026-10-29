load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let images = [];
    doc.select(".article-fulltext img").forEach(function (el) {
        let src = el.attr("data-src") || el.attr("src");
        if (src) images.push(src);
    });
    if (images.length === 0) return Response.error("No images found");

    return Response.success(images);
}
