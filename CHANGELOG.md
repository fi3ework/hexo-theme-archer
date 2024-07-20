# 更新日志

## [v1.7.0](https://github.com/fi3ework/hexo-theme-archer/releases/tag/1.7.0)

- 新特性 / Feature

  1. **翻译的文章**：允许配置文章 Front-matter，添加原文章的作者、名称和链接信息。（[#265](https://github.com/fi3ework/hexo-theme-archer/issues/265)）
  2. **文章打赏**：支持配置文章打赏信息；支持配置文章 Front-matter，指定文章启用或关闭打赏功能。目前**仅支持桌面端**。（[#131](https://github.com/fi3ework/hexo-theme-archer/issues/131)）
  3. 打开侧边菜单和打赏弹窗时，将相应的按钮置为高亮状态。
  4. 桌面端：允许通过 ESC 和点击遮盖层的方式关闭 Algolia 搜索弹窗。

- 修复 / Fix

  1. 移动端：修复点击操作按钮时，悬浮样式保留的问题。（[#398](https://github.com/fi3ework/hexo-theme-archer/issues/398)）

- 样式 / Style

  1. 为顶部的 Banner，Algolia 搜索弹窗等位置添加了毛玻璃效果。
  2. 桌面端：对齐账号信息处的 Icon。（[#398](https://github.com/fi3ework/hexo-theme-archer/issues/398)）
  3. 优化多处样式细节。

- 变更 / Change

  1. 不再随着阅读进度自动设置 URL 的 hash 查询。
  2. 移动端：不再显示左下角的回到顶部按钮。（[#397](https://github.com/fi3ework/hexo-theme-archer/issues/397)）
  3. 去除配置文件中的 `source_version` 字段。应当依靠浏览器的缓存控制策略来加载最新的文件，不再手动进行配置。

- 其它 / Chore

  1. 迁移 GoogleAnalytics 至 `gtag.js`。
  2. 替换 `node-sass` 为 `sass`。
  3. 去除 EJS 模板渲染得到的 HTML 文件里多余的空格。（[#374](https://github.com/fi3ework/hexo-theme-archer/issues/374)）
  4. 迁移 `waline@1.x` 至 `waline@2.x`。（[#386](https://github.com/fi3ework/hexo-theme-archer/issues/386)）
  5. 更新项目依赖，兼容 `node@14.x` 版本。

## [v1.6.6](https://github.com/fi3ework/hexo-theme-archer/releases/tag/1.6.6)

- 重构 / Refactor

  1. 重构文章页**目录**功能，提高目录高亮状态响应速度及精度（[#357](https://github.com/fi3ework/hexo-theme-archer/issues/357)）。

- 问题修复 / Fix

  1. 修复当文章不包含标签（Tag）时，也不会展示归档（Category）的问题（[#352](https://github.com/fi3ework/hexo-theme-archer/issues/352)）。
  2. 修复友链未打开新标签页的问题（[#359](https://github.com/fi3ework/hexo-theme-archer/issues/359)）。

- 样式 / Style

  1. 优化 Gitalk 评论组件在暗黑模式下的样式（[#344](https://github.com/fi3ework/hexo-theme-archer/issues/344), [#347](https://github.com/fi3ework/hexo-theme-archer/issues/347)）。
  2. 修复 `.header` 样式类冲突的问题（[#351](https://github.com/fi3ework/hexo-theme-archer/issues/351)）。
  3. 优化首页文章预览多行标题的显示效果（[#353](https://github.com/fi3ework/hexo-theme-archer/issues/353)）。

- 变更 / Change

  1. **默认关闭**字数统计功能，避免用户在未安装插件时启动主题出错（[#367](https://github.com/fi3ework/hexo-theme-archer/issues/367)）。
  2. 随着文章页滚动，**不再**自动设置地址栏的查询 Hash（[#369](https://github.com/fi3ework/hexo-theme-archer/issues/369)）。

## [v1.6.5](https://github.com/fi3ework/hexo-theme-archer/releases/tag/1.6.5)

- 新特性 / Feature

  1. 添加了对评论组件 Waline 的支持（[#319](https://github.com/fi3ework/hexo-theme-archer/issues/319)）

- 问题修复 / Fix

  1. 修复了分享文章按钮失效的问题（[#313](https://github.com/fi3ework/hexo-theme-archer/issues/313)）
  2. 修复了 Tag 或 Cate 中无法使用特殊字符的问题（[#316](https://github.com/fi3ework/hexo-theme-archer/issues/316)）
  3. 修复了 Toc 和 Anchor 中可能出现的问题（[#317](https://github.com/fi3ework/hexo-theme-archer/issues/317)）
  4. 修复了暗色模式偏好的问题（[#325](https://github.com/fi3ework/hexo-theme-archer/issues/325)）

## [v1.6.4](https://github.com/fi3ework/hexo-theme-archer/releases/tag/1.6.4)

- 新特性 / Feat

  1. 现在可以设置主页的 Avatar 头像无边框了
  2. 地址栏 Hash 值随文章页面滚动自动修改为对应的 Toc 值
  3. 当 Toc 过长时，Toc 目录随文章页面滚动而[滚动](https://github.com/fi3ework/hexo-theme-archer/projects/1#card-64443923)
  4. 添加对浮动元素的支持
  5. 启用摘要内容的文章可以配置显示“阅读更多”按钮
  6. 现在 Profile 栏可配置搜索功能，查看自己博客的 SEO 状态
  7. 现在 Profile 栏可以自定义添加更多菜单或链接（[#308](https://github.com/fi3ework/hexo-theme-archer/issues/308)）

- 变更 / Change

  1. 移动端的断点由 `980px` 修改为 `960px`
  2. 点击文章页面 Toc 目录跳转时，强制显示 Banner，并预留出 Banner 的空间
  3. 文章页面向上滚动显示 Banner 的阈值由 `500px` 修改为 `200px`
  4. `_config.yml` 中 `Other` 的部分主题配置移动到 `Theme` 下。
  5. 移除主页摘要中标题的 Anchor 按钮

- 修复 / Fix

  1. 修复文章页面 License 处原文链接的中文分词不自动断行的[问题](https://github.com/fi3ework/hexo-theme-archer/issues/306#issuecomment-894640488)
  2. 修复在某些页面下打开 Algolia 搜索时，页面可能显示异常的问题
  3. 在尚未加载完成的情况下，不再错误显示侧边栏打开动画了
  4. 修复文章页面 Toc 随页面滚动高亮显示错误的问题
  5. 修复文章页中，浮动元素可能错误显示的问题（[#309](https://github.com/fi3ework/hexo-theme-archer/issues/309)）

- 样式 / Style

  1. 适配 Dark 模式下文章中表格的颜色
  2. 优化 Dark 模式颜色配置
  3. 优化 404 页面的样式
  4. 优化文章页在移动端的显示
  5. 优化侧边栏在移动端的显示
  6. 优化主页摘要的显示，限制图片的高度
  7. 优化 Dark 模式切换页面时的显示效果

- 性能 / Perf

  1. 提高浏览器滚动性能
  2. 优化页面加载性能

- 回滚 / Revert

  1. 侧边栏文章标题不再使用 Feature 字体
  2. 移除没有用的 Background-holder

- 其它 / Chore

  1. 快速点击切换 Dark 模式按钮不再触发主题模式切换
  2. 将更新日志内容放到 `CHANGELOG.md` 文件下，而不是 `README.md`

- 开发者 / Dev

  1. 提供 `source_version` 配置，一键修改源文件版本日期
  2. 添加 `.editorconfig` 文件

## 历史更新记录

- 2021.07.28 - 『添加 Dark 模式支持』
- 2021.02.03 - 『添加“文章时效性”提示』
- 2021.01.26 - 『更新使用的 nodejs，以及相关依赖包的版本』
- 2020.03.04 - 『添加 utteranc 评论 支持』
- 2020.03.02 - 『添加 Gitalk 评论 支持』
- 2018.08.26 - 『添加 i18n 支持』
- 2018.07.09 - 『可以切换深/浅色代码配色方案了，[详情](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)』
- 2018.06.23 - 『添加 Valine 评论，感谢 [hulichao](https://github.com/fi3ework/hexo-theme-archer/issues/115) 同学』
- 2018.06.04 - 『添加 Algolia 搜索，[详情](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)』
- 2018.05.24 - 『可自定义访问量统计/增加字数统计及阅读时间』
- 2018.05.01 - 『添加 license』
- 2018.03.18 - 『添加 fancybox』
- 2018.03.11 - 『toc 可以根据阅读位置自动展开和收缩了』
- 2018.03.04 - 『头图的高度可以自定义了，配置 \_config 即可』
- 2018.02.28 - 『重写分享功能，分享按钮在头图上』
- 2018.02.24 - 『支持显示微信和 QQ 二维码』
- 2018.02.04 - 『代码重构，性能优化，样式更新，V1.0.0』
- 2017.12.27 - 『增加~~百度分享和~~页面浏览量统计』
- 2017.12.17 - 『增加阅读进度条，在 post 页的顶部』
- 2017.10.16 - 『修复移动端 bug，增加渐入效果』
- 2017.10.05 - 『添加 toc，默认开启，可在配置中关闭』
- 2017.09.30 - 『添加了 rss，修复了 placeholder 的 bug，更流畅』
- 2017.09.25 - 『可以直接添加 disqus，gitment 了』
- 2017.09.10 - 『添加了 about 页面』
- 2017.08.26 - 『添加了二次开发文档，文章页 header 在下滑时隐藏』
- 2017.08.17 - 『添加了置顶显示』
