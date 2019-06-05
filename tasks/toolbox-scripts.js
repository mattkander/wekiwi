'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserify = require('browserify');
const riotify = require('riotify');
const babelify = require('babelify');
const plumber = require('gulp-plumber');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const notify = require('../src/lib/notify');
const config = require('../src/config');

module.exports = function scripts(dist = false, cb) {
  const { name, version } = config.toolbox;
  const b = browserify({
    basedir: __dirname,
    entries: '../src/toolbox/scripts/index.js',
    debug: false,
    extensions: ['.tag'],
    cache: {},
    packageCache: {}
  })
  .transform(riotify, {
    type: 'es6' 
  })
  .transform(babelify.configure({
    ignore: /riot|picturefill/,
    sourceMaps: !dist
  }));
  notify.log('Compile Toolbox scripts started...');
  return b
    .bundle()
    .on('error', err => {
      notify.jsError(err);
      cb(false, false);
    })
    .on('end', () => { 
      notify.log('Compile Toolbox scripts ended');
      cb(false, true);
    })
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(dist, uglify()))
    .pipe(rename(`${name}-${version}.js`))
    .pipe(gulp.dest(config.toolbox.export_path + '/js/'));
}
