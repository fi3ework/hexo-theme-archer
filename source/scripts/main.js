/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/anchor-js/anchor.js":
/*!******************************************!*\
  !*** ./node_modules/anchor-js/anchor.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-env amd */
/* globals module:false */

// https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
  'use strict';

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function () {
  'use strict';

  function AnchorJS(options) {
    this.options = options || {};
    this.elements = [];

    /**
     * Assigns options to the internal options object, and provides defaults.
     * @param {Object} opts - Options object
     */
    function _applyRemainingDefaultOptions(opts) {
      opts.icon = Object.prototype.hasOwnProperty.call(opts, 'icon') ? opts.icon : '\uE9CB'; // Accepts characters (and also URLs?), like  '#', '¶', '❡', or '§'.
      opts.visible = Object.prototype.hasOwnProperty.call(opts, 'visible') ? opts.visible : 'hover'; // Also accepts 'always' & 'touch'
      opts.placement = Object.prototype.hasOwnProperty.call(opts, 'placement') ? opts.placement : 'right'; // Also accepts 'left'
      opts.ariaLabel = Object.prototype.hasOwnProperty.call(opts, 'ariaLabel') ? opts.ariaLabel : 'Anchor'; // Accepts any text.
      opts.class = Object.prototype.hasOwnProperty.call(opts, 'class') ? opts.class : ''; // Accepts any class name.
      opts.base = Object.prototype.hasOwnProperty.call(opts, 'base') ? opts.base : ''; // Accepts any base URI.
      // Using Math.floor here will ensure the value is Number-cast and an integer.
      opts.truncate = Object.prototype.hasOwnProperty.call(opts, 'truncate') ? Math.floor(opts.truncate) : 64; // Accepts any value that can be typecast to a number.
      opts.titleText = Object.prototype.hasOwnProperty.call(opts, 'titleText') ? opts.titleText : ''; // Accepts any text.
    }

    _applyRemainingDefaultOptions(this.options);

    /**
     * Checks to see if this device supports touch. Uses criteria pulled from Modernizr:
     * https://github.com/Modernizr/Modernizr/blob/da22eb27631fc4957f67607fe6042e85c0a84656/feature-detects/touchevents.js#L40
     * @return {Boolean} - true if the current device supports touch.
     */
    this.isTouchDevice = function() {
      return Boolean('ontouchstart' in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch);
    };

    /**
     * Add anchor links to page elements.
     * @param  {String|Array|Nodelist} selector - A CSS selector for targeting the elements you wish to add anchor links
     *                                            to. Also accepts an array or nodeList containing the relavant elements.
     * @return {this}                           - The AnchorJS object
     */
    this.add = function(selector) {
      var elements,
          elsWithIds,
          idList,
          elementID,
          i,
          index,
          count,
          tidyText,
          newTidyText,
          anchor,
          visibleOptionToUse,
          hrefBase,
          indexesToDrop = [];

      // We reapply options here because somebody may have overwritten the default options object when setting options.
      // For example, this overwrites all options but visible:
      //
      // anchors.options = { visible: 'always'; }
      _applyRemainingDefaultOptions(this.options);

      visibleOptionToUse = this.options.visible;
      if (visibleOptionToUse === 'touch') {
        visibleOptionToUse = this.isTouchDevice() ? 'always' : 'hover';
      }

      // Provide a sensible default selector, if none is given.
      if (!selector) {
        selector = 'h2, h3, h4, h5, h6';
      }

      elements = _getElements(selector);

      if (elements.length === 0) {
        return this;
      }

      _addBaselineStyles();

      // We produce a list of existing IDs so we don't generate a duplicate.
      elsWithIds = document.querySelectorAll('[id]');
      idList = [].map.call(elsWithIds, function(el) {
        return el.id;
      });

      for (i = 0; i < elements.length; i++) {
        if (this.hasAnchorJSLink(elements[i])) {
          indexesToDrop.push(i);
          continue;
        }

        if (elements[i].hasAttribute('id')) {
          elementID = elements[i].getAttribute('id');
        } else if (elements[i].hasAttribute('data-anchor-id')) {
          elementID = elements[i].getAttribute('data-anchor-id');
        } else {
          tidyText = this.urlify(elements[i].textContent);

          // Compare our generated ID to existing IDs (and increment it if needed)
          // before we add it to the page.
          newTidyText = tidyText;
          count = 0;
          do {
            if (index !== undefined) {
              newTidyText = tidyText + '-' + count;
            }

            index = idList.indexOf(newTidyText);
            count += 1;
          } while (index !== -1);

          index = undefined;
          idList.push(newTidyText);

          elements[i].setAttribute('id', newTidyText);
          elementID = newTidyText;
        }

        // The following code efficiently builds this DOM structure:
        // `<a class="anchorjs-link ${this.options.class}"
        //     aria-label="${this.options.ariaLabel}"
        //     data-anchorjs-icon="${this.options.icon}"
        //     title="${this.options.titleText}"
        //     href="this.options.base#${elementID}">
        // </a>;`
        anchor = document.createElement('a');
        anchor.className = 'anchorjs-link ' + this.options.class;
        anchor.setAttribute('aria-label', this.options.ariaLabel);
        anchor.setAttribute('data-anchorjs-icon', this.options.icon);
        if (this.options.titleText) {
          anchor.title = this.options.titleText;
        }

        // Adjust the href if there's a <base> tag. See https://github.com/bryanbraun/anchorjs/issues/98
        hrefBase = document.querySelector('base') ? window.location.pathname + window.location.search : '';
        hrefBase = this.options.base || hrefBase;
        anchor.href = hrefBase + '#' + elementID;

        if (visibleOptionToUse === 'always') {
          anchor.style.opacity = '1';
        }

        if (this.options.icon === '\uE9CB') {
          anchor.style.font = '1em/1 anchorjs-icons';

          // We set lineHeight = 1 here because the `anchorjs-icons` font family could otherwise affect the
          // height of the heading. This isn't the case for icons with `placement: left`, so we restore
          // line-height: inherit in that case, ensuring they remain positioned correctly. For more info,
          // see https://github.com/bryanbraun/anchorjs/issues/39.
          if (this.options.placement === 'left') {
            anchor.style.lineHeight = 'inherit';
          }
        }

        if (this.options.placement === 'left') {
          anchor.style.position = 'absolute';
          anchor.style.marginLeft = '-1em';
          anchor.style.paddingRight = '.5em';
          elements[i].insertBefore(anchor, elements[i].firstChild);
        } else { // if the option provided is `right` (or anything else).
          anchor.style.paddingLeft = '.375em';
          elements[i].appendChild(anchor);
        }
      }

      for (i = 0; i < indexesToDrop.length; i++) {
        elements.splice(indexesToDrop[i] - i, 1);
      }

      this.elements = this.elements.concat(elements);

      return this;
    };

    /**
     * Removes all anchorjs-links from elements targeted by the selector.
     * @param  {String|Array|Nodelist} selector - A CSS selector string targeting elements with anchor links,
     *                                            OR a nodeList / array containing the DOM elements.
     * @return {this}                           - The AnchorJS object
     */
    this.remove = function(selector) {
      var index,
          domAnchor,
          elements = _getElements(selector);

      for (var i = 0; i < elements.length; i++) {
        domAnchor = elements[i].querySelector('.anchorjs-link');
        if (domAnchor) {
          // Drop the element from our main list, if it's in there.
          index = this.elements.indexOf(elements[i]);
          if (index !== -1) {
            this.elements.splice(index, 1);
          }

          // Remove the anchor from the DOM.
          elements[i].removeChild(domAnchor);
        }
      }

      return this;
    };

    /**
     * Removes all anchorjs links. Mostly used for tests.
     */
    this.removeAll = function() {
      this.remove(this.elements);
    };

    /**
     * Urlify - Refine text so it makes a good ID.
     *
     * To do this, we remove apostrophes, replace non-safe characters with hyphens,
     * remove extra hyphens, truncate, trim hyphens, and make lowercase.
     *
     * @param  {String} text - Any text. Usually pulled from the webpage element we are linking to.
     * @return {String}      - hyphen-delimited text for use in IDs and URLs.
     */
    this.urlify = function(text) {
      // Decode HTML characters such as '&nbsp;' first.
      var textareaElement = document.createElement('textarea');
      textareaElement.innerHTML = text;
      text = textareaElement.value;

      // Regex for finding the non-safe URL characters (many need escaping):
      //   & +$,:;=?@"#{}|^~[`%!'<>]./()*\ (newlines, tabs, backspace, vertical tabs, and non-breaking space)
      var nonsafeChars = /[& +$,:;=?@"#{}|^~[`%!'<>\]./()*\\\n\t\b\v\u00A0]/g;

      // The reason we include this _applyRemainingDefaultOptions is so urlify can be called independently,
      // even after setting options. This can be useful for tests or other applications.
      if (!this.options.truncate) {
        _applyRemainingDefaultOptions(this.options);
      }

      // Note: we trim hyphens after truncating because truncating can cause dangling hyphens.
      // Example string:                      // " ⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
      return text.trim()                      // "⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
        .replace(/'/gi, '')                   // "⚡⚡ Dont forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
        .replace(nonsafeChars, '-')           // "⚡⚡-Dont-forget--URL-fragments-should-be-i18n-friendly--hyphenated--short--and-clean-"
        .replace(/-{2,}/g, '-')               // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-short-and-clean-"
        .substring(0, this.options.truncate)  // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-"
        .replace(/^-+|-+$/gm, '')             // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated"
        .toLowerCase();                       // "⚡⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated"
    };

    /**
     * Determines if this element already has an AnchorJS link on it.
     * Uses this technique: https://stackoverflow.com/a/5898748/1154642
     * @param    {HTMLElement}  el - a DOM node
     * @return   {Boolean}     true/false
     */
    this.hasAnchorJSLink = function(el) {
      var hasLeftAnchor = el.firstChild && (' ' + el.firstChild.className + ' ').indexOf(' anchorjs-link ') > -1,
          hasRightAnchor = el.lastChild && (' ' + el.lastChild.className + ' ').indexOf(' anchorjs-link ') > -1;

      return hasLeftAnchor || hasRightAnchor || false;
    };

    /**
     * Turns a selector, nodeList, or array of elements into an array of elements (so we can use array methods).
     * It also throws errors on any other inputs. Used to handle inputs to .add and .remove.
     * @param  {String|Array|Nodelist} input - A CSS selector string targeting elements with anchor links,
     *                                         OR a nodeList / array containing the DOM elements.
     * @return {Array} - An array containing the elements we want.
     */
    function _getElements(input) {
      var elements;
      if (typeof input === 'string' || input instanceof String) {
        // See https://davidwalsh.name/nodelist-array for the technique transforming nodeList -> Array.
        elements = [].slice.call(document.querySelectorAll(input));
      // I checked the 'input instanceof NodeList' test in IE9 and modern browsers and it worked for me.
      } else if (Array.isArray(input) || input instanceof NodeList) {
        elements = [].slice.call(input);
      } else {
        throw new TypeError('The selector provided to AnchorJS was invalid.');
      }

      return elements;
    }

    /**
     * _addBaselineStyles
     * Adds baseline styles to the page, used by all AnchorJS links irregardless of configuration.
     */
    function _addBaselineStyles() {
      // We don't want to add global baseline styles if they've been added before.
      if (document.head.querySelector('style.anchorjs') !== null) {
        return;
      }

      var style = document.createElement('style'),
          linkRule =
          '.anchorjs-link{'                        +
            'opacity:0;'                           +
            'text-decoration:none;'                +
            '-webkit-font-smoothing:antialiased;'  +
            '-moz-osx-font-smoothing:grayscale'    +
          '}',
          hoverRule =
          ':hover>.anchorjs-link,'                 +
          '.anchorjs-link:focus{'                  +
            'opacity:1'                            +
          '}',
          anchorjsLinkFontFace =
          '@font-face{'                            +
            'font-family:anchorjs-icons;'          + // Icon from icomoon; 10px wide & 10px tall; 2 empty below & 4 above
            'src:url(data:n/a;base64,AAEAAAALAIAAAwAwT1MvMg8yG2cAAAE4AAAAYGNtYXDp3gC3AAABpAAAAExnYXNwAAAAEAAAA9wAAAAIZ2x5ZlQCcfwAAAH4AAABCGhlYWQHFvHyAAAAvAAAADZoaGVhBnACFwAAAPQAAAAkaG10eASAADEAAAGYAAAADGxvY2EACACEAAAB8AAAAAhtYXhwAAYAVwAAARgAAAAgbmFtZQGOH9cAAAMAAAAAunBvc3QAAwAAAAADvAAAACAAAQAAAAEAAHzE2p9fDzz1AAkEAAAAAADRecUWAAAAANQA6R8AAAAAAoACwAAAAAgAAgAAAAAAAAABAAADwP/AAAACgAAA/9MCrQABAAAAAAAAAAAAAAAAAAAAAwABAAAAAwBVAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMCQAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAg//0DwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAAIAAAACgAAxAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADAAAAAIAAgAAgAAACDpy//9//8AAAAg6cv//f///+EWNwADAAEAAAAAAAAAAAAAAAAACACEAAEAAAAAAAAAAAAAAAAxAAACAAQARAKAAsAAKwBUAAABIiYnJjQ3NzY2MzIWFxYUBwcGIicmNDc3NjQnJiYjIgYHBwYUFxYUBwYGIwciJicmNDc3NjIXFhQHBwYUFxYWMzI2Nzc2NCcmNDc2MhcWFAcHBgYjARQGDAUtLXoWOR8fORYtLTgKGwoKCjgaGg0gEhIgDXoaGgkJBQwHdR85Fi0tOAobCgoKOBoaDSASEiANehoaCQkKGwotLXoWOR8BMwUFLYEuehYXFxYugC44CQkKGwo4GkoaDQ0NDXoaShoKGwoFBe8XFi6ALjgJCQobCjgaShoNDQ0NehpKGgobCgoKLYEuehYXAAAADACWAAEAAAAAAAEACAAAAAEAAAAAAAIAAwAIAAEAAAAAAAMACAAAAAEAAAAAAAQACAAAAAEAAAAAAAUAAQALAAEAAAAAAAYACAAAAAMAAQQJAAEAEAAMAAMAAQQJAAIABgAcAAMAAQQJAAMAEAAMAAMAAQQJAAQAEAAMAAMAAQQJAAUAAgAiAAMAAQQJAAYAEAAMYW5jaG9yanM0MDBAAGEAbgBjAGgAbwByAGoAcwA0ADAAMABAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAP) format("truetype")' +
          '}',
          pseudoElContent =
          '[data-anchorjs-icon]::after{'           +
            'content:attr(data-anchorjs-icon)'     +
          '}',
          firstStyleEl;

      style.className = 'anchorjs';
      style.appendChild(document.createTextNode('')); // Necessary for Webkit.

      // We place it in the head with the other style tags, if possible, so as to
      // not look out of place. We insert before the others so these styles can be
      // overridden if necessary.
      firstStyleEl = document.head.querySelector('[rel="stylesheet"],style');
      if (firstStyleEl === undefined) {
        document.head.appendChild(style);
      } else {
        document.head.insertBefore(style, firstStyleEl);
      }

      style.sheet.insertRule(linkRule, style.sheet.cssRules.length);
      style.sheet.insertRule(hoverRule, style.sheet.cssRules.length);
      style.sheet.insertRule(pseudoElContent, style.sheet.cssRules.length);
      style.sheet.insertRule(anchorjsLinkFontFace, style.sheet.cssRules.length);
    }
  }

  return AnchorJS;
}));


