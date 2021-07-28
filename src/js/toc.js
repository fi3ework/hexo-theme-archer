import archerUtil from './util'
let prevHeight = 0
function initTocLinksScrollTop(tocLinks) {
  return [...tocLinks].map((link) => {
    return archerUtil.getAbsPosition(link).y
  })
}

const calcAnchorLink = (heights, currHeight) => {
  for (let i = 0; i < heights.length; i++) {
    if (Math.abs(currHeight - heights[i]) < 1.1) {
      return i
    }
  }
  return -1
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
  const tocItems = document.querySelectorAll('.toc-item')
  if (!tocItems.length) {
    return
  }
  initFold(toc)
  const headers = document.querySelectorAll(
    '.article-entry h1, h2, h3, h4, h5, h6'
  )
  // get links height
  const heights = initTocLinksScrollTop(headers)
  document.addEventListener('scroll', () => {
    const currHeight = $(document).scrollTop()
    const currHeightIndex = calcScrollIntoScreenIndex(
      heights,
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
  })
}

export default main
