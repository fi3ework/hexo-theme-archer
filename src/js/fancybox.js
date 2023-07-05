const fancyBoxInit = (img) => {
  const outer = img.outerHTML
  const imgSrc = /src="(.*)"/.exec(outer) && /src="(.*)"/.exec(outer)[1]
  const imgAlt =
    (/alt="(.*)"/.exec(outer) && /alt="(.*)"/.exec(outer)[1]) ||
    (/title="(.*)"/.exec(outer) && /title="(.*)"/.exec(outer)[1]) ||
    ''
  img.outerHTML = `<a class="fancy-link" href="${imgSrc}" data-fancybox="gallery" data-caption="${imgAlt}">${outer}</a>`
}

export default () => {
  // images in home page (article abstract)
  document.querySelectorAll('.abstract-content img').forEach(fancyBoxInit)
  // images in article page
  document.querySelectorAll('.article-entry img').forEach(fancyBoxInit)
}