/***/ }),

/***/ "./src/js/fancybox.js":
/*!****************************!*\
  !*** ./src/js/fancybox.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var fancyBoxInit = function fancyBoxInit(img) {
  var outer = img.outerHTML;
  var imgSrc = /src="(.*)"/.exec(outer) && /src="(.*)"/.exec(outer)[1];
  var imgAlt = /alt="(.*)"/.exec(outer) && /alt="(.*)"/.exec(outer)[1] || /title="(.*)"/.exec(outer) && /title="(.*)"/.exec(outer)[1] || '';
  img.outerHTML = '<a class="fancy-link" href="' + imgSrc + '" data-fancybox="group" data-caption="' + imgAlt + '">' + outer + '</a>';
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  document.querySelectorAll('.article-entry img').forEach(fancyBoxInit);
  document.querySelectorAll('.about-body container img').forEach(fancyBoxInit);
});

/***/ }),

/***/ "./src/js/init.js":
/*!************************!*\
  !*** ./src/js/init.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var anchor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! anchor-js */ "./node_modules/anchor-js/anchor.js");
/* harmony import */ var anchor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(anchor_js__WEBPACK_IMPORTED_MODULE_0__);


var init = function init() {
  var $introImg = $('.site-intro-img:first'),
      introPlaceholder = $('.site-intro-placeholder:first'),
      bgCSS = $introImg.css('background-image'),
      bgRegResult = bgCSS.match(/url\("*([^"]*)"*\)/);

  if (bgRegResult.length < 2) {
    console.log('...');
    console.log(bgRegResult);
    return;
  }

  var bgURL = bgRegResult[1],
      img = new Image();

  img.onload = function () {
    // window.alert()
    // setTimeout(function () {
    introPlaceholder.remove(); // }, 100)

    console.info('PLACEHOLDER REMOVED');
  };

  img.src = bgURL;
  document.addEventListener('DOMContentLoaded', function () {
    $('.container').removeClass('container-unloaded');
    $('.footer').removeClass('footer-unloaded');
    $('.loading').remove();
  }, false); // https://www.bryanbraun.com/anchorjs/

  var anchors = new (anchor_js__WEBPACK_IMPORTED_MODULE_0___default())();
  anchors.options = {
    placement: 'right',
    "class": 'anchorjs-archer'
  };
  anchors.add();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);

