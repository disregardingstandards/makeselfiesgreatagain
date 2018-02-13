var gulp     = require('gulp');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');
var prefix   = require('gulp-autoprefixer');
var sass     = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename   = require('gulp-rename');

var cssSrc = 'scss/**/*.scss';
var cssDest = 'public/css/';

var jsSrc = 'js/*.js';
var jsDest = 'public/js/';

process.env.NODE_ENV === 'production' ? 'production' : 'development';

gulp.task('styles', function(){
  gulp.src(cssSrc)
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 2 versions'))
  .pipe(concat('style.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(cssDest));
});

gulp.task('js', function(){
  gulp.src(jsSrc)
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(jsDest))
});

gulp.task('default', function() {
  gulp.start('styles')
  gulp.start('js')

  if (process.env.NODE_ENV !== "production") {
    gulp.watch(cssSrc, ['styles']);
    gulp.watch(jsSrc,['js']);
  }  
});