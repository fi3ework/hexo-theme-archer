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

	'use strict';

	var _toggleAvatar = __webpack_require__(1);

	var _toggleAvatar2 = _interopRequireDefault(_toggleAvatar);

	var _toggleHeader = __webpack_require__(3);

	var _toggleHeader2 = _interopRequireDefault(_toggleHeader);

	var _share = __webpack_require__(4);

	var _share2 = _interopRequireDefault(_share);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _toggleAvatar2.default)();
	(0, _toggleHeader2.default)();
	(0, _share2.default)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toggleAvatar = function toggleAvatar() {
	    // 主页头像切换
	    if (typeof document.getElementsByClassName('home-body')[0] === 'undefined') {
	        return;
	    }
	    var profileAvatar = document.getElementsByClassName("profile-avatar")[0],
	        headerAvatar = document.getElementsByClassName("header-avatar")[0];
	    if (typeof profileAvatar !== 'undefined') {
	        var _toggleAvatar = function _toggleAvatar() {
	            if (document.body.scrollTop > profileAvatarHeight) {
	                if (!isHeaderAvatarShow) {
	                    isHeaderAvatarShow = 1;
	                    headerAvatar.classList.add("header-avatar-animate");
	                }
	            } else {
	                if (isHeaderAvatarShow) {
	                    isHeaderAvatarShow = 0;
	                    headerAvatar.classList.remove("header-avatar-animate");
	                }
	            }
	        };
	        // header头像切换


	        var profileAvatarHeight = _util2.default.getAbsPosition(profileAvatar).y,
	            isHeaderAvatarShow = 0;

	        document.addEventListener("scroll", _toggleAvatar);
	        // header头像点击回顶部
	        headerAvatar.addEventListener("click", _util2.default.backTop);
	    }
	};

	module.exports = toggleAvatar;

/***/ }),
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toggleHeader = function toggleHeader() {
	    // 顶部标题栏切换
	    if (typeof document.getElementsByClassName('post-body')[0] === 'undefined') {
	        return;
	    }
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
	};

	module.exports = toggleHeader;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	// generate the share link
	function generateURL(url, opt) {
	    return url.replace(/<%-sURL%>/g, opt.sURL).replace(/<%-sTitle%>/g, opt.sTitle).replace(/<%-sDesc%>/g, opt.sDesc).replace(/<%-sPic%>/g, opt.sPic);
	}

	// switch which site to share
	function switchToShare(className, opt) {
	    var combindedURL = void 0;
	    switch (className) {
	        case 'to-weibo':
	            combindedURL = generateURL('http://service.weibo.com/share/share.php?url=<%-sURL%>&title=<%-sTitle%>&pic=<%-sPic%>', opt);
	            break;
	        case 'to-wechat':
	            combindedURL = generateURL('', opt);
	            break;
	        case 'to-qq':
	            combindedURL = generateURL('', opt);
	            break;
	        case 'to-twitter':
	            combindedURL = generateURL('', opt);
	            break;
	        default:
	            break;
	    }
	    window.open(combindedURL);
	}

	var initShareBox = function initShareBox() {
	    // show share
	    function showShare(eve) {
	        var shareBox = this.getElementsByClassName('share-box')[0];
	        shareBox.classList.add('share-box-show');
	        initShare(shareBox);
	    }

	    // hide share
	    function hideShare() {
	        var shareBox = this.getElementsByClassName('share-box')[0];
	        shareBox.classList.remove('share-box-show');
	    }

	    // click event    
	    var shareButtons = document.getElementsByClassName('post-share');
	    var i = shareButtons.length;
	    while (i--) {
	        // document.body.addEventListener('mouse', hideShare);
	        shareButtons[i].addEventListener('mouseover', showShare);
	        shareButtons[i].addEventListener('mouseout', hideShare);
	    }
	};

	function initShare(shareBox) {
	    var shareBtns = shareBox.querySelectorAll('li');
	    console.log(shareBox);
	    var opt = {
	        sURL: shareBox.dataset.href,
	        sTitle: shareBox.dataset.title,
	        sDesc: shareBox.dataset.title,
	        sPic: ''
	    };
	    shareBtns.forEach(function (ele) {
	        ele.addEventListener('click', function (eve) {
	            console.log(opt.sURL);
	            console.log(opt.sTitle);
	            console.log(opt.sDesc);
	            switchToShare(this.className, opt);
	        });
	    }, this);
	}

	module.exports = initShareBox;

/***/ })
/******/ ]);