let toggleHeader = function () {
    // 判断是否为post-page
    let isPostPage = 0;
    if (typeof document.getElementsByClassName('post-body')[0] !== 'undefined') {
        isPostPage = 1;
    }

    let $banner = $('.banner:first'),
        $postBanner = $banner.find('.post-title a'),
        $bgEle = $('.site-intro:first'),
        // $toc = $('.toc:first'),
        $homeLink = $('.home-link:first'),
        bgTitleHeight = $bgEle.offset().top + $bgEle.outerHeight(),
        isBannerShow = 0,
        isBannerMustHide = 0;

    // 滚动超过header时显示标题栏
    let tickingBanner = false;
    function showBanner() {
        if (!tickingBanner) {
            requestAnimationFrame(
                function update() {
                    let scrollTop = $(document).scrollTop();
                    // 滚动超过intro
                    if (scrollTop > bgTitleHeight) {
                        if (!isBannerShow) {
                            $homeLink.addClass('home-link-hide');
                            if (isPostPage) {
                                isBannerMustHide = 0;                                
                                $banner.addClass('banner-show');
                                // $toc.addClass('toc-fixed');
                            }
                            isBannerShow = 1;
                        }
                    } else {
                        // 滚动没超过intro
                        if (isBannerShow) {
                            $homeLink.removeClass('home-link-hide');
                            if (isPostPage) {
                                isBannerMustHide = 1;
                                $banner.removeClass('banner-show');
                                // $toc.removeClass('toc-fixed');
                            }
                            isBannerShow = 0;
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

    // 滚动式切换文章标题和站点标题    
    let previousHeight = 0;
    let scrollDownLength = 0;
    
    let tickingToggler = false;
    function togglePostAndSiteBanner(that) {
        if (!tickingToggler) {
            requestAnimationFrame(function update() {
                // 向下滚动
                if ($(that).scrollTop() > previousHeight) {
                    // 滚动超过一定距离隐藏
                    scrollDownLength += $(that).scrollTop() - previousHeight;
                    if (scrollDownLength > 50) {
                        $banner.removeClass('banner-show');
                        isBannerShow = false;
                    }
                }
                // 向上滚动
                else if ($(that).scrollTop() < previousHeight) {
                    if (!isBannerMustHide) {
                        $banner.addClass('banner-show');
                        isBannerShow = true;                    
                    }
                    scrollDownLength = 0;
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
    $postBanner.on('click', function (event) {
        event.preventDefault();
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