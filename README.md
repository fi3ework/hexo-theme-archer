hexo-theme-Archer
================

## 说明

本主题受[yilia](https://github.com/litten/hexo-theme-yilia)主题和[huxpro](https://github.com/Huxpro/huxpro.github.io)主题的启发，结合了前者的sidebar设计及后者的UI设计完成，能够在不切换到archive页及tag的页的情况下通过侧边栏进行导航。

##  安装

``` shell
hexo init Blog 
cd Blog 
npm install
npm install hexo-generator-json-content --save
git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer
```

## 启用

修改Hexo根目录下的 `_config.yml` 的 `theme` 字段为 `archer`：

``` yaml
theme: archer
```

### 404页启用

在Hexo目录下加入`Hexo/source/404.md`文件，`layout`字段为`404`，`title`字段为标题，`description`字段为描述。

``` yaml
layout: 404
title: "[404]"
description: "May the Force be with you :&#41;"
```

### sidebar启用

在Hexo根目录下执行以下命令（同安装说明中的插件，若已安装可忽略）

```shell
npm install hexo-generator-json-content --save
```

然后需在**主题配置文件**中添加以下字段

```yaml
jsonContent:
  meta: false
  pages: false
  posts:
    title: true
    date: true
    path: true
    text: true
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
# ========== Profile ========== #
# ==========  侧边栏  ========== #
# avatar
# 头像路径
avatar:
# author name
# 博主名字，不填写该字段则默认采用博客配置文件中的author字段
author:
# signature
# 博客签名
signature:
# SNS
# 社交账号
social:
  # email:
  # github:
  # weibo:
  # zhihu:
  # facebook:
  # twitter:
  # instagram:
  # stack-overflow:
  # linkedin:
  # blog:
# friends
# 友链
friends:
  # friendA:
  # friendB:
  # friendC:

# ========== Site ========== #
# ========== 站点 ========== #
# title of the site
# title的标题，每篇文章后面也会加上此字段利于SEO
SEO_title:
# main title
# 网站显示在banner上的主标题
main_title:
# subtitle
# 网站显示在banner上的副标题
subtitle:
# header image
# 主页banner的背景图片
header_image:
# 404 image
# 404页的背景图片
_404_image:

# ========== Comment ========== #
# ========== 评论插件 ========== #
# 目前只支持一键添加livere评论（因为懒），其他评论插件可自行添加
comment:
  # change the value of livere to your livere data-uid
  # 将你的livere的uid填入以下字段
  livere:

# ========== Analytics ========== #
# ==========    统计   ========== #
# Busuanzi pv Analytics
# 是否开启不蒜子统计
busuanzi: false
# Baidu analytics
# 百度统计(填写siteID)
baidu_analytics:
# Google analytics
# Google统计(填写siteID)
google_analytics:
# CNZZ统计
# CNZZ_analytics:

# ========== Others ========== #
# favicon
favicon:
# truncate length (the default is 300)
# 首页的文章摘要字数(默认300)
truncate_length:
```
### 文章页banner图片配置

通过配置每篇文章的头部的`header_image`字段来修改，如果不填写将采用主题配置中的`post_header_image`字段，如果该字段未填写则采用`site_header_image`字段。

``` yaml
header_image: /assets/intro/post-bg.jpg
```

## License

MIT
