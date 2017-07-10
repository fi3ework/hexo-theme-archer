'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeQR = undefined;

var _qrcode = require('./lib/qrcode');

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

    new _qrcode.QRCode(QRele, {
        text: opt.sURL,
        width: 128,
        height: 128,
        colorDark: '#222',
        colorLight: '#fff',
        correctLevel: _qrcode.QRCode.CorrectLevel.H
    });
}

exports.makeQR = makeQR;