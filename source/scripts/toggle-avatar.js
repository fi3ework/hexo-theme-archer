'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.toggleAvatar = undefined;

var _util = require('./util');

var toggleAvatar = function toggleAvatar() {
    // 主页头像切换
    var profileAvatarHeight = void 0,
        isHeaderAvatarShow = void 0;
    if (typeof document.getElementsByClassName('home-body')[0] === 'undefined') {
        return;
    }
    var profileAvatar = document.getElementsByClassName('profile-avatar')[0],
        headerAvatar = document.getElementsByClassName('header-avatar')[0];
    if (typeof profileAvatar !== 'undefined') {
        profileAvatarHeight = _util.archUtil.getAbsPosition(profileAvatar).y;

        isHeaderAvatarShow = 0;
        // header头像切换
        document.addEventListener('scroll', toggleAvatar);
        // header头像点击回顶部
        headerAvatar.addEventListener('click', _util.archUtil.backTop);
    }

    function toggleAvatar() {
        var scrollTop = _util.archUtil.getScrollTop();
        if (scrollTop > profileAvatarHeight + profileAvatar.clientHeight) {
            if (!isHeaderAvatarShow) {
                isHeaderAvatarShow = 1;
                headerAvatar.classList.add('header-avatar-animate');
            }
        } else {
            if (isHeaderAvatarShow) {
                isHeaderAvatarShow = 0;
                headerAvatar.classList.remove('header-avatar-animate');
            }
        }
    }
};

exports.toggleAvatar = toggleAvatar;