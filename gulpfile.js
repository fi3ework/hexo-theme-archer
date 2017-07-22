const gulp = require('gulp'),
    babel = require('gulp-babel'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify');

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

// uglify
gulp.task('uglify', ['webpack'], function () {
    return gulp.src('./source/scripts/main.js').pipe(uglify())
       .pipe(gulp.dest('./source/scripts/'));
});

// watch
gulp.task('watch', function () {
    gulp.watch(['./js/**/*.js'], ['uglify']);

});

gulp.task('default', ['uglify', 'watch']);