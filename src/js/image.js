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

  // #region add fancybox support for images
  abstractContentImages.forEach(fancyBoxInit)
  articleContentImages.forEach(fancyBoxInit)
  // #endregion
}
