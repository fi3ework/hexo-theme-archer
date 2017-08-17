hexo-theme-archer
================

![preview](./docs/snap.png)

## 文档

- [Document](./docs/README-en.md)

## 说明

- 可通过[我的博客](http://firework.studio)在线预览主题。
- 本主题受[yilia](https://github.com/litten/hexo-theme-yilia)主题和[huxpro](https://github.com/Huxpro/huxpro.github.io)主题的启发，结合前者的sidebar设计及后者的UI设计完成，能够在不跳转到archive页及tag页的前提下通过sidebar进行导航。
- 如果有任何问题可以发起issue，或在[我的博客](http://firework.studio)的文章「hexo-theme-archer」中留言:) 。
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

### sidebar启用

1. 在***Hexo目录***下执行以下命令（同安装说明中的插件，若已安装可跳过此步骤）

```shell
npm install hexo-generator-json-content --save
```

2. 然后需在***Hexo配置文件***中添加以下字段**（不是archer的主题配置文件）**

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
