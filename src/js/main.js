import Package from '../../package.json'

import init from './init'
import initTheme from './theme'
import initScroll from './scroll'
import fancybox from './fancybox'
import './initSidebar'

// print console info
const logStyle =
  'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
console.info(`%c 🎯 ${Package.name} ⬇️ `, logStyle)
console.info(`%c 🏷 Version: ${Package.version} `, logStyle)
console.info(`%c 📅 Version date: ${Package.versionDate} `, logStyle)
console.info(`%c 📦 ${Package.homepage} `, logStyle)

// site base
init()

// theme
initTheme()

// scroll event
initScroll()

// fancybox
fancybox()
