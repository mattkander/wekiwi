'use strict';

const gulp = require('gulp');
const inline = require('gulp-inline');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');
const inject = require('gulp-inject-string');
const gulpif = require('gulp-if');
const notify = require('../src/lib/notify.js');

module.exports = function inlineAssets() {
  notify.log('Inline assets...');
  const disabledTypes = ['svg', 'img'];
  if(!wallpaper.dist) disabledTypes.push('css');
  return gulp.src(wallpaper.path + '/index.html')
    .pipe(inline({
        base: wallpaper.path,
        css: [minifyCss, autoprefixer({ browsers: ['last 2 versions'] })],
        disabledTypes
      })
    )
    .pipe(gulpif((wallpaper.paused), inject.before('</body>','<script>setTimeout(function(){wetransfer.pauseTimer();}, 100);</script>\n')))
    .on('end', () => { notify.log('Assets inlined.') })
    .on('error', err => { notify.error(err) })
    .pipe(gulp.dest(wallpaper.path));
}
