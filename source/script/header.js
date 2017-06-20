(function () {
    let titleEle = document.getElementsByClassName("post-title")[0];
    let titleHeight = getAbsPosition(titleEle).y;
    let toggleBanner = document.getElementsByClassName("site-post-banner")[0];
    let state = 0;
    console.log(titleHeight);
    function toggleHeder() {
        console.log(document.body.scrollTop);
        if (document.body.scrollTop > titleHeight) {
            if (!state) {
                console.log(111);
                toggleBanner.classList.add("post-banner-show");
                toggleBanner.classList.remove("blog-banner-show");
                state = 1;
            }
        } else {
            if (state) {
                toggleBanner.classList.add("blog-banner-show");
                toggleBanner.classList.remove("post-banner-show");
                state = 0;
            }
        }

    }

    function getAbsPosition(e) {
        var x = e.offsetLeft;
        var y = e.offsetTop;
        while (e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        return {
            "x": x,
            "y": y
        };
    }

    document.addEventListener("scroll", toggleHeder);
}());