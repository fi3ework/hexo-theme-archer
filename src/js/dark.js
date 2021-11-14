let currentThemeMode
const $themeModeSwitchBtn = $('.header-theme-btn')

// 获取当前主题颜色模式
const getPreferredThemeMode = function () {
  const preferredThemeMode =
    localStorage.preferredThemeMode !== undefined
      ? localStorage.preferredThemeMode
      : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  return preferredThemeMode === 'dark' ? 'dark' : 'light'
}

// 设置按钮可点击
const setThemeModeSwitchBtnActive = (active) => {
  if (active) {
    $themeModeSwitchBtn.removeClass('header-theme-btn-disabled')
  } else {
    $themeModeSwitchBtn.addClass('header-theme-btn-disabled')
  }
}

// 切换主题颜色模式
const switchThemeMode = function () {
  setThemeModeSwitchBtnActive(false)
  if ($("LINK[href='/css/dark.css']").length === 0) {
    $('<link>')
      .attr({ rel: 'stylesheet', type: 'text/css', href: '/css/dark.css' })
      .appendTo('head')
    localStorage.preferredThemeMode = 'dark'
  } else {
    $("LINK[href='/css/dark.css']").remove()
    localStorage.preferredThemeMode = 'light'
  }
  setThemeModeSwitchBtnActive(true)
}

// 获取当前的主题颜色模式
const getCurrentThemeMode = () => {
  return $("LINK[href='/css/dark.css']").length === 0 ? 'light' : 'dark'
}

// 初始化切换主题颜色模式功能
const initThemeModeSwitchButton = function () {
  setThemeModeSwitchBtnActive(false)

  // 当前主题颜色模式与用户偏好的主题颜色模式不同时，
  // 切换主题颜色模式
  if (getCurrentThemeMode() !== getPreferredThemeMode()) {
    switchThemeMode()
  }

  $themeModeSwitchBtn.click(function () {
    switchThemeMode()
  })

  setThemeModeSwitchBtnActive(true)
}

initThemeModeSwitchButton()
