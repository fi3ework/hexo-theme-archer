let init = function () {
    let $introImg = $('.site-intro-img:first'),
        introPlaceholder = $('.site-intro-placeholder:first'),
        bgCSS = $introImg.css('background-image'),
        bgURL = bgCSS.match(/url\("(.*)"\)/)[1];

    let img = new Image();
    img.onload = function () {
        introPlaceholder.remove();
        console.info('PLACEHOLDER REMOVED');
    };
    img.src = bgURL;
};

export {
    init
};