import { init } from './init';
import { toggleHeader } from './toggle-header';
import { initMobile } from './mobile';
import { sidebarInit } from './sidebar';
import { initTag } from './tag';

console.info('hexo-theme-archer: v201701201');
init();
toggleHeader();
sidebarInit();
initTag();
initMobile();