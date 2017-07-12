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
        headerMenu = document.getElementsByClassName('header-sidebar-menu')[0],
        sidebarClose = sidebar.getElementsByClassName('sidebar-close')[0];
    // add sidebar hide show toggle
    _util.tinkerUtil.toggler(sidebar, 'click', sidebarClose, 'sidebar-hide', null);
    _util.tinkerUtil.toggler(sidebar, 'click', headerMenu, null, 'sidebar-hide', function (eve) {
        eve.stopPropagation();
    });
    // stop sidebar propagation to hide itself
    stopClickPropagation(sidebar);
    document.body.addEventListener('click', function () {
        sidebar.classList.add('sidebar-hide');
    });

    // add sidebar content change
    var sidebarContent = sidebar.getElementsByClassName('sidebar-content')[0],
        archiveLink = sidebar.getElementsByClassName('sidebar-archive-link')[0],
        tagsLink = sidebar.getElementsByClassName('sidebar-tags-link')[0];
    _util.tinkerUtil.toggler(sidebarContent, 'click', archiveLink, 'sidebar-content-show-archive', 'sidebar-content-show-tags');
    _util.tinkerUtil.toggler(sidebarContent, 'click', tagsLink, 'sidebar-content-show-tags', 'sidebar-content-show-archive');

    // add sidebar bottom slider change
    var sidebarHeader = sidebar.getElementsByClassName('sidebar-header')[0];
    _util.tinkerUtil.toggler(sidebarHeader, 'click', archiveLink, 'sidebar-header-show-archive', 'sidebar-header-show-tags');
    _util.tinkerUtil.toggler(sidebarHeader, 'click', tagsLink, 'sidebar-header-show-tags', 'sidebar-header-show-archive');
};

exports.sidebarInit = sidebarInit;