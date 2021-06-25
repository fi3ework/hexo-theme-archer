# hexo-theme-archer

![preview](./docs/snap.png)

## 在线预览

🎯 主题预览：[Demo](https://fi3ework.github.io/archer-demo)。

## 文档

- [English document](./docs/README-en.md)
- [二次开发文档](./docs/develop-guide-zh.md)

## 说明

由于作者精力有限，无法保证此主题继续维护，欢迎您 Fork 👋🏻 本仓库或[申请成为维护者 👩‍🔧](https://github.com/fi3ework/hexo-theme-archer/issues/256)。

- 本主题受 [yilia](https://github.com/litten/hexo-theme-yilia) 主题和 [huxpro](https://github.com/Huxpro/huxpro.github.io) 主题的启发，结合了前者的 sidebar 设计及后者的 UI 设计。通过 sidebar 能够快速执行 archive, tag 以及 categories 导航。
- 兼容性：现代浏览器及 IE10+。
- 有任何使用上的问题欢迎 [**发起 issue**](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)。

## 安装主题

### 安装依赖，拉取 Archer 主题文件

在 Hexo 根目录下执行以下命令：
  
``` bash
npm i hexo-generator-json-content --save && npm i --save hexo-wordcount && git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer --depth=1
```

现在，Archer 主题已经顺利拉取到 `themes/archer` 目录下。

### 设置 Hexo 主题为 Archer

修改 Hexo 根目录下的 `_config.yml` 文件中的 `theme` 字段为 `archer`：

``` yaml
theme: archer
```

### 启用 Archer 侧边栏

在 Hexo 根目录下的 `_config.yml` 中添加以下字段：

``` yaml
jsonContent:
  meta: true
  pages: false
  posts:
    title: true
    date: true
    path: true
    text: false
    raw: false
    content: false
    slug: false
    updated: false
    comments: false
    link: false
    permalink: true
    excerpt: false
    categories: true
    tags: true
```

## 主题配置

现在您的博客项目的目录目录结构应当如下：

``` bash
. # Hexo 根目录
├── themes
│   └── archer # Archer 主题目录
│       └── _config.yml # Archer 主题配置文件
│
└── _config.yml # Hexo 配置文件
```

如果 Hexo 版本 >= 5.0.0，建议首先复制 Archer 主题目录下的 [`_config.yml`](./_config.yml) 到 Hexo 根目录，并命名为 `_config.archer.yml`。接下来修改 Hexo 根目录下的这个 `_config.archer.yml` 文件即可对主题进行配置。

如果 Hexo 版本 >= 2.8.2，修改 Archer 主题目录下的 [`_config.yml`](./_config.yml) 文件即可对主题进行配置。

如果 Hexo 版本 < 2.8.2，请参考 Archer 主题目录下的 [`_config.yml`](./_config.yml) 中的配置，在 Hexo 根目录下的 `_config.yml` 添加相应字段即可进行配置。请注意不要添加重复字段。

您可以在 Hexo 根目录下的 `package.json` 查看您当前使用的 Hexo 版本。

这个[维基页面](https://github.com/fi3ework/hexo-theme-archer/wiki/Archer-%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E4%B8%AD%E6%96%87%E5%8F%82%E8%80%83)包含了主题配置属性的中文参考。

**警告**：不要把自己 api-token 之类的私密信息添加到配置中，更不要推送到公共仓库。

### 可选配置

- [启用 about 页](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8about%E9%A1%B5)
- [启用 404 页](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8404%E9%A1%B5)
- [启用 rss 订阅](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8rss)
- [自定义单独文章页头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E9%A1%B5%E5%A4%B4%E5%9B%BE)
- [将 Unsplash 的随机图片作为头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%B0%86-Unsplash-%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87%E4%BD%9C%E4%B8%BA%E5%A4%B4%E5%9B%BE)
- [自定义文章在首页的摘要](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E5%9C%A8%E9%A6%96%E9%A1%B5%E7%9A%84%E6%91%98%E8%A6%81)
- [自定义主题颜色](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98%E9%A2%9C%E8%89%B2)
- [切换代码配色方案](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)
- [置顶文章](https://www.jianshu.com/p/42a4efcdf8d7)
- [设置文章版权信息](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%AE%BE%E7%BD%AE%E6%96%87%E7%AB%A0%E7%89%88%E6%9D%83%E4%BF%A1%E6%81%AF)
- [启用站内搜索](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)
- [启用 Latex 支持](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Latex-%E6%94%AF%E6%8C%81)
- [切换为英文界面](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%8B%B1%E6%96%87%E7%95%8C%E9%9D%A2)

## 更新主题

提供两种方法供参考：

- 使用 `git` 命令进行更新，但是可能需要手动合并代码，解决冲突；
- 备份重要文件后重新克隆，简单粗暴。

### 使用 `git` 命令

在 Archer 主题目录下先执行 `git stash` 将本地的修改暂存，然后执行 `git pull` 获取主题的最新版本，再执行 `git stash pop` 将本地的修改还原，如果合并冲突报错 `CONFLICT`，可以参考[这篇文章](http://www.01happy.com/git-resolve-conflicts/)手动解决合并冲突，手动解决。

如果自定义了主题，在合并冲突时可以手动解决冲突的部分后，重新生成主题即可。

### 重新克隆主题

首先备份 Archer 主题目录下所有您自定义过的文件（包括 `_config.yml` 和 `source` 文件夹下添加的文件等），然后删除 Archer 主题目录目录，再重新安装，最后将备份的文件替换到原来的位置即可。

## 更新日志

- 2017.08.17 - 『添加了置顶显示』
- 2017.08.26 - 『添加了二次开发文档，文章页 header 在下滑时隐藏』
- 2017.09.10 - 『添加了 about 页面』
- 2017.09.25 - 『可以直接添加 disqus，gitment 了』
- 2017.09.30 - 『添加了 rss，修复了 placeholder 的 bug，更流畅』
- 2017.10.05 - 『添加 toc，默认开启，可在配置中关闭』
- 2017.10.16 - 『修复移动端 bug，增加渐入效果』
- 2017.12.17 - 『增加阅读进度条，在 post 页的顶部』
- 2017.12.27 - 『增加~~百度分享和~~页面浏览量统计』
- 2018.02.04 - 『代码重构，性能优化，样式更新，V1.0.0』
- 2018.02.24 - 『支持显示微信和 QQ 二维码』
- 2018.02.28 - 『重写分享功能，分享按钮在头图上』
- 2018.03.04 - 『头图的高度可以自定义了，配置 \_config 即可』
- 2018.03.11 - 『toc 可以根据阅读位置自动展开和收缩了』
- 2018.03.18 - 『添加 fancybox』
- 2018.05.01 - 『添加 license』
- 2018.05.24 - 『可自定义访问量统计/增加字数统计及阅读时间』
- 2018.06.04 - 『添加 Algolia 搜索，[详情](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)』
- 2018.06.23 - 『添加 Valine 评论，感谢 [hulichao](https://github.com/fi3ework/hexo-theme-archer/issues/115) 同学』
- 2018.07.09 - 『可以切换深/浅色代码配色方案了，[详情](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)』
- 2018.08.26 - 『添加 i18n 支持』
- 2020.03.02 - 『添加 Gitalk评论 支持』
- 2020.03.04 - 『添加 utteranc评论 支持』
- 2021.01.26 - 『更新使用的 nodejs，以及相关依赖包的版本』
- 2021.02.03 - 『添加“文章时效性”提示』

## 许可证

MIT
