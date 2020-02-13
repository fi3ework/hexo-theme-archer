import init from './init'
import {
  scroll
} from './scroll'
import './initSidebar'
import {
  initMobile
} from './mobile'
import InitSidebarLink from './tag'
import toc from './toc'
import fancybox from './fancybox'

let logStyle =
  'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
console.info('%c 📦 https://github.com/horizon2019?tab=repositories ', logStyle)

// remove background placeholder
init()

// scroll event
scroll()

// init sidebar link
let metas = new InitSidebarLink()
metas.addTab({
  metaName: 'tags',
  labelsContainer: '.sidebar-tags-name',
  postsContainer: '.sidebar-tags-list'
})

metas.addTab({
  metaName: 'categories',
  labelsContainer: '.sidebar-categories-name',
  postsContainer: '.sidebar-categories-list'
})

// init toc
window.addEventListener('load', function (event) {
  console.log('All resources finished loading!')
  toc()
})

initMobile()
// initSearch()

// fancybox
fancybox()