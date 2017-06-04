let titles = site.map(site, function (item) {
    let date = date(post.date, "YYYY-MM-DD-HH-MM-SS");
    let title = item.title;
    let link = "<%- url_for(item.path) %>";
    value = {
        date: date,
        title: title,
        link: link
    };
    console.log(value);
    return value;
})
