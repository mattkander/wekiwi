'use strict';

const gulp = require('gulp');
const server = require('gulp-server-livereload');
const open = require('gulp-open');
const ip = require('ip').address;
const wp = require('../../src/lib/wallpaperHelper.js');
const notify = require('../../src/lib/notify.js');

module.exports = function serve(options) {
  wp.parseID(options, 'serve')
  .then(wallpaper => {
    const protocol = (options.https) ? 'https' : 'http';
    const id = wallpaper.id;
    const uri = `${protocol}://${ip()}:8000/?name=${id}`;
    gulp.src(wp.SERVER_ROOT)
      .pipe(server({
        https: options.https,
        host: '0.0.0.0'
      }))
      .pipe(open({ uri }));
  })
  .catch(errs => notify.errorAndKill(errs));
}
