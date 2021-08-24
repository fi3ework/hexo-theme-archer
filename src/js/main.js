import init from './init'
import { scroll } from './scroll'
import './initSidebar'
import { initMobile } from './mobile'
import InitSidebarLink from './tag'
import fancybox from './fancybox'

// print custom info
const logStyle =
  'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
console.info('%c 🎯 hexo-theme-archer ⬇️ ', logStyle)
console.info('%c 🏷 Version: 1.6.4 ', logStyle)
console.info('%c 📅 Version date: 20210811 ', logStyle)
console.info('%c 📦 https://github.com/fi3ework/hexo-theme-archer ', logStyle)

window.addEventListener('load', function (event) {
  console.log('All resources finished loading!')
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
