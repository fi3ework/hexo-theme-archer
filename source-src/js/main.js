import { init } from './init';
import { toggleHeader } from './toggle-header';
import { initMobile } from './mobile';
import { sidebarInit } from './sidebar';
import { initTag } from './tag';

init();
toggleHeader();
sidebarInit();
initTag();
initMobile();