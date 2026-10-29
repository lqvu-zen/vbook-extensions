load('config.js');
function execute(url) {
    url = galleryUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let last = 1;
    doc.select("nav.pagination .pagination-link").forEach(function (el) {
        let number = parseInt(el.text());
        if (number > last) last = number;
    });

    let chapters = [];
    for (let i = 1; i <= last; i++) {
        chapters.push({
            name: "Page " + i,
            url: url + "?page=" + i,
            description: "",
            lock: false,
            pay: false
        });
    }

    return Response.success(chapters);
}
