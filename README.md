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
- 2017.08.26 - 『添加了二次开发文档，文章页header在下滑时隐藏』
- 2017.09.10 - 『添加了about页面』
- 2017.09.25 - 『可以直接添加disqus，gitment及畅言了』
- 2017.09.30 - 『添加了rss，修复了placeholder的bug，更流畅』
- 2017.10.05 - 『添加toc，默认开启，可在配置中关闭』
- 2017.10.16 - 『修复移动端bug，增加渐入效果』
- 2017.12.17 - 『增加阅读进度条，在post页的顶部』
- 2017.12.27 - 『增加~~百度分享和~~页面浏览量统计』
- 2018.02.04 - 『代码重构，性能优化，样式更新，V1.0.0』
- 2018.02.24 - 『支持显示微信和QQ二维码』
- 2018.02.28 - 『重写分享功能，分享按钮在头图上』
- 2018.03.04 - 『头图的高度可以自定义了，配置 _config 即可』
- 2018.03.11 - 『toc可以根据阅读位置自动展开和收缩了』
- 2018.03.18 - 『添加fancybox』

## 说明

- 本主题受[yilia](https://github.com/litten/hexo-theme-yilia)主题和[huxpro](https://github.com/Huxpro/huxpro.github.io)主题的启发，结合了前者的sidebar设计及后者的UI设计。通过sidebar能够不跳转到archive页、tag页及**categories页**进行导航。
- 兼容性：现代浏览器及IE10+。
- 有任何使用上的问题欢迎[**发起issue**](https://github.com/fi3ework/hexo-theme-archer/issues)。
- 本主题会持续维护及优化，欢迎star 😆。

##  安装

1. 在**Hexo目录**下执行

``` shell
npm install hexo-generator-json-content --save && git clone https://github.com/fi3ework/hexo-theme-archer.git themes/archer
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

- [启用about页](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8about%E9%A1%B5)
- [启用404页](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8404%E9%A1%B5)
- [启用rss订阅](https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8rss)
- [自定义单独文章页头图](https://github.com/fi3ework/hexo-theme-archer/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E7%AB%A0%E9%A1%B5%E5%A4%B4%E5%9B%BE)
- [自定义主题颜色](https://github.com/fi3ework/hexo-theme-archer/wiki/%E6%9B%B4%E6%94%B9%E4%B8%BB%E9%A2%98%E9%A2%9C%E8%89%B2)
- [置顶文章](http://xxxsss.me/2017/04/22/hexo-pagination/)

## 主题配置

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
  # wechat 和 qq 需要填写二维码图片的路径
  wechat:
  qq:
  weibo:
  zhihu:
  douban:
  facebook:
  twitter:
  instagram:
  stack-overflow:
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
# about页面
about:
  # 是否启用about页
  enable: true
  # about页头图
  image:

# ========== 站点 ========== #
# 网站的title，每篇文章后面也会加上此字段利于SEO
SEO_title:
# 显示在网站头图上的主标题
main_title: 
# 显示在网站头图上的副标题
subtitle:
# 主页头图
header_image:
# 文章页默认头图
post_header_image:
# 404页头图
_404_image:

# ========== 评论插件 ========== #
# 目前支持直接添加Livere，Disqus，Gitment，畅言及友言，填写插件对应的字段即可启用。
# 如果想添加其他评论插件，在custom.ejs中添加即可。
comment:
  # Livere 官网：https://livere.com/
  livere_uid:
  # Disqus 官网：https://disqus.com/
  disqus_shortname:
  # 畅言 官网：http://changyan.kuaizhan.com/
  changyan_appid:
  changyan_conf:
  # Gitment 官网：https://github.com/imsun/gitment
  gitment_owner:
  gitment_repo:
  gitment_client_id:
  gitment_client_secret:
  # 友言 官网: http://www.uyan.cc/
  youyan_uid:

# ========== 统计 ========== #
# 是否开启不蒜子阅读量统计
busuanzi: true
# 百度统计(填写siteID)
baidu_analytics:
# Google统计(填写siteID)
google_analytics:
# CNZZ统计
CNZZ_analytics:

# ========== 其他 ========== #
# favicon
favicon:
# 首页的文章摘要字数(默认300，填0则不显示摘要)
truncate_length:
# enable toc
toc: true
# intro height (默认是屏幕高度的50%, 可以直接输入其他数字)
index_intro_height: 50
post_intro_height: 50
about_intro_height: 50
```

## License

MIT
