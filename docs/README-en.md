# hexo-theme-archer

![preview](./snap.png)

## Online demo

🎯 Preview theme：[Demo](http://firework.studio/archer-demo/)

## Document

- [Chinese document](../README.md)
- [Secondary develop guide](./develop-guide-en.md)

## Instruction

- This theme is inspired by theme [yilia](https://github.com/litten/hexo-theme-yilia) and theme [huxpro](https://github.com/Huxpro/huxpro.github.io), it combines the sidebar of the former and the UI design of latter. You can switch to archive, tag and categories via the navigation sidebar without jumpping to a new page.
- Compatibility：modern browsers and IE 10 +.
- You are welcomed to create a new [issue](<(https://github.com/fi3ework/hexo-theme-archer/issues)。>) if there is any problem when installling and using this theme.
- This theme will continue to be maintained and optimized, star it if you like it 😆.

## Install

1. Execute the following commands in **Hexo directory**.

```shell
npm i hexo-generator-json-content --save && npm i --save hexo-wordcount && git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer
```

2. Change the `theme` property to `archer` of `_config.yml` in **Hexo directory**.

```yaml
theme: archer
```

3. Add sidebar enable support:

Add following properties to the `_config.yml` in **Hexo directory** (not archer).

```yaml
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

## Optional config

- [switch to English](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%8B%B1%E6%96%87%E7%95%8C%E9%9D%A2)

- [enable about page](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8about%E9%A1%B5)
- [enable 404 page](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8404%E9%A1%B5)
- [enable rss](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8rss)
- [custom artical head image](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E9%A1%B5%E5%A4%B4%E5%9B%BE)
- [use random image from Unsplash to be header image](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%B0%86-Unsplash-%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87%E4%BD%9C%E4%B8%BA%E5%A4%B4%E5%9B%BE)
- [custom abstract on home page](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E5%9C%A8%E9%A6%96%E9%A1%B5%E6%91%98%E8%A6%81)
- [custom feature color](https://github.com/fi3ework/hexo-theme-archer/wiki/%E6%9B%B4%E6%94%B9%E4%B8%BB%E9%A2%98%E9%A2%9C%E8%89%B2)
- [switch code theme color](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)
- [stick artical to the top](https://www.jianshu.com/p/42a4efcdf8d7)
- [custom license of posts](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%AE%BE%E7%BD%AE%E6%96%87%E7%AB%A0%E7%89%88%E6%9D%83%E4%BF%A1%E6%81%AF)
- [enable search](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)
- [enbale Latex](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Latex-%E6%94%AF%E6%8C%81)

## Theme configuration

```yaml
# ========== Profile Column ========== #
# avatar path
avatar:
# author name (if this property is blank, by default using the author property in Hexo configuration)
author:
# signature of blog
signature:
# SNS (you can custom the order)
social:
  email:
  github:
  # wechat and qq should be a path of an qr-code image
  wechat:
  qq:
  telegram:
  weibo:
  zhihu:
  douban:
  facebook:
  twitter:
  instagram:
  stack-overflow:
  segmentFault:
  juejin:
  v2ex:
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
  # enable about page
  enable: true
  # about heade image
  image:

# ========== Site ========== #
# title of the site (each article will be followed by this value to help SEO)
SEO_title:
# keywords of the site, good for SEO, you also can add specified keyswords for each post at Front-matter
SEO_keywords:
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

# ========== Search ========== #
algolia_search:
  enable: false
  hits:
    per_page: 10 # result number per page
  labels:
    input_placeholder: Search for Posts # search input placeholder
    hits_empty: 'We did not find any results for the search: ${query}' # search results hint
    hits_stats: '${hits} results found in ${time} ms' # no results found hint

# ========== Comment Plugin ========== #
# Currently support directly adding Livere, Gitment, Youyan and Valine, fill the field to enable corresponding plugin
comment:
  # Livere：https://livere.com/
  livere_uid:
  # Disqus：https://disqus.com/
  disqus_shortname:
  # Gitment：https://github.com/imsun/gitment
  gitment_owner:
  gitment_repo:
  gitment_client_id:
  gitment_client_secret:
  # Youyan: http://www.uyan.cc/
  youyan_uid:
  # Valine: site: https://valine.js.org/
  valine_appId:
  valine_appKey:
  valine_placeHolder:

# ========== Analytics ========== #
# enable Busuanzi analytics
busuanzi: true
# fill in pv or uv
busuanzi_pv_or_uv: 'pv'
# custom analytic slogan, '${count}' is the analytic number, DO NOT modify it.
busuanzi_slug: 'PV: ${count} :)'
# Baidu analytics (fill in siteID)
baidu_analytics:
# Google analytics (fill in siteID)
google_analytics:
# CNZZ analytics
CNZZ_analytics:

# ========== Others ========== #
# favicon
favicon:
# truncate length of abstracts in index page (the default is 300, there will be no abstruct if you set it to 0)
truncate_length:
# enable toc
toc: true
# word count & reading time
reading_info: true
# intro height (the default is 50 percents of the screen, you can input other number)
index_intro_height: 50
post_intro_height: 50
about_intro_height: 50
```

## Update theme

Two kind of update method are provided here: the first use git to update theme. However, it may encounter merge conflict that you need to resolve; The second is simple but efficient.

### git pull

Run `git stash` under archer folder to stash the local modification and run `git pull` to fetch the lastest version of theme. Then run `git stash pop` to restore the local modification. There may be a merge conflict that you need to resolve.

### simple but efficient way

First backup all the files that you customed and added (include \_config.yml and files in source and so on) and delete the directory of archer. Then reinstall archer. At last, restore the backup files to the original place they belong.

## License

MIT
