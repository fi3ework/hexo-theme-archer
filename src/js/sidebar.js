import PerfectScrollbar from 'perfect-scrollbar'

const Selector = classPrefix => ({
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
    this._bindWrapperTransitionEnd()
    this.perfectScrollbar()
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
    this.$sidebar.removeClass('sidebar-hide')
    this.$sidebar.addClass('sidebar-active')
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
      } else {
        this.$nav.addClass(`sidebar-tabs-active-${i}`)
      }
    }
  }

  _bindWrapperTransitionEnd() {
    $('.wrapper').on('transitionend', e => {
      if (!this.$sidebar.hasClass('sidebar-active')) {
        this.$sidebar.addClass('sidebar-hide')
      }
    })
  }

  _switchPanel(toIndex) {
    for (let i = 0; i < 3; i++) {
      if (i !== toIndex) {
        this.$content.removeClass(`sidebar-content-active-${i}`)
      } else {
        this.$content.addClass(`sidebar-content-active-${i}`)
      }
    }
  }

  _switchTo(toIndex) {
    this._switchTab(toIndex)
    this._switchPanel(toIndex)
  }

  _bindTabsClick() {
    this.$tabs.click(e => {
      const $target = $(e.target)
      this.switchTo($target.data('tabIndex'))
    })
  }

  _bindButtonClick() {
    this.$menuButton.click(e => {
      this.activateSidebar()
    })
  }

  _bindWrapperClick() {
    $('.wrapper').click(e => {
      this._inactivateSidebar()
    })
  }

  // 阻止sidebarContent在滚动到顶部或底部时继续滚动
  perfectScrollbar() {
    const ps = new PerfectScrollbar('.sidebar', {
      suppressScrollX: true
    })
  }
}

export default Sidebar
