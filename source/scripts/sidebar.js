'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sidebarInit = undefined;

var _util = require('./util');

function stopClickPropagation(target) {
    target.addEventListener('click', function (eve) {
        eve.stopPropagation();
    });
}

var sidebarInit = function sidebarInit() {
    var sidebar = document.getElementsByClassName('sidebar')[0],
        wrapper = document.getElementsByClassName('wrapper')[0],
        headerMenu = document.getElementsByClassName('header-sidebar-menu')[0];
    // sidebarClose = sidebar.getElementsByClassName('sidebar-close')[0];

    // add sidebar hide show toggle
    // archUtil.toggler(sidebar, 'click', sidebarClose, 'sidebar-hide', null);
    _util.archUtil.toggler(sidebar, 'click', headerMenu, null, 'sidebar-hide', function (eve) {
        eve.stopPropagation();
    });
    _util.archUtil.toggler(wrapper, 'click', headerMenu, 'wrapper-show-sidebar', null);

    // stop sidebar propagation to hide itself
    stopClickPropagation(sidebar);

    _util.archUtil.toggler(sidebar, 'click', document.body, 'sidebar-hide', null);
    _util.archUtil.toggler(wrapper, 'click', document.body, null, 'wrapper-show-sidebar');

    // add sidebar content change
    var sidebarContent = sidebar.getElementsByClassName('sidebar-content')[0],
        archiveLink = sidebar.getElementsByClassName('sidebar-archive-link')[0],
        tagsLink = sidebar.getElementsByClassName('sidebar-tags-link')[0];
    _util.archUtil.toggler(sidebarContent, 'click', archiveLink, 'sidebar-content-show-archive', 'sidebar-content-show-tags');
    _util.archUtil.toggler(sidebarContent, 'click', tagsLink, 'sidebar-content-show-tags', 'sidebar-content-show-archive');

    // stop reach top and bottom sidebar scroll
    function stopSidebarEdgeScroll(eve) {
        if (this.scrollHeight == this.clientHeight) {
            window.event.preventDefault();
        } else if (this.scrollTop <= 0) {
            if (eve.wheelDelta > 0) {
                window.event.preventDefault();
            }
        } else if (this.scrollTop >= this.scrollHeight - this.clientHeight) {
            if (eve.wheelDelta < 0) {
                window.event.preventDefault();
            }
        }
    }

    // stop sidebar scroll
    function stopScroll(eve) {
        var target = eve.target;
        var sidebarTagList = document.getElementsByClassName('sidebar-tag-list')[0];
        var sidebarArchive = document.getElementsByClassName('sidebar-archive')[0];
        // console.log(sidebarTagList.compareDocumentPosition(target));
        // console.log(sidebarArchive.compareDocumentPosition(target));
        // console.info('');
        if (sidebarTagList.compareDocumentPosition(target) >= 16 || target == sidebarTagList) {
            stopSidebarEdgeScroll.call(sidebarTagList, eve);
        } else if (sidebarArchive.compareDocumentPosition(target) >= 16 || target == sidebarArchive) {
            stopSidebarEdgeScroll.call(sidebarArchive, eve);
        } else {
            window.event.preventDefault();
        }
    }

    sidebar.addEventListener('mousewheel', stopScroll);

    // add sidebar bottom slider change
    var sidebarHeader = sidebar.getElementsByClassName('sidebar-header')[0];
    _util.archUtil.toggler(sidebarHeader, 'click', archiveLink, 'sidebar-header-show-archive', 'sidebar-header-show-tags');
    _util.archUtil.toggler(sidebarHeader, 'click', tagsLink, 'sidebar-header-show-tags', 'sidebar-header-show-archive');
};

exports.sidebarInit = sidebarInit;