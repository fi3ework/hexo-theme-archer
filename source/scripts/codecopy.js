/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/js/codecopy.js ***!
  \****************************/
$('.highlight').wrap("<div class='code-wrapper' style='position:relative'></div>");
/*页面载入完成后，创建复制按钮*/
!function (e, t, a) {
  /* code */
  var initCopyCode = function initCopyCode() {
    var copyHtml = '';
    copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
    copyHtml += '  <i class="fa fa-clipboard"></i><span>复制</span>';
    copyHtml += '</button>';
    $('.highlight .code').before(copyHtml);
    var clipboard = new ClipboardJS('.btn-copy', {
      target: function target(trigger) {
        return trigger.nextElementSibling;
      }
    });
    clipboard.on('success', function (e) {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制成功</span>";
      setTimeout(function () {
        e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>";
      }, 1000);
      e.clearSelection();
    });
    clipboard.on('error', function (e) {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制失败</span>";
      setTimeout(function () {
        e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>";
      }, 1000);
      e.clearSelection();
    });
  };
  initCopyCode();
}(window, document);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWNvcHkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQUEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDQyxJQUFJLENBQ2xCLDREQUE0RCxDQUM3RDtBQUNEO0FBQ0EsQ0FBRSxVQUFVQyxDQUFDLEVBQUVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQ25CO0VBQ0EsSUFBSUMsWUFBWSxHQUFHLFNBQWZBLFlBQVksR0FBZTtJQUM3QixJQUFJQyxRQUFRLEdBQUcsRUFBRTtJQUNqQkEsUUFBUSxJQUFJLHFEQUFxRDtJQUNqRUEsUUFBUSxJQUFJLGtEQUFrRDtJQUM5REEsUUFBUSxJQUFJLFdBQVc7SUFDdkJOLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDTyxNQUFNLENBQUNELFFBQVEsQ0FBQztJQUN0QyxJQUFJRSxTQUFTLEdBQUcsSUFBSUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtNQUMzQ0MsTUFBTSxFQUFFLGdCQUFVQyxPQUFPLEVBQUU7UUFDekIsT0FBT0EsT0FBTyxDQUFDQyxrQkFBa0I7TUFDbkM7SUFDRixDQUFDLENBQUM7SUFDRkosU0FBUyxDQUFDSyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVVYLENBQUMsRUFBRTtNQUNuQ0EsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FDakIsa0RBQWtEO01BQ3BEQyxVQUFVLENBQUMsWUFBWTtRQUNyQmIsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FBRyxnREFBZ0Q7TUFDeEUsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUVSWixDQUFDLENBQUNjLGNBQWMsRUFBRTtJQUNwQixDQUFDLENBQUM7SUFDRlIsU0FBUyxDQUFDSyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVVYLENBQUMsRUFBRTtNQUNqQ0EsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FDakIsa0RBQWtEO01BQ3BEQyxVQUFVLENBQUMsWUFBWTtRQUNyQmIsQ0FBQyxDQUFDUyxPQUFPLENBQUNHLFNBQVMsR0FBRyxnREFBZ0Q7TUFDeEUsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUNSWixDQUFDLENBQUNjLGNBQWMsRUFBRTtJQUNwQixDQUFDLENBQUM7RUFDSixDQUFDO0VBQ0RYLFlBQVksRUFBRTtBQUNoQixDQUFDLENBQUVZLE1BQU0sRUFBRUMsUUFBUSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZXhvLXRoZW1lLWFyY2hlci8uL3NyYy9qcy9jb2RlY29weS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCcuaGlnaGxpZ2h0Jykud3JhcChcbiAgXCI8ZGl2IGNsYXNzPSdjb2RlLXdyYXBwZXInIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZSc+PC9kaXY+XCJcbilcbi8q6aG16Z2i6L295YWl5a6M5oiQ5ZCO77yM5Yib5bu65aSN5Yi25oyJ6ZKuKi9cbiEoZnVuY3Rpb24gKGUsIHQsIGEpIHtcbiAgLyogY29kZSAqL1xuICB2YXIgaW5pdENvcHlDb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3B5SHRtbCA9ICcnXG4gICAgY29weUh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJidG4tY29weVwiIGRhdGEtY2xpcGJvYXJkLXNuaXBwZXQ9XCJcIj4nXG4gICAgY29weUh0bWwgKz0gJyAgPGkgY2xhc3M9XCJmYSBmYS1jbGlwYm9hcmRcIj48L2k+PHNwYW4+5aSN5Yi2PC9zcGFuPidcbiAgICBjb3B5SHRtbCArPSAnPC9idXR0b24+J1xuICAgICQoJy5oaWdobGlnaHQgLmNvZGUnKS5iZWZvcmUoY29weUh0bWwpXG4gICAgdmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmRKUygnLmJ0bi1jb3B5Jywge1xuICAgICAgdGFyZ2V0OiBmdW5jdGlvbiAodHJpZ2dlcikge1xuICAgICAgICByZXR1cm4gdHJpZ2dlci5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgIH0sXG4gICAgfSlcbiAgICBjbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9XG4gICAgICAgIFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItuaIkOWKnzwvc3Bhbj5cIlxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGUudHJpZ2dlci5pbm5lckhUTUwgPSBcIjxpIGNsYXNzPSdmYSBmYS1jbGlwYm9hcmQnPjwvaT48c3Bhbj7lpI3liLY8L3NwYW4+XCJcbiAgICAgIH0sIDEwMDApXG5cbiAgICAgIGUuY2xlYXJTZWxlY3Rpb24oKVxuICAgIH0pXG4gICAgY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnRyaWdnZXIuaW5uZXJIVE1MID1cbiAgICAgICAgXCI8aSBjbGFzcz0nZmEgZmEtY2xpcGJvYXJkJz48L2k+PHNwYW4+5aSN5Yi25aSx6LSlPC9zcGFuPlwiXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9IFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItjwvc3Bhbj5cIlxuICAgICAgfSwgMTAwMClcbiAgICAgIGUuY2xlYXJTZWxlY3Rpb24oKVxuICAgIH0pXG4gIH1cbiAgaW5pdENvcHlDb2RlKClcbn0pKHdpbmRvdywgZG9jdW1lbnQpXG4iXSwibmFtZXMiOlsiJCIsIndyYXAiLCJlIiwidCIsImEiLCJpbml0Q29weUNvZGUiLCJjb3B5SHRtbCIsImJlZm9yZSIsImNsaXBib2FyZCIsIkNsaXBib2FyZEpTIiwidGFyZ2V0IiwidHJpZ2dlciIsIm5leHRFbGVtZW50U2libGluZyIsIm9uIiwiaW5uZXJIVE1MIiwic2V0VGltZW91dCIsImNsZWFyU2VsZWN0aW9uIiwid2luZG93IiwiZG9jdW1lbnQiXSwic291cmNlUm9vdCI6IiJ9