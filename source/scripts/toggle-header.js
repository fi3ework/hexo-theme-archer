'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleHeader = undefined;

var _util = require('./util');

var toggleHeader = function toggleHeader() {
    // 顶部标题栏切换
    if (typeof document.getElementsByClassName('post-body')[0] === 'undefined') {
        return;
    }
    var bannerEle = document.getElementsByClassName('banner')[0],
        bgEle = document.getElementsByClassName('site-background')[0],
        bgTitleHeight = _util.archUtil.getAbsPosition(bgEle).y + bgEle.scrollHeight,
        toggleBanner = document.getElementsByClassName('site-post-banner')[0],
        isPostTitleShow = 0,
        postTitle = document.getElementsByClassName('post-name')[0];

    function toggleHeader() {
        // 超过标题
        var scrollTop = _util.archUtil.getScrollTop();
        if (scrollTop > bgTitleHeight) {
            if (!isPostTitleShow) {

                bannerEle.classList.add('banner-show');
                isPostTitleShow = 1;
            }
            // 没有超过标题
        } else {
            if (isPostTitleShow) {
                bannerEle.classList.remove('banner-show');

                isPostTitleShow = 0;
            }
        }
    }

    function upDown(event) {
        var moveDelta = 0;
        // moveDelta += event.
        if (moveDelta > 20) {
            toggleBanner.classList.add('post-banner-show');
            toggleBanner.classList.remove('blog-banner-show');
        } else {
            toggleBanner.classList.remove('post-banner-show');
            toggleBanner.classList.add('blog-banner-show');
        }
    }

    // 滚动时切换标题    
    document.addEventListener('scroll', toggleHeader);
    // 点击文章标题回页首
    postTitle.addEventListener('click', _util.archUtil.backTop);
};

exports.toggleHeader = toggleHeader;