import AnchorJS from 'anchor-js'

let init = function () {
  let $introImg = $('.site-intro-img:first'),
    introPlaceholder = $('.site-intro-placeholder:first'),
    bgCSS = $introImg.css('background-image'),
    bgRegResult = bgCSS.match(/url\("*([^"]*)"*\)/)

  if (bgRegResult.length < 2) {
    console.log('...')
    console.log(bgRegResult)
    return
  }

  let bgURL = bgRegResult[1],
    img = new Image()
  img.onload = function () {
    // window.alert()
    // setTimeout(function () {
    introPlaceholder.remove()
    // }, 100)
    console.info('PLACEHOLDER REMOVED')
  }
  img.src = bgURL

  document.addEventListener('DOMContentLoaded', function () {
    $('.container').removeClass('container-unloaded')
    $('.footer').removeClass('footer-unloaded')
    $('.loading').remove()
  }, false)

  // https://www.bryanbraun.com/anchorjs/
  let anchors = new AnchorJS()
  anchors.options = {
    placement: 'right',
    class: 'anchorjs-archer'
  }
  anchors.add()
}

export default init