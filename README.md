hexo-theme-archer
================

![preview](./docs/snap.png)

## 在线预览(Online demo)

🎯 主题预览：[Demo](http://firework.studio/archer-demo/)。

## 文档

- [English document](./docs/README-en.md)


- [二次开发文档](./docs/develop-guide-zh.md)

##  更新

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
- 2018.03.04 - 『头图的高度可以自定义了，配置  _config 即可』
- 2018.03.11 - 『toc 可以根据阅读位置自动展开和收缩了』
- 2018.03.18 - 『添加 fancybox』
- 2018.05.01 - 『添加 license』
- 2018.05.24 - 『可自定义访问量统计/增加字数统计及阅读时间』
- 2018.06.04 - 『添加 Algolia 搜索，[详情](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)』
- 2018.06.23 - 『添加 Valine 评论，感谢 [hulichao](https://github.com/fi3ework/hexo-theme-archer/issues/115) 同学』
- 2018.07.09 - 『可以切换深/浅色代码配色方案了，[详情](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)』
- 2018.08.26 - 『添加 i18n 支持』

## 说明

- 本主题受 [yilia](https://github.com/litten/hexo-theme-yilia) 主题和 [huxpro](https://github.com/Huxpro/huxpro.github.io) 主题的启发，结合了前者的 sidebar 设计及后者的 UI 设计。通过 sidebar 能够不跳转到 archive 页、tag页及 categories 页进行导航。
- 兼容性：现代浏览器及 IE10+。
- 有任何使用上的问题欢迎 [**发起 issue**](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)。
- 本主题会持续维护及优化，欢迎 star 😆。

##  安装

1. 在**Hexo目录**下执行

``` shell
npm i hexo-generator-json-content --save && npm i --save hexo-wordcount && git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer --depth=1
```

2. 修改**Hexo目录**下的 `_config.yml` 的 `theme` 字段为 `archer`

``` yaml
theme: archer
```

3. 添加sidebar启用支持：

在**Hexo目录**下的 `_config.yml` 中添加以下字段（不是archer下的 `_config.yml`）

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


## 可选配置

- [启用 about 页](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8about%E9%A1%B5)
- [启用 404 页](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8404%E9%A1%B5)
- [启用 rss 订阅](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8rss)
- [自定义单独文章页头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E9%A1%B5%E5%A4%B4%E5%9B%BE)
- [将 Unsplash 的随机图片作为头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%B0%86-Unsplash-%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87%E4%BD%9C%E4%B8%BA%E5%A4%B4%E5%9B%BE)
- [自定义文章在首页的摘要](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E5%9C%A8%E9%A6%96%E9%A1%B5%E6%91%98%E8%A6%81)
- [自定义主题颜色](https://github.com/fi3ework/hexo-theme-archer/wiki/%E6%9B%B4%E6%94%B9%E4%B8%BB%E9%A2%98%E9%A2%9C%E8%89%B2)
- [切换代码配色方案](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%88%87%E6%8D%A2%E4%BB%A3%E7%A0%81%E9%85%8D%E8%89%B2%E6%96%B9%E6%A1%88)
- [置顶文章](https://www.jianshu.com/p/42a4efcdf8d7)
- [设置文章版权信息](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%AE%BE%E7%BD%AE%E6%96%87%E7%AB%A0%E7%89%88%E6%9D%83%E4%BF%A1%E6%81%AF)
- [启用站内搜索](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2)
- [启用 Latex](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Latex-%E6%94%AF%E6%8C%81)
- [切换为英文界面](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%8B%B1%E6%96%87%E7%95%8C%E9%9D%A2)

## 主题配置

```yaml
# ========== 资料栏 ========== #
# 头像路径
avatar:
# 博主名字，不填写该字段则默认采用 Hexo 配置文件中的 author 字段
author:
# 博客签名
signature:
# 社交账号(可以自定义顺序)
social:
  email:
  github:
  # wechat 和 qq 需要填写二维码图片的路径
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
# 友链
friends:
  friendA:
  friendB:
  friendC:
# about 页面
about:
  # 是否启用 about 页
  enable: true
  # about 页头图
  image:

# ========== 站点 ========== #
# 网站的 title，每篇文章后面也会加上此字段利于 SEO
SEO_title:
# 网站的关键字，有利于 SEO，每篇文章也可以在 Front-matter 添加特定的关键字
SEO_keywords:
# 显示在网站头图上的主标题
main_title: 
# 显示在网站头图上的副标题
subtitle:
# 主页头图
header_image:
# 文章页默认头图
post_header_image:
# 404 页头图
_404_image:

# ========== 搜索 ========== #
algolia_search:
  enable: false
  hits:
    per_page: 10 # 每页的结果数
  labels:
    input_placeholder: Search for Posts # 搜索栏 placeholder
    hits_empty: "We did not find any results for the search: ${query}" # 搜索结果提示
    hits_stats: "${hits} results found in ${time} ms" # 搜索无结果的提示
    
# ========== 评论插件 ========== #
# 目前支持直接添加 Livere，Disqus，Gitment，友言及 Valine，填写插件对应的字段即可启用。(推荐使用 Livere)
# 如果想添加其他评论插件，在 custom.ejs 中添加即可。
comment:
  # Livere 官网：https://livere.com/
  livere_uid:
  # Disqus 官网：https://disqus.com/
  disqus_shortname:
  # Gitment 官网：https://github.com/imsun/gitment
  gitment_owner:
  gitment_repo:
  gitment_client_id:
  gitment_client_secret:
  # 友言 官网: http://www.uyan.cc/
  youyan_uid:
  # Valine 官网: https://valine.js.org/
  valine_appId: 
  valine_appKey: 
  valine_placeHolder: 

# ========== 统计 ========== #
# 是否开启不蒜子阅读量统计
busuanzi: true
# 统计方式，填写 pv 或 uv
busuanzi_pv_or_uv: 'pv'
# 自定义统计标语，'${count}' 会自动替换成统计值
busuanzi_slug: 'PV: ${count} :)'
# 百度统计(填写 siteID)
baidu_analytics:
# Google统计(填写 siteID)
google_analytics:
# CNZZ统计
CNZZ_analytics:

# ========== 其他 ========== #
# 网站的标签页缩略图
favicon:
# 首页的文章摘要字数(默认300，填0则不显示摘要)
truncate_length:
# 开启文章右侧的大纲
toc: true
# 字数统计 & 阅读时间
reading_info: true
# 头图高度 (默认是屏幕高度的 50%, 可以直接输入其他数字)
index_intro_height: 50
post_intro_height: 50
about_intro_height: 50
```

## 更新主题

提供两种方法供参考：第一种使用 git 进行更新，但是有可能需要手动解决合并冲突，你需要手动解决；第二种简单粗暴。

### git pull

在 archer 目录下先执行 `git stash` 将本地的修改暂存，然后执行 `git pull` 获取主题的最新版本，再执行 `git stash pop` 将本地的修改还原，如果合并冲突报错 `CONFLICT`，可以参考 [这篇文章](http://www.01happy.com/git-resolve-conflicts/) 手动解决合并冲突，手动解决。

如果自定义了主题，在合并冲突时可以手动解决冲突的部分后，重新生成主题即可。

### 简单粗暴

首先备份 archer 下所有你自定义过的文件（包括 _config.yml 和 source 文件夹下添加的文件等），然后删除 archer，再重新安装，最后将备份的文件替换到原来的位置即可。

## License

MIT
