import PerfectScrollbar from 'perfect-scrollbar'

const Selector = (classPrefix) => ({
  ACTIVE: `${classPrefix}-active`,
})

class Sidebar {
  static defaultOptions = {
    activeIndex: 0,
  }

  constructor(options) {
    this.options = { ...Sidebar.defaultOptions, ...options }
    this.activeIndex = this.options.activeIndex
    this._initElements()
    this._initTabs()
    this._bindTabsClick()
    this._bindButtonClick()
    this._bindWrapperClick()
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
    this.$sidebar.removeClass('sidebar-hide')
    $('.wrapper').addClass('wrapper-sidebar-active')
    $('header.header').addClass('header-sidebar-active')
    $('.footer-fixed').addClass('footer-fixed-sidebar-active')
    $('.toc-wrapper').addClass('toc-slide')
    this.$menuButton.addClass('header-sidebar-menu-active')
    this.$sidebar.addClass('sidebar-active')
  }

  _inactivateSidebar() {
    $('.wrapper').removeClass('wrapper-sidebar-active')
    $('header.header').removeClass('header-sidebar-active')
    $('.footer-fixed').removeClass('footer-fixed-sidebar-active')
    $('.toc-wrapper').removeClass('toc-slide')
    this.$menuButton.removeClass('header-sidebar-menu-active')
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
    this.$tabs.click((e) => {
      const $target = $(e.target)
      this.switchTo($target.data('tabIndex'))
    })
  }

  _bindButtonClick() {
    this.$menuButton.click((e) => {
      if (this.$sidebar.hasClass('sidebar-active')) {
        this._inactivateSidebar()
      } else {
        this.activateSidebar()
      }
    })
  }

  _bindWrapperClick() {
    $('.wrapper').click((e) => {
      this._inactivateSidebar()
    })
  }

  // 阻止sidebarContent在滚动到顶部或底部时继续滚动
  perfectScrollbar() {
    const ps = new PerfectScrollbar('.sidebar', {
      suppressScrollX: true,
    })
  }
}

export default Sidebar
