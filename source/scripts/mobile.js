'use strict';

var initMobile = function initMobile() {
    var navBar = document.getElementsByClassName('navbar')[0];
    var menuButton = document.getElementsByClassName('menu-button')[0];

    menuButton.addEventListener('click', function () {
        navBar.classList.toggle('navbar-show');
        navBar.classList.toggle('navbar-hidden');
    });
};

module.exports = initMobile();