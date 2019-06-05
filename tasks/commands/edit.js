'use strict';

const gulp = require('gulp');
const watch = require('../watch');
const sass = require('../sass');
const scripts = require('../scripts');
const mustache = require('../mustache');
const inline = require('../inline');
const runDevServer = require('../run-dev-server');
const wp = require('../../src/lib/wallpaperHelper.js');
const notify = require('../../src/lib/notify');

module.exports = async function edit(options) {
  wp.parseID(options, 'edit')
  .then(wallpaper => {
    notify.log(`Editing ${wallpaper.id}...`);
    gulp.series(gulp.parallel(sass, scripts, mustache), inline, runDevServer, watch)();
  })
  .catch(errs => notify.errorAndKill(errs));
}
