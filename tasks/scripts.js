'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const notify = require('../src/lib/notify');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');

module.exports = function compileScripts() {
  notify.log('Compile scripts...')
  return gulp
    .src(wallpaper.path + '/src/**/*.js')
    .pipe(plumber({ errorHandler: function(err) {
      notify.jsError(err);
      if(wallpaper.dist) process.exit(1);
    }}))
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulpif(wallpaper.dist, uglify()))
    .on('end', () => { notify.log('Scripts compiled.') })
    .pipe(gulp.dest(wallpaper.path + '/assets/js/'));
}
