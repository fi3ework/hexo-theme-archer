/******/ ;(() => {
  // webpackBootstrap
  var __webpack_exports__ = {}
  /*!****************************!*\
  !*** ./src/js/codecopy.js ***!
  \****************************/
  $('.highlight').wrap(
    "<div class='code-wrapper' style='position:relative'></div>"
  )
  /*页面载入完成后，创建复制按钮*/
  !(function (e, t, a) {
    /* code */
    var initCopyCode = function initCopyCode() {
      var copyHtml = ''
      copyHtml += '<button class="btn-copy" data-clipboard-snippet="">'
      copyHtml += '  <i class="fa fa-clipboard"></i><span>复制</span>'
      copyHtml += '</button>'
      $('.highlight .code').before(copyHtml)
      var clipboard = new ClipboardJS('.btn-copy', {
        target: function target(trigger) {
          return trigger.nextElementSibling
        },
      })
      clipboard.on('success', function (e) {
        e.trigger.innerHTML =
          "<i class='fa fa-clipboard'></i><span>复制成功</span>"
        setTimeout(function () {
          e.trigger.innerHTML =
            "<i class='fa fa-clipboard'></i><span>复制</span>"
        }, 1000)
        e.clearSelection()
      })
      clipboard.on('error', function (e) {
        e.trigger.innerHTML =
          "<i class='fa fa-clipboard'></i><span>复制失败</span>"
        setTimeout(function () {
          e.trigger.innerHTML =
            "<i class='fa fa-clipboard'></i><span>复制</span>"
        }, 1000)
        e.clearSelection()
      })
    }
    initCopyCode()
  })(window, document)
  /******/
})()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWNvcHkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQUEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDQyxJQUFJLENBQ2hCLDREQUE0RCxDQUM3RDtBQUNEO0FBQ0EsQ0FBRSxVQUFVQyxDQUFDLEVBQUVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQ25CO0VBQ0EsSUFBSUMsWUFBWSxHQUFHLFNBQWZBLFlBQVksR0FBZTtJQUM3QixJQUFJQyxRQUFRLEdBQUcsRUFBRTtJQUNqQkEsUUFBUSxJQUFJLHFEQUFxRDtJQUNqRUEsUUFBUSxJQUFJLGtEQUFrRDtJQUM5REEsUUFBUSxJQUFJLFdBQVc7SUFDdkJOLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDTyxNQUFNLENBQUNELFFBQVEsQ0FBQztJQUN0QyxJQUFJRSxTQUFTLEdBQUcsSUFBSUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtNQUMzQ0MsTUFBTSxFQUFFLGdCQUFVQyxPQUFPLEVBQUU7UUFDekIsT0FBT0EsT0FBTyxDQUFDQyxrQkFBa0I7TUFDbkM7SUFDRixDQUFDLENBQUM7SUFDRkosU0FBUyxDQUFDSyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVVYLENBQUMsRUFBRTtNQUNuQ0EsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FDakIsa0RBQWtEO01BQ3BEQyxVQUFVLENBQUMsWUFBWTtRQUNyQmIsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FBRyxnREFBZ0Q7TUFDeEUsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUVSWixDQUFDLENBQUNjLGNBQWMsRUFBRTtJQUNwQixDQUFDLENBQUM7SUFDRlIsU0FBUyxDQUFDSyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVVYLENBQUMsRUFBRTtNQUNqQ0EsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FDakIsa0RBQWtEO01BQ3BEQyxVQUFVLENBQUMsWUFBWTtRQUNyQmIsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FBRyxnREFBZ0Q7TUFDeEUsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUNSWixDQUFDLENBQUNjLGNBQWMsRUFBRTtJQUNwQixDQUFDLENBQUM7RUFDSixDQUFDO0VBQ0RYLFlBQVksRUFBRTtBQUNoQixDQUFDLENBQUVZLE1BQU0sRUFBRUMsUUFBUSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZXhvLXRoZW1lLWFyY2hlci8uL3NyYy9qcy9jb2RlY29weS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCcuaGlnaGxpZ2h0Jykud3JhcChcclxuICAgIFwiPGRpdiBjbGFzcz0nY29kZS13cmFwcGVyJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmUnPjwvZGl2PlwiXHJcbiAgKVxyXG4gIC8q6aG16Z2i6L295YWl5a6M5oiQ5ZCO77yM5Yib5bu65aSN5Yi25oyJ6ZKuKi9cclxuICAhKGZ1bmN0aW9uIChlLCB0LCBhKSB7XHJcbiAgICAvKiBjb2RlICovXHJcbiAgICB2YXIgaW5pdENvcHlDb2RlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgY29weUh0bWwgPSAnJ1xyXG4gICAgICBjb3B5SHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cImJ0bi1jb3B5XCIgZGF0YS1jbGlwYm9hcmQtc25pcHBldD1cIlwiPidcclxuICAgICAgY29weUh0bWwgKz0gJyAgPGkgY2xhc3M9XCJmYSBmYS1jbGlwYm9hcmRcIj48L2k+PHNwYW4+5aSN5Yi2PC9zcGFuPidcclxuICAgICAgY29weUh0bWwgKz0gJzwvYnV0dG9uPidcclxuICAgICAgJCgnLmhpZ2hsaWdodCAuY29kZScpLmJlZm9yZShjb3B5SHRtbClcclxuICAgICAgdmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmRKUygnLmJ0bi1jb3B5Jywge1xyXG4gICAgICAgIHRhcmdldDogZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgICAgICAgIHJldHVybiB0cmlnZ2VyLm5leHRFbGVtZW50U2libGluZ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIGNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9XHJcbiAgICAgICAgICBcIjxpIGNsYXNzPSdmYSBmYS1jbGlwYm9hcmQnPjwvaT48c3Bhbj7lpI3liLbmiJDlip88L3NwYW4+XCJcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGUudHJpZ2dlci5pbm5lckhUTUwgPSBcIjxpIGNsYXNzPSdmYSBmYS1jbGlwYm9hcmQnPjwvaT48c3Bhbj7lpI3liLY8L3NwYW4+XCJcclxuICAgICAgICB9LCAxMDAwKVxyXG4gIFxyXG4gICAgICAgIGUuY2xlYXJTZWxlY3Rpb24oKVxyXG4gICAgICB9KVxyXG4gICAgICBjbGlwYm9hcmQub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnRyaWdnZXIuaW5uZXJIVE1MID1cclxuICAgICAgICAgIFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItuWksei0pTwvc3Bhbj5cIlxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9IFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItjwvc3Bhbj5cIlxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgZS5jbGVhclNlbGVjdGlvbigpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpbml0Q29weUNvZGUoKVxyXG4gIH0pKHdpbmRvdywgZG9jdW1lbnQpXHJcbiAgIl0sIm5hbWVzIjpbIiQiLCJ3cmFwIiwiZSIsInQiLCJhIiwiaW5pdENvcHlDb2RlIiwiY29weUh0bWwiLCJiZWZvcmUiLCJjbGlwYm9hcmQiLCJDbGlwYm9hcmRKUyIsInRhcmdldCIsInRyaWdnZXIiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJvbiIsImlubmVySFRNTCIsInNldFRpbWVvdXQiLCJjbGVhclNlbGVjdGlvbiIsIndpbmRvdyIsImRvY3VtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==
