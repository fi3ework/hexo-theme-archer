'use strict';

var _qrcode = require('./lib/qrcode');

var _qrcode2 = _interopRequireDefault(_qrcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeQR(opt) {
    var QRele = document.getElementsByClassName('QRcode-box')[0];
    // remove old canvas and img
    var oldCanvas = QRele.getElementsByTagName('canvas');
    if (oldCanvas.length) {
        QRele.removeChild(oldCanvas[0]);
    }
    var oldQR = QRele.getElementsByTagName('img');
    if (oldQR.length) {
        QRele.removeChild(oldQR[0]);
    }

    new _qrcode2.default(QRele, {
        text: opt.sURL,
        width: 128,
        height: 128,
        colorDark: '#222',
        colorLight: '#fff',
        correctLevel: _qrcode2.default.CorrectLevel.H
    });
}

module.exports = makeQR;