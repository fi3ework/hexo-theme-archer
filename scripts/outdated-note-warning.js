// from: https://hexo.fluid-dev.com/posts/hexo-injector/#%E6%96%87%E7%AB%A0%E6%97%B6%E6%95%88%E6%80%A7%E6%8F%90%E7%A4%BA
hexo.extend.injector.register('body_end', `
  <script>
  (function(){
    var time = document.getElementsByClassName('post-intro-time')[0]
    if (time === undefined) { return; }
    var post = document.getElementsByTagName("article")[0]
    if (post === undefined) { return; }

    var pubTime = new Date(time.innerText)
    var now = Date.now()
    var interval = parseInt(now - pubTime)
    var days = parseInt(interval / 86400000)
    post.innerHTML = '<div class="note note-warning" style="font-size:0.9rem"><p>' +
      '<div class="title">文章时效性提示</div><p>这是一篇发布于 ' + days + ' 天前的文章，部分信息可能已发生改变，请注意甄别。' +
      '</p></p></div>' + post.innerHTML;

  })();
  </script>
` , 'post');
