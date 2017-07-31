'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var initMobile = function initMobile() {};

if (window.matchMedia) {
    var mql = window.matchMedia('(max-width: 900px)');
    mql.addListener(mediaChangeHandler);
    mediaChangeHandler(mql);
} else {
    window.addListener('resize', function () {
        var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        mediaChangeHandler(innerWidth > 900 ? {
            matches: false
        } : {
            matches: true
        });
    }, false);
}

function mediaChangeHandler(mql) {
    if (mql.matches) {
        console.log('mobile');
        // TODO: why
        document.body.addEventListener('touchstart', function () {});
    } else {
        console.log('desktop');
    }
}

exports.initMobile = initMobile;