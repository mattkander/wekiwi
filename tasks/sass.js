'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const notify = require('../src/lib/notify');
const inject = require('gulp-inject-string');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');

module.exports = function compileSass() {
  notify.log('Compile styles...')
  return gulp.src(wallpaper.path + '/src/**/*.scss')
    .pipe(sass().on('error', function(err) {
      notify.sassError(err);
      if(wallpaper.dist) process.exit(1);
    }))
    .on('end', () => { notify.log('Styles compiled.') })
    .pipe(gulpif((!wallpaper.dist), inject.replace(/url\((.*?)assets(.*?)\)/g, 'url($1../../assets$2)')))
    .pipe(gulp.dest(wallpaper.path + '/assets/css/'))
}
