'use strict';

const gulp = require('gulp');
const config = require('../src/config');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');

module.exports = function clean() {
  return gulp
    .src(wallpaper.path + '/index.html')
    .pipe(gulp.dest(config.export_dir + wallpaper.id));
}
