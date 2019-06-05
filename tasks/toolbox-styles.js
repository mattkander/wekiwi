'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const notify = require('../src/lib/notify');
const config = require('../src/config');

module.exports = function styles(dist = false, cb) {
  notify.log('Compile Toolbox styles started...')
	return gulp
    .src('./src/toolbox/styles/screen.scss')
    .on('end', () => { 
      notify.log('Compile Toolbox styles ended'); 
      cb(false, true);
    })
    .on('error', err => { 
      notify.sassError(err); 
      cb(false, false);
    })
    .pipe(gulpif(dist, autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(rename(config.toolbox.name + '-' + config.toolbox.version + '.css'))
    .pipe(gulp.dest(config.toolbox.export_path + '/css'));
}
