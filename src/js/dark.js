const $themeModeSwitchBtn = $('.header-theme-btn')

// 获取用户偏好的主题颜色模式
const getPreferredThemeMode = function () {
  let preferredThemeMode = localStorage.preferredThemeMode
  if (!preferredThemeMode) {
    // 首次访问时，设置用户偏好主题颜色模式为系统偏好主题颜色模式
    preferredThemeMode = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    localStorage.preferredThemeMode = preferredThemeMode
  } else {
    preferredThemeMode = preferredThemeMode === 'dark' ? 'dark' : 'light'
  }
  return preferredThemeMode
}

// 设置切换主题按钮可点击
const setThemeModeSwitchBtnActive = (active) => {
  if (active) {
    $themeModeSwitchBtn.removeClass('header-theme-btn-disabled')
  } else {
    $themeModeSwitchBtn.addClass('header-theme-btn-disabled')
  }
}

// 切换主题颜色模式
const switchThemeMode = function (root) {
  setThemeModeSwitchBtnActive(false)
  const $darkModeSourceLink = $(`LINK[href='${root}css/dark.css']`)
  if ($darkModeSourceLink.length === 1) {
    $darkModeSourceLink.remove()
    localStorage.preferredThemeMode = 'light'
  } else {
    $('<link>')
      .attr({
        rel: 'stylesheet',
        type: 'text/css',
        href: `${root}css/dark.css`,
      })
      .appendTo('head')
    localStorage.preferredThemeMode = 'dark'
  }
  setThemeModeSwitchBtnActive(true)
}

// 初始化切换主题颜色模式功能
const initThemeModeSwitchButton = function () {
  setThemeModeSwitchBtnActive(false)

  // 默认情况下，加载暗色主题
  // 若用户偏好浅色主题，则切换主题颜色模式
  if (getPreferredThemeMode() === 'light') {
    switchThemeMode(window.siteMeta.root)
  }

  $themeModeSwitchBtn.click(function () {
    switchThemeMode(window.siteMeta.root)
  })

  setThemeModeSwitchBtnActive(true)
}

initThemeModeSwitchButton()
