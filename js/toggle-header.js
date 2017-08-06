let toggleHeader = function () {
    // 判断是否为post-page
    let isPostPage = 0;
    if (typeof document.getElementsByClassName('post-body')[0] !== 'undefined') {
        isPostPage = 1;
    }

    let $banner = $('.banner:first'),
        $postBanner = $banner.find('.post-banner:first'),
        $bgEle = $('.site-intro:first'),
        $toc = $('.toc:first'),
        $toggleBanner = $('.toggle-banner:first'),
        $homeLink = $('.home-link:first'),
        bgTitleHeight = $bgEle.offset().top + $bgEle.outerHeight(),
        isPostTitleShow = 0;

    // 滚动时显示标题栏
    let tickingBanner = false;
    function showBanner() {
        if (!tickingBanner) {
            requestAnimationFrame(
                function update() {
                    let scrollTop = $(document).scrollTop();
                    if (scrollTop > bgTitleHeight) {
                        if (!isPostTitleShow) {
                            if (isPostPage) {
                                $banner.addClass('banner-show');
                                $toc.addClass('toc-fixed');
                            }
                            $homeLink.addClass('home-link-hide');
                            isPostTitleShow = 1;
                        }
                    } else {
                        if (isPostTitleShow) {
                            if (isPostPage) {
                                $banner.removeClass('banner-show');
                                $toc.removeClass('toc-fixed');
                            }
                            $homeLink.removeClass('home-link-hide');
                            isPostTitleShow = 0;
                        }
                    }
                    tickingBanner = false;
                }
            );
            tickingBanner = true;
        }
    }


    $(document).on('scroll', function () {
        showBanner();
    });

    // 如果不是post-page 以下忽略
    if (!isPostPage) {
        return;
    }

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
    let tickingToggler = false;

    function togglePostAndSiteBanner(that) {
        if (!tickingToggler) {
            requestAnimationFrame(function update() {
                if (!$banner.hasClass('banner-show')) {
                    tickingToggler = false;
                    return;
                }
                if ($(that).scrollTop() > previousHeight) {
                    $toggleBanner.removeClass('toggle-banner-show-site');
                } else if ($(that).scrollTop() < previousHeight) {
                    $toggleBanner.addClass('toggle-banner-show-site');
                }
                previousHeight = $(that).scrollTop();
                tickingToggler = false;
            });
        }
        tickingToggler = true;
    }
    $(document).on('scroll', function () {
        togglePostAndSiteBanner(this);
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