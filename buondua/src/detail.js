load('config.js');
function execute(url) {
    url = galleryUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let title = doc.select(".article-header h1").text().replace(/\s*-\s*\(\s*Page\s+\d+\s*\/\s*\d+\s*\)\s*$/i, "");
    if (!title) return Response.error("Gallery not found");

    return Response.success({
        name: title,
        author: "Buondua",
        cover: doc.select("meta[property=og:image]").attr("content"),
        description: doc.select(".article-info small").last().text(),
        detail: "",
        url: url,
        type: "comic",
        format: "comic",
        ongoing: false,
        nsfw: true,
        locale: "en",
        tags: doc.select(".article-tags a.tag").map(function (el) {
            return { title: el.text(), input: el.attr("href"), script: "search.js" };
        })
    });
}
