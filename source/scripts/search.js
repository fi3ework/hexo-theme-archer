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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports) {

// special thanks to https://blog.naaln.com/2016/07/hexo-with-algolia/
var initAlgolia = function initAlgolia() {
  $(document).ready(function () {
    var algoliaSettings = algolia;
    var isAlgoliaSettingsValid = algoliaSettings.applicationID && algoliaSettings.apiKey && algoliaSettings.indexName;

    if (!isAlgoliaSettingsValid) {
      window.console.error('Algolia Settings are invalid.');
      return;
    }

    var search = instantsearch({
      appId: algoliaSettings.applicationID,
      apiKey: algoliaSettings.apiKey,
      indexName: algoliaSettings.indexName,
      searchFunction: function searchFunction(helper) {
        var searchInput = $('#algolia-search-input').find('input');

        if (searchInput.val()) {
          helper.search();
        }
      }
    }) // Registering Widgets
    ;
    [instantsearch.widgets.searchBox({
      container: '#algolia-search-input',
      placeholder: algoliaSettings.labels.input_placeholder
    }), instantsearch.widgets.hits({
      container: '#algolia-hits',
      hitsPerPage: algoliaSettings.hits.per_page || 10,
      templates: {
        item: function item(data) {
          var link = data.permalink ? data.permalink : siteMeta.root + data.path;
          return '<a href="' + link + '" class="algolia-hit-item-link">' + data._highlightResult.title.value + '</a>';
        },
        empty: function empty(data) {
          return '<div id="algolia-hits-empty">' + algoliaSettings.labels.hits_empty.replace(/\$\{query}/, data.query) + '</div>';
        }
      },
      cssClasses: {
        item: 'algolia-hit-item'
      }
    }), instantsearch.widgets.stats({
      container: '#algolia-stats',
      templates: {
        body: function body(data) {
          var stats = algoliaSettings.labels.hits_stats.replace(/\$\{hits}/, data.nbHits).replace(/\$\{time}/, data.processingTimeMS);
          return stats + '<span class="algolia-powered">' + '  <img src="' + siteMeta.root + 'assets/algolia_logo.svg" alt="Algolia" />' + '</span>' + '<hr />';
        }
      }
    }), instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      scrollTo: false,
      showFirstLast: false,
      labels: {
        first: '<i class="fa fa-angle-double-left"></i>',
        last: '<i class="fa fa-angle-double-right"></i>',
        previous: '<i class="fa fa-angle-left"></i>',
        next: '<i class="fa fa-angle-right"></i>'
      },
      cssClasses: {
        root: 'pagination',
        item: 'pagination-item',
        link: 'page-number',
        active: 'current',
        disabled: 'disabled-item'
      }
    })].forEach(search.addWidget, search);
    search.start();
    $('.popup-trigger').on('click', function (e) {
      e.stopPropagation();
      $('body').append('<div class="search-popup-overlay algolia-pop-overlay"></div>').css('overflow', 'hidden');
      $('.popup').toggle();
      $('#algolia-search-input').find('input').focus();
    });
    $('.popup-btn-close').click(function () {
      $('.popup').hide();
      $('.algolia-pop-overlay').remove();
      $('body').css('overflow', '');
    });
  });
};

initAlgolia();

/***/ })

/******/ });