/***/ }),

/***/ "./src/js/initSidebar.js":
/*!*******************************!*\
  !*** ./src/js/initSidebar.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar */ "./src/js/sidebar.js");

var mySidebar = new _sidebar__WEBPACK_IMPORTED_MODULE_0__.default({
  sidebar: '.sidebar',
  nav: '.sidebar-tabs',
  tabs: '.sidebar-tabs li',
  content: '.sidebar-content',
  panels: '.sideabar-contents > div',
  menuButton: '.header-sidebar-menu'
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mySidebar);

/***/ }),

/***/ "./src/js/mobile.js":
/*!**************************!*\
  !*** ./src/js/mobile.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initMobile": () => (/* binding */ initMobile)
/* harmony export */ });
var initMobile = function initMobile() {
  if (window.matchMedia) {
    var mql = window.matchMedia('(max-width: 980px)');
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



/***/ }),

/***/ "./src/js/scroll.js":
/*!**************************!*\
  !*** ./src/js/scroll.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scroll": () => (/* binding */ scroll)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/js/util.js");


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
    var windowHeight = $(window).height();
    var readPercent;

    if (scrollTop < bgTitleHeight) {
      readPercent = 0;
    } else {
      readPercent = (scrollTop - beginY) / (contentHeight - windowHeight) * 100;
    } // 防止文章过短，产生负百分比


    readPercent = readPercent >= 0 ? readPercent : 100;
    var restPercent = readPercent - 100 <= 0 ? readPercent - 100 : 0;
    $progressBar[0].style.transform = "translate3d(".concat(restPercent, "%, 0, 0)");
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
    _util__WEBPACK_IMPORTED_MODULE_0__.default.rafTick(tickingScroll, bindedUpdate);
  }

  $(document).on('scroll', onScroll) // 返回顶部
  ;
  [$postBanner, $backTop].forEach(function (ele) {
    ele.on('click', _util__WEBPACK_IMPORTED_MODULE_0__.default.backTop);
  });
};



