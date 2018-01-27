const Selector = (classPrefix) => ({
  ACTIVE: `${classPrefix}-active`
})

class Sidebar {
    static defaultOptions = {
      activeIndex: 0
    }
    constructor(options) {
      this.options = { ...Sidebar.defaultOptions, ...options }
      this.activeIndex = this.options.activeIndex
      this._initElements()
      this._initTabs()
      this._bindTabsClick()
      this._bindButtonClick()
      this._bindWrapperClick()
      this.preventOver()
    }

    _initElements() {
      this.$sidebar = $(this.options.sidebar)
      this.$tabs = $(this.options.tabs)
      this.$panels = $(this.options.panels)
      this.$menuButton = $(this.options.menuButton)
      this.$nav = $(this.options.nav)
      this.$content = $(this.options.content)
    }

    _initTabs() {
      this.$tabs.each((index, tab) => {
        $(tab).data('tabIndex', index)
      })
    }

    activateSidebar() {
      $('.wrapper').addClass('wrapper-sidebar-active')
      $('.header').addClass('header-sidebar-active')
      $('.toc-wrapper').addClass('toc-slide')
      this.$sidebar.addClass(`sidebar-active`)
    }

    _inactivateSidebar() {
      $('.wrapper').removeClass('wrapper-sidebar-active')
      $('.header').removeClass('header-sidebar-active')
      $('.toc-wrapper').removeClass('toc-slide')
      this.$sidebar.removeClass(`sidebar-active`)
    }

    switchTo(toIndex) {
      this._switchTo(toIndex)
    }

    _switchTab(toIndex) {
      for (let i = 0; i < 3; i++) {
        if (i !== toIndex) {
          this.$nav.removeClass(`sidebar-tabs-active-${i}`)
        }
        else {
          this.$nav.addClass(`sidebar-tabs-active-${i}`)
        }
      }
    }

    _switchPanel(toIndex) {
      for (let i = 0; i < 3; i++) {
        if (i !== toIndex) {
          this.$content.removeClass(`sidebar-content-active-${i}`)
        }
        else {
          this.$content.addClass(`sidebar-content-active-${i}`)
        }
      }
    }

    _switchTo(toIndex) {
      this._switchTab(toIndex)
      this._switchPanel(toIndex)
    }

    _bindTabsClick() {
      this.$tabs.click((e) => {
        const $target = $(e.target)
        this.switchTo($target.data('tabIndex'))
      })
    }

    _bindButtonClick() {
      this.$menuButton.click((e) => {
        this.activateSidebar()
      })
    }

    _bindWrapperClick() {
      $('.wrapper').click((e) => {
        this._inactivateSidebar()
      })
    }

  // 阻止sidebarContent在滚动到顶部或底部时继续滚动
    preventOver() {
      let $sidebar = this.$sidebar
      let that = this
      this.$sidebar.on('mousewheel', function(eve) {
        let target = eve.target,
          $sidebarArchive = $sidebar.find('.sidebar-panel-archives'),
          $sidebarTagsList = $sidebar.find('.sidebar-tags-list'),
          $sidebarCategoriesList = $sidebar.find('.sidebar-categories-list')
        if ($.contains($sidebarTagsList[0], target) || $sidebarTagsList === target) {
          that.stopSidebarEdgeScroll.call($sidebarTagsList[0], eve)
        } else if ($.contains($sidebarArchive[0], target) || $sidebarArchive === target) {
          that.stopSidebarEdgeScroll.call($sidebarArchive[0], eve)
        } else if ($.contains($sidebarCategoriesList[0], target) || $sidebarCategoriesList === target) {
          that.stopSidebarEdgeScroll.call($sidebarCategoriesList[0], eve)
        } else {
          eve.preventDefault()
        }
      })
    }

  // 阻止滚轮在sidebar滚动越界, 1. 没有滚动条直接禁止滚动 2. 触顶禁止上滚 3. 触底禁止下滚
    stopSidebarEdgeScroll(eve) {
      if (this.scrollHeight === this.clientHeight) {
        window.event.preventDefault()
      } else if (this.scrollTop <= 0) {
        if (eve.originalEvent.wheelDelta > 0) {
          window.event.preventDefault()
        }
      } else if (this.scrollTop >= this.scrollHeight - this.clientHeight) {
        if (eve.originalEvent.wheelDelta < 0) {
          window.event.preventDefault()
        }
      }
    }
}

let mySidebar = new Sidebar({
  sidebar: '.sidebar',
  nav: '.sidebar-tabs',
  tabs: '.sidebar-tabs li',
  content: '.sidebar-content',
  panels: '.sideabar-contents > div',
  menuButton: '.header-sidebar-menu'
})

export default mySidebar
