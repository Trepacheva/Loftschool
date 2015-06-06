var gulp = require('gulp'),
    useref = require ('gulp-useref'),
    gulpif = require ('gulp-if'),
    minifyCss = require('gulp-minify-css');
    connect = require('gulp-connect'),
    opn = require('opn'),
	uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

var src = './app/',
    dest = './build/';
    
// livereload
gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
    opn('http://localhost:8080/app/index.html');
});

// Build
gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src(src + '*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./build/'))
});
 
// reload
gulp.task('reload', function () {
    gulp.src(src + 'index.html').
        pipe(connect.reload());
});

// Действия по умолчанию
gulp.task('default', ['html','connect'], function(){
    gulp.watch([src + "css/**/*.css", src + "index.html"], ['reload']);
});