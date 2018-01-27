let init = function () {
  let $introImg = $('.site-intro-img:first'),
    introPlaceholder = $('.site-intro-placeholder:first'),
    bgCSS = $introImg.css('background-image'),
    bgRegResult = bgCSS.match(/url\("*([^"]*)"*\)/)

  if (bgRegResult.length < 2) {
    console.log(bgRegResult)
    return
  }

  let bgURL = bgRegResult[1],
    img = new Image()
  img.onload = function () {
    introPlaceholder.remove()
    console.info('PLACEHOLDER REMOVED')
  }
  img.src = bgURL
}

document.addEventListener('DOMContentLoaded', function () {
  $('.container').removeClass('container-unloaded')
  $('.footer').removeClass('footer-unloaded')
  $('.loading').remove()
}, false)

export { init }