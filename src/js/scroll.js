import archerUtil from './util'
window.preventPostPageBannerDefault = false

const scroll = function () {
  const $banner = $('.banner:first'),
    $postBanner = $banner.find('.post-title a'),
    $bgEle = $('.site-intro:first'),
    $header = $('header.header'),
    $headerActions = $('.header-actions'),
    $backTop = $('.back-top:first'),
    $sidebarMenu = $('.header-sidebar-menu:first'),
    $tocWrapper = $('.toc-wrapper:first'),
    $tocCatalog = $tocWrapper.find('.toc-catalog'),
    $progressBar = $('.read-progress')

  const bgTitleHeight =
    $bgEle.offset().top + $bgEle.outerHeight() - $header.height() / 2

  // toc 的收缩
  $tocCatalog.on('click', function () {
    $tocWrapper.toggleClass('toc-hide-children')
  })

  // 滚动式切换文章标题和站点标题
  const showBannerScrollHeight = -200
  let previousHeight = 0,
    continueScroll = 0

  function isScrollingUpOrDown(currTop) {
    continueScroll += currTop - previousHeight
    if (continueScroll > 30) {
      // 向下滑动
      continueScroll = 0
      return 1
    } else if (continueScroll < showBannerScrollHeight) {
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
    // 向下滑动超过 intro
    if (currTop > bgTitleHeight) {
      if (crossingState !== 1) {
        crossingState = 1
        isHigherThanIntro = false
        return 1
      }
    } else {
      // 向上滑动超过 intro
      if (crossingState !== -1) {
        crossingState = -1
        isHigherThanIntro = true
        return -1
      }
    }
    return 0
  }

  // 判断是否为 post-page
  let isPostPage = false
  let articleHeight, articleTop
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
    const windowHeight = $(window).height()
    let readPercent
    if (scrollTop < bgTitleHeight) {
      readPercent = 0
    } else {
      readPercent =
        ((scrollTop - beginY) / (contentHeight - windowHeight)) * 100
    }
    // 防止文章过短，产生负百分比
    readPercent = readPercent >= 0 ? readPercent : 100
    const restPercent = readPercent - 100 <= 0 ? readPercent - 100 : 0
    $progressBar[0].style.opacity = '1'
    $progressBar[0].style.transform = `translate3d(${restPercent}%, 0, 0)`
  }

  // rAF 操作
  let tickingScroll = false
  function updateScroll(scrollTop) {
    const crossingState = isCrossingIntro(scrollTop)
    // intro 边界切换
    if (crossingState === 1) {
      $tocWrapper.addClass('toc-fixed')
      $header.removeClass('header-mobile')
      $headerActions.addClass('header-actions-hide')
      $sidebarMenu.addClass('header-sidebar-menu-black')
      $backTop.removeClass('back-top-hidden')
    } else if (crossingState === -1) {
      $tocWrapper.removeClass('toc-fixed')
      $header.addClass('header-mobile')
      $headerActions.removeClass('header-actions-hide')
      $banner.removeClass('banner-show')
      $sidebarMenu.removeClass('header-sidebar-menu-black')
      $backTop.addClass('back-top-hidden')
    }
    // 文章页
    if (isPostPage) {
      // 当 window.preventPostPageBannerDefault 为真时，避免此处 Banner 显示或隐藏的行为
      if (!window.preventPostPageBannerDefault) {
        // 向上滑动一定距离显示 header banner
        // 向下滑动隐藏 header banner
        const upDownState = isScrollingUpOrDown(scrollTop)
        if (upDownState === 1) {
          $banner.removeClass('banner-show')
        } else if (upDownState === -1 && !isHigherThanIntro) {
          $banner.addClass('banner-show')
        }
      }
      // 进度条君的长度
      updateProgress(scrollTop, articleTop, articleHeight)
    }
    previousHeight = scrollTop
    tickingScroll = false
    window.preventPostPageBannerDefault = false
  }

  // scroll 回调
  function onScroll() {
    const scrollTop = $(document).scrollTop()
    const bindedUpdate = updateScroll.bind(null, scrollTop)
    archerUtil.rafTick(tickingScroll, bindedUpdate)
  }

  onScroll()

  const throttleOnScroll = archerUtil.throttle(onScroll, 25, true)
  $(document).on('scroll', throttleOnScroll)

  // 绑定返回顶部事件
  ;[$postBanner, $backTop].forEach(function (ele) {
    ele.on('click', archerUtil.backTop)
  })
}

export { scroll }
