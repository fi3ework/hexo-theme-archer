/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var archerUtil = {
  // 回到顶部
  backTop: function backTop(event) {
    event.preventDefault();
    var topTimer = setInterval(function () {
      var currTop = $(document).scrollTop();
      window.scrollTo(0, Math.max(Math.floor(currTop * 0.8)));

      if (currTop === 0) {
        clearInterval(topTimer);
      }
    }, 20);
  },
  // 获取元素在页面上相对左上角的位置
  getAbsPosition: function getAbsPosition(e) {
    var x = e.offsetLeft,
        y = e.offsetTop;

    while (e = e.offsetParent) {
      x += e.offsetLeft;
      y += e.offsetTop;
    }

    return {
      'x': x,
      'y': y
    };
  },
  // 格式化日期
  dateFormater: function dateFormater(date, fmt) {
    var o = {
      'M+': date.getMonth() + 1,
      // 月份
      'd+': date.getDate(),
      // 日
      'h+': date.getHours(),
      // 小时
      'm+': date.getMinutes(),
      // 分
      's+': date.getSeconds(),
      // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3),
      // 季度
      'S': date.getMilliseconds() // 毫秒

    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
      }
    }

    return fmt;
  },
  // rAF的ticking
  rafTick: function rafTick(ticking, updateFunc) {
    if (!ticking) {
      requestAnimationFrame(updateFunc);
    }

    ticking = true;
  }
};
var _default = archerUtil;
exports.default = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Selector = function Selector(classPrefix) {
  return {
    ACTIVE: "".concat(classPrefix, "-active")
  };
};

