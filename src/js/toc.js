import archerUtil from './util'

const isPostPage = archerUtil.isPostPage()

// Query toc headers absolute height
function initTocLinksScrollTop(tocLinks) {
  return [...tocLinks].map((link) => {
    return archerUtil.getAbsPosition(link, true).y
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

  const toc = document.querySelector('.toc')

  // #region Toc onscroll listener
  const getTocOnScrollFun = () => {
    const tocItems = document.querySelectorAll('.toc-item')
    const headers = document
      .querySelector('.article-entry')
      .querySelectorAll('h1, h2, h3, h4, h5, h6')
    const $toc = $('.toc')
    const $banner = $('.banner:first')

    let throttleTocOnScroll = null
    return () => {
      // Banner in post page will occupy a certain amount of place.
      // Therefore, anchor point positioning needs to reserve this space.
      const scrollOffsetHeight = $banner.height() + archerUtil.rem()
      headers.forEach((headerElement) => {
        headerElement.style.marginTop = `-${scrollOffsetHeight}px`
        headerElement.style.paddingTop = `${scrollOffsetHeight}px`
      })

      // Get header links absolute height
      const headersHeights = initTocLinksScrollTop(headers)

      // Document on-scroll event
      const tocOnScroll = () => {
        const currHeight = $(document).scrollTop()
        const currHeightIndex = calcScrollIntoScreenIndex(
          headersHeights,
          currHeight,
          scrollOffsetHeight
        )
        if (currHeightIndex >= 0) {
          // spread, fold and active
          const currItem = tocItems[currHeightIndex]
          // 1. fold
          initFold(toc)
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
          initFold(toc)
        }
      }

      // Unbind existing on-scroll event
      if (throttleTocOnScroll) $(document).off('scroll', throttleTocOnScroll)
      // Bind document on-scroll event
      throttleTocOnScroll = archerUtil.throttle(tocOnScroll, 100)
      $(document).on('scroll', throttleTocOnScroll)
    }
  }
  const tocOnScroll = getTocOnScrollFun()
  // #endregion

  // Collapse all toc on initialization
  initFold(toc)

  // Initialize page scroll listener of toc
  tocOnScroll()
  // Reload toc scroll events after loading all resources like images
  $(window).on('load', tocOnScroll)
  // Reload toc scroll events if page size is changed
  $(window).on('resize', archerUtil.debounce(tocOnScroll, 500))

  // Remove toc loading status
  $('.toc-wrapper').removeClass('toc-wrapper-loding')
}

export default main
