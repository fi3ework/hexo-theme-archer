import QRCode from './lib/qrcode'

function makeQR() {
    let qrURL = this.dataset.href;
    let QRele = this.getElementsByClassName('QRcode-box')[0];
    QRele.classList.add('QRcode-box-show');
    if (typeof this.hasMadeQR === 'undefined') {
        var qrcode = new QRCode(QRele, {
            text: qrURL,
            width: 128,
            height: 128,
            colorDark: "#222",
            colorLight: "#fff",
            correctLevel: QRCode.CorrectLevel.H
        });
        this.hasMadeQR = true;
    }
};

function showShare(eve) {
    console.log('show');
    eve.stopPropagation();
    let shareBox = this.getElementsByClassName('share-box')[0];
    shareBox.classList.add('share-box-show');
}

function hideShare() {
    console.log('hide');
    let shareBox = this.getElementsByClassName('share-box')[0];
    shareBox.classList.remove('share-box-show');
}

let shareButtons = document.getElementsByClassName('post-share');
let i = shareButtons.length;
while (i--) {
    document.body.addEventListener('click', hideShare);
    shareButtons[i].addEventListener('click', showShare);
}