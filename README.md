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
- 有任何使用上的问题欢迎 **发起 issue**。

## 安装主题

### 安装主题依赖

Archer 主题依赖于 `hexo-generator-json-content` 和 `hexo-wordcount`，因此需要在 Hexo 根目录执行以下命令：
  
``` bash
npm install hexo-generator-json-content --save
npm install hexo-wordcount --save
```

### 拉取主题文件

依赖安装完成后，拉取 Archer 主题到 `themes/archer` 目录，在 Hexo 根目录执行下面的命令：

``` bash
git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer --depth=1
```

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

### 启动本地预览

在 Hexo 根目录下执行 `hexo s`，即可启动本地预览。

## 主题配置

现在您的项目目录结构应当如下所示：

``` bash
. # 「Hexo 根目录」
├── themes
│   └── archer # 「Archer 主题目录」
│       └── _config.yml # Archer 主题配置文件
│
└── _config.yml # Hexo 配置文件
```

您可以通过 `hexo -v` 命令，或在 Hexo 根目录下的 `package.json` 中查看您当前使用的 Hexo 版本。

如果 Hexo 版本 >= 5.0.0，建议复制 Archer 主题目录下的 [`_config.yml`](./_config.yml) 到 Hexo 根目录，并命名为 `_config.archer.yml`，接下来修改此文件即可对主题进行配置。现在，您可以删除 Archer 主题目录下的 `_config.yml` 文件，避免配置合并或冲突。

如果 Hexo 版本 >= 2.8.2，修改 Archer 主题目录下的 `_config.yml` 文件即可对主题进行配置。

如果 Hexo 版本 < 2.8.2，请参考 Archer 主题目录下的 `_config.yml` 中的配置，在 Hexo 根目录下的 `_config.yml` 添加相应字段即可进行配置。

上面三种情况的 Archer 主题配置文件 `_config.archer.yml` 或 `_config.yml`，为了与 Hexo 根目录下的全局配置文件 `_config.yml` 作区分，在后面的介绍中统称为「Archer 主题目录下的 `_config.yml`」。

