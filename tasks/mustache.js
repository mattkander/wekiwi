'use strict';

const gulp = require('gulp');
const mustache = require('gulp-mustache');
const plumber = require('gulp-plumber');
const notify = require('../src/lib/notify');
const config = require('../src/config');
const { wallpaper, getJSON } = require('../src/lib/wallpaperHelper.js');

module.exports = async function compileMustache(done) {
  try {
    const templateData = (wallpaper.isLegacy) ? {} : await getJSON(wallpaper.path + '/assets/data.json');
    const configData = (wallpaper.isLegacy) ? {} : await getJSON(wallpaper.path + '/config.json');
    const dependenciesObj = (wallpaper.isLegacy) ? config.templates : configData.dependencies;
    const dependencies = (wallpaper.dist) ? dependenciesObj.prod : dependenciesObj.dev;
    const data = Object.assign(dependencies, templateData, wallpaper);
    notify.log('Compile template...')
    return gulp
      .src(wallpaper.path + '/src/index.mustache')
      .on('error', (err) => { notify.log(err); done() })
      .on('end', () => { notify.log('Template compiled.') })
      .pipe(plumber({ errorHandler: function(err) {
        notify.mustacheError(err);
        if(wallpaper.dist) process.exit(1);
      }}))
      .pipe(mustache(data, { 
        extension: '.html'
      }).on('error', (err) => { notify.log(err) }))
      .pipe(gulp.dest(wallpaper.path));
  }
  catch(e) {
    const error = e.file + ': ' + e.error;
    if(wallpaper.dist) {
      notify.errorAndKill([error]);
    }
    else {
      notify.error(error);
      done();
    }
  }
}
