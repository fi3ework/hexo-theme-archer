// special thanks to https://blog.naaln.com/2016/07/hexo-with-algolia/
import algoliasearch from 'algoliasearch/lite'
import instantsearch from 'instantsearch.js'
import {
  configure,
  searchBox,
  hits,
  stats,
  pagination,
} from 'instantsearch.js/es/widgets'
import archerUtil from './util'

const initAlgolia = () => {
  $(document).ready(function () {
    const algoliaSettings = algolia
    const isAlgoliaSettingsValid =
      algoliaSettings.applicationID &&
      algoliaSettings.apiKey &&
      algoliaSettings.indexName

    if (!isAlgoliaSettingsValid) {
      window.console.error(
        'Algolia Settings are invalid. Check docs: https://github.com/fi3ework/hexo-theme-archer/wiki/%E5%90%AF%E7%94%A8-Algolia-%E6%90%9C%E7%B4%A2#%E8%8E%B7%E5%8F%96-keys'
      )
      return
    }

    const searchClient = algoliasearch(
      algoliaSettings.applicationID,
      algoliaSettings.apiKey
    )

    const search = instantsearch({
      indexName: algoliaSettings.indexName,
      searchClient,
      searchFunction: function (helper) {
        const searchInput = $('#algolia-search-input').find('input')

        const container = document.querySelector('.algolia-results')
        container.style.display = helper.state.query === '' ? 'none' : ''

        if (searchInput.val()) {
          helper.search()
        }
      },
      stalledSearchDelay: 500,
    })

    // Registering Widgets
    search.addWidgets([
      configure({
        hitsPerPage: algoliaSettings.hits.per_page || 10,
      }),
      searchBox({
        container: '#algolia-search-input',
        placeholder: algoliaSettings.labels.input_placeholder,
        showSubmit: false,
        showReset: false,
        showLoadingIndicator: false,
      }),
      hits({
        container: '#algolia-hits',
        templates: {
          item: function (data) {
            const link = data.permalink
              ? data.permalink
              : siteMeta.root + data.path
            return (
              '<a href="' +
              link +
              '" class="algolia-hit-item-link">' +
              instantsearch.highlight({
                attribute: 'title',
                hit: data,
                highlightedTagName: 'em',
              }) +
              '</a>'
            )
          },
          empty: function (data) {
            return (
              '<i class="fas fa-drafting-compass fa-10x"></i>' +
              '<div class="algolia-hit-empty-label">' +
              algoliaSettings.labels.hits_empty.replace(
                /\$\{query\}/,
                data.query
              ) +
              '</div>'
            )
          },
        },
        cssClasses: {
          item: 'algolia-hit-item',
          list: 'algolia-hit-list',
          root: 'algolia-hit',
          emptyRoot: 'algolia-hit-empty',
        },
      }),
      stats({
        container: '#algolia-stats',
        templates: {
          text: function (data) {
            let stats = algoliaSettings.labels.hits_stats
              .replace(/\$\{hits\}/, data.nbHits)
              .replace(/\$\{time\}/, data.processingTimeMS)
            return (
              stats +
              '<span class="algolia-powered">' +
              '  <img src="' +
              siteMeta.root +
              'assets/algolia_logo.svg" alt="Algolia" />' +
              '</span>' +
              '<hr />'
            )
          },
        },
        cssClasses: {
          root: 'algolia-stat-root',
        },
      }),
      pagination({
        container: '#algolia-pagination',
        scrollTo: false,
        templates: {
          first: '<i class="fa fa-angle-double-left"></i>',
          last: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-left"></i>',
          next: '<i class="fa fa-angle-right"></i>',
        },
      }),
    ])

    search.start()

    $('.popup-trigger').on('click', function (e) {
      e.stopPropagation()
      $('body')
        .prepend('<div class="search-popup-overlay algolia-pop-overlay"></div>')
        .css('overflow', 'hidden')
      $('.popup').toggle()
      $('#algolia-search-input').find('input').focus()
      archerUtil.stopBodyScroll(true)
    })

    const hidePopup = () => {
      $('.ais-SearchBox-form').trigger('reset')
      $('.popup').hide()
      $('.algolia-pop-overlay').remove()
      $('body').css('overflow', '')
      archerUtil.stopBodyScroll(false)
    }

    $('.popup-btn-close').click(function () {
      hidePopup()
    })

    $(document).on('keydown', '.ais-SearchBox-form', function (event) {
      if (event.key === 'Escape') {
        hidePopup()
      }
    })

    $('.site-search').removeClass('site-search-loading')
  })
}

initAlgolia()
