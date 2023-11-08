import archerUtil from './util'

const initScroll = () => {
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

  const updateProgress = (scrollTop, beginY, contentHeight) => {
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
  const updateScroll = (scrollTop) => {
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
    if (isPostPage) {
      // 顶部 Banner 的显示与隐藏
      const isMobile = archerUtil.isMobile()
      if (isMobile) {
        if (isHigherThanIntro) {
          $banner.removeClass('banner-show')
        } else {
          $banner.addClass('banner-show')
        }
      } else {
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
