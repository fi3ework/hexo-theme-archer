const archerUtil = {
  // 回到顶部
  backTop: function (event) {
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  },

  // 获取元素在页面上相对左上角的位置
  getAbsPosition: function (e) {
    let x = e.offsetLeft,
      y = e.offsetTop
    while ((e = e.offsetParent)) {
      x += e.offsetLeft
      y += e.offsetTop
    }
    return {
      x: x,
      y: y,
    }
  },

  // 格式化日期
  dateFormater: function (date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        String(date.getFullYear()).substr(4 - RegExp.$1.length)
      )
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(String(o[k]).length)
        )
      }
    }
    return fmt
  },

  // rAF 的 ticking
  rafTick: function (ticking, updateFunc) {
    if (!ticking) {
      requestAnimationFrame(updateFunc)
    }
    ticking = true
  },

  // 函数节流
  throttle: function (func, wait, immediate = false) {
    let timer
    return function () {
      const args = arguments
      if (!timer) {
        if (immediate) {
          timer = setTimeout(() => {
            timer = undefined
          }, wait)
          func.apply(this, args)
        } else {
          timer = setTimeout(() => {
            timer = undefined
            func.apply(this, args)
          }, wait)
        }
      }
    }
  },

  // 函数防抖
  debounce: function (func, wait, immediate = false) {
    let timer
    return function () {
      const args = arguments

      timer && clearTimeout(timer)

      if (immediate) {
        !timer && func.apply(this, args)
        timer = setTimeout(() => {
          timer = undefined
        }, wait)
      } else {
        timer = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    }
  },
}

export default archerUtil
