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
              },
        )
      },
      false,
    )
  }

  function mediaChangeHandler(mql) {
    window.removeEventListener('touchstart', onTouchStart)

    if (mql.matches) {
      console.log('Initialize optimizations for mobile device')
      // Notes: don't remove the `touchstart` listener below
      window.addEventListener('touchstart', onTouchStart)
    }
  }

  function onTouchStart() {
    // Simply do nothing to avoid unexpected behaviors of css pseudo class :hover
  }
}

export default initMobile
