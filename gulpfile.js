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
var googleWebFonts = require('gulp-google-webfonts');

var paths = {
      'bower': './bower_components',
      'node': './node_modules',
      'assets': './assets',
      'css': './assets/styles',
      'js': './assets/scripts',
      'img': './assets/images/**',
      'fonts': '../../assets/styles',
      'forms': './assets/forms/**.*'
    }

var dest = {
  'site': '_site',
  'js': '_site/js',
  'css': '_site/css',
  'img': '_site/images',
  'fonts': '_site/fonts',
  'forms': '_site/forms'
}

gulp.task('serve', ['jekyll-build', 'fonts', 'styles', 'scripts', 'watch'], function() {
  browserSync.init({
    server: {
        baseDir: dest.site
    }
  });
  return gulp.src([
    paths.forms
  ])
  .pipe(gulp.dest(dest.forms));

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
    gulp.watch(paths.forms, ['forms']);
});

// Sync Browser
gulp.task('sync', ['jekyll-build'], function() {
  reload()
});

// images
gulp.task('images', function() {
  return gulp.src([
    paths.img
  ])
  .pipe(image())
  .pipe(gulp.dest(dest.img));
});

// Styles
gulp.task('styles', function() {
  return gulp.src([
    paths.css + '/app.scss',
    paths.node + '/slick-carousel/slick/slick.scss'
  ])
  .pipe(sass({
    includePaths: [
      paths.bower + '/foundation-sites/scss'
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
    // paths.bower + '/modernizr/modernizr.js',
    paths.bower + '/jquery/dist/jquery.js',
    paths.bower + '/foundation-sites/dist/js/foundation.js',
    // paths.bower + '/foundation-sites/dist/js/plugins/foundation.reveal.js',
    // paths.bower + '/foundation-sites/dist/js/plugins/foundation.alert.js',
    paths.node + '/slick-carousel/slick/slick.js',
    paths.js + '/app.js'
  ])
  .pipe(concat('app.js'))
  .pipe(rename('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dest.js));
});

// Fonts
var options = {
	cssDir: paths.fonts,
	cssFilename: '_myGoogleFonts.scss'
};

gulp.task('fonts', function () {
    return gulp.src('assets/fonts/fonts.list')
        .pipe(googleWebFonts(options))
        .pipe(gulp.dest(dest.fonts));
});

// forms
gulp.task('forms', function() {
  return gulp.src([
    paths.forms
  ])
  .pipe(gulp.dest(dest.forms));
});

// Default Task
gulp.task('default', ['serve']);
