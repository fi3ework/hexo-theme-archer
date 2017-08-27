let init = function () {
    let $introImg = $('.site-intro-img:first'),
        introPlaceholder = $('.site-intro-placeholder:first'),
        bgCSS = $introImg.css('background-image'),
        bgURL = bgCSS.match(/url\("?(.*)"?\)/)[1];

    let img = new Image();
    img.src = bgURL;
    img.onload = function () {
        introPlaceholder.remove();
    };
};

export {
    init
};