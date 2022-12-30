const copyBtnEleSetup = (el) => {
  $(el).wrap("<div class='code-wrapper' style='position: relative;'></div>")
  $(el).before(
    "<button class='btn-copy'><i class='fa fa-clipboard'></i></button>"
  )
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
