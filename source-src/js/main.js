import { init } from './init'
import { scroll } from './scroll'
import { initMobile } from './mobile'
import { sidebarInit } from './sidebar'
import { initTag } from './tag'

console.info('hexo-theme-archer: v20180109')
init()
scroll()
sidebarInit()
initTag()
initMobile()