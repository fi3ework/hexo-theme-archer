// special thanks to https://blog.naaln.com/2016/07/hexo-with-algolia/

const initAlgolia = () => {
  $(document).ready(function () {
    let algoliaSettings = algolia
    let isAlgoliaSettingsValid =
      algoliaSettings.appId &&
      algoliaSettings.apiKey &&
      algoliaSettings.indexName

    if (!isAlgoliaSettingsValid) {
      window.console.error('Algolia Settings are invalid.')
      return
    }

    const algoliasearch = require('algoliasearch')
    const searchClient = algoliasearch(
      algoliaSettings.appId,
      algoliaSettings.apiKey
    )

    let search = instantsearch({
      indexName: algoliaSettings.indexName,
      searchClient,
      searchFunction: function (helper) {
        let searchInput = $('#algolia-search-input').find('input')

        const container = document.querySelector('.algolia-results')
        container.style.display = helper.state.query === '' ? 'none' : ''
        if (searchInput.val()) {
          helper.search()
        }
      },
      stalledSearchDelay: 500,
    })

    // Registering Widgets
    ;[
      instantsearch.widgets.searchBox({
        container: '#algolia-search-input',
        placeholder: algoliaSettings.labels.input_placeholder,
        showSubmit: false,
        showReset: false,
        showLoadingIndicator: false,
      }),

      instantsearch.widgets.hits({
        container: '#algolia-hits',
        hitsPerPage: algoliaSettings.hits.per_page || 10,
        templates: {
          item: function (data) {
            let link = data.permalink
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

      instantsearch.widgets.stats({
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

      instantsearch.widgets.pagination({
        container: '#algolia-pagination',
        scrollTo: false,
        templates: {
          first: '<i class="fa fa-angle-double-left"></i>',
          last: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-left"></i>',
          next: '<i class="fa fa-angle-right"></i>',
        },
      }),
    ].forEach(search.addWidget, search)

    search.start()

    $('.popup-trigger').on('click', function (e) {
      e.stopPropagation()
      $('body')
        .prepend('<div class="search-popup-overlay algolia-pop-overlay"></div>')
        .css('overflow', 'hidden')
      $('.popup').toggle()
      $('#algolia-search-input').find('input').focus()
    })

    const hidePopup = () => {
      $('.ais-SearchBox-form').trigger('reset')
      $('.popup').hide()
      $('.algolia-pop-overlay').remove()
      $('body').css('overflow', '')
    }

    $('.popup-btn-close').click(function () {
      hidePopup()
    })

    $(document).on('keydown', '.ais-SearchBox-form', function (event) {
      if (event.key === 'Escape') {
        hidePopup()
      }
    })
  })
}

initAlgolia()
