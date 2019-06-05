'use strict';

const gulp = require('gulp');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');
const templates = require('../src/templates');

module.exports = function copyTemplate() {
  return gulp
    .src(templates.path(wallpaper.template) + '/**/*')
    .pipe(gulp.dest(wallpaper.path));
}
