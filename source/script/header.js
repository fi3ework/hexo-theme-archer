(function () {
    let titleEle = document.getElementsByClassName("post-title")[0];
    let titleHeight = getAbsPoint(titleEle).y;
    let blogTitles = document.getElementsByClassName("blog-titles")[0];
    let postTitle = document.getElementsByClassName("post-banner")[0];
    let state = 0;

    function toggleHeder() {
        if (document.body.scrollTop > titleHeight) {
            if (!state) {
                blogTitles.classList.add("blog-titles-hidden");
                postTitle.classList.add("post-banner-show");
                state = 1;

            }
        } else {
            if (state) {
                blogTitles.classList.remove("blog-titles-hidden");
                postTitle.classList.remove("post-banner-show");
                state = 0;
            }
        }

    }

    function getAbsPoint(e) {
        //再封装个函数吧。传进来的e可以是字符串类型（即id）,也可以是htmlElement对象。觉得getEL是个累赘的话，就把它删除掉。
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