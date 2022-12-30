import archerUtil from './util'

const copyBtnEleSetup = (el) => {
  let container = document.createElement('div')
  container.classList.add('code-wrapper')
  container.style.position = 'relative'
  archerUtil.wrap(el, container)

  // Insert copy button to the target element
  let copyBtn = document.createElement('button')
  copyBtn.classList.add('btn-copy')
  copyBtn.innerHTML = "<i class='fa fa-clipboard'></i>"
  el.parentNode.insertBefore(copyBtn, el)
}

const copyBtnEveSetup = () => {
  let clipboard = new ClipboardJS('.btn-copy', {
    text: function (trigger) {
      const codeLines = trigger.nextElementSibling.querySelectorAll('td.code')
      return Array.from(codeLines)
        .map((it) => it.innerText)
        .join('\n')
    },
  })
  clipboard.on('success', function (e) {
    e.trigger.innerHTML = "<i class='fas fa-clipboard-check'></i>"
    setTimeout(function () {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i>"
    }, 1000)
    e.clearSelection()
  })
  clipboard.on('error', function (e) {
    e.trigger.innerHTML = "<i class='fas fa-exclamation-triangle'></i>"
    setTimeout(function () {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i>"
    }, 1000)
    e.clearSelection()
  })
}

const copyBtnInit = () => {
  document.querySelectorAll('.highlight').forEach(copyBtnEleSetup)
  copyBtnEveSetup()
}

copyBtnInit()
