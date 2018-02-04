import { init } from './init'
import { scroll } from './scroll'
import mySidebar from './initSidebar'
import { initMobile } from './mobile'
import InitSidebarLink from './tag'

let logStyle = 'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
console.info('%c 🎯 hexo-theme-archer ⬇️ ', logStyle)
console.info('%c 🏷 Version: 1.0.0 ', logStyle)
console.info('%c 📅 Version date: 20182004 ', logStyle)
console.info('%c 📦 https://github.com/fi3ework/hexo-theme-archer ', logStyle)
init()
scroll()


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

initMobile()