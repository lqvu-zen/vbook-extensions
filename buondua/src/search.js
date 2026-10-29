load('config.js');
function execute(query, page) {
    query = query || "";
    let start = parseInt(page) || 0;

    let url;
    if (query.indexOf("/") === 0) {
        url = BASE_URL + query + (query.indexOf("?") === -1 ? "?" : "&") + "start=" + start;
    } else {
        url = BASE_URL + "/?search=" + encodeURIComponent(query) + "&start=" + start;
    }
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = [];
    doc.select(".items-row").forEach(function (el) {
        let tags = [];
        el.select(".item-tags .tag").forEach(function (tag) {
            tags.push(tag.text());
        });
        items.push({
            name: el.select(".item-content h2 a").text(),
            cover: el.select(".item-thumb img").attr("src"),
            link: el.select(".item-thumb a").attr("href"),
            description: tags.join(", ")
        });
    });

    let next = doc.select("nav.pagination a.pagination-next[next]").first();
    let match = next ? next.attr("href").match(/start=(\d+)/) : null;

    return Response.success(items, match ? match[1] : "");
}
