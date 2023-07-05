import Sidebar from './sidebar'
import InitSidebarLink from './tag'

// init sidebar
const sidebar = new Sidebar({
  sidebar: '.sidebar',
  nav: '.sidebar-tabs',
  tabs: '.sidebar-tabs li',
  content: '.sidebar-content',
  panels: '.sideabar-contents > div',
  menuButton: '.header-sidebar-menu',
})

// init sidebar link
const metas = new InitSidebarLink(sidebar)
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

export default { sidebar, metas }
