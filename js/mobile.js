let initMobile = function () {
    let navBar = document.getElementsByClassName('navbar')[0];
    let menuButton = document.getElementsByClassName('header-sidebar-menu')[0];

    menuButton.addEventListener('click', function () {
        navBar.classList.toggle('navbar-show');
        navBar.classList.toggle('navbar-hidden');
    });
};

export { initMobile };