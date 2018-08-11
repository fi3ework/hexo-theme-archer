import archerUtil from './util'
import sidebar from './initSidebar'
import Emitter from 'eventemitter3'
import { isArray } from 'util'

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
    this.labelsContainer.addEventListener('click', e => {
      let currLabelName = e.target.getAttribute(`data-${this.metaName}`)
      this.changeLabel(currLabelName)
    })
  }

  _changeFocus(label) {
    let currFocus = this.labelsContainer.getElementsByClassName(
      'sidebar-label-focus'
    )
    ;[...currFocus].forEach(item =>
      item.classList.remove('sidebar-label-focus')
    )
    ;[...this.labelsContainer.children].forEach(item => {
      if (item.getAttribute(`data-${this.metaName}`) === this.currLabelName) {
        item.classList.add('sidebar-label-focus')
      }
    })
  }

  _changeList() {
    let indexArr = this.indexMap.get(this.currLabelName)
    try {
      let corrArr = indexArr.map(index => {
        return this.postsArr[index]
      })
      this._createPostsDom(corrArr)
    } catch (error) {
      console.error(
        'Please ensure set `tags: true` and `categories: true` of the hexo-content-json config'
      )
    }
  }

  _createPostsDom(corrArr) {
    console.log(corrArr)
    let frag = document.createDocumentFragment()
    this.postContainer.innerHTML = ''
    for (let i = 0; i < corrArr.length; i++) {
      frag.appendChild(this._createPostDom(corrArr[i]))
    }
    this.postContainer.appendChild(frag)
  }

  _createPostDom(postInfo) {
    let $tagItem = $(
      '<li class="meta-post-item"><span class="meta-post-date">' +
        archerUtil.dateFormater(
          new Date(Date.parse(postInfo.date)),
          'yyyy/MM/dd'
        ) +
        '</span></li>'
    )
    let $aItem = $(
      '<a class="meta-post-title" href="' +
        siteMeta.root +
        postInfo.path +
        '">' +
        postInfo.title +
        '</a>'
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
      let currPostLabels = postsArr[postIndex][this.metaName]
      // if there is any post has a tag
      if (currPostLabels && currPostLabels.length) {
        currPostLabels.forEach(tag => {
          if (this.indexMap.has(tag.name)) {
            this.indexMap.get(tag.name).push(postIndex)
          } else {
            this.indexMap.set(tag.name, [postIndex])
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
  constructor(tabCount) {
    this.tabCount = 0
    this.emitter = new Emitter()
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
    let newMeta = new MetaInfo(
      para.metaName,
      para.labelsContainer,
      para.postsContainer
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
    let contentURL = siteMeta.root + 'content.json?t=' + Number(new Date())
    let xhr = new XMLHttpRequest()
    xhr.responseType = ''
    xhr.open('get', contentURL, true)
    let $loadFailed = $('.tag-load-fail')
    let that = this
    xhr.onload = function() {
      if (this.status === 200 || this.status === 304) {
        $loadFailed.remove()
        // defensive programming if content.json formart is not correct
        // pr: https://github.com/fi3ework/hexo-theme-archer/pull/37
        let contentJSON
        let posts
        contentJSON = JSON.parse(this.responseText)
        posts = isArray(contentJSON) ? contentJSON : contentJSON.posts
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
    document.body.addEventListener('click', e => {
      if (e.target.className === 'post-tag') {
        e.stopPropagation()
        sidebar.activateSidebar()
        sidebar.switchTo(1)
        let currLabelName = e.target.getAttribute(`data-tags`)
        this.currLabelName = currLabelName
        let tagMeta = this.metas[0]
        tagMeta.changeLabel(this.currLabelName)
      }
    })
  }
}

export default SidebarMeta