var Sidebar =
/*#__PURE__*/
function () {
  function Sidebar(options) {
    _classCallCheck(this, Sidebar);

    this.options = _extends({}, Sidebar.defaultOptions, options);
    this.activeIndex = this.options.activeIndex;

    this._initElements();

    this._initTabs();

    this._bindTabsClick();

    this._bindButtonClick();

    this._bindWrapperClick();

    this._bindWrapperTransitionEnd();

    this.preventOver();
  }

  _createClass(Sidebar, [{
    key: "_initElements",
    value: function _initElements() {
      this.$sidebar = $(this.options.sidebar);
      this.$tabs = $(this.options.tabs);
      this.$panels = $(this.options.panels);
      this.$menuButton = $(this.options.menuButton);
      this.$nav = $(this.options.nav);
      this.$content = $(this.options.content);
    }
  }, {
    key: "_initTabs",
    value: function _initTabs() {
      this.$tabs.each(function (index, tab) {
        $(tab).data('tabIndex', index);
      });
    }
  }, {
    key: "activateSidebar",
    value: function activateSidebar() {
      $('.wrapper').addClass('wrapper-sidebar-active');
      $('.header').addClass('header-sidebar-active');
      $('.toc-wrapper').addClass('toc-slide');
      this.$sidebar.removeClass('sidebar-hide');
      this.$sidebar.addClass('sidebar-active');
    }
  }, {
    key: "_inactivateSidebar",
    value: function _inactivateSidebar() {
      $('.wrapper').removeClass('wrapper-sidebar-active');
      $('.header').removeClass('header-sidebar-active');
      $('.toc-wrapper').removeClass('toc-slide');
      this.$sidebar.removeClass("sidebar-active");
    }
  }, {
    key: "switchTo",
    value: function switchTo(toIndex) {
      this._switchTo(toIndex);
    }
  }, {
    key: "_switchTab",
    value: function _switchTab(toIndex) {
      for (var i = 0; i < 3; i++) {
        if (i !== toIndex) {
          this.$nav.removeClass("sidebar-tabs-active-".concat(i));
        } else {
          this.$nav.addClass("sidebar-tabs-active-".concat(i));
        }
      }
    }
  }, {
    key: "_bindWrapperTransitionEnd",
    value: function _bindWrapperTransitionEnd() {
      var _this = this;

      $('.wrapper').on('transitionend', function (e) {
        if (!_this.$sidebar.hasClass('sidebar-active')) {
          _this.$sidebar.addClass('sidebar-hide');
        }
      });
    }
  }, {
    key: "_switchPanel",
    value: function _switchPanel(toIndex) {
      for (var i = 0; i < 3; i++) {
        if (i !== toIndex) {
          this.$content.removeClass("sidebar-content-active-".concat(i));
        } else {
          this.$content.addClass("sidebar-content-active-".concat(i));
        }
      }
    }
  }, {
    key: "_switchTo",
    value: function _switchTo(toIndex) {
      this._switchTab(toIndex);

      this._switchPanel(toIndex);
    }
  }, {
    key: "_bindTabsClick",
    value: function _bindTabsClick() {
      var _this2 = this;

      this.$tabs.click(function (e) {
        var $target = $(e.target);

        _this2.switchTo($target.data('tabIndex'));
      });
    }
  }, {
    key: "_bindButtonClick",
    value: function _bindButtonClick() {
      var _this3 = this;

      this.$menuButton.click(function (e) {
        _this3.activateSidebar();
      });
    }
  }, {
    key: "_bindWrapperClick",
    value: function _bindWrapperClick() {
      var _this4 = this;

      $('.wrapper').click(function (e) {
        _this4._inactivateSidebar();
      });
    } // 阻止sidebarContent在滚动到顶部或底部时继续滚动

  }, {
    key: "preventOver",
    value: function preventOver() {
      var $sidebar = this.$sidebar;
      var that = this;
      var $sidebarArchive = $sidebar.find('.sidebar-panel-archives');
      var $sidebarTagsList = $sidebar.find('.sidebar-tags-list');
      var $sidebarCategoriesList = $sidebar.find('.sidebar-categories-list');
      this.$sidebar.on('mousewheel', function (eve) {
        var target = eve.target;

        if ($.contains($sidebarTagsList[0], target) || $sidebarTagsList === target) {
          that.stopSidebarEdgeScroll.call($sidebarTagsList[0], eve);
        } else if ($.contains($sidebarArchive[0], target) || $sidebarArchive === target) {
          that.stopSidebarEdgeScroll.call($sidebarArchive[0], eve);
        } else if ($.contains($sidebarCategoriesList[0], target) || $sidebarCategoriesList === target) {
          that.stopSidebarEdgeScroll.call($sidebarCategoriesList[0], eve);
        } else {
          eve.preventDefault();
        }
      });
    } // 阻止滚轮在sidebar滚动越界, 1. 没有滚动条直接禁止滚动 2. 触顶禁止上滚 3. 触底禁止下滚

  }, {
    key: "stopSidebarEdgeScroll",
    value: function stopSidebarEdgeScroll(eve) {
      window.addEventListener('scroll', function (e) {
        e.preventDefault();
      });

      if (this.scrollHeight === this.clientHeight) {
        window.event.preventDefault();
      } else if (this.scrollTop <= 0) {
        if (eve.originalEvent.wheelDelta > 0) {
          window.event.preventDefault();
        }
      } else if (this.scrollTop >= this.scrollHeight - this.clientHeight) {
        if (eve.originalEvent.wheelDelta < 0) {
          window.event.preventDefault();
        }
      }
    }
  }]);

  return Sidebar;
}();

Object.defineProperty(Sidebar, "defaultOptions", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    activeIndex: 0
  }
});
var mySidebar = new Sidebar({
  sidebar: '.sidebar',
  nav: '.sidebar-tabs',
  tabs: '.sidebar-tabs li',
  content: '.sidebar-content',
  panels: '.sideabar-contents > div',
  menuButton: '.header-sidebar-menu'
});
var _default = mySidebar;
exports.default = _default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _init = __webpack_require__(3);

var _scroll = __webpack_require__(4);

var _mobile = __webpack_require__(5);

var _sidebar = _interopRequireDefault(__webpack_require__(1));

