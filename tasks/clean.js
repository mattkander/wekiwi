'use strict';

const gulp = require('gulp');
const notify = require('../src/lib/notify.js');
const config = require('../src/config');
const { wallpaper } = require('../src/lib/wallpaperHelper.js');

module.exports = function clean() {    
  return gulp
    .src(wallpaper.path + '/assets/**/*')
    .pipe(gulp.dest(config.export_dir + wallpaper.id + '/assets'))
    .on('end', (e) => {
      notify.success('Your wallpaper was exported. Upload it via FTP and check ' + notify.highlight('https://adpreview.wetransfer.com/new/?name=' + wallpaper.id))
    });
}
