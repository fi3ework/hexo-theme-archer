const lazyLoadingInit = (img) => {
  const isSupportLazyLoading = 'loading' in HTMLImageElement.prototype
  if (isSupportLazyLoading) {
    img.setAttribute('loading', 'lazy')
  } else {
    // TODO: add intersection observer support: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  }
}

const fancyBoxInit = (img) => {
  const outer = img.outerHTML
  const imgSrc = /src="(.*)"/.exec(outer)?.[1] || ''
  const imgAlt =
    /alt="(.*)"/.exec(outer)?.[1] || /title="(.*)"/.exec(outer)?.[1] || ''
  img.outerHTML = `<a class="fancy-link" href="${imgSrc}" data-fancybox="gallery" data-caption="${imgAlt}">${outer}</a>`
}

export default () => {
  /** images in home page (article abstract) */
  const abstractContentImages = document.querySelectorAll(
    '.abstract-content img',
  )
  /** images in article page */
  const articleContentImages = document.querySelectorAll('.article-entry img')

  // #region add lazy-loading support for images
  abstractContentImages.forEach(lazyLoadingInit)
  articleContentImages.forEach(lazyLoadingInit)
  // #endregion

  // #region add fancybox support for images
  abstractContentImages.forEach(fancyBoxInit)
  articleContentImages.forEach(fancyBoxInit)
  // #endregion
}
