import tinkerUtil from './util'

let toggleAvatar = function () {
    // 主页头像切换
    if (typeof document.getElementsByClassName('home-body')[0] === 'undefined') {
        return;
    }
    let profileAvatar = document.getElementsByClassName("profile-avatar")[0],
        headerAvatar = document.getElementsByClassName("header-avatar")[0];
    if (typeof profileAvatar !== 'undefined') {
        let profileAvatarHeight = tinkerUtil.getAbsPosition(profileAvatar).y,
            isHeaderAvatarShow = 0;

        function toggleAvatar() {
            if (document.body.scrollTop > profileAvatarHeight) {
                if (!isHeaderAvatarShow) {
                    isHeaderAvatarShow = 1;
                    headerAvatar.classList.add("header-avatar-animate");
                }
            } else {
                if (isHeaderAvatarShow) {
                    isHeaderAvatarShow = 0;
                    headerAvatar.classList.remove("header-avatar-animate");
                }
            }
        }
        // header头像切换
        document.addEventListener("scroll", toggleAvatar);
        // header头像点击回顶部
        headerAvatar.addEventListener("click", tinkerUtil.backTop);
    }


}
 
module.exports = toggleAvatar;