/***/ }),

/***/ "./src/js/sidebar.js":
/*!***************************!*\
  !*** ./src/js/sidebar.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Selector = function Selector(classPrefix) {
  return {
    ACTIVE: "".concat(classPrefix, "-active")
  };
};

var Sidebar = /*#__PURE__*/function () {
  function Sidebar(options) {
    _classCallCheck(this, Sidebar);

    this.options = _objectSpread(_objectSpread({}, Sidebar.defaultOptions), options);
    this.activeIndex = this.options.activeIndex;

    this._initElements();

    this._initTabs();

    this._bindTabsClick();

    this._bindButtonClick();

    this._bindWrapperClick();

    this._bindWrapperTransitionEnd();

    this.perfectScrollbar();
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
      this.$menuButton.addClass('header-sidebar-menu-active');
      this.$sidebar.removeClass('sidebar-hide');
      this.$sidebar.addClass('sidebar-active');
    }
  }, {
    key: "_inactivateSidebar",
    value: function _inactivateSidebar() {
      $('.wrapper').removeClass('wrapper-sidebar-active');
      $('.header').removeClass('header-sidebar-active');
      $('.toc-wrapper').removeClass('toc-slide');
      this.$menuButton.removeClass('header-sidebar-menu-active');
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
        if (_this3.$sidebar.hasClass('sidebar-hide')) {
          _this3.activateSidebar();
        } else {
          _this3._inactivateSidebar();
        }
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
    key: "perfectScrollbar",
    value: function perfectScrollbar() {
      var ps = new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__.default('.sidebar', {
        suppressScrollX: true
      });
    }
  }]);

  return Sidebar;
}();

