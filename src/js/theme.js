const THEME_DARK_STYLESHEET_ID = 'stylesheet-theme-dark'
const $themeModeSwitchBtn = $('.header-theme-btn')

/** 获取用户偏好的主题颜色模式 */
const getPreferredThemeMode = () => {
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

/** 设置切换主题按钮可点击 */
const setThemeModeSwitchBtnActive = (active) => {
  if (active) {
    $themeModeSwitchBtn.removeClass('header-theme-btn-disabled')
  } else {
    $themeModeSwitchBtn.addClass('header-theme-btn-disabled')
  }
}

/** 切换主题颜色模式 */
const switchThemeMode = () => {
  setThemeModeSwitchBtnActive(false)

  const root = window.siteMeta?.root || '/'
  const $darkModeSourceLink = $(`LINK[id='${THEME_DARK_STYLESHEET_ID}`)
  if ($darkModeSourceLink.length === 1) {
    $darkModeSourceLink.remove()
    localStorage.preferredThemeMode = 'light'
  } else {
    $('<link>')
      .attr({
        id: THEME_DARK_STYLESHEET_ID,
        rel: 'stylesheet',
        type: 'text/css',
        href: `${root}css/dark.css`,
      })
      .appendTo('head')
    localStorage.preferredThemeMode = 'dark'
  }

  setThemeModeSwitchBtnActive(true)
}

/** 初始化切换主题颜色模式功能 */
const initTheme = () => {
  setThemeModeSwitchBtnActive(false)

  // 默认情况下，自动加载暗色主题
  // 若用户偏好浅色主题，则切换至浅色主题
  if (getPreferredThemeMode() === 'light') {
    switchThemeMode()
  }

  $themeModeSwitchBtn.click(() => {
    switchThemeMode()
  })

  setThemeModeSwitchBtnActive(true)
}

export default initTheme
