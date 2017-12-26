import archerUtil from './util'

let initTag = function () {
  let contentJSON,
    tagMap = new Map()
  initTagInfo()

  // 获取所有文章信息的json
  function initTagInfo() {
    // jsInfo is from js-info.ejs
    let tagURL = jsInfo.root + 'content.json?t=' + (Number(new Date()))
    let xhr = new XMLHttpRequest()
    xhr.responseType = ''
    xhr.open('get', tagURL, true)
    let $tagLoadFail = $('.tag-load-fail:first')
    xhr.onload = function () {
      if (this.status === 200 || this.status === 304) {
        $tagLoadFail.remove()
        contentJSON = JSON.parse(this.responseText)
        initTagMap(contentJSON)
      } else {
        showTagLoadFail($tagLoadFail)
        $('.sidebar-tags-name:first').remove()
      }
    }
    xhr.send()
  }

  // 显示加载失败
  function showTagLoadFail($tagLoadFail) {
    $tagLoadFail[0].style.display = 'block'
  }

  // 建立map
  function initTagMap(contentJSON) {
    for (let postIndex = 0; postIndex < contentJSON.length; postIndex++) {
      let currPostTags = contentJSON[postIndex].tags
      if (currPostTags.length) {
        currPostTags.forEach(function (tag) {
          if (tagMap.has(tag.name)) {
            let addedIndex = tagMap.get(tag.name) + ',' + postIndex.toString()
            tagMap.set(tag.name, addedIndex)
          } else {
            tagMap.set(tag.name, postIndex.toString())
          }
        }, this)
      }
    }
  }

  // 将对应的postInfo生成dom
  function createTagDom(postInfo) {
    let $tagItem = $('<li class="tag-post-item"><span class="tag-post-date">' + archerUtil.dateFormater(new Date(Date.parse(postInfo.date)), 'yyyy/MM/dd') + '</span></li>')
    let $aItem = $('<a class="tag-post-title" href="' + jsInfo.root + postInfo.path + '">' + postInfo.title + '</a>')
    $tagItem.append($aItem)
    return $tagItem
  }

  $('.sidebar-tags-name:first').on('click', function (event) {
    event.preventDefault()
    let realTarget = event.target
    // 点击大框可显示对应tag的文章
    if (this.compareDocumentPosition(realTarget) & 16) {
      // 确定tagName
      if (realTarget.tagName === 'SPAN') {
        this.currTagName = realTarget.firstChild.innerHTML
      } else {
        this.currTagName = realTarget.innerHTML
      }
    }

    // 判断是否存在对应tag
    let indexs = tagMap.get(this.currTagName)
    if (!indexs) {
      return
    }

    // 设置当前选中的tag的样式
    $(this).find('.sidebar-tag-name-focus').removeClass('sidebar-tag-name-focus')
    let children = this.children
    for (let i = 0; i < children.length; i++) {
      if (this.currTagName === children[i].firstChild.innerHTML) {
        children[i].classList.add('sidebar-tag-name-focus')
      }
    }

    // 显示tag对应的文章列表
    let indexsArr = indexs.split(',')
    let frag = document.createDocumentFragment(),
      postList = $('.sidebar-tag-list')[0]
    postList.innerHTML = ''
    indexsArr.forEach(function (item) {
      frag.appendChild(createTagDom(contentJSON[item])[0])
    })
    postList.appendChild(frag)
  })
}

export {
  initTag
}