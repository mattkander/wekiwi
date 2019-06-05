'use strict';

const fs = require('fs');
const npm = require('npm-programmatic');
const path = require('path');
const moment = require('moment');
const reload = require('require-reload')(require);
const simpleGit = require('simple-git')(__dirname);
const notify = require('./notify');
const TIMESTAMP = path.resolve(__dirname, '../../.updated');
const CWD = path.resolve(__dirname, '../../');
const REPO = path.resolve(__dirname, '../../.git');

function getPackageName(pkg) {
  // Removes ^ from package version in package.json
  // ^x.x.x becomes x.x.x
  const name = pkg[0];
  const version = (pkg[1][0] != '^') ? pkg[1] : pkg[1].substring(1, pkg[1].length);
  return `${name}@${version}`;
}

function installDependencies() {
  return new Promise((resolve, reject) => {
    // Some new content might have come from the server while executing this command. 
    // Reload package.json to get latest dependencies
    const { dependencies, devDependencies } = reload('../../package.json');
    const allDependencies = Object.entries(Object.assign(dependencies, devDependencies));
    const packages = allDependencies.map(i => getPackageName(i));
    npm.install(packages, {
      cwd: CWD,
      save: false,
      output: false,
      global: false,
      saveDev: false,
      noOptional: true
    })
    .then(() => {
      // Depending on the system or user config, package-lock will be updated
      // and staged for commit after a programmatic `npm install`
      // After install, we checkout the lock to avoid conflicts
      const file = path.resolve(__dirname, '../../package-lock.json');
      simpleGit.checkout(file, err => {
        resolve();
      });
    })
    .catch(e => notify.errorAndKill([e]));
  });
}

function createTimestamp() {
  // Writes a file with the current timestamp. This file will be later used to figure out
  // if a new check for an update needs to be performed.
  return new Promise((resolve, reject) => {
    fs.writeFile(TIMESTAMP, moment().format(), err => {
      if (err) reject(err);
      resolve();
    });
  });
}

function getLastUpdate() {
  // Returns the time of the last check for an update
  return new Promise(async (resolve, reject) => {
    // If there is no timestamp, create one
    if(!fs.existsSync(TIMESTAMP)) await createTimestamp();
    fs.readFile(TIMESTAMP, 'utf8', async (err, lastUpdate) => {
      if(err) reject(err);
      resolve(lastUpdate);
    });
  });
}

function needsUpdate(lastUpdate) {
  // Checks if enough time has ellapsed since last update
	const today = moment();
	const nextUpdate = moment(lastUpdate).add(8, 'hours');
	return (nextUpdate < today);
}

function pull() {
  return new Promise(async (resolve, reject) => {
    // Determines whether the current working directory is part 
    // of a git repository, then we pull
    if(!fs.existsSync(REPO)) 
      resolve(false);
    else
      simpleGit.pull((err, update) => {
        if(err) reject(err);
        // Return true if some new files came with the pull
        resolve(update && (update.files.length > 0));
      });
  });
}

function check() {
  return new Promise(async (resolve, reject) => {
    notify.log('Checking for updates...');
    const lastUpdate = await getLastUpdate();
    resolve(needsUpdate(lastUpdate));
  });
}

module.exports = {
  check,
  pull,
  installDependencies,
  createTimestamp
}
