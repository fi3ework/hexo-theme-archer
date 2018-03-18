export default () => {
  document.querySelectorAll('.article-entry img').forEach(img => {
    let outer = img.outerHTML
    let imgSrc = /src="(.*)"/.exec(outer) && /src="(.*)"/.exec(outer)[1]
    let imgAlt = /alt="(.*)"/.exec(outer) && /alt="(.*)"/.exec(outer)[1]
    img.outerHTML = '<a class="fancy-link" href="' + imgSrc + '" data-fancybox="group" data-caption="' + imgAlt + '">' + outer + '</a>'
  })
}