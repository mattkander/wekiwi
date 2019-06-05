'use strict';

const gulp = require('gulp');
const Promise = require('bluebird');
const toolboxScripts = Promise.promisify(require('../toolbox-scripts'));
const toolboxStyles = Promise.promisify(require('../toolbox-styles'));
const notify = require('../../src/lib/notify');

module.exports = async function toolbox(options) {
  try {
    const { dist, watch } = options;
    const tasks = await Promise.all([toolboxScripts(dist), toolboxStyles(dist)]);
    for(let task of tasks) {
      if(!task) notify.errorAndKill(['Some tasks failed.'])
    }
    notify.success('Toolbox Compiled.');
    
    if(watch) {
      notify.log('Watching files...');
      gulp.watch('./src/toolbox/styles/**/*', cb => {
        toolboxStyles(dist);
        cb();
      });
      gulp.watch('./src/toolbox/scripts/**/*', cb => {
        toolboxScripts(dist);
        cb();
      });
    }
  }
  catch(e) {
    console.log(e)
  }
}
