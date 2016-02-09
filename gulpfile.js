var gulp = require('gulp');
var uglifyJS = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var src = "./src/";
var dest = "./app/";

gulp.task('build-angular', function () {
    return gulp.src(src + 'app.js')
        .pipe(uglifyJS())
        .pipe(gulp.dest(dest));
});

gulp.task('build-html', function () {
    return gulp.src(src + 'index.html')
        .pipe(minifyHTML({ empty: true }))
        .pipe(gulp.dest(dest));
});

gulp.task('build-css', function () {
    return gulp.src(src + 'app.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dest));
});