import { init } from './init'
import { scroll } from './scroll'
import mySidebar from './initSidebar'
import { initMobile } from './mobile'
import InitSidebarLink from './tag'

console.info('hexo-theme-archer: v20180109')
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