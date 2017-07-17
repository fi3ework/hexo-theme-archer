let toggleHeader = function () {
    if (typeof document.getElementsByClassName('post-body')[0] === 'undefined') {
        return;
    }

    let $banner = $('.banner:first'),
        $postBanner = $banner.find('.post-banner:first'),
        $bgEle = $('.site-background:first'),
        $toc = $('.toc:first'),
        $toggleBanner = $('.toggle-banner:first'),
        $homeLink = $banner.parent().find('.home-link:first'),
        bgTitleHeight = $bgEle.offset().top + $bgEle.outerHeight(),
        isPostTitleShow = 0;

    // 滚动时显示标题栏    
    $(document).on('scroll', function () {
        let scrollTop = $(document).scrollTop();
        if (scrollTop > bgTitleHeight) {
            if (!isPostTitleShow) {
                $banner.addClass('banner-show');
                $homeLink.addClass('home-link-hide');
                $toc.addClass('toc-fixed');
                isPostTitleShow = 1;
            }
        } else {
            if (isPostTitleShow) {
                $banner.removeClass('banner-show');
                $homeLink.removeClass('home-link-hide');
                $toc.removeClass('toc-fixed');
                isPostTitleShow = 0;
            }
        }
    });

    // 在向上滚动到banner消失的动画完成后切换到post-banner
    $banner[0].addEventListener('transitionend', function (eve) {
        if (eve.target == $banner[0]) {
            if (!isPostTitleShow) {
                $toggleBanner.removeClass('toggle-banner-show-site');
            }
        }
    });

    // 滚动式切换文章标题和站点标题    
    let previousHeight = 0;
    $(document).on('scroll', function () {
        if (!$banner.hasClass('banner-show')) {
            return;
        }
        if ($(this).scrollTop() > previousHeight) {
            $toggleBanner.removeClass('toggle-banner-show-site');
        } else {
            $toggleBanner.addClass('toggle-banner-show-site');
        }
        previousHeight = $(this).scrollTop();
    });

    // 点击文章标题回页首
    $postBanner.on('click', function () {
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
    toggleHeader
};