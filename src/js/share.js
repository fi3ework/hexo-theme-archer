/**
 * special thanks to hexo-theme-yilia
 * https://github.com/litten/hexo-theme-yilia/blob/master/source-src/js/share.js
 */

import qrcode from 'qrcode-generator'

function initQR(sURL) {
  let typeNumber = 0
  let errorCorrectionLevel = 'L'
  let qr = qrcode(typeNumber, errorCorrectionLevel)
  qr.addData(sURL)
  qr.make()
  document.getElementsByClassName('share-qrcode')[0].innerHTML = qr.createImgTag()
}

function generate(templateURL, param) {
  let shareURL = templateURL.replace(/<%-sURL%>/g, encodeURIComponent(param.sURL))
    .replace(/<%-sTitle%>/g, param.sTitle)
    .replace(/<%-sDesc%>/g, param.sDesc)
    .replace(/<%-sAuthor%>/g, param.sAuthor)
    .replace(/<%-sImg%>/g, encodeURIComponent(param.sImg))
  window.open(shareURL)
}

function handleShareClick(type, param) {
  if (type === 'weibo') {
    generate('http://service.weibo.com/share/share.php?url=<%-sURL%>&title=<%-sTitle%>&pic=<%-sImg%>', param)
  } else if (type === 'qzone') {
    generate('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<%-sURL%>&title=<%-sTitle%>&pics=<%-sImg%>&summary=<%-sDesc%>', param)
  } else if (type === 'facebook') {
    generate('https://www.facebook.com/sharer/sharer.php?u=<%-sURL%>', param)
  } else if (type === 'twitter') {
    generate('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sURL%>&via=<%-sAuthor%>', param)
  } else if (type === 'qr') {
    // pre init qr
  }
}

function init() {
  let sURL = window.location.href
  let sTitle = document.querySelector('title').innerHTML
  let sImg = document.querySelector('.article-entry img') && document.querySelector('.article-entry img').getAttribute('src')
  sImg = window.location.protocol + '//' +
  window.location.hostname +
    (window.location.port ? ':' + window.location.port : '') +
    sImg
  let sDesc = document.querySelector('.article-entry') && document.querySelector('.article-entry').innerText.substring(0, 30) + '...'
  let sAuthor = window.siteMeta.author
  let param = {
    sURL, sTitle, sImg, sDesc, sAuthor
  }

  let shareWrapper = document.querySelector('.shareList')
  if (!shareWrapper) {
    return
  }
  initQR(sURL)
  shareWrapper.addEventListener('click', function (e) {
    if (!e.target.getAttribute('data-type')) {
      return
    }
    handleShareClick(e.target.getAttribute('data-type'), param)
  })
}

init()
