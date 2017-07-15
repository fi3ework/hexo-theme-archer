'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBackTop = undefined;

var _util = require('./util');

var initBackTop = function initBackTop() {
    // 回顶部
    var backTopEle = document.getElementsByClassName('back-top')[0],
        isBackTopShow = false;
    // header头像切换
    document.addEventListener('scroll', showBackTop);
    // header头像点击回顶部
    backTopEle.addEventListener('click', _util.archUtil.backTop);
    // 获得background-image的scorllHeight
    var bgImg = document.getElementsByClassName('site-background')[0],
        bgBottomHeight = _util.archUtil.getAbsPosition(bgImg).y + bgImg.scrollHeight,
        sidebarMenu = document.getElementsByClassName('header-sidebar-menu')[0];

    function showBackTop() {
        var scrollTop = _util.archUtil.getScrollTop();
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

exports.initBackTop = initBackTop;