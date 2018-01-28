'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var sassGlob = require('gulp-sass-glob');
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");

/* SERVER */
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "build/"
    }
  });
});



/* PUG */
gulp.task('pug', function () {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
    .on('end', browserSync.reload);
});

/* SCSS */
gulp.task('scss', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(sassGlob())
    .pipe(scss().on('error', scss.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .on("error", notify.onError({
      message: "Error: <%= error.message %>",
      title: "Ошибка SCSS"
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});





/* WATCH */
gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
})

/* DEFAULT */
gulp.task('default', gulp.series(
  gulp.parallel('pug', 'scss'),
  gulp.parallel('watch', 'server')

));