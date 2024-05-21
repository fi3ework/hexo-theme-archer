import archerUtil from './util'

const initScroll = () => {
  const $banner = $('.banner:first'),
    $postBanner = $banner.find('.post-title a'),
    $bgEle = $('.site-intro:first'),
    $header = $('header.header'),
    $headerActions = $('.header-actions'),
    $donateBtn = $('.donate-btn'),
    $backTop = $('.back-top:first'),
    $sidebarMenu = $('.header-sidebar-menu:first'),
    $tocWrapper = $('.toc-wrapper:first'),
    $tocCatalog = $tocWrapper.find('.toc-catalog'),
    $progressBar = $('.read-progress')

  const bgTitleHeight =
    $bgEle.offset().top + $bgEle.outerHeight() - $header.height() / 2

  // toc 的收缩
  $tocCatalog.on('click', () => {
    $tocWrapper.toggleClass('toc-hide-children')
  })

  // 滚动式切换文章标题和站点标题
  const showBannerScrollHeight = -200
  let previousHeight = 0,
    continueScroll = 0

  const isScrollingUpOrDown = (currTop) => {
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
  const isCrossingIntro = (currTop) => {
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
  const isPostPage = archerUtil.isPostPage()
  let articleHeight, articleTop
  if (isPostPage) {
    articleTop = bgTitleHeight
    // 如果执行时动画已执行完毕
    articleHeight = $('.article-entry').outerHeight()
    // 如果执行时动画未执行完毕
    articleHeight = $('.container')[0].addEventListener('transitionend', () => {
      articleHeight = $('.article-entry').outerHeight()
    })
  }

  const calcReadPercent = (scrollTop, beginY, contentHeight) => {
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
    return readPercent
  }

  const updateReadProgress = (readPercent) => {
    const restPercent = readPercent - 100 <= 0 ? readPercent - 100 : 0
    $progressBar[0].style.opacity = '1'
    $progressBar[0].style.transform = `translate3d(${restPercent}%, 0, 0)`
  }

  // rAF 操作
  let tickingScroll = false
  const updateScroll = (scrollTop) => {
    const isMobile = archerUtil.isMobile()
    const crossingState = isCrossingIntro(scrollTop)
    const readPercent = calcReadPercent(scrollTop, articleTop, articleHeight)

    // intro 边界切换
    if (crossingState === 1) {
      $tocWrapper.addClass('toc-fixed')
      $header.removeClass('header-mobile')
      $headerActions.addClass('header-actions-hide')
      $sidebarMenu.addClass('header-sidebar-menu-black')
      $backTop.removeClass('footer-fixed-btn--hidden')
    } else if (crossingState === -1) {
      $tocWrapper.removeClass('toc-fixed')
      $header.addClass('header-mobile')
      $headerActions.removeClass('header-actions-hide')
      $banner.removeClass('banner-show')
      $sidebarMenu.removeClass('header-sidebar-menu-black')
      $backTop.addClass('footer-fixed-btn--hidden')
    }

    if (isMobile) {
      // 移动端在所有页面的主内容区域时，显示 toggle banner
      if (isHigherThanIntro) {
        $banner.removeClass('banner-show')
      } else {
        $banner.addClass('banner-show')
      }
    }

    if (!isMobile && isPostPage) {
      const upDownState = isScrollingUpOrDown(scrollTop)

      // 仅在桌面端的 Post 页面，当从主内容区域向上滚动时，显示 toggle banner
      if (upDownState === 1) {
        $banner.removeClass('banner-show')
      } else if (upDownState === -1 && !isHigherThanIntro) {
        $banner.addClass('banner-show')
      }

      // 仅在桌面端的 Post 页面，阅读进度大于等于 50% 时，显示 Donate 按钮
      if (readPercent >= 50) {
        $donateBtn.removeClass('footer-fixed-btn--hidden')
      } else if (
        crossingState === -1 &&
        !$donateBtn.hasClass('footer-fixed-btn--active')
      ) {
        $donateBtn.addClass('footer-fixed-btn--hidden')
      }
    }

    if (isPostPage) {
      // 更新进度条君的长度
      updateReadProgress(readPercent)
    }

    previousHeight = scrollTop
    tickingScroll = false
  }

  // scroll 回调
  const onScroll = () => {
    const scrollTop = $(document).scrollTop()
    const bindedUpdate = updateScroll.bind(null, scrollTop)
    archerUtil.rafTick(tickingScroll, bindedUpdate)
  }
  const throttleOnScroll = archerUtil.throttle(onScroll, 100)

  onScroll()
  $(document).on('scroll', throttleOnScroll)

  // 绑定返回顶部事件
  ;[$postBanner, $backTop].forEach((ele) => {
    ele.on('click', archerUtil.backTop)
  })
}

export default initScroll
