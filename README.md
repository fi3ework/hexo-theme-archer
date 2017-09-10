hexo-theme-archer
================

![preview](./docs/snap.png)

## 在线预览( Online preview)

在线预览主题：[Demo](http://firework.studio)。

## 文档

- [Document in English](./docs/README-en.md)

## 开发

- [二次开发文档](./docs/develop-guide.md)

##  更新

- 2017.08.17 - 『增加了置顶显示，开启置顶的方法[参照此文章](http://xxxsss.me/2017/04/22/hexo-pagination/)』
- 2017.08.26 - 『添加了二次开发文档，文章页header在下滑时隐藏』
- 2017.09.10 - 『增加了about页面』

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

## 启用

修改**Hexo目录**下的 `_config.yml` 的 `theme` 字段为 `archer`：

``` yaml
theme: archer
```

### 404页启用

在**Hexo资源目录**下加入`/source/404.md`文件，`layout`字段须为`404`，`title`字段为自定义标题，`description`字段为自定义描述。

``` yaml
layout: 404
title: "[404]"
description: "May the Force be with you :&#41;"
```

### about页启用

在**hexo**目录下执行

```shell
hexo new page "about"
```

在`source/about/index.md`中添加字段`layout: about`，`title`字段修改为about页的标题，正文为about页的内容。

在_**Hexo配置文件**_中添加以下字段，`enable`字段控制是否开启about，`image`字段内容为about页的banner图像地址，不填写则默认使用首页banner图像。

```yaml
about:
  enable: true
  image: '/intro/about-page.jpg'
```

about页的入口在首页的侧边栏中。

### sidebar启用

1. 在_**Hexo目录**_下执行以下命令（同安装说明中的插件，若已安装可跳过此步骤）

```shell
npm install hexo-generator-json-content --save
```

2. 然后需在_**Hexo配置文件**_中添加以下字段**（不是archer的主题配置文件）**

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
# 目前只支持一键添加livere评论（因为懒），其他评论插件可自行添加在post.ejs模板中的</main>标签前。
comment:
  # 将你的livere的uid填入以下字段
  livere:

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
```
### 文章页banner图片配置

通过配置每篇文章的头部的`header_image`字段来修改，如果不填写将采用主题配置中的`post_header_image`字段，如果`post_header_image`字段未填写则采用`site_header_image`字段。

``` yaml
header_image: /intro/post-bg.jpg
```

## License

MIT
