hexo-theme-archer
================

![preview](./snap.png)

## Online demo

[Demo](http://firework.studio/archer-demo/)

## Instruction

- Click [my blog](http://firework.studio) to preview theme online.
- This theme is inspired by theme [yilia](https://github.com/litten/hexo-theme-yilia) and theme [huxpro](https://github.com/Huxpro/huxpro.github.io), it combines the sidebar of the former and the UI design of latter. You can switch to archive and tag via the navigation sidebar without jumpping to a new page.
- You can create a new issue, or comment on article 「hexo-theme-archer」 in [my blog](http://firework.studio). 
- Compatibility：modern browsers and IE 10 +.

##  Install

Execute the following commands in **Hexo directory**.

``` shell
npm install hexo-generator-json-content --save
git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer
```

## Enable

Change the `theme` property to `archer` of `_config.yml` in **Hexo directory**.

``` yaml
theme: archer
```

### Enable 404 page

Add a new file `/source/404.md` to **Hexo source directory**. The `layout` property should be `404`, the `title` property is custom title，`description` property is custom description.

``` yaml
layout: 404
title: "[404]"
description: "May the Force be with you :&#41;"
```

### Enable sidebar

1. Execute the following commands in the ***Hexo directory*** (if you have done this in install step, you can skip this substep)

```shell
npm install hexo-generator-json-content --save
```

2. Then add the following config to  ***Hexo configuration file (not the configuration file of archer)***.

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

## Configuration

```yaml
# ========== Profile Column ========== #
# avatar path
avatar:
# author name (if this property is not filled, by default using the author property in Hexo configuration)
author:
# signature of blog
signature:
# SNS
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
# friends link
friends:
  friendA:
  friendB:
  friendC:
# about
about:
  enable: true
  image:
  
# ========== Site ========== #
# title of the site (each article will be followed by this filed to help SEO)
SEO_title:
# main title (title in site banner)
main_title:
# subtitle (subtitle in site banner)
subtitle:
# header image (image of site banner)
header_image:
# default post header image
post_header_image:
# 404 page header image
_404_image:

# ========== Comment Plugin ========== #
# Currently only supports one click to add livere comments, you can add other comment plugin before </main> in post.ejs
comment:
  # livere：https://livere.com/
  livere_uid:
  # disqus：https://disqus.com/
  disqus_shortname:
  # 畅言：http://changyan.kuaizhan.com/
  changyan_appid:
  changyan_conf:
  # gitment：https://github.com/imsun/gitment
  gitment_owner:
  gitment_repo:
  gitment_client_id:
  gitment_client_secret:
  # youyan: http://www.uyan.cc/
  youyan_uid:

# ========== Analytics ========== #
# enable Busuanzi pv Analytics
busuanzi: false
# Baidu analytics (fill in siteID)
baidu_analytics:
# Google analytics (fill in siteID)
google_analytics:
# CNZZ analytics
CNZZ_analytics:

# ========== Others ========== #
# favicon
favicon:
# truncate length of abstracts in index page(the default is 300)
truncate_length:
# enable toc
toc: true
```
### Post page banner image configuration

By modifying the `header_image` property of the header of each article, if you do not fill in the post configuration, the `post_header_image` property in theme configuration will be used , if `post_header_image` is not filled, the `site_header_image` field will be used.

``` yaml
header_image: /intro/post-bg.jpg
```

## License

MIT
