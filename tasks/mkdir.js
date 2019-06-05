'use strict';

const makeDir = require('make-dir');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');

module.exports = function makeWallpaperDirectory(done) {
  return makeDir(wallpaper.path + '/src')
    .then(path => Promise.resolve(path))
    .catch(err => Promise.reject(err));
}
