const gulp = require('gulp'),
    babel = require('gulp-babel'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    del = require('del');

/* ========== develop ========== */    
// babel
gulp.task('babel-js', function () {
    return gulp.src('./source-src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./source/scripts/'));
});

// webpack
gulp.task('webpack', ['babel-js'], function () {
    return gulp.src('')
        .pipe(webpack({
            entry: {
                'main': './source/scripts/main.js',
            },
            output: {
                filename: '[name].js',
            }
        }))
        .pipe(gulp.dest('./source/scripts/'));
});

// del
gulp.task('del-js', ['webpack'], function (cb) {
    return del([
        './source/scripts/**/*',
        '!./source/scripts/main.js'
    ], cb);
});

// uglify
gulp.task('uglify-js', ['del-js'], function () {
    return gulp.src('./source/scripts/main.js').pipe(uglify())
        .pipe(gulp.dest('./source/scripts/'));
});

// watch
gulp.task('watch', function () {
    gulp.watch(['./js/**/*.js'], ['uglify']);
});

gulp.task('default', ['uglify-js', 'watch']);


/* ========== bulid ========== */
// sass
gulp.task('sass', function () {
    return gulp.src('./source/css/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./source/css/'));
});

// // clean css
// gulp.task('minify-css',['sass'], function () {
//     return gulp.src('../../public/css/style.css')
//         .pipe(cleanCSS({
//             compatibility: '*'
//         }))
//         .pipe(gulp.dest('../../public/css/'));
// });

gulp.task('build', ['sass', 'uglify-js']);