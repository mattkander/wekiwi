'use strict';

const promisify = require('bluebird').promisify;
const toolboxScripts = promisify(require('../toolbox-scripts'));
const toolboxStyles = promisify(require('../toolbox-styles'));
const notify = require('../../src/lib/notify');
const { installDependencies, createTimestamp, pull } = require('../../src/lib/updates');

module.exports = async function update(needsUpdate) {
  return new Promise(async (resolve, reject) => {
    try {
      // If we are not getting a boolean here it means that we are running
      // the script from the command line and we do want to update
      if(typeof needsUpdate != 'boolean') needsUpdate = true;
      if(needsUpdate) {
        notify.log('Updating...');
        const newContent = await pull();
        if(newContent) {
          // There is new source code, install dependencies and build 
          // local toolbox copy
          await installDependencies();
          await Promise.all([toolboxScripts(true), toolboxStyles(true)]);
          await createTimestamp();
          notify.success('SandBox Updated');
          resolve();
        }
        else {
          // Nothing came from the repository
          await createTimestamp();
          notify.log('Already up to date');
          resolve();
        }
      }
      else {
        // auto update checked if an update was needed 
        // but last update happened in the recent past
        notify.log('Recently updated');
        resolve();
      }
    }
    catch(e) {
      notify.errorAndKill([e]);
    }
  })
}
