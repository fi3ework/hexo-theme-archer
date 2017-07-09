let initMobile = function () {
    let navBar = document.getElementsByClassName('navbar')[0];
    let menuButton = document.getElementsByClassName('menu-button')[0];

    menuButton.addEventListener('click', function () {
        navBar.classList.toggle('navbar-show');
        navBar.classList.toggle('navbar-hidden');
    });
};

export { initMobile };