这个[维基页面](https://github.com/fi3ework/hexo-theme-archer/wiki/Archer-%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E4%B8%AD%E6%96%87%E5%8F%82%E8%80%83)包含了主题配置属性的中文参考。

**警告**：不要把自己 api-token 之类的私密信息添加到配置中，更不要推送到公共仓库。

可选的 Archer 主题配置内容如下：

- [配置 About 页面](#配置-about-页面)
- [配置 404 页面](#配置-404-页面)
- [启用 RSS 订阅](#启用-rss-订阅)
- [启用 Mermaid](#启用-mermaid)
- [启用 LaTeX 数学公式](#启用-latex-数学公式)
- [自定义单独文章页头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E9%A1%B5%E5%A4%B4%E5%9B%BE)
- [将 Unsplash 的随机图片作为头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%B0%86-Unsplash-%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87%E4%BD%9C%E4%B8%BA%E5%A4%B4%E5%9B%BE)
- [自定义文章在首页的摘要](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E5%9C%A8%E9%A6%96%E9%A1%B5%E7%9A%84%E6%91%98%E8%A6%81)
- [自定义主题颜色](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98%E9%A2%9C%E8%89%B2)
- [切换代码配色方案](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)
- [设置文章版权信息](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%AE%BE%E7%BD%AE%E6%96%87%E7%AB%A0%E7%89%88%E6%9D%83%E4%BF%A1%E6%81%AF)
- [启用 Algolia 搜索](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)
- [切换为英文界面](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%8B%B1%E6%96%87%E7%95%8C%E9%9D%A2)

### 配置 About 页面

在 Hexo 根目录下执行：

``` bash
hexo new page "about"
```

在 Hexo 根目录下 `source/about/index.md` 文件中添加下面的字段：

``` markdown
---
title: 自我介绍标题
layout: about
---
自我介绍正文
```

其中 Front-matter 的 `layout: about` 字段为**必要的**且**不可修改**为其它值；Front-matter 的 `title` 和正文内容由您自定义编写。

您可以修改 Archer 主题目录下的 `_config.yml` 文件的 `about` 字段：

``` yml
about:
  enable: true
  image: '/intro/about-page.jpg'
```

其中，如果设置 `enable: false`，则不显示 About 页面；`image` 为 About 页面 Banner 图像地址，若不填写则默认使用首页的 Banner 图像。

### 配置 404 页面

在 Hexo 根目录下 `source` 中创建 `404.md` 文件，添加字段如下：

``` markdown
---
layout: 404
title: "[404]"
description: "May the Force be with you :&#41;"
---
```

其中 Front-matter 的 `layout: 404` 字段为**必要的**且**不可修改**为其它值，`title` 字段为您自定义的标题，`description` 字段为 404 页面的自定义描述。

您可以配置 Archer 主题目录下的 `_config.yml` 文件的 `_404_image` 字段来修改 404 页面的背景图片：

``` yml
_404_image: '/intro/404-bg.jpg'
```

### 启用 RSS 订阅

在 Hexo 根目录下执行：

``` bash
npm install hexo-generator-feed --save
```

修改 Archer 主题目录下的 `_config.yml` 文件中的 `social` 字段，配置内容如下：

```yml
social:
  rss: /atom.xml
```

### 启用 Mermaid

[Mermaid](https://github.com/mermaid-js/mermaid) 是一款基于 JavaScript 的流程图和图表工具，它使用 Markdown 定义并渲染各种图表，帮助构建软件工程或各类技术文档。

为了启用 Mermaid，您需要首先在 Hexo 根目录下安装 [`hexo-filter-mermaid-diagrams`](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams) 依赖：

``` bash
npm install hexo-filter-mermaid-diagrams --save
```

然后在 Archer 主题目录下的 `_config.yml` 设置以启用 Mermaid：

``` yml
mermaid:
  enable: true
  version: 8.11.0
  theme: dark
```

测试 Mermaid 是否启用成功，您可以在任意文章中添加下面的内容（您需要取消缩进）：

``` markdown
    ``` mermaid
    graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
    ```
```

> ❗️❗️❗️ 注意：如果您需要使用**类图**，请编辑您 Hexo 根目录下的 `_config.yml` 文件，设置 `external_link: false`。请确保这个设置对您原来的页面功能没有影响，这是 Hexo 本身的 bug。

## 启用 LaTeX 数学公式

这个[维基页面](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Latex-%E6%94%AF%E6%8C%81)包含启用 LaTeX 数学公式支持的完整介绍。

Archer 主题已经内置了 MathJax，但是您需要**替换 Hexo 默认的 Markdown 渲染引擎**来支持解析 LaTeX 数学公式语法。此示例中将替换为 [`hexo-renderer-pandoc`](https://github.com/wzpan/hexo-renderer-pandoc)。

请留意：替换渲染引擎可能会带来编写上的区别，或导致一些潜在的问题。

首先，确保系统中已经[安装](https://pandoc.org/installing.html)了 `pandoc`，版本不低于 2.0。

在 Hexo 根目录下执行下面的命令：

``` bash
# 卸载默认的渲染引擎
npm uninstall hexo-renderer-marked --save
# 安装 hexo-renderer-pandoc
npm install hexo-renderer-pandoc --save
```

在 Archer 主题目录下的 `_config.yml` 设置以启用 LaTeX 数学公式：

``` yml
math:
  mathjax:
    enable: true
    version: 3.2.0
```

Archer 默认不启用 MathJax 渲染 LaTeX 数学公式，因此需要在文章的 Front-matter 中添加 `mathjax: true` 字段。

测试是否启用成功，您可以在这篇文章中添加下面的内容：

``` markdown
\begin{equation}
\left\{
\begin{array}{lr}
x=\dfrac{3\pi}{2}(1+2t)\cos(\dfrac{3\pi}{2}(1+2t)), & \\
y=s, & 0 \leq s \leq L,|t| \leq1. \\
z=\dfrac{3\pi}{2}(1+2t)\sin(\dfrac{3\pi}{2}(1+2t)), &  
\end{array}
\right.
\end{equation}
```

## 文章撰写增强

Archer 主题为您撰写的文章提供了一些增强的展示内容，这需要您手动在文章的 Front-matter 处配置。包括如下：

- [置顶文章](#置顶文章)
- [隐藏文章目录](#隐藏文章目录)

### 置顶文章

Archer 主题在主页为置顶的文章显示一个小标记。

在默认情况下，Hexo 使用 [`hexo-generator-index`](https://github.com/hexojs/hexo-generator-index) 生成文章索引。假如您需要置顶某篇文章，只需要在它的 Front-matter 处添加 `sticky` 属性即可：

```md
---
title: Hello World
date: 2013/7/13 20:46:25
sticky: 100
---
```

您可以在 Hexo 根目录下的 `package.json` 文件中找到您是否使用 `hexo-generator-index` 插件作为项目依赖。

假如您使用其它的插件生成索引，也可以手动添加 `top` 属性以显示小标记：

```md
---
title: Hello World
date: 2013/7/13 20:46:25
top: true
---
```

### 隐藏文章目录

在默认情况下，使用宽屏幕阅读文章时，会在文章右侧显示其目录信息。

您可以通过配置 Archer 主题目录下的 `_config.yml` 以**全局**关闭文章目录：

```yml
toc: false
```

或者，您也可以指定某些文章不显示目录。只需要在文章的 Front-matter 部分设置 `toc` 属性即可：

```md
---
title: Hello World
date: 2013/7/13 20:46:25
toc: false
---
```

## 更新主题

提供两种方法供参考：

- 使用 `git` 命令进行更新，但是可能需要手动合并代码，解决冲突；
- 备份重要文件后重新克隆，简单粗暴。

### 使用 `git` 命令

在 Archer 主题目录下先执行 `git stash` 将本地的修改暂存，然后执行 `git pull` 获取主题的最新版本，再执行 `git stash pop` 将本地的修改还原，如果合并冲突报错 `CONFLICT`，手动合并解决冲突即可。

如果自定义了主题，解决冲突后，执行 `npm run build` 重新生成主题即可。

### 重新克隆主题

首先备份 Archer 主题目录下所有您自定义过的文件（包括 `_config.yml` 和 `source` 文件夹下添加的文件等），然后删除 Archer 主题目录，再重新安装，最后将备份的文件替换到原来的位置即可。

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
