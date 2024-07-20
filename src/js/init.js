import AnchorJS from 'anchor-js'
import toc from './toc'
import './fontawsome'

const init = function () {
  // Remove site intro image placeholder
  const $introImg = $('.site-intro-img:first'),
    $introPlaceholder = $('.site-intro-placeholder:first'),
    bgCSS = $introImg.css('background-image'),
    bgRegResult = bgCSS.match(/url\("*([^"]*)"*\)/)

  if (bgRegResult.length < 2) {
    console.error(
      "Error while loading site intro image. Please check image's url.",
    )
    console.log(bgRegResult)
  } else {
    const bgURL = bgRegResult[1],
      img = new Image()

    img.onload = () => {
      $introPlaceholder.remove()
      console.info('site intro image loaded.')
    }
    img.src = bgURL
  }

  // Dom content loaded event
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      $('.container').removeClass('container-unloaded')
      $('.footer').removeClass('footer-unloaded')
      $('.loading').remove()

      // Init anchors
      // https://www.bryanbraun.com/anchorjs/
      const anchors = new AnchorJS()
      anchors.options = {
        placement: 'right',
        class: 'anchorjs-archer',
      }
      anchors.add()

      // As headers' absolute offset-y can be queried properly
      // after remove container's `container-unloaded` class,
      // so we should init toc here for better performance.
      toc()
    },
    false,
  )
}

export default init
