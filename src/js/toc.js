import archerUtil from './util'

// Banner in post page will occupy a certain amount of place.
// Therefore, the scroll event should be subtracted from this occupancy.
const $banner = $('.banner:first')
const scrollOffsetHeight = $banner.height() + archerUtil.rem()

// Query toc headers absolute height
function initTocLinksScrollTop(tocLinks) {
  return [...tocLinks].map((link) => {
    return archerUtil.getAbsPosition(link, true).y
  })
}

function calcScrollIntoScreenIndex(heights, currHeight) {
  for (let i = heights.length - 1; i >= 0; i--) {
    if (Math.ceil(currHeight + scrollOffsetHeight) >= heights[i]) {
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

function resetFold(toc) {
  initFold(toc)
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
  const toc = document.querySelector('.toc')
  const $toc = $('.toc')

  // Skip initialization if no toc exists
  const tocItems = document.querySelectorAll('.toc-item')
  if (!tocItems.length) {
    return
  }

  // tocItems, tocLinks, archorjsLinks and headers are in one-to-one correspondence
  const tocLinks = document.querySelectorAll('.toc-link')
  const archorjsLinks = document.querySelectorAll('.anchorjs-link')
  const headers = document.querySelectorAll(
    '.article-entry h1, h2, h3, h4, h5, h6'
  )

  let throttleTocOnScroll = null

  const initTocOnScroll = () => {
    // Get header links absolute height
    const headersHeights = initTocLinksScrollTop(headers)

    // Overide toc links on-click event
    for (let i = 0; i < tocLinks.length; i++) {
      const onclickScrollTop = headersHeights[i] - scrollOffsetHeight
      const onclickHeaderId = headers[i].id
      const tocOnclickFunction = () => {
        // Prevent header banner default event
        // See ./scroll.js
        window.preventPostPageBannerDefault = true
        $banner.addClass('banner-show')
        archerUtil.setWindowHash(onclickHeaderId)
        window.scrollTo({ top: onclickScrollTop })
      }
      tocLinks[i].onclick = () => {
        tocOnclickFunction()
        return false
      }
      if (archorjsLinks.length && archorjsLinks.length > i) {
        archorjsLinks[i].onclick = () => {
          tocOnclickFunction()
          return false
        }
      }
    }

    // Document on-scroll event
    const tocOnScroll = () => {
      const currHeight = $(document).scrollTop()
      const currHeightIndex = calcScrollIntoScreenIndex(
        headersHeights,
        currHeight
      )
      if (currHeightIndex >= 0) {
        // spread, fold and active
        const currItem = tocItems[currHeightIndex]
        // 1. fold
        resetFold(toc)
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
        resetFold(toc)
      }
    }

    tocOnScroll()

    // Unbind existing on-scroll event
    if (throttleTocOnScroll) $(document).off('scroll', throttleTocOnScroll)
    // Bind document on-scroll event
    throttleTocOnScroll = archerUtil.throttle(tocOnScroll, 100)
    $(document).on('scroll', throttleTocOnScroll)
  }

  // Collapse all toc on initialization
  initFold(toc)

  // Initialize page scroll listener of toc
  initTocOnScroll()
  // Reload toc scroll events after loading all resources like images
  $(window).on('load', initTocOnScroll)
  // Reload toc scroll events if page size is changed
  $(window).on('resize', archerUtil.debounce(initTocOnScroll, 500))

  // Remove toc loading status
  $('.toc-wrapper').removeClass('toc-wrapper-loding')
}

export default main