var _tag = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.info('hexo-theme-archer: v20180109');
(0, _init.init)();
(0, _scroll.scroll)();
var sidebarTags = new _tag.default('tags', '.sidebar-tags-list', '.sidebar-tags-name');
var sidebarCategories = new _tag.default('categories', '.sidebar-categories-list', '.sidebar-categories-name');
(0, _mobile.initMobile)();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var init = function init() {
  var $introImg = $('.site-intro-img:first'),
      introPlaceholder = $('.site-intro-placeholder:first'),
      bgCSS = $introImg.css('background-image'),
      bgRegResult = bgCSS.match(/url\("*([^"]*)"*\)/);

  if (bgRegResult.length < 2) {
    console.log(bgRegResult);
    return;
  }

  var bgURL = bgRegResult[1],
      img = new Image();

  img.onload = function () {
    introPlaceholder.remove();
    console.info('PLACEHOLDER REMOVED');
  };

  img.src = bgURL;
};

exports.init = init;
document.addEventListener('DOMContentLoaded', function () {
  $('.container').removeClass('container-unloaded');
  $('.footer').removeClass('footer-unloaded');
  $('.loading').remove();
}, false);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scroll = void 0;

var _util = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scroll = function scroll() {
  var $banner = $('.banner:first'),
      $postBanner = $banner.find('.post-title a'),
      $bgEle = $('.site-intro:first'),
      $homeLink = $('.home-link:first'),
      $backTop = $('.back-top:first'),
      $sidebarMenu = $('.header-sidebar-menu:first'),
      bgTitleHeight = $bgEle.offset().top + $bgEle.outerHeight(),
      $tocWrapper = $('.toc-wrapper:first'),
      $tocCatalog = $tocWrapper.find('.toc-catalog'),
      $progressBar = $('.read-progress'); // toc的收缩

  $tocCatalog.on('click', function () {
    $tocWrapper.toggleClass('toc-hide-children');
  }); // 滚动式切换文章标题和站点标题

  var previousHeight = 0,
      continueScroll = 0;

  function isScrollingUpOrDown(currTop) {
    continueScroll += currTop - previousHeight;

    if (continueScroll > 30) {
      // 向下滑动
      continueScroll = 0;
      return 1;
    } else if (continueScroll < -800) {
      // 向上滑动
      continueScroll = 0;
      return -1;
    } else {
      return 0;
    }
  } // 是否在向上或向下滚动


  var crossingState = -1;
  var isHigherThanIntro = true;

  function isCrossingIntro(currTop) {
    // 向下滑动超过intro
    if (currTop > bgTitleHeight) {
      if (crossingState !== 1) {
        crossingState = 1;
        isHigherThanIntro = false;
        return 1;
      }
    } else {
      // 向上滑动超过intro
      if (crossingState !== -1) {
        crossingState = -1;
        isHigherThanIntro = true;
        return -1;
      }
    }

    return 0;
  } // 判断是否为post-page


  var isPostPage = false;
  var articleHeight, articleTop;

  if ($('.post-body').length) {
    isPostPage = true;
    articleTop = bgTitleHeight; // 如果执行时动画已执行完毕

    articleHeight = $('.article-entry').outerHeight(); // 如果执行时动画未执行完毕

    articleHeight = $('.container')[0].addEventListener('transitionend', function () {
      articleHeight = $('.article-entry').outerHeight();
    });
  }

  function updateProgress(scrollTop, beginY, contentHeight) {
    // console.log(scrollTop);
    // console.log(beginY);
    // console.log(contentHeight);
    var windowHeight = $(window).height();
    var readPercent;

    if (scrollTop < bgTitleHeight) {
      readPercent = 0;
    } else {
      readPercent = (scrollTop - beginY) / (contentHeight - windowHeight) * 100;
    } // 防止文章过短，产生负百分比


    readPercent = readPercent >= 0 ? readPercent : 100;
    $progressBar.css('width', "".concat(readPercent, "%"));
  } // rAF操作


  var tickingScroll = false;

  function updateScroll(scrollTop) {
    var crossingState = isCrossingIntro(scrollTop); // intro边界切换

    if (crossingState === 1) {
      $tocWrapper.addClass('toc-fixed');
      $homeLink.addClass('home-link-hide');
      $backTop.addClass('back-top-show');
      $sidebarMenu.addClass('header-sidebar-menu-black');
    } else if (crossingState === -1) {
      $tocWrapper.removeClass('toc-fixed');
      $homeLink.removeClass('home-link-hide');
      $banner.removeClass('banner-show');
      $backTop.removeClass('back-top-show');
      $sidebarMenu.removeClass('header-sidebar-menu-black');
    } // 如果不是post - page 以下忽略


    if (isPostPage) {
      // 上下滑动一定距离显示/隐藏header
      var upDownState = isScrollingUpOrDown(scrollTop);

      if (upDownState === 1) {
        $banner.removeClass('banner-show');
      } else if (upDownState === -1 && !isHigherThanIntro) {
        $banner.addClass('banner-show');
      } // 进度条君的长度


      updateProgress(scrollTop, articleTop, articleHeight);
    }

    previousHeight = scrollTop;
    tickingScroll = false;
  } // scroll回调


  function onScroll() {
    var scrollTop = $(document).scrollTop();
    var bindedUpdate = updateScroll.bind(null, scrollTop);

    _util.default.rafTick(tickingScroll, bindedUpdate);
  }

  $(document).on('scroll', onScroll); // 返回顶部

  [$postBanner, $backTop].forEach(function (ele) {
    ele.on('click', _util.default.backTop);
  });
};

