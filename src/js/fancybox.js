const fancyBoxInit = (img) => {
  const outer = img.outerHTML
  const imgSrc = /src="(.*)"/.exec(outer) && /src="(.*)"/.exec(outer)[1]
  const imgAlt =
    (/alt="(.*)"/.exec(outer) && /alt="(.*)"/.exec(outer)[1]) ||
    (/title="(.*)"/.exec(outer) && /title="(.*)"/.exec(outer)[1]) ||
    ''
  img.outerHTML =
    '<a class="fancy-link" href="' +
    imgSrc +
    '" data-fancybox="group" data-caption="' +
    imgAlt +
    '">' +
    outer +
    '</a>'
}

export default () => {
  document.querySelectorAll('.article-entry img').forEach(fancyBoxInit)
  document.querySelectorAll('.about-body container img').forEach(fancyBoxInit)
}
