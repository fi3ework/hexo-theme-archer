import Package from '../../package.json'

import init from './init'
import { scroll } from './scroll'
import './initSidebar'
import { initMobile } from './mobile'
import InitSidebarLink from './tag'
import fancybox from './fancybox'

// print console info
const logStyle =
  'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
console.info(`%c 🎯 ${Package.name} ⬇️ `, logStyle)
console.info(`%c 🏷 Version: ${Package.version} `, logStyle)
console.info(`%c 📅 Version date: ${Package.versionDate} `, logStyle)
console.info(`%c 📦 ${Package.repository?.url} `, logStyle)

// print loaded info
window.addEventListener('load', function (event) {
  console.log('All resources are loaded!')
})

// init site base
init()

// init mobile
initMobile()

// scroll event
scroll()

// init sidebar link
const metas = new InitSidebarLink()
metas.addTab({
  metaName: 'tags',
  labelsContainer: '.sidebar-tags-name',
  postsContainer: '.sidebar-tags-list',
})
metas.addTab({
  metaName: 'categories',
  labelsContainer: '.sidebar-categories-name',
  postsContainer: '.sidebar-categories-list',
})

// fancybox
fancybox()
