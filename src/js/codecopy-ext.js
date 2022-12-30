import archerUtil from './util'

const copyBtnEleSetup = (el) => {
  let container = document.createElement('div')
  container.classList.add('code-wrapper')
  container.style.position = 'relative'
  archerUtil.wrap(el, container)

  // Insert copy button to the target element
  let copyBtn = document.createElement('button')
  copyBtn.classList.add('btn-copy')
  copyBtn.setAttribute('data-clipboard-snippet', '')
  copyBtn.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>"
  el.parentNode.insertBefore(copyBtn, el)
}

const copyBtnEveSetup = () => {
  let clipboard = new ClipboardJS('.btn-copy', {
    target: function target(trigger) {
      return trigger.nextElementSibling
    },
  })
  clipboard.on('success', function (e) {
    e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制成功</span>"
    setTimeout(function () {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>"
    }, 1000)
    e.clearSelection()
  })
  clipboard.on('error', function (e) {
    e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制失败</span>"
    setTimeout(function () {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>"
    }, 1000)
    e.clearSelection()
  })
}

const copyBtnInit = () => {
  document.querySelectorAll('.highlight').forEach(copyBtnEleSetup)
  copyBtnEveSetup()
}

copyBtnInit()
