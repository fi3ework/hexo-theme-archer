import archerUtil from './util'
import sidebar from './sidebar'
import Emitter from 'eventemitter3'

class InitSidebarLink {
  constructor(metaName, postList, labelsContainer) {
    this._initIndexMap = this._initIndexMap.bind(this)
    this.metaName = metaName
    this.currentQuery = ''
    this.indexMap = new Map()
    this.postList = document.querySelector(postList)
    this.labelsContainer = document.querySelector(labelsContainer)
    this.initInfo() // lazy func
    this.initIndexMap()
    this.bindLabelClick()
    this.bindOtherClick()
  }

  static contentJSON
  static emitter = new Emitter()
  initInfo() {
    // jsInfo is from js-info.ejs
    let contentURL = jsInfo.root + 'content.json?t=' + (Number(new Date()))
    let xhr = new XMLHttpRequest()
    xhr.responseType = ''
    xhr.open('get', contentURL, true)
    let $loadFailed = $('.tag-load-fail')
    xhr.onload = function () {
      if (this.status === 200 || this.status === 304) {
        $loadFailed.remove()
        InitSidebarLink.contentJSON = JSON.parse(this.responseText)
        InitSidebarLink.emitter.emit('json ininted')
        // that.initIndexMap()
        // initTagMap(InitSidebaLink.contentJSON)
      } else {
        // showTagLoadFail($tagLoadFail)
        this.postList.remove()
      }
    }
    xhr.send()
    Object.getPrototypeOf(this).initInfo = () => (console.log('initInfo function is lazyed'))
  }

  initIndexMap() {
    InitSidebarLink.emitter.on('json ininted', this._initIndexMap)
  }

  updateList(corrArr) {
    let frag = document.createDocumentFragment()
    this.postList.innerHTML = ''
    corrArr.forEach((item) => {
      frag.appendChild(this._createPostDom(item)[0])
    })
    this.postList.appendChild(frag)
  }

  bindLabelClick() {
    this.labelsContainer.addEventListener('click', (e) => {
      let currLabelName = e.target.getAttribute(`data-${this.metaName}`)
      if (typeof currLabelName === 'string') {
        this.currLabelName = currLabelName
        this.switchLabel(this.currLabelName)
      }
    })
  }

  bindOtherClick() {
    document.body.addEventListener('click', (e) => {
      if (e.target.className === 'post-tag') {
        e.stopPropagation()
        sidebar.activateSidebar()
        sidebar.switchTo(1)
        let currLabelName = e.target.getAttribute(`data-tags`)
        this.currLabelName = currLabelName
        this.switchLabel(this.currLabelName)
      }
    })
    Object.getPrototypeOf(this).bindOtherClick = () => (console.log('bindOtherClick function is lazyed'))
  }


  _switchFocus(label) {
    let currFocus = this.labelsContainer.getElementsByClassName('sidebar-label-focus');
    [...currFocus].forEach((item) => item.classList.remove('sidebar-label-focus'));
    [...this.labelsContainer.children].forEach(item => {
      if (item.getAttribute(`data-${this.metaName}`) === label) {
        item.classList.add('sidebar-label-focus')
      }
    })
  }

  switchLabel(label) {
    this._switchFocus(label)
    let indexArr = this.indexMap.get(label)
    let corrArr = indexArr.map((index) => {
      return InitSidebarLink.contentJSON[index]
    })
    this.updateList(corrArr)
  }

  _createPostDom(postInfo) {
    let $tagItem = $('<li class="meta-post-item"><span class="meta-post-date">' + archerUtil.dateFormater(new Date(Date.parse(postInfo.date)), 'yyyy/MM/dd') + '</span></li>')
    let $aItem = $('<a class="meta-post-title" href="' + jsInfo.root + postInfo.path + '">' + postInfo.title + '</a>')
    $tagItem.append($aItem)
    return $tagItem
  }

  _initIndexMap() {
    let contentJSON = InitSidebarLink.contentJSON
    for (let postIndex = 0; postIndex < contentJSON.length; postIndex++) {
      let currPostTags = contentJSON[postIndex][this.metaName]
      // if there is any post has a tag
      if (currPostTags.length) {
        currPostTags.forEach((tag) => {
          if (this.indexMap.has(tag.slug)) {
            this.indexMap.get(tag.slug).push(postIndex)
          } else {
            this.indexMap.set(tag.slug, [postIndex])
          }
        })
      }
    }
    if (!this.indexMap.size) {
      document.getElementsByClassName(`sidebar-${this.metaName}-empty`)[0].classList.add(`sidebar-${this.metaName}-empty-active`)
    }
  }
}

export default InitSidebarLink