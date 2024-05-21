import Package from '../../package.json'

import init from './init'
// import initMobile from './mobile'
import initTheme from './theme'
import initImage from './image'
import initScroll from './scroll'
import initSidebar from './initSidebar'
import initDonate from './donate'

// print console info
const logStyle =
  'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
console.info(`%c 🎯 ${Package.name} ⬇️ `, logStyle)
console.info(`%c 🏷 Version: ${Package.version} `, logStyle)
console.info(`%c 📅 Version date: ${Package.versionDate} `, logStyle)
console.info(`%c 📦 ${Package.homepage} `, logStyle)

// site base
init()

// optimizations for mobile device
// initMobile()

// sidebar
initSidebar()

// theme
initTheme()

// init image with fancybox
initImage()

// scroll event
initScroll()

// donate
initDonate()
