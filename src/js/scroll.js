import archerUtil from './util'

let scroll = function () {
  let $banner = $('.banner:first'),
    $postBanner = $banner.find('.post-title a'),
    $bgEle = $('.site-intro:first'),
    $homeLink = $('.home-link:first'),
    $backTop = $('.back-top:first'),
    $sidebarMenu = $('.header-sidebar-menu:first'),
    bgTitleHeight = $bgEle.offset().top + $bgEle.outerHeight(),
    $tocWrapper = $('.toc-wrapper:first'),
    $tocCatalog = $tocWrapper.find('.toc-catalog'),
    $progressBar = $('.read-progress')

  // toc的收缩
  $tocCatalog.on('click', function () {
    $tocWrapper.toggleClass('toc-hide-children')
  })

  // 滚动式切换文章标题和站点标题
  let previousHeight = 0,
    continueScroll = 0

  function isScrollingUpOrDown(currTop) {
    continueScroll += currTop - previousHeight
    if (continueScroll > 30) {
      // 向下滑动
      continueScroll = 0
      return 1
    } else if (continueScroll < -800) {
      // 向上滑动
      continueScroll = 0
      return -1
    } else {
      return 0
    }
  }

  // 是否在向上或向下滚动
  let crossingState = -1
  let isHigherThanIntro = true
  function isCrossingIntro(currTop) {
    // 向下滑动超过intro
    if (currTop > bgTitleHeight) {
      if (crossingState !== 1) {
        crossingState = 1
        isHigherThanIntro = false
        return 1
      }
    } else {
      // 向上滑动超过intro
      if (crossingState !== -1) {
        crossingState = -1
        isHigherThanIntro = true
        return -1
      }
    }
    return 0
  }

  // 判断是否为post-page
  let isPostPage = false
  let articleHeight,
    articleTop
  if ($('.post-body').length) {
    isPostPage = true
    articleTop = bgTitleHeight
    // 如果执行时动画已执行完毕
    articleHeight = $('.article-entry').outerHeight()
    // 如果执行时动画未执行完毕
    articleHeight = $('.container')[0].addEventListener('transitionend', () => {
      articleHeight = $('.article-entry').outerHeight()
    })
  }

  function updateProgress(scrollTop, beginY, contentHeight) {
    let windowHeight = $(window).height()
    let readPercent
    if (scrollTop < bgTitleHeight) {
      readPercent = 0
    } else {
      readPercent = (scrollTop - beginY) / (contentHeight - windowHeight) * 100
    }
    // 防止文章过短，产生负百分比
    readPercent = readPercent >= 0 ? readPercent : 100
    let restPercent = readPercent - 100 <= 0 ? readPercent - 100 : 0
    $progressBar[0].style.transform = `translate3d(${restPercent}%, 0, 0)`
  }

  // rAF操作
  let tickingScroll = false
  function updateScroll(scrollTop) {
    let crossingState = isCrossingIntro(scrollTop)
    // intro边界切换
    if (crossingState === 1) {
      $tocWrapper.addClass('toc-fixed')
      $homeLink.addClass('home-link-hide')
      $backTop.addClass('back-top-show')
      $sidebarMenu.addClass('header-sidebar-menu-black')
    } else if (crossingState === -1) {
      $tocWrapper.removeClass('toc-fixed')
      $homeLink.removeClass('home-link-hide')
      $banner.removeClass('banner-show')
      $backTop.removeClass('back-top-show')
      $sidebarMenu.removeClass('header-sidebar-menu-black')
    }
    // 如果不是post - page 以下忽略
    if (isPostPage) {
      // 上下滑动一定距离显示/隐藏header
      let upDownState = isScrollingUpOrDown(scrollTop)
      if (upDownState === 1) {
        $banner.removeClass('banner-show')
      } else if (upDownState === -1 && !isHigherThanIntro) {
        $banner.addClass('banner-show')
      }
      // 进度条君的长度
      updateProgress(scrollTop, articleTop, articleHeight)
    }
    previousHeight = scrollTop
    tickingScroll = false
  }

  // scroll回调
  function onScroll() {
    let scrollTop = $(document).scrollTop()
    let bindedUpdate = updateScroll.bind(null, scrollTop)
    archerUtil.rafTick(tickingScroll, bindedUpdate)
  }

  $(document).on('scroll', onScroll);

  // 返回顶部
  [$postBanner, $backTop].forEach(function (ele) {
    ele.on('click', archerUtil.backTop)
  })
}

export {
  scroll
}