'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var initMobile = function initMobile() {
    var navBar = document.getElementsByClassName('navbar')[0];
    var menuButton = document.getElementsByClassName('header-sidebar-menu')[0];

    menuButton.addEventListener('click', function () {
        navBar.classList.toggle('navbar-show');
        navBar.classList.toggle('navbar-hidden');
    });
};

exports.initMobile = initMobile;