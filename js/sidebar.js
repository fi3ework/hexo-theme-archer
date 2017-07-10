import {
    tinkerUtil
} from './util';


function stopClickPropagation(target) {
    target.addEventListener('click', function (eve) {
        eve.stopPropagation();
    });
}

let sidebarInit = function () {
    let sidebar = document.getElementsByClassName('sidebar')[0],
        headerMenu = document.getElementsByClassName('header-sidebar-menu')[0],
        sidebarClose = sidebar.getElementsByClassName('sidebar-close')[0];
    // add sidebar hide show toggle
    tinkerUtil.toggler(sidebar, 'click', sidebarClose, 'sidebar-hide', null);
    tinkerUtil.toggler(sidebar, 'click', headerMenu, null, 'sidebar-hide', function (eve) {
        eve.stopPropagation();
    });
    // stop sidebar propagation to hide itself
    stopClickPropagation(sidebar);
    document.body.addEventListener('click', function () {
        sidebar.classList.add('sidebar-hide');
    });
    // add sidebar content change
    let sidebarContent = sidebar.getElementsByClassName('sidebar-content')[0],
        archiveLink = sidebar.getElementsByClassName('sidebar-archive-link')[0],
        tagsLink = sidebar.getElementsByClassName('sidebar-tags-link')[0];
    tinkerUtil.toggler(sidebarContent, 'click', archiveLink, 'sidebar-content-show-archive', 'sidebar-content-show-tags');
    tinkerUtil.toggler(sidebarContent, 'click', tagsLink, 'sidebar-content-show-tags', 'sidebar-content-show-archive');
};


export {
    sidebarInit
};