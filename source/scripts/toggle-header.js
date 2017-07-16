'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleHeader = undefined;

var _util = require('./util');

var toggleHeader = function toggleHeader() {
    if (typeof document.getElementsByClassName('post-body')[0] === 'undefined') {
        return;
    }

    var $banner = $('.banner:first'),
        $bgEle = $('.site-background:first'),
        $toggleBanner = $('.toggle-banner:first'),
        $homeLink = $banner.parent().find('.home-link:first'),
        bgTitleHeight = $bgEle.offset().top + $bgEle.outerHeight(),
        isPostTitleShow = 0;

    // 滚动时显示标题栏    
    $(document).on('scroll', function () {
        var scrollTop = $(document).scrollTop();
        if (scrollTop > bgTitleHeight) {
            if (!isPostTitleShow) {
                $banner.addClass('banner-show');
                $homeLink.addClass('home-link-hide');
                isPostTitleShow = 1;
            }
        } else {
            if (isPostTitleShow) {
                $banner.removeClass('banner-show');
                $homeLink.removeClass('home-link-hide');
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
    var previousHeight = 0;
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
};

// 点击文章标题回页首
// postTitle.addEventListener('click', archUtil.backTop);


exports.toggleHeader = toggleHeader;