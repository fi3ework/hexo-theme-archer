let sidebarInit = function () {
    let $sidebar = $('.sidebar:first'),
        $wrapper = $('.wrapper:first'),
        $headerMenu = $('.header-sidebar-menu:first'),
        $sidebarContent = $sidebar.find('.sidebar-content:first'),
        $archiveLink = $sidebar.find('.sidebar-archive-link:first'),
        $tagsLink = $sidebar.find('.sidebar-tags-link:first'),
        $tocWrapper = $('.toc-wrapper:first'),
        $header = $('.header:first'),
        $sidebarHeader = $sidebar.find('.sidebar-header:first');

    // 点击headerMenu出现sidebar
    $headerMenu.on('click', function (eve) {
        showSidebar(eve);
    });

    function showSidebar (eve) {
        $sidebar.addClass('sidebar-show');
        $wrapper.addClass('wrapper-show-sidebar');
        $header.addClass('header-slide');
        $tocWrapper.addClass('toc-slide');
        eve.stopPropagation();
    }

    // 阻止在sidebar中单击收回sidebar
    $sidebar.on('click', function (eve) {
        eve.stopPropagation();
    });

    // 单击body收回sidebar
    $wrapper.on('click', function (eve) {
        if ($sidebar.hasClass('sidebar-show')) {
            eve.preventDefault();
            $sidebar.removeClass('sidebar-show');
            $header.removeClass('header-slide');
            $wrapper.removeClass('wrapper-show-sidebar');
            $tocWrapper.removeClass('toc-slide');
        }
    });

    // 切换tags和archive
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
            $sidebararchive = $sidebar.find('.sidebar-archive:first');

        if ($.contains($sidebarTagList[0], target) || $sidebarTagList === target) {
            stopSidebarEdgeScroll.call($sidebarTagList[0], eve);
        } else if ($.contains($sidebararchive[0], target) || $sidebararchive === target) {
            stopSidebarEdgeScroll.call($sidebararchive[0], eve);
        } else {
            eve.preventDefault();
        }
    });
    

    function stopSidebarEdgeScroll (eve) {
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

    // 点击tag弹出slider
    function popSidebar () {
        // 弹出sidebar
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', false, true);
        $headerMenu[0].dispatchEvent(event);
        // 直接滑动到tags
        $tagsLink[0].dispatchEvent(event);
    }

    // 显示tag对应的列表
    let sidebarTagsName = $('.sidebar-tags-name:first')[0];

    function clickTag (tagName) {
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', false, true);
        $headerMenu[0].dispatchEvent(event);
        sidebarTagsName.currTagName = tagName;
        sidebarTagsName.dispatchEvent(event);
    }

    let $postTags = $('.post-tag');
    $postTags.on('click', function (eve) {
        popSidebar();
        let tagName = eve.target.dataset.href;
        clickTag(tagName);
        eve.stopPropagation();
    });
};


export {
    sidebarInit
};