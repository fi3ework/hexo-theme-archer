import archerUtil from './util'
import EventEmitter from 'eventemitter3'

class MetaInfo {
  constructor(metaName, labelsContainer, postContainer) {
    this.currLabelName = ''
    this.isInited = false
    this.postsArr = null
    this.metaName = metaName
    this.labelsContainer = $(labelsContainer)[0]
    this.postContainer = $(postContainer)[0]
    this.indexMap = new Map()
    this._bindLabelClick()
  }

  changeLabel(currLabelName) {
    if (typeof currLabelName === 'string') {
      this.currLabelName = currLabelName
      this._changeList()
      this._changeFocus()
    }
  }

  _bindLabelClick() {
    this.labelsContainer.addEventListener('click', (e) => {
      const currLabelName = e.target.getAttribute(`data-${this.metaName}`)
      this.changeLabel(currLabelName)
    })
  }

  _changeFocus(label) {
    const currFocus = this.labelsContainer.getElementsByClassName(
      'sidebar-label-focus',
    )
    ;[...currFocus].forEach((item) =>
      item.classList.remove('sidebar-label-focus'),
    )
    ;[...this.labelsContainer.children].forEach((item) => {
      if (item.getAttribute(`data-${this.metaName}`) === this.currLabelName) {
        item.classList.add('sidebar-label-focus')
      }
    })
  }

  _changeList() {
    const indexArr = this.indexMap.get(this.currLabelName)
    try {
      const corrArr = indexArr.map((index) => {
        return this.postsArr[index]
      })
      this._createPostsDom(corrArr)
    } catch (error) {
      console.error(
        'Please make sure you have installed `hexo-generator-json-content`, and set `tags: true` and `categories: true`. More info: https://github.com/fi3ework/hexo-theme-archer/blob/master/README.md#%E5%BF%AB%E9%80%9F%E5%AE%89%E8%A3%85',
      )
    }
  }

  _createPostsDom(corrArr) {
    const frag = document.createDocumentFragment()
    this.postContainer.innerHTML = ''
    for (let i = 0; i < corrArr.length; i++) {
      frag.appendChild(this._createPostDom(corrArr[i]))
    }
    this.postContainer.appendChild(frag)
  }

  _createPostDom(postInfo) {
    const $tagItem = $(
      '<li class="meta-post-item"><span class="meta-post-date">' +
        archerUtil.dateFormater(
          new Date(Date.parse(postInfo.date)),
          'yyyy/MM/dd',
        ) +
        '</span></li>',
    )
    const $aItem = $(
      '<a class="meta-post-title" href="' +
        siteMeta.root +
        postInfo.path +
        '">' +
        postInfo.title +
        '</a>',
    )
    $tagItem.append($aItem)
    return $tagItem[0]
  }

  tryInit(postsArr) {
    if (
      this.isInited ||
      Object.prototype.toString.call(postsArr) === '[object Null]'
    ) {
      return
    }

    for (let postIndex = 0; postIndex < postsArr.length; postIndex++) {
      const currPostLabels = postsArr[postIndex][this.metaName]
      const key = 'name'
      // if there is any post has a tag
      if (currPostLabels && currPostLabels.length) {
        currPostLabels.forEach((tagOrCatetory) => {
          // if this.metaName is 'categories', tagOrCatetory['slug'] will be used as key in this.indexMap
          // else if this.metaName is 'tag', tagOrCatetory['name'] will be used as key in this.indexMap
          // check the array postsArr and you'll know why.
          // console.log(tagOrCatetory)
          // const key = this.metaName === 'categories' ? 'slug' : 'name'

          // Hey bro, but why? If use 'name' both, we can use special characters like blank and dot.

          if (this.indexMap.has(tagOrCatetory[key])) {
            this.indexMap.get(tagOrCatetory[key]).push(postIndex)
          } else {
            this.indexMap.set(tagOrCatetory[key], [postIndex])
          }
        })
      }
    }

    if (!this.indexMap.size) {
      document
        .getElementsByClassName(`sidebar-${this.metaName}-empty`)[0]
        .classList.add(`sidebar-${this.metaName}-empty-active`)
    }

    this.postsArr = postsArr
    this.isInited = true
  }
}

class SidebarMeta {
  constructor(sidebar) {
    this.sidebar = sidebar
    this.tabCount = 0
    this.emitter = new EventEmitter()
    this.postsArr = null
    this.metas = []
    this._initMap = this._initMap.bind(this)
    this.dataMaps = new Map()
    this._subscribe()
    this._fetchInfo()
    this._bindOtherClick()
  }

  // add a new tab and updata all metas
  addTab(para) {
    this.tabCount++
    const newMeta = new MetaInfo(
      para.metaName,
      para.labelsContainer,
      para.postsContainer,
    )
    newMeta.tryInit(this.postsArr)
    this.metas.push(newMeta)
  }

  // update every MetaInfo
  _tryInitMetas() {
    for (let i = 0; i < this.metas.length; i++) {
      this.metas[i].tryInit(this.postsArr)
    }
  }

  // subscribe data onload
  _subscribe() {
    this.emitter.on('DATA_FETCHED_SUCCESS', this._initMap)
  }

  // init maps
  _initMap() {
    if (!this.postsArr.length) {
      return
    }
    this._tryInitMetas()
  }

  // fetch content.json
  _fetchInfo() {
    // siteMeta is from js-info.ejs
    const contentURL = siteMeta.root + 'content.json?t=' + Number(new Date())
    const xhr = new XMLHttpRequest()
    xhr.responseType = ''
    xhr.open('get', contentURL, true)
    const $loadFailed = $('.tag-load-fail')
    const that = this
    xhr.onload = function () {
      if (this.status === 200 || this.status === 304) {
        $loadFailed.remove()
        // defensive programming if content.json formart is not correct
        // pr: https://github.com/fi3ework/hexo-theme-archer/pull/37
        const contentJSON = JSON.parse(this.responseText)
        const posts = Array.isArray(contentJSON)
          ? contentJSON
          : contentJSON.posts
        if (posts && posts.length) {
          that.postsArr = posts
          that.emitter.emit('DATA_FETCHED_SUCCESS')
        }
      } else {
        this.$currPostsContainer.remove()
      }
    }
    xhr.send()
  }

  _bindOtherClick() {
    $('.post-tag').click((e) => {
      e.stopPropagation()
      this.sidebar.activateSidebar()
      this.sidebar.switchTo(1)
      this.currLabelName = e.target.getAttribute('data-tags')
      const tagMeta = this.metas[0]
      tagMeta.changeLabel(this.currLabelName)
    })
    $('.post-category').click((e) => {
      e.stopPropagation()
      this.sidebar.activateSidebar()
      this.sidebar.switchTo(2)
      this.currLabelName = e.target.getAttribute('data-categories')
      const categoryMeta = this.metas[1]
      categoryMeta.changeLabel(this.currLabelName)
    })
  }
}

export default SidebarMeta
