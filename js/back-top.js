let initBackTop = function () {
    // 回顶部
    let $backTop = $('.back-top:first'),
        $sidebarMenu = $('.header-sidebar-menu:first'),
        $bgImg = $('.site-background:first'),
        isBackTopShow = false,
        bgBottomHeight = $bgImg.offset().top + $bgImg.outerHeight() - $sidebarMenu[0].offsetTop;

    // 绑定滚动出现backTop事件
    function showBackTop() {
        let inited = false;
        if (!inited) {
            requestAnimationFrame(function update() {
                if ($(document).scrollTop() > bgBottomHeight) {
                    if (!isBackTopShow) {
                        isBackTopShow = true;
                        $backTop.addClass('back-top-show');
                        $sidebarMenu.addClass('header-sidebar-menu-black');
                    }
                } else {
                    if (isBackTopShow) {
                        isBackTopShow = false;
                        $backTop.removeClass('back-top-show');
                        $sidebarMenu.removeClass('header-sidebar-menu-black');
                    }
                }
            });
            inited = true;
        }
    }

    $(document).on('scroll', function () {
        showBackTop();
    });

    // 返回顶部函数
    $backTop.on('click', function () {
        let topTimer = setInterval(function () {
            let currTop = $(document).scrollTop();
            window.scrollTo(0, Math.max(Math.floor(currTop * 0.8)));
            if (currTop === 0) {
                clearInterval(topTimer);
            }
        }, 20);
    });
};



export {
    initBackTop
};