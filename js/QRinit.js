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