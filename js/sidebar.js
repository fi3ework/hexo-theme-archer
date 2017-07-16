let sidebarInit = function () {
    let $sidebar = $('.sidebar:first'),
        $wrapper = $('.wrapper:first'),
        $headerMenu = $('.header-sidebar-menu:first'),
        $sidebarContent = $sidebar.find('.sidebar-content:first'),
        $archiveLink = $sidebar.find('.sidebar-archive-link:first'),
        $tagsLink = $sidebar.find('.sidebar-tags-link:first'),
        $header = $('.header:first'),
        $sidebarHeader = $sidebar.find('.sidebar-header:first');

    // 点击headerMenu出现sidebar
    $headerMenu.on('click', function (eve) {
        $sidebar.removeClass('sidebar-hide');
        $wrapper.addClass('wrapper-show-sidebar');
        $header.addClass('header-slide');
        eve.stopPropagation();
    });

    // 阻止在sidebar中单击收回sidebar
    $sidebar.on('click', function (eve) {
        eve.stopPropagation();
    });

    // 单击body收回sidebar
    $(document).on('click', function () {
        $sidebar.addClass('sidebar-hide');
        $header.removeClass('header-slide');
        $wrapper.removeClass('wrapper-show-sidebar');
    });

    // 切换tags和archives
    $archiveLink.on('click', function () {
        $sidebarContent.addClass('sidebar-content-show-archive').removeClass('sidebar-content-show-tags');
        $sidebarHeader.addClass('sidebar-header-show-archive').removeClass('sidebar-header-show-tags');
    });
    $tagsLink.on('click', function () {
        $sidebarContent.addClass('sidebar-content-show-tags').removeClass('sidebar-content-show-archive');
        $sidebarHeader.addClass('sidebar-header-show-tags').removeClass('sidebar-header-show-archive');
    });

    // 阻止sidebarContent在滚动到顶部或底部时继续滚动
    $sidebar.on('mousewheel', function (eve) {
        let target = eve.target,
            $sidebarTagList = $sidebar.find('.sidebar-tag-list:first'),
            $sidebarArchive = $sidebar.find('.sidebar-archive:first');

        if ($.contains($sidebarTagList[0], target) || $sidebarTagList === target) {
            stopSidebarEdgeScroll.call($sidebarTagList[0], eve);
        } else if ($.contains($sidebarArchive[0], target) || $sidebarArchive === target) {
            stopSidebarEdgeScroll.call($sidebarArchive[0], eve);
        } else {
            eve.preventDefault();
        }
    });

    function stopSidebarEdgeScroll(eve) {
        if (this.scrollHeight == this.clientHeight) {
            window.event.preventDefault();
        } else if (this.scrollTop <= 0) {
            if (eve.originalEvent.wheelDelta > 0) {
                window.event.preventDefault();
            }
        } else if (this.scrollTop >= this.scrollHeight - this.clientHeight) {
            if (eve.originalEvent.wheelDelta < 0) {
                window.event.preventDefault();
            }
        }
    }
};

export {
    sidebarInit
};