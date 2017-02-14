var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer')
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var reload = browserSync.reload;
var shell = require('gulp-shell');
var image = require('gulp-image');

var paths = {
      'bower': './bower_components',
      'assets': './assets',
      'css': './assets/styles',
      'js': './assets/scripts',
      'img': './assets/img'
    }

var dest = {
  'site': '_site',
  'js': '_site/js',
  'css': '_site/css',
  'img': '_site/images'
}

gulp.task('serve', ['jekyll-build', 'styles', 'scripts', 'images', 'watch'], function() {
  browserSync.init({
    server: {
        baseDir: dest.site
    }
  });
});

// Rebuild Jekyll
gulp.task('jekyll-build', shell.task('jekyll build'));

// Watch
gulp.task('watch', function() {
    gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html'], function() {
      gulp.run('sync');
    });
    gulp.watch(paths.css + '/**/*.scss', ['styles']);
    gulp.watch(paths.js + '/**/*.js', ['scripts']);
    gulp.watch(paths.img, ['images']);
});

// Sync Browser
gulp.task('sync', ['jekyll-build'], function() {
  reload()
});

// images
gulp.task('images', function() {
  return gulp.src([
    paths.img + '/*'
  ])
  .pipe(image())
  .pipe(gulp.dest(dest.img));
});

// Styles
gulp.task('styles', function() {
  return gulp.src([
    paths.css + '/app.scss'
  ])
  .pipe(sass({
    includePaths: [
      paths.bower + '/foundation/scss'
    ]
  }))
  .pipe(autoprefixer(
      'last 2 version',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ))
  .pipe(concat('app.css'))
  .pipe(rename('app.min.css'))
  .pipe(uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  }))
  .pipe(gulp.dest(dest.css))
  .pipe(browserSync.stream());
});


// Scripts
gulp.task('scripts', function() {
  gulp.src([
    paths.bower + '/jquery/dist/jquery.js',
    paths.bower + '/foundation/js/foundation.js',
    paths.bower + '/foundation/js/foundation.alert.js',
    paths.js + '/app.js'
  ])
  .pipe(concat('app.js'))
  .pipe(rename('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dest.js));

  return gulp.src(paths.bower + '/modernizr/modernizr.js')
    .pipe(rename('modernizr.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest.js));
});

// Default Task
gulp.task('default', ['serve']);