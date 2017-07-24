const gulp = require('gulp'),
    babel = require('gulp-babel'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass');

// babel
gulp.task('convertJS', function () {
    return gulp.src('./js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./source/scripts/'));
});

// webpack
gulp.task('webpack', ['convertJS'], function () {
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

// // sass
// gulp.task('sass', function () {
//     return gulp.src('./sass/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css'));
// });

// clean css
gulp.task('minify-css', function() {
    return gulp.src('../../public/css/style.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('../../public/css/'));
});

// uglify
gulp.task('uglify', ['webpack'], function () {
    return gulp.src('./source/scripts/main.js').pipe(uglify())
       .pipe(gulp.dest('./source/scripts/'));
}); 
    
// watch
gulp.task('watch', function () {
    gulp.watch(['./js/**/*.js'], ['uglify']);

});

gulp.task('default', ['uglify', 'minify-css', 'watch']);