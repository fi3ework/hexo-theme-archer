import { init } from './init'
import { scroll } from './scroll'
import { initMobile } from './mobile'
import sidebar from './sidebar'
import InitSidebarLink from './tag'

console.info('hexo-theme-archer: v20180109')
init()
scroll()
let sidebarTags = new InitSidebarLink('tags', '.sidebar-tags-list', '.sidebar-tags-name')
let sidebarCategories = new InitSidebarLink('categories', '.sidebar-categories-list', '.sidebar-categories-name')
initMobile()