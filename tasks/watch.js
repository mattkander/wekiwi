'use strict';

const gulp = require('gulp');
const sass = require('./sass');
const scripts = require('./scripts');
const mustache = require('./mustache');
const inline = require('./inline');
const { wallpaper, PUBLIC_PATH_RELATIVE } = require('../src/lib/wallpaperHelper.js');

module.exports = function watch() {
  gulp.watch(PUBLIC_PATH_RELATIVE + wallpaper.id + '/src/**/*.mustache', { cwd: './' }, gulp.series(gulp.parallel(mustache, scripts), inline));
  gulp.watch(PUBLIC_PATH_RELATIVE + wallpaper.id + '/assets/data.json', { cwd: './' }, gulp.series(gulp.parallel(mustache, scripts), inline));
  gulp.watch(wallpaper.path + '/src/**/*.scss', sass);
  gulp.watch(wallpaper.path + '/src/**/*.js', gulp.series(gulp.parallel(mustache, scripts), inline));
}
