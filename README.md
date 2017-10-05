hexo-theme-archer
================

![preview](./docs/snap.png)

## 在线预览( Online Demo)

在线预览主题：[Demo](http://firework.studio)。

## 文档

- [Document in English](./docs/README-en.md)

## 开发

- [二次开发文档](./docs/develop-guide.md)

##  更新

- 2017.08.17 - 『添加了置顶显示，开启置顶的方法[参照此文章](http://xxxsss.me/2017/04/22/hexo-pagination/)』
- 2017.08.26 - 『添加了二次开发文档，文章页header在下滑时隐藏』
- 2017.09.10 - 『添加了about页面』
- 2017.09.25 - 『可以直接添加disqus，gitment及畅言了』
- 2017.09.30 - 『添加了rss，修复了placeholder的bug，更流畅』
- 2017.10.05 - 『添加toc，默认开启，可在配置中关闭』

## 说明

- 本主题受[yilia](https://github.com/litten/hexo-theme-yilia)主题和[huxpro](https://github.com/Huxpro/huxpro.github.io)主题的启发，结合前者的sidebar设计及后者的UI设计完成，能够在不跳转到archive页及tag页的前提下通过sidebar进行导航。
- 如果有任何问题可以**发起issue**，或在[我的博客](http://firework.studio)的文章「hexo-theme-archer」中留言:) 。
- 兼容性：现代浏览器及IE10+。

##  安装

在**Hexo目录**下执行

``` shell
npm install hexo-generator-json-content --save
git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer
```

## 启用配置

修改**Hexo目录**下的 `_config.yml` 的 `theme` 字段为 `archer`：

``` yaml
theme: archer
```

### 启用sidebar

1. 在**Hexo目录**下执行以下命令（同安装说明中的插件，若已安装可跳过此步骤）

```shell
npm install hexo-generator-json-content --save
```

2. 然后需在**Hexo配置文件**中添加以下字段（不是archer的主题配置文件）

```yaml
jsonContent:
  meta: false
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
    permalink: false
    excerpt: false
    categories: false
    tags: true
```

### 启用404页

在**Hexo资源目录**下加入`/source/404.md`文件，`layout`字段须为`404`，`title`字段为自定义标题，`description`字段为自定义描述。

``` yaml
layout: 404
title: "[404]"
description: "May the Force be with you :&#41;"
```

### 启用about页

在**hexo**目录下执行

```shell
hexo new page "about"
```

在`source/about/index.md`中添加字段`layout: about`，`title`字段修改为about页的标题，正文为about页的内容。

在**Hexo配置文件**中添加以下字段，`enable`字段控制是否开启about，`image`字段内容为about页的banner图像地址，不填写则默认使用首页banner图像。

```yaml
about:
  enable: true
  image: '/intro/about-page.jpg'
```

about页的入口在首页的侧边栏中。

### 启用rss

在**hexo**目录下执行

```shell
npm install hexo-generator-feed --save
```

在`social`字段中添加`rss: /atom.xml`，侧边栏会出现rss。

## 配置

```yaml
# ========== 资料栏 ========== #
# 头像路径
avatar:
# 博主名字，不填写该字段则默认采用Hexo配置文件中的author字段
author:
# 博客签名
signature:
# 社交账号
social:
  email:
  github:
  weibo:
  zhihu:
  facebook:
  twitter:
  instagram:
  stack-overflow:
  linkedin:
  blog:
  others:
  rss: /atom.xml
# 友链
friends:
  friendA:
  friendB:
  friendC:
# about页面
about:
  enable: true
  image:

# ========== 站点 ========== #
# 网站的title，每篇文章后面也会加上此字段利于SEO
SEO_title:
# 显示在网站banner上的主标题
main_title: 
# 显示在网站banner上的副标题
subtitle:
# 主页banner的背景图片
header_image:
# 文章页的默认背景图片
post_header_image:
# 404页的背景图片
_404_image:


# ========== 评论插件 ========== #
# 目前支持直接添加LiveRe，Disqus，Gitment和畅言，填写插件对应的字段即可启用。
# 如果想添加其他评论插件，在custom.ejs中添加即可。
comment:
  # livere 官网：https://livere.com/
  livere_uid:
  # disqus 官网：https://disqus.com/
  disqus_shortname:
  # 畅言 官网：http://changyan.kuaizhan.com/
  changyan_appid:
  changyan_conf:
  # gitment 官网：https://github.com/imsun/gitment
  gitment_owner:
  gitment_repo:
  gitment_client_id:
  gitment_client_secret:

# ========== 统计 ========== #
# 是否开启不蒜子统计
busuanzi: false
# 百度统计(填写siteID)
baidu_analytics:
# Google统计(填写siteID)
google_analytics:
# CNZZ统计
CNZZ_analytics:

# ========== 其他 ========== #
# favicon
favicon:
# 首页的文章摘要字数(默认300)
truncate_length:
# enable toc
toc: true
```
### 文章页banner图片配置

通过配置每篇文章的头部的`header_image`字段来修改，如果不填写将采用主题配置中的`post_header_image`字段，如果`post_header_image`字段未填写则采用`site_header_image`字段。

``` yaml
header_image: /intro/post-bg.jpg
```

## License

MIT
