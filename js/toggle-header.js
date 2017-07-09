import tinkerUtil from './util';

let toggleHeader = function () {
    // 顶部标题栏切换
    if (typeof document.getElementsByClassName('post-body')[0] === 'undefined') {
        return;
    }
    let postTitleEle = document.getElementsByClassName('post-title')[0],
        postTitleHeight = tinkerUtil.getAbsPosition(postTitleEle).y,
        toggleBanner = document.getElementsByClassName('site-post-banner')[0],
        isPostTitleShow = 0,
        postTitle = document.getElementsByClassName('post-name')[0];

    function toggleHeader() {
        // 超过标题
        let scrollTop = tinkerUtil.getScrollTop();
        if (scrollTop > postTitleHeight) {
            if (!isPostTitleShow) {
                toggleBanner.classList.add('post-banner-show');
                toggleBanner.classList.remove('blog-banner-show');
                isPostTitleShow = 1;
            }
            // 没有超过标题
        } else {
            if (isPostTitleShow) {
                toggleBanner.classList.add('blog-banner-show');
                toggleBanner.classList.remove('post-banner-show');
                isPostTitleShow = 0;
            }
        }

    }

    // 滚动时切换标题    
    document.addEventListener('scroll', toggleHeader);
    // 点击文章标题回页首
    postTitle.addEventListener('click', tinkerUtil.backTop);

};

module.exports = toggleHeader;