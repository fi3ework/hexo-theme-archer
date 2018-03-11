import archerUtil from './util'
let prevHeight = 0

function initTocLinksScrollTop(tocLinks) {
  return [...tocLinks].map(link => {
    return archerUtil.getAbsPosition(link).y
  })
}

function calcScrollIntoScreenIndex(heights, prevHeight, currHeight) {
  // let screenHeight = window.screen.height
  for (let i = 0; i < heights.length; i++) {
    if ((prevHeight - heights[i]) * (currHeight - heights[i]) <= 0) {
      if (currHeight > prevHeight) {
        return i
      } else {
        return i - 1
      }
    }
  }
}

function hideAllOl(root) {
  [...root.querySelectorAll('ol')].forEach(li => {
    hideItem(li)
  })
}

function initFold(toc) {
  [...toc.children].forEach(child => {
    hideAllOl(child)
  });
  [...toc.querySelectorAll('.toc-active')].forEach(child => {
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
  [...node.children].forEach(child => {
    showItem(child)
  })
}

function spreadAllParentNode(tocItem) {
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

let main = () => {
  // init fold by 'display:none'
  let toc = document.querySelector('.toc')
  let tocItems = document.querySelectorAll('.toc-item')
  if (!tocItems.length) {
    return
  }
  initFold(toc)
  let headers = document.querySelectorAll('.article-entry h1, h2, h3, h4, h5, h6')
  let heights = initTocLinksScrollTop(headers)
  document.addEventListener('scroll', () => {
    let currHeight = $(document).scrollTop()
    let currHeightIndex = calcScrollIntoScreenIndex(heights, prevHeight, currHeight)
    prevHeight = currHeight
    if (typeof currHeightIndex === 'undefined') {
      return
    }
    // spread and fold
    let currItem = tocItems[currHeightIndex]
    resetFold(toc)
    spreadAllParentNode(currItem)
    if (currItem) {
      activeTocItem(currItem.querySelector('a'))
    }
  })
}

export default main