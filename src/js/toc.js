import archerUtil from './util'

const isPostPage = archerUtil.isPostPage()

// Query toc headers absolute height
function initTocLinksScrollTop(headers) {
  return headers.map((index, header) => {
    return archerUtil.getAbsPosition(header).y
  })
}

function calcScrollIntoScreenIndex(heights, currHeight, offset = 0) {
  for (let i = heights.length - 1; i >= 0; i--) {
    if (Math.ceil(currHeight + offset) >= heights[i]) {
      return i
    }
  }
  return -1
}

// hide all ol
function hideAllOl(root) {
  ;[...root.querySelectorAll('ol')].forEach((li) => {
    hideItem(li)
  })
}

// back to default state
function initFold(toc) {
  ;[...toc.children].forEach((child) => {
    hideAllOl(child)
  })
  ;[...toc.querySelectorAll('.toc-active')].forEach((child) => {
    child.classList.remove('toc-active')
  })
}

function hideItem(node) {
  node.style.display = 'none'
}

function showItem(node) {
  node.style.display = ''
}

function activeTocItem(node) {
  node.classList.add('toc-active')
}

function showAllChildren(node) {
  ;[...node.children].forEach((child) => {
    showItem(child)
  })
}

function spreadParentNodeOfTargetItem(tocItem) {
  let currNode = tocItem
  while (currNode && currNode.parentNode) {
    showAllChildren(currNode.parentNode)
    showAllChildren(currNode)
    currNode = currNode.parentNode
    if (currNode.classList.contains('toc')) {
      break
    }
  }
}

const main = () => {
  // Skip initialization if not in post page
  if (!isPostPage) {
    return
  }

  const $toc = $('.toc')
  const $article = $('article.article-entry')

  // #region Toc onscroll listener
  const getInitTocOnScrollFun = () => {
    const $banner = $('.banner:first')
    const $tocItems = $('.toc-item')
    const $headers = $article.find('h1, h2, h3, h4, h5, h6')

    let throttleTocOnScroll = null
    return () => {
      // Banner in post page will occupy a certain amount of place.
      // Therefore, anchor point positioning needs to reserve this space.
      const scrollOffsetHeight = $banner.height() + archerUtil.rem()
      $headers.each((index, element) => {
        $(element).css({
          'margin-top': `-${scrollOffsetHeight}px`,
          'padding-top': `${scrollOffsetHeight}px`,
        })
      })

      // Get header links absolute height
      const headersHeights = initTocLinksScrollTop($headers)

      // Document on-scroll event
      const tocOnScroll = () => {
        const currHeight = $(document).scrollTop()
        const currHeightIndex = calcScrollIntoScreenIndex(
          headersHeights,
          currHeight,
        )
        if (currHeightIndex >= 0) {
          // spread, fold and active
          const currItem = $tocItems[currHeightIndex]
          // 1. fold
          initFold($toc[0])
          // 2. spread
          spreadParentNodeOfTargetItem(currItem)
          // 3. active
          if (currItem) {
            activeTocItem(currItem.querySelector('a'))
          }
          // 4. scroll toc
          const currItemOffsetTop = currItem?.offsetTop || undefined
          if (currItemOffsetTop) {
            $toc.scrollTop(currItemOffsetTop)
          }
        } else {
          initFold($toc[0])
        }
      }

      // Unbind existing on-scroll event
      if (throttleTocOnScroll) $(document).off('scroll', throttleTocOnScroll)
      // Bind document on-scroll event
      throttleTocOnScroll = archerUtil.throttle(tocOnScroll, 100)
      $(document).on('scroll', throttleTocOnScroll)
    }
  }
  const initTocOnScroll = getInitTocOnScrollFun()
  const throttleInitTocOnScroll = archerUtil.debounce(initTocOnScroll, 300)
  // #endregion

  // Collapse all toc on initialization
  initFold($toc[0])

  // Initialize scroll events listener of toc
  initTocOnScroll()
  // Reload toc scroll events listener if article size is changes (usually because new image is loaded)
  archerUtil.observeResize($article[0], throttleInitTocOnScroll)
  // Reload toc scroll events listener if window size is changed
  $(window).on('resize', throttleInitTocOnScroll)

  // Remove toc loading status
  $('.toc-wrapper').removeClass('toc-wrapper-loding')
}

export default main
