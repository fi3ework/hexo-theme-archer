import archerUtil from './util'

const $donatePopup = $('.donate-popup'),
  $donateBtn = $('.donate-btn'),
  $postBody = $('.post-body'),
  $postPage = $('.post-page')

const rem = archerUtil.rem()

const initDonate = () => {
  const hideDonatePopup = () => {
    $donatePopup.addClass('donate-popup--hidden')
    $donateBtn.removeClass('footer-fixed-btn--active')
  }

  const showDonatePopup = () => {
    const popupWidth = Math.floor(
      ($postBody.width() - $postPage.width()) / 2 + 4 * rem,
    )
    $donatePopup.css({ width: popupWidth })

    $donatePopup.removeClass('donate-popup--hidden')
    $donateBtn.addClass('footer-fixed-btn--active')
  }

  $donateBtn.on('click', (e) => {
    e.stopPropagation()

    if ($donatePopup.hasClass('donate-popup--hidden')) {
      showDonatePopup()
    } else {
      hideDonatePopup()
    }
  })
}

export default initDonate
