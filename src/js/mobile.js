const initMobile = function () {
  if (window.matchMedia) {
    const mql = window.matchMedia('(max-width: 960px)')
    mql.addListener(mediaChangeHandler)
    mediaChangeHandler(mql)
  } else {
    window.addListener(
      'resize',
      function () {
        const innerWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
        mediaChangeHandler(
          innerWidth > 900
            ? {
                matches: false,
              }
            : {
                matches: true,
              }
        )
      },
      false
    )
  }

  function mediaChangeHandler(mql) {
    if (mql.matches) {
      console.log('mobile')
      // TODO: why
      mobilePreventScrollBreakdown()
      // document.body.addEventListener('touchstart', function () {})
    } else {
      console.log('desktop')
    }
  }

  function mobilePreventScrollBreakdown() {}
}

export { initMobile }