_defineProperty(Sidebar, "defaultOptions", {
  activeIndex: 0
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

/***/ }),

/***/ "./src/js/tag.js":
/*!***********************!*\
  !*** ./src/js/tag.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
/* harmony import */ var _initSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initSidebar */ "./src/js/initSidebar.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_2__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var MetaInfo = /*#__PURE__*/function () {
  function MetaInfo(metaName, labelsContainer, postContainer) {
    _classCallCheck(this, MetaInfo);

    this.currLabelName = '';
    this.isInited = false;
    this.postsArr = null;
    this.metaName = metaName;
    this.labelsContainer = $(labelsContainer)[0];
    this.postContainer = $(postContainer)[0];
    this.indexMap = new Map();

    this._bindLabelClick();
  }

  _createClass(MetaInfo, [{
    key: "changeLabel",
    value: function changeLabel(currLabelName) {
      if (typeof currLabelName === 'string') {
        this.currLabelName = currLabelName;

        this._changeList();

        this._changeFocus();
      }
    }
  }, {
    key: "_bindLabelClick",
    value: function _bindLabelClick() {
      var _this = this;

      this.labelsContainer.addEventListener('click', function (e) {
        var currLabelName = e.target.getAttribute("data-".concat(_this.metaName));

        _this.changeLabel(currLabelName);
      });
    }
  }, {
    key: "_changeFocus",
    value: function _changeFocus(label) {
      var _this2 = this;

      var currFocus = this.labelsContainer.getElementsByClassName('sidebar-label-focus');

      _toConsumableArray(currFocus).forEach(function (item) {
        return item.classList.remove('sidebar-label-focus');
      });

      _toConsumableArray(this.labelsContainer.children).forEach(function (item) {
        if (item.getAttribute("data-".concat(_this2.metaName)) === _this2.currLabelName) {
          item.classList.add('sidebar-label-focus');
        }
      });
    }
  }, {
    key: "_changeList",
    value: function _changeList() {
      var _this3 = this;

      var indexArr = this.indexMap.get(this.currLabelName);

      try {
        var corrArr = indexArr.map(function (index) {
          return _this3.postsArr[index];
        });

        this._createPostsDom(corrArr);
      } catch (error) {
        console.error('Please ensure set `tags: true` and `categories: true` of the hexo-content-json config');
      }
    }
  }, {
    key: "_createPostsDom",
    value: function _createPostsDom(corrArr) {
      console.log(corrArr);
      var frag = document.createDocumentFragment();
      this.postContainer.innerHTML = '';

      for (var i = 0; i < corrArr.length; i++) {
        frag.appendChild(this._createPostDom(corrArr[i]));
      }

      this.postContainer.appendChild(frag);
    }
  }, {
    key: "_createPostDom",
    value: function _createPostDom(postInfo) {
      var $tagItem = $('<li class="meta-post-item"><span class="meta-post-date">' + _util__WEBPACK_IMPORTED_MODULE_0__.default.dateFormater(new Date(Date.parse(postInfo.date)), 'yyyy/MM/dd') + '</span></li>');
      var $aItem = $('<a class="meta-post-title" href="' + siteMeta.root + postInfo.path + '">' + postInfo.title + '</a>');
      $tagItem.append($aItem);
      return $tagItem[0];
    }
  }, {
    key: "tryInit",
    value: function tryInit(postsArr) {
      var _this4 = this;

      if (this.isInited || Object.prototype.toString.call(postsArr) === '[object Null]') {
        return;
      }

      var _loop = function _loop(postIndex) {
        var currPostLabels = postsArr[postIndex][_this4.metaName]; // if there is any post has a tag

        if (currPostLabels && currPostLabels.length) {
          currPostLabels.forEach(function (tagOrCatetory) {
            // if this.metaName is 'categories', tagOrCatetory['slug'] will be used as key in this.indexMap
            // else if this.metaName is 'tag', tagOrCatetory['name'] will be used as key in this.indexMap
            // check the array postsArr and you'll know why. (actually you can just use 'slug' in both case)
            var key = _this4.metaName === 'categories' ? 'slug' : 'name';

            if (_this4.indexMap.has(tagOrCatetory[key])) {
              _this4.indexMap.get(tagOrCatetory[key]).push(postIndex);
            } else {
              _this4.indexMap.set(tagOrCatetory[key], [postIndex]);
            }
          });
        }
      };

      for (var postIndex = 0; postIndex < postsArr.length; postIndex++) {
        _loop(postIndex);
      }

      if (!this.indexMap.size) {
        document.getElementsByClassName("sidebar-".concat(this.metaName, "-empty"))[0].classList.add("sidebar-".concat(this.metaName, "-empty-active"));
      }

      this.postsArr = postsArr;
      this.isInited = true;
    }
  }]);

  return MetaInfo;
}();

