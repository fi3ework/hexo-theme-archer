const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  webpack = require('webpack'),
  sass = require('gulp-sass')(require('node-sass')),
  browserSync = require('browser-sync').create()

/* ========== develop ========== */

// webpack
function execWebpack(cb) {
  webpack(require('./webpack.dev.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
}

// sass
function execSass() {
  return gulp
    .src(['src/scss/style.scss', 'src/scss/mobile.scss', 'src/scss/dark.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
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

exports.dev = gulp.series(execWebpack, execSass, function (cb) {
  browserSync.init({
    proxy: 'localhost:4000',
  })
  gulp.watch(['./src/js/**/*.js'], reloadJs)
  gulp.watch(['./src/scss/**/*.scss'], reloadCss)
  gulp.watch(['./layout/**/*.ejs'], reloadLayout)
  gulp.watch(['./_config.yml'], reloadConfig)
  cb()
})

/* ========== bulid ========== */

// webpack-prod
function webpackProd(cb) {
  webpack(require('./webpack.prod.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
}

// sass-prod
function sassProd() {
  return gulp
    .src(['src/scss/style.scss', 'src/scss/mobile.scss', 'src/scss/dark.scss'])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./source/css/'))
}

exports.build = gulp.series(webpackProd, sassProd, function (cb) {
  cb()
  console.log(process.argv)
})
