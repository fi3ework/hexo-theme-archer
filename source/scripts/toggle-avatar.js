'use strict';

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleAvatar = function toggleAvatar() {
    // 主页头像切换
    if (typeof document.getElementsByClassName('home-body')[0] === 'undefined') {
        return;
    }
    var profileAvatar = document.getElementsByClassName('profile-avatar')[0],
        headerAvatar = document.getElementsByClassName('header-avatar')[0];
    if (typeof profileAvatar !== 'undefined') {
        var _toggleAvatar = function _toggleAvatar() {
            if (document.body.scrollTop > profileAvatarHeight) {
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
        };
        // header头像切换


        var profileAvatarHeight = _util2.default.getAbsPosition(profileAvatar).y,
            isHeaderAvatarShow = 0;

        document.addEventListener('scroll', _toggleAvatar);
        // header头像点击回顶部
        headerAvatar.addEventListener('click', _util2.default.backTop);
    }
};

module.exports = toggleAvatar;