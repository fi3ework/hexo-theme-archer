(function () {
    // 主页头像切换
    let avatarClassEles = document.getElementsByClassName("profile-avatar");
    console.log(avatarClassEles)
    if (avatarClassEles !== undefined) {
        let profileAvatar = avatarClassEles[0];
        let headerAvatar = document.getElementsByClassName("header-avatar")[0];
        let profileAvatarHeight = getAbsPosition(profileAvatar).y;
        let isHeaderAvatarShow = 0;

        function toggleAvatar() {
            if (document.body.scrollTop > profileAvatarHeight) {
                if (!isHeaderAvatarShow) {
                    isHeaderAvatarShow = 1;
                    headerAvatar.classList.add ("header-avatar-animate");
                }
            } else {
                if (isHeaderAvatarShow) {
                    isHeaderAvatarShow = 0;
                    headerAvatar.classList.remove("header-avatar-animate");
                }
            }
        }
        document.addEventListener("scroll", toggleAvatar);
    }

    // 获取元素在页面上相对左上角的位置
    function getAbsPosition(e) {
        var x = e.offsetLeft;
        var y = e.offsetTop;
        while (e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        return {
            "x": x,
            "y": y
        };
    }
}());