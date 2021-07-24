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

// 设置主题颜色模式
const setThemeMode = (mode) => {
  if (mode === 'dark') {
    $('<link>')
      .attr({ rel: 'stylesheet', type: 'text/css', href: '/css/dark.css' })
      .appendTo('head')
  } else {
    $("LINK[href='/css/dark.css']").remove()
  }
}

// 切换主题颜色模式
const switchThemeMode = function () {
  if (getPreferredThemeMode() === 'dark') {
    // 切换为 light 模式
    setThemeMode('light')
    localStorage.preferredThemeMode = 'light'
  } else {
    // 切换为 dark 模式
    setThemeMode('dark')
    localStorage.preferredThemeMode = 'dark'
  }
}

// 初始化切换主题颜色模式功能
const initThemeModeSwitchButton = function () {
  const currentThemeMode = getPreferredThemeMode()
  setThemeMode(currentThemeMode)
  localStorage.preferredThemeMode = currentThemeMode

  const $themeModeSwitchBtn = $('.header-theme-btn')
  $themeModeSwitchBtn.click(function () {
    switchThemeMode()
  })
}

initThemeModeSwitchButton()
