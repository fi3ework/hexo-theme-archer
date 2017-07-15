import {
    archUtil
} from './util';

let initBackTop = function () {
    // 回顶部
    let backTopEle = document.getElementsByClassName('back-top')[0],
        isBackTopShow = false;
    // header头像切换
    document.addEventListener('scroll', showBackTop);
    // header头像点击回顶部
    backTopEle.addEventListener('click', archUtil.backTop);
    // 获得background-image的scorllHeight
    let bgImg = document.getElementsByClassName('site-background')[0],
        bgBottomHeight = archUtil.getAbsPosition(bgImg).y + bgImg.scrollHeight,
        sidebarMenu = document.getElementsByClassName('header-sidebar-menu')[0];
        
    function showBackTop() {
        let scrollTop = archUtil.getScrollTop();
        if (scrollTop > bgBottomHeight) {
            if (!isBackTopShow) {
                isBackTopShow = true;
                backTopEle.classList.add('back-top-show');
                sidebarMenu.classList.add('header-sidebar-menu-black');
            }
        } else {
            if (isBackTopShow) {
                isBackTopShow = false;
                backTopEle.classList.remove('back-top-show');
                sidebarMenu.classList.remove('header-sidebar-menu-black');
            }
        }
    }
};

export {
    initBackTop
};