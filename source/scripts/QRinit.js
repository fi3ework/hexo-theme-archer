'use strict';

var _qrcode = require('./lib/qrcode');

var _qrcode2 = _interopRequireDefault(_qrcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeQR() {
    var qrURL = this.dataset.href;
    var QRele = this.getElementsByClassName('QRcode-box')[0];
    QRele.classList.add('QRcode-box-show');
    if (typeof this.hasMadeQR === 'undefined') {
        var qrcode = new _qrcode2.default(QRele, {
            text: qrURL,
            width: 128,
            height: 128,
            colorDark: "#222",
            colorLight: "#fff",
            correctLevel: _qrcode2.default.CorrectLevel.H
        });
        this.hasMadeQR = true;
    }
};