import { makeQR } from './QR-maker'

let mask = document.getElementsByClassName('qr-mask')[0]
let qrCode = document.getElementsByClassName('QRcode-box')[0]

function initQREvent() {
  let closeQR = document.getElementsByClassName('QRcode-close')[0]
  if (!closeQR) {
    return
  }

  function hideQR(eve) {
    eve.stopPropagation()
    mask.classList.remove('QRcode-mask-opacity-show')
    qrCode.classList.remove('QRcode-mask-opacity-show')
    qrCode.addEventListener('transitionend', function () {
      if (mask.className.indexOf('QRcode-mask-opacity-show') === -1) {
        mask.classList.remove('QRcode-mask-show')
        qrCode.classList.remove('QRcode-mask-show')
      }
    })
  }

  closeQR.addEventListener('click', hideQR)
  mask.addEventListener('click', hideQR)

}

// show wechat QR code
function showQR(opt) {
  makeQR(opt)
  mask.classList.add('QRcode-mask-show')
  qrCode.classList.add('QRcode-mask-show')
  requestAnimationFrame(function () {
    mask.classList.add('QRcode-mask-opacity-show')
    qrCode.classList.add('QRcode-mask-opacity-show')
  })
}

// generate the share link
function generateURL(url, opt) {
  return url.replace(/<%-sURL%>/g, opt.sURL)
    .replace(/<%-sTitle%>/g, opt.sTitle)
    .replace(/<%-sDesc%>/g, opt.sDesc)
    .replace(/<%-sPic%>/g, opt.sPic)
}

// switch which site to share
function switchToShare(className, opt) {
  let comonedURL
  switch (className) {
    case 'to-weibo':
      comonedURL = generateURL('http://service.weibo.com/share/share.php?url=<%-sURL%>&title=<%-sTitle%>&pic=<%-sPic%>', opt)
      break
    case 'to-qq':
      comonedURL = generateURL('http://connect.qq.com/widget/shareqq/index.html?url=<%-sUrl%>&title=<%-sTitle%>&source=<%-sDesc%>', opt)
      break
    case 'to-twitter':
      comonedURL = generateURL('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sURL%>', opt)
      break
    default:
      break
    case 'to-wechat':
      showQR(opt)
      break
  }
  if (className !== 'to-wechat') {
    window.open(comonedURL)
  }
}

let initShareBox = function () {
  initQREvent()
  // show share
  let hideTimer
  function showShare() {
    if (hideTimer) {
      clearTimeout(hideTimer)
    }
    let shareBox = this.getElementsByClassName('share-box')[0]
    shareBox.classList.add('share-box-show')
    if (!shareBox.isInited) {
      initCurrentShare(shareBox)
    }
  }

  // hide share
  function hideShare() {
    let shareBox = this.getElementsByClassName('share-box')[0]
    hideTimer = setTimeout(function () {
      shareBox.classList.remove('share-box-show')
    }, 100)
  }

  // share button hover event
  let shareButtons = document.getElementsByClassName('post-share')
  let i = shareButtons.length
  while (i--) {
    shareButtons[i].addEventListener('mouseover', showShare)
    shareButtons[i].addEventListener('mouseout', hideShare)
  }
}

function initCurrentShare(shareBox) {
  shareBox.isInited = true
  let shareItems = shareBox.querySelectorAll('li')
  let opt = {
    sURL: shareBox.dataset.href,
    sTitle: shareBox.dataset.title,
    sDesc: shareBox.dataset.title,
    sPic: ''
  }
  shareItems.forEach(function (ele) {
    ele.addEventListener('click', function () {
      switchToShare(this.className, opt)
    })
  }, this)
}


export { initShareBox }