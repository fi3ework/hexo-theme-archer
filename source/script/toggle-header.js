(function () {
    // 顶部标题栏切换
    let postTitleEle = document.getElementsByClassName("post-title")[0];
    let postTitleHeight = getAbsPosition(postTitleEle).y;
    let toggleBanner = document.getElementsByClassName("site-post-banner")[0];
    let isPostTitleShow = 0;
    function toggleHeder() {
        if (document.body.scrollTop > postTitleHeight) {
            if (!isPostTitleShow) {
                toggleBanner.classList.add("post-banner-show");
                toggleBanner.classList.remove("blog-banner-show");
                isPostTitleShow = 1;
            }
        } else {
            if (isPostTitleShow) {
                toggleBanner.classList.add("blog-banner-show");
                toggleBanner.classList.remove("post-banner-show");
                isPostTitleShow = 0;
            }
        }

    }
    document.addEventListener("scroll", toggleHeder);


    // 获取元素在页面上相对左上角的位置
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

}());