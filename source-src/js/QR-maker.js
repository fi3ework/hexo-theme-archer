import { QRCode } from './lib/qrcode'

function makeQR(opt) {
  let QRele = document.getElementsByClassName('QRcode-box')[0]
  // remove old canvas and img
  let oldCanvas = QRele.getElementsByTagName('canvas')
  if (oldCanvas.length) {
    QRele.removeChild(oldCanvas[0])
  }
  let oldQR = QRele.getElementsByTagName('img')
  if (oldQR.length) {
    QRele.removeChild(oldQR[0])
  }

  new QRCode(QRele, {
    text: opt.sURL,
    width: 128,
    height: 128,
    colorDark: '#222',
    colorLight: '#fff',
    correctLevel: QRCode.CorrectLevel.H
  })
}

export { makeQR }