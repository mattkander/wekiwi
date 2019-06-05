'use strict';

const gulp = require('gulp');
const server = require('gulp-server-livereload');
const open = require('gulp-open');
const ip = require('ip');
const { wallpaper, SERVER_ROOT } = require('../src/lib/wallpaperHelper.js');

module.exports = function runDevServer(done) {
  return gulp
    .src(SERVER_ROOT)
    .pipe(server({
      livereload: {
        enable: true,
        filter: function (filename, cb) {
          cb(!/\.(sc|le)ss$|node_modules/.test(filename))
        }
      },
      directoryListing: false,
      open: false,
      host: '0.0.0.0'
    }))
    .pipe(open({ uri: 'http://' + ip.address() + ':8000/?name=' + wallpaper.id }));
}
