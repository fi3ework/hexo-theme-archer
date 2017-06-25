/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    // 顶部标题栏切换
	    var postTitleEle = document.getElementsByClassName("post-title")[0],
	        postTitleHeight = _util2.default.getAbsPosition(postTitleEle).y,
	        toggleBanner = document.getElementsByClassName("site-post-banner")[0],
	        isPostTitleShow = 0,
	        postTitle = document.getElementsByClassName("post-name")[0];

	    function toggleHeader() {
	        // 超过标题
	        if (document.body.scrollTop > postTitleHeight) {
	            if (!isPostTitleShow) {
	                toggleBanner.classList.add("post-banner-show");
	                toggleBanner.classList.remove("blog-banner-show");
	                isPostTitleShow = 1;
	            }
	            // 没有超过标题
	        } else {
	            if (isPostTitleShow) {
	                toggleBanner.classList.add("blog-banner-show");
	                toggleBanner.classList.remove("post-banner-show");
	                isPostTitleShow = 0;
	            }
	        }
	    }

	    // 滚动时切换标题    
	    document.addEventListener("scroll", toggleHeader);
	    // 点击文章标题回页首
	    postTitle.addEventListener("click", _util2.default.backTop);
	})();

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var tinkerUtil = {
	    backTop: function backTop() {
	        var topTimer = setInterval(function () {
	            var currTop = document.body.scrollTop;
	            document.body.scrollTop -= Math.max(Math.ceil(currTop / 9) + 2);
	            if (currTop === 0) {
	                clearInterval(topTimer);
	            }
	        }, 20);
	    },

	    // 获取元素在页面上相对左上角的位置
	    getAbsPosition: function getAbsPosition(e) {
	        var x = e.offsetLeft;
	        var y = e.offsetTop;
	        while (e = e.offsetParent) {
	            x += e.offsetLeft;
	            y += e.offsetTop;
	        }
	        return {
	            "x": x,
	            "y": y
	        };
	    }
	};

	module.exports = tinkerUtil;

/***/ })
/******/ ]);