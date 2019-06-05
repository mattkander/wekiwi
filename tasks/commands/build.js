'use strict';

const gulp = require('gulp');
const sass = require('../sass');
const scripts = require('../scripts');
const mustache = require('../mustache');
const inline = require('../inline');
const dist = require('../dist');
const clean = require('../clean');
const notify = require('../../src/lib/notify');
const wp = require('../../src/lib/wallpaperHelper.js');
const config = require('../../src/config');

module.exports = function build(options) {
  wp.parseID(options, 'build')
  .then(wallpaper => {
    notify.log(`Building ${wallpaper.id}...`);
    // TODO: this should actually read from the wallpaper config file
    // console.log('Toolbox version: ' + config.templates.prod['toolbox-js']);
    // console.log('API version: ' + config.templates.prod['wallpaper-api']);
    gulp.series(gulp.parallel(sass, scripts, mustache), inline, dist, clean)()
  })
  .catch(errs => notify.errorAndKill([errs]));
}
