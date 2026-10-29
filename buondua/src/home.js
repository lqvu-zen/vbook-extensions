function execute() {
    return Response.success([
        { title: "Latest", input: "/", script: "search.js" },
        { title: "Hot", input: "/hot", script: "search.js" }
    ]);
}