var SidebarMeta = /*#__PURE__*/function () {
  function SidebarMeta(tabCount) {
    _classCallCheck(this, SidebarMeta);

    this.tabCount = 0;
    this.emitter = new (eventemitter3__WEBPACK_IMPORTED_MODULE_2___default())();
    this.postsArr = null;
    this.metas = [];
    this._initMap = this._initMap.bind(this);
    this.dataMaps = new Map();

    this._subscribe();

    this._fetchInfo();

    this._bindOtherClick();
  } // add a new tab and updata all metas


  _createClass(SidebarMeta, [{
    key: "addTab",
    value: function addTab(para) {
      this.tabCount++;
      var newMeta = new MetaInfo(para.metaName, para.labelsContainer, para.postsContainer);
      newMeta.tryInit(this.postsArr);
      this.metas.push(newMeta);
    } // update every MetaInfo

  }, {
    key: "_tryInitMetas",
    value: function _tryInitMetas() {
      for (var i = 0; i < this.metas.length; i++) {
        this.metas[i].tryInit(this.postsArr);
      }
    } // subscribe data onload

  }, {
    key: "_subscribe",
    value: function _subscribe() {
      this.emitter.on('DATA_FETCHED_SUCCESS', this._initMap);
    } // init maps

  }, {
    key: "_initMap",
    value: function _initMap() {
      if (!this.postsArr.length) {
        return;
      }

      this._tryInitMetas();
    } // fetch content.json

  }, {
    key: "_fetchInfo",
    value: function _fetchInfo() {
      // siteMeta is from js-info.ejs
      var contentURL = siteMeta.root + 'content.json?t=' + Number(new Date());
      var xhr = new XMLHttpRequest();
      xhr.responseType = '';
      xhr.open('get', contentURL, true);
      var $loadFailed = $('.tag-load-fail');
      var that = this;

      xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
          $loadFailed.remove(); // defensive programming if content.json formart is not correct
          // pr: https://github.com/fi3ework/hexo-theme-archer/pull/37

          var contentJSON;
          var posts;
          contentJSON = JSON.parse(this.responseText);
          posts = Array.isArray(contentJSON) ? contentJSON : contentJSON.posts;

          if (posts && posts.length) {
            that.postsArr = posts;
            that.emitter.emit('DATA_FETCHED_SUCCESS');
          }
        } else {
          this.$currPostsContainer.remove();
        }
      };

      xhr.send();
    }
  }, {
    key: "_bindOtherClick",
    value: function _bindOtherClick() {
      var _this5 = this;

      document.body.addEventListener('click', function (e) {
        if (e.target.className === 'post-tag') {
          e.stopPropagation();
          _initSidebar__WEBPACK_IMPORTED_MODULE_1__.default.activateSidebar();
          _initSidebar__WEBPACK_IMPORTED_MODULE_1__.default.switchTo(1);
          var currLabelName = e.target.getAttribute("data-tags");
          _this5.currLabelName = currLabelName;
          var tagMeta = _this5.metas[0];
          tagMeta.changeLabel(_this5.currLabelName);
        }
      });
    }
  }]);

  return SidebarMeta;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarMeta);

