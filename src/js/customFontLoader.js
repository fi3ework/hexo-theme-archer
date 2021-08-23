const WebFont = require('webfontloader')
const fontName = window.customFontName
const fontUrl = window.customFontUrl

if (fontName && fontUrl) {
  // Load custom font after window is loaded.
  window.addEventListener('load', () => {
    WebFont.load({
      custom: {
        families: [fontName],
        urls: [fontUrl],
      },
      loading: () => {
        console.log(`Loading custom font: ${fontUrl}`)
      },
      active: () => {
        console.log('Custom font active!')
      },
      inactive: () => {
        console.error(
          'Custom font inactive. Please check network, font name and load urls.'
        )
      },
    })

    const root = document.documentElement
    const customBaseFontFamily =
      fontName.split(':')[0] +
      ', ' +
      getComputedStyle(root).getPropertyValue('--base-font-family')
    root.style.setProperty('--base-font-family', customBaseFontFamily)
  })
}
