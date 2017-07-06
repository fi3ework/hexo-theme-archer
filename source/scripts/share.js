'use strict';

var _QRMaker = require('./QR-maker');

var _QRMaker2 = _interopRequireDefault(_QRMaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mask = document.getElementsByClassName('qr-mask')[0];
var qrCode = document.getElementsByClassName('QRcode-box')[0];

function initQREvent() {
    var closeQR = document.getElementsByClassName('QRcode-close')[0];
    function hideQR(eve) {
        eve.stopPropagation();
        mask.classList.remove('QRcode-mask-opacity-show');
        qrCode.classList.remove('QRcode-mask-opacity-show');
        qrCode.addEventListener('transitionend', function () {
            if (mask.className.indexOf('QRcode-mask-opacity-show') === -1) {
                mask.classList.remove('QRcode-mask-show');
                qrCode.classList.remove('QRcode-mask-show');
            }
        });
    }

    closeQR.addEventListener('click', hideQR);
    mask.addEventListener('click', hideQR);
}

// show wechat QR code
function showQR(opt) {
    (0, _QRMaker2.default)(opt);
    mask.classList.add('QRcode-mask-show');
    qrCode.classList.add('QRcode-mask-show');
    requestAnimationFrame(function () {
        mask.classList.add('QRcode-mask-opacity-show');
        qrCode.classList.add('QRcode-mask-opacity-show');
    });
}

// generate the share link
function generateURL(url, opt) {
    return url.replace(/<%-sURL%>/g, opt.sURL).replace(/<%-sTitle%>/g, opt.sTitle).replace(/<%-sDesc%>/g, opt.sDesc).replace(/<%-sPic%>/g, opt.sPic);
}

// switch which site to share
function switchToShare(className, opt) {
    var combindedURL = void 0;
    switch (className) {
        case 'to-weibo':
            combindedURL = generateURL('http://service.weibo.com/share/share.php?url=<%-sURL%>&title=<%-sTitle%>&pic=<%-sPic%>', opt);
            break;
        case 'to-qq':
            combindedURL = generateURL('http://connect.qq.com/widget/shareqq/index.html?url=<%-sUrl%>&title=<%-sTitle%>&source=<%-sDesc%>', opt);
            break;
        case 'to-twitter':
            combindedURL = generateURL('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sURL%>', opt);
            break;
        default:
            break;
        case 'to-wechat':
            showQR(opt);
            break;
    }
    if (className !== 'to-wechat') {
        window.open(combindedURL);
    }
}

var initShareBox = function initShareBox() {
    initQREvent();
    // show share
    var hideTimer = void 0;
    function showShare() {
        if (hideTimer) {
            clearTimeout(hideTimer);
        }
        var shareBox = this.getElementsByClassName('share-box')[0];
        shareBox.classList.add('share-box-show');
        if (!shareBox.isInited) {
            initCurrentShare(shareBox);
        }
    }

    // hide share
    function hideShare() {
        var shareBox = this.getElementsByClassName('share-box')[0];
        hideTimer = setTimeout(function () {
            shareBox.classList.remove('share-box-show');
        }, 100);
    }

    // share button hover event    
    var shareButtons = document.getElementsByClassName('post-share');
    var i = shareButtons.length;
    while (i--) {
        shareButtons[i].addEventListener('mouseover', showShare);
        shareButtons[i].addEventListener('mouseout', hideShare);
    }
};

function initCurrentShare(shareBox) {
    shareBox.isInited = true;
    var shareItems = shareBox.querySelectorAll('li');
    var opt = {
        sURL: shareBox.dataset.href,
        sTitle: shareBox.dataset.title,
        sDesc: shareBox.dataset.title,
        sPic: ''
    };
    shareItems.forEach(function (ele) {
        ele.addEventListener('click', function () {
            switchToShare(this.className, opt);
        });
    }, this);
}

module.exports = initShareBox;