const gulp = require('gulp'),
  webpack = require('webpack'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create()

/* ========== develop ========== */

// webpack
function execWebpack(cb) {
  webpack(require('./webpack.config.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
}

// sass
function execSass() {
  return gulp.src(['./src/scss/style.scss', './src/scss/mobile.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./source/css/'))
}

// browser-sync
// watch js
const reloadJs = gulp.series(execWebpack, function (done) {
  browserSync.reload()
  done()
})
// watch sass
const reloadCss = gulp.series(execSass, function (done) {
  browserSync.reload()
  done()
})
// watch layout
function reloadLayout(done) {
  browserSync.reload()
  done()
}
// watch _config
function reloadConfig(done) {
  browserSync.reload()
  done()
}

exports.dev = gulp.series(execWebpack, execSass, function () {
  browserSync.init({
    proxy: 'localhost:4000'
  })
  gulp.watch(['./src/js/**/*.js'], reloadJs)
  gulp.watch(['./src/scss/**/*.scss'], reloadCss)
  gulp.watch(['./layout/**/*.ejs'], reloadLayout)
  gulp.watch(['./_config.yml'], reloadConfig)
})


/* ========== bulid ========== */

// webpack-prod
function webpackProd(cb) {
  webpack(require('./webpack.prod.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
}

exports.build =  gulp.series(execSass, webpackProd, function (cb) {
  cb()
  console.log(process.argv)
})