/***/ }),

/***/ "./src/js/toc.js":
/*!***********************!*\
  !*** ./src/js/toc.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var prevHeight = 0;

function initTocLinksScrollTop(tocLinks) {
  return _toConsumableArray(tocLinks).map(function (link) {
    return _util__WEBPACK_IMPORTED_MODULE_0__.default.getAbsPosition(link).y;
  });
}

var calcAnchorLink = function calcAnchorLink(heights, currHeight) {
  for (var i = 0; i < heights.length; i++) {
    if (Math.abs(currHeight - heights[i]) < 1.1) {
      return i;
    }
  }

  return -1;
};

var isPassingThrough = function isPassingThrough(currHeight, prevHeight, linkHeight) {
  return (currHeight + 1 - linkHeight) * (prevHeight + 1 - linkHeight) <= 0;
};

function calcScrollIntoScreenIndex(heights, prevHeight, currHeight) {
  var anchorLinkIndex = calcAnchorLink(heights, currHeight);

  if (anchorLinkIndex >= 0) {
    return anchorLinkIndex;
  }

  for (var i = 0; i < heights.length; i++) {
    if (isPassingThrough(currHeight, prevHeight, heights[i])) {
      // if is scrolling down, select current
      if (currHeight > prevHeight) {
        return i;
      } else {
        // if is scrolling up, select previous
        return i - 1;
      }
    }
  }
} // hide all ol


function hideAllOl(root) {
  ;

  _toConsumableArray(root.querySelectorAll('ol')).forEach(function (li) {
    hideItem(li);
  });
} // back to default state


function initFold(toc) {
  ;

  _toConsumableArray(toc.children).forEach(function (child) {
    hideAllOl(child);
  });

  _toConsumableArray(toc.querySelectorAll('.toc-active')).forEach(function (child) {
    child.classList.remove('toc-active');
  });
}

function resetFold(toc) {
  initFold(toc);
}

function hideItem(node) {
  node.style.display = 'none';
}

function showItem(node) {
  node.style.display = '';
}

function activeTocItem(node) {
  node.classList.add('toc-active');
}

function showAllChildren(node) {
  ;

  _toConsumableArray(node.children).forEach(function (child) {
    showItem(child);
  });
}

function spreadParentNodeOfTargetItem(tocItem) {
  var currNode = tocItem;

  while (currNode && currNode.parentNode) {
    showAllChildren(currNode.parentNode);
    showAllChildren(currNode);
    currNode = currNode.parentNode;

    if (currNode.classList.contains('toc')) {
      break;
    }
  }
}

var main = function main() {
  var toc = document.querySelector('.toc');
  var tocItems = document.querySelectorAll('.toc-item');

  if (!tocItems.length) {
    return;
  }

  initFold(toc);
  var headers = document.querySelectorAll('.article-entry h1, h2, h3, h4, h5, h6'); // get links height

  var heights = initTocLinksScrollTop(headers);
  document.addEventListener('scroll', function () {
    var currHeight = $(document).scrollTop();
    var currHeightIndex = calcScrollIntoScreenIndex(heights, prevHeight, currHeight);
    prevHeight = currHeight;

    if (typeof currHeightIndex === 'undefined') {
      return;
    } // spread, fold and active


    var currItem = tocItems[currHeightIndex]; // 1. fold

    resetFold(toc); // 2. spread

    spreadParentNodeOfTargetItem(currItem); // 3. active

    if (currItem) {
      activeTocItem(currItem.querySelector('a'));
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (main);

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
      x: x,
      y: y
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
      S: date.getMilliseconds() // 毫秒

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (archerUtil);

/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*!
 * perfect-scrollbar v1.5.0
 * Copyright 2020 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */

