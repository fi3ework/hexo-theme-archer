import {
    archUtil
} from './util';

let toggleHeader = function () {
    // 顶部标题栏切换
    if (typeof document.getElementsByClassName('post-body')[0] === 'undefined') {
        return;
    }
    let bannerEle = document.getElementsByClassName('banner')[0],
        bgEle = document.getElementsByClassName('site-background')[0],
        bgTitleHeight = archUtil.getAbsPosition(bgEle).y + bgEle.scrollHeight,
        toggleBanner = document.getElementsByClassName('site-post-banner')[0],
        isPostTitleShow = 0,
        postTitle = document.getElementsByClassName('post-name')[0];

    function toggleHeader() {
        // 超过标题
        let scrollTop = archUtil.getScrollTop();
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
        let moveDelta = 0;
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
    postTitle.addEventListener('click', archUtil.backTop);

};

export {
    toggleHeader
};