exports.scroll = scroll;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMobile = void 0;

var initMobile = function initMobile() {
  if (window.matchMedia) {
    var mql = window.matchMedia('(max-width: 900px)');
    mql.addListener(mediaChangeHandler);
    mediaChangeHandler(mql);
  } else {
    window.addListener('resize', function () {
      var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      mediaChangeHandler(innerWidth > 900 ? {
        matches: false
      } : {
        matches: true
      });
    }, false);
  }

  function mediaChangeHandler(mql) {
    if (mql.matches) {
      console.log('mobile'); // TODO: why

      mobilePreventScrollBreakdown(); // document.body.addEventListener('touchstart', function () {})
    } else {
      console.log('desktop');
    }
  }

  function mobilePreventScrollBreakdown() {}
};

exports.initMobile = initMobile;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(__webpack_require__(0));

var _sidebar = _interopRequireDefault(__webpack_require__(1));

var _eventemitter = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InitSidebarLink =
/*#__PURE__*/
function () {
  function InitSidebarLink(metaName, postList, labelsContainer) {
    _classCallCheck(this, InitSidebarLink);

    this._initIndexMap = this._initIndexMap.bind(this);
    this.metaName = metaName;
    this.currentQuery = '';
    this.indexMap = new Map();
    this.postList = document.querySelector(postList);
    this.labelsContainer = document.querySelector(labelsContainer);
    this.initInfo(); // lazy func

    this.initIndexMap();
    this.bindLabelClick();
    this.bindOtherClick();
  }

  _createClass(InitSidebarLink, [{
    key: "initInfo",
    value: function initInfo() {
      // jsInfo is from js-info.ejs
      var contentURL = jsInfo.root + 'content.json?t=' + Number(new Date());
      var xhr = new XMLHttpRequest();
      xhr.responseType = '';
      xhr.open('get', contentURL, true);
      var $loadFailed = $('.tag-load-fail');

      xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
          $loadFailed.remove();
          InitSidebarLink.contentJSON = JSON.parse(this.responseText);
          InitSidebarLink.emitter.emit('json ininted'); // that.initIndexMap()
          // initTagMap(InitSidebaLink.contentJSON)
        } else {
          // showTagLoadFail($tagLoadFail)
          this.postList.remove();
        }
      };

      xhr.send();

      Object.getPrototypeOf(this).initInfo = function () {
        return console.log('initInfo function is lazyed');
      };
    }
  }, {
    key: "initIndexMap",
    value: function initIndexMap() {
      InitSidebarLink.emitter.on('json ininted', this._initIndexMap);
    }
  }, {
    key: "updateList",
    value: function updateList(corrArr) {
      var _this = this;

      var frag = document.createDocumentFragment();
      this.postList.innerHTML = '';
      corrArr.forEach(function (item) {
        frag.appendChild(_this._createPostDom(item)[0]);
      });
      this.postList.appendChild(frag);
    }
  }, {
    key: "bindLabelClick",
    value: function bindLabelClick() {
      var _this2 = this;

      this.labelsContainer.addEventListener('click', function (e) {
        var currLabelName = e.target.getAttribute("data-".concat(_this2.metaName));

        if (typeof currLabelName === 'string') {
          _this2.currLabelName = currLabelName;

          _this2.switchLabel(_this2.currLabelName);
        }
      });
    }
  }, {
    key: "bindOtherClick",
    value: function bindOtherClick() {
      var _this3 = this;

      document.body.addEventListener('click', function (e) {
        if (e.target.className === 'post-tag') {
          e.stopPropagation();

          _sidebar.default.activateSidebar();

          _sidebar.default.switchTo(1);

          var currLabelName = e.target.getAttribute("data-tags");
          _this3.currLabelName = currLabelName;

          _this3.switchLabel(_this3.currLabelName);
        }
      });

      Object.getPrototypeOf(this).bindOtherClick = function () {
        return console.log('bindOtherClick function is lazyed');
      };
    }
  }, {
    key: "_switchFocus",
    value: function _switchFocus(label) {
      var _this4 = this;

      var currFocus = this.labelsContainer.getElementsByClassName('sidebar-label-focus');

      _toConsumableArray(currFocus).forEach(function (item) {
        return item.classList.remove('sidebar-label-focus');
      });

      _toConsumableArray(this.labelsContainer.children).forEach(function (item) {
        if (item.getAttribute("data-".concat(_this4.metaName)) === label) {
          item.classList.add('sidebar-label-focus');
        }
      });
    }
  }, {
    key: "switchLabel",
    value: function switchLabel(label) {
      this._switchFocus(label);

      var indexArr = this.indexMap.get(label);
      var corrArr = indexArr.map(function (index) {
        return InitSidebarLink.contentJSON[index];
      });
      this.updateList(corrArr);
    }
  }, {
    key: "_createPostDom",
    value: function _createPostDom(postInfo) {
      var $tagItem = $('<li class="meta-post-item"><span class="meta-post-date">' + _util.default.dateFormater(new Date(Date.parse(postInfo.date)), 'yyyy/MM/dd') + '</span></li>');
      var $aItem = $('<a class="meta-post-title" href="' + jsInfo.root + postInfo.path + '">' + postInfo.title + '</a>');
      $tagItem.append($aItem);
      return $tagItem;
    }
  }, {
    key: "_initIndexMap",
    value: function _initIndexMap() {
      var _this5 = this;

      var contentJSON = InitSidebarLink.contentJSON;

      var _loop = function _loop(postIndex) {
        var currPostTags = contentJSON[postIndex][_this5.metaName]; // if there is any post has a tag

        if (currPostTags.length) {
          currPostTags.forEach(function (tag) {
            if (_this5.indexMap.has(tag.slug)) {
              _this5.indexMap.get(tag.slug).push(postIndex);
            } else {
              _this5.indexMap.set(tag.slug, [postIndex]);
            }
          });
        }
      };

      for (var postIndex = 0; postIndex < contentJSON.length; postIndex++) {
        _loop(postIndex);
      }

      if (!this.indexMap.size) {
        document.getElementsByClassName("sidebar-".concat(this.metaName, "-empty"))[0].classList.add("sidebar-".concat(this.metaName, "-empty-active"));
      }
    }
  }]);

  return InitSidebarLink;
}();

Object.defineProperty(InitSidebarLink, "contentJSON", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0
});
Object.defineProperty(InitSidebarLink, "emitter", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: new _eventemitter.default()
});
var _default = InitSidebarLink;
exports.default = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ })
/******/ ]);