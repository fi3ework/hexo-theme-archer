let init = function () {
    let $introImg = $('.site-intro-img:first'),
        introPlaceholder = $('.site-intro-placeholder:first'),
        bgCSS = $introImg.css('background-image'),
        bgRegResult = bgCSS.match(/url\("*([^"]*)"*\)/);
    
    if (bgRegResult.length < 2) {
        console.log(bgRegResult);
        return;
    }
        
    let bgURL = bgRegResult[1],
        img = new Image();
    img.onload = function () {
        introPlaceholder.remove();
        console.info('PLACEHOLDER REMOVED');
    };
    img.src = bgURL;
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementsByClassName('container')[0].classList.remove('container-unloaded');
    document.getElementsByClassName('container')[0].classList.add('container-footer-fade-in');
    document.getElementsByClassName('footer')[0].classList.remove('footer-unloaded');
    document.getElementsByClassName('footer')[0].classList.add('container-footer-fade-in');
    document.getElementsByClassName('loading')[0].style.display = 'none';
}, false);

export {
    init
};