function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  rtl: 'ps__rtl',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
  for (var name in this.handlers) {
    this.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

function processScrollDiff(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
}

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      ('maxTouchPoints' in window.navigator &&
        window.navigator.maxTouchPoints > 0) ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

function updateGeometry(i) {
  var element = i.element;
  var roundedScrollTop = Math.floor(element.scrollTop);
  var rect = element.getBoundingClientRect();

  i.containerWidth = Math.ceil(rect.width);
  i.containerHeight = Math.ceil(rect.height);
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt((i.railXWidth * i.containerWidth) / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      ((i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth)) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt((i.railYHeight * i.containerHeight) / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      (roundedScrollTop * (i.railYHeight - i.scrollbarYHeight)) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
}

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  var roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth -
        9;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

function clickRail(i) {
  var element = i.element;

  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
}

function dragThumb(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail' ]);
}

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];
  var scrollbarYRail = ref[8];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    if (e.touches && e.touches[0]) {
      e[pageY] = e.touches[0].pageY;
    }
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i[scrollbarYRail].classList.remove(cls.state.clicking);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  function bindMoves(e, touchMode) {
    startingScrollTop = element[scrollTop];
    if (touchMode && e.touches) {
      e[pageY] = e.touches[0].pageY;
    }
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);
    if (!touchMode) {
      i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
      i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
      e.preventDefault();
    } else {
      i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
    }

    i[scrollbarYRail].classList.add(cls.state.clicking);

    e.stopPropagation();
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    bindMoves(e);
  });
  i.event.bind(i[scrollbarY], 'touchstart', function (e) {
    bindMoves(e, true);
  });
}

function keyboard(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
}

function wheel(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var roundedScrollTop = Math.floor(element.scrollTop);
    var isTop = element.scrollTop === 0;
    var isBottom =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = (-1 * e.wheelDeltaX) / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);

      // if deltaY && vertical scrollable
      if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            (cursor.scrollTop > 0 && deltaY < 0) ||
            (cursor.scrollTop < maxScrollTop && deltaY > 0)
          ) {
            return true;
          }
        }
      }
      // if deltaX && horizontal scrollable
      if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            (cursor.scrollLeft > 0 && deltaX < 0) ||
            (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

function touch(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);

      // if deltaY && vertical scrollable
      if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            (cursor.scrollTop > 0 && deltaY < 0) ||
            (cursor.scrollTop < maxScrollTop && deltaY > 0)
          ) {
            return true;
          }
        }
      }
      // if deltaX && horizontal scrollable
      if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            (cursor.scrollLeft > 0 && deltaX < 0) ||
            (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: true,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  if (this.isRtl === true) {
    element.classList.add(cls.rtl);
  }
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
        ? 'end'
        : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
        ? 'end'
        : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = Math.floor(this.element.scrollTop);
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PerfectScrollbar);
//# sourceMappingURL=perfect-scrollbar.esm.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ "./src/js/init.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll */ "./src/js/scroll.js");
/* harmony import */ var _initSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initSidebar */ "./src/js/initSidebar.js");
/* harmony import */ var _mobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mobile */ "./src/js/mobile.js");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tag */ "./src/js/tag.js");
/* harmony import */ var _toc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toc */ "./src/js/toc.js");
/* harmony import */ var _fancybox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fancybox */ "./src/js/fancybox.js");







var logStyle = 'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;';
console.info('%c 🎯 hexo-theme-archer ⬇️ ', logStyle);
console.info('%c 🏷 Version: 1.6.1 ', logStyle);
console.info('%c 📅 Version date: 20210204', logStyle);
console.info('%c 📦 https://github.com/fi3ework/hexo-theme-archer ', logStyle); // remove background placeholder

(0,_init__WEBPACK_IMPORTED_MODULE_0__.default)(); // scroll event

(0,_scroll__WEBPACK_IMPORTED_MODULE_1__.scroll)(); // init sidebar link

var metas = new _tag__WEBPACK_IMPORTED_MODULE_4__.default();
metas.addTab({
  metaName: 'tags',
  labelsContainer: '.sidebar-tags-name',
  postsContainer: '.sidebar-tags-list'
});
metas.addTab({
  metaName: 'categories',
  labelsContainer: '.sidebar-categories-name',
  postsContainer: '.sidebar-categories-list'
}); // init toc

window.addEventListener('load', function (event) {
  console.log('All resources finished loading!');
  (0,_toc__WEBPACK_IMPORTED_MODULE_5__.default)();
});
(0,_mobile__WEBPACK_IMPORTED_MODULE_3__.initMobile)(); // initSearch()
// fancybox

(0,_fancybox__WEBPACK_IMPORTED_MODULE_6__.default)();
})();

/******/ })()
;