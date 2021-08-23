import archerUtil from './util'
let prevHeight = 0
let throttleTocOnScroll = () => {}
const $banner = $('.banner:first')

// Banner in post page will occupy a certain amount of place.
// Therefore, the scroll event should be subtracted from this occupancy.
const scrollOffsetHeight = $banner.height() + archerUtil.rem()
const calcAnchorLink = (heights, currHeight) => {
  for (let i = 0; i < heights.length; i++) {
    if (
      Math.abs(currHeight - heights[i]) <=
      scrollOffsetHeight + archerUtil.rem()
    ) {
      return i
    }
  }
  return -1
}

// Query toc headers absolute height
function initTocLinksScrollTop(tocLinks) {
  return [...tocLinks].map((link) => {
    return archerUtil.getAbsPosition(link, true).y
  })
}

const isPassingThrough = (currHeight, prevHeight, linkHeight) => {
  return (currHeight + 1 - linkHeight) * (prevHeight + 1 - linkHeight) <= 0
}

function calcScrollIntoScreenIndex(heights, prevHeight, currHeight) {
  const anchorLinkIndex = calcAnchorLink(heights, currHeight)
  if (anchorLinkIndex >= 0) {
    return anchorLinkIndex
  }

  for (let i = 0; i < heights.length; i++) {
    if (isPassingThrough(currHeight, prevHeight, heights[i])) {
      // if is scrolling down, select current
      if (currHeight > prevHeight) {
        return i
      } else {
        // if is scrolling up, select previous
        return i - 1
      }
    }
  }
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

  initFold(toc)

  const initTocOnScroll = () => {
    // Get header links absolute height
    const headersHeights = initTocLinksScrollTop(headers)

    // Overide toc links on-click event
    let statusTocOnclick = false
    for (let i = 0; i < tocLinks.length; i++) {
      const onclickScrollTop = headersHeights[i] - scrollOffsetHeight
      const onclickHref = headers[i].id
      const tocOnclickFunction = function () {
        // Prevent scroll default event
        statusTocOnclick = true
        // Prevent header banner default event
        window.preventPostPageBannerDefault = true
        archerUtil.setWindowHash(onclickHref)
        window.scrollTo({ top: onclickScrollTop })
        $banner.addClass('banner-show')
      }
      tocLinks[i].onclick = () => {
        tocOnclickFunction()
        return false
      }
      archorjsLinks[i].onclick = () => {
        tocOnclickFunction()
        return false
      }
    }

    // Document on-scroll event
    const tocOnScroll = () => {
      const currHeight = $(document).scrollTop()
      const currHeightIndex = calcScrollIntoScreenIndex(
        headersHeights,
        prevHeight,
        currHeight
      )
      prevHeight = currHeight
      if (typeof currHeightIndex === 'undefined') {
        return
      }
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
      // 5. set url hash
      // Skip refresh hash when jump by clicking toc.
      // Prevent unexpected behavior.
      const headerHashId = headers[currHeightIndex]?.id || undefined
      if (!statusTocOnclick && headerHashId !== undefined) {
        archerUtil.setWindowHash(headerHashId)
      }
      statusTocOnclick = false
    }

    tocOnScroll()

    // Bind document on-scroll event
    $(document).off('scroll', throttleTocOnScroll)
    throttleTocOnScroll = archerUtil.throttle(tocOnScroll, 100, true)
    $(document).on('scroll', throttleTocOnScroll)
  }

  initTocOnScroll()

  // Header's absolute position would be changed when window is resized.
  $(window).on('resize', archerUtil.throttle(initTocOnScroll, 100, false))

  // Remove toc loading status
  $('.toc-wrapper').removeClass('toc-wrapper-loding')
}

export default main
