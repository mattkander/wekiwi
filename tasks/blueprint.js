'use strict';

const fs = require('fs');
const defaults = require('../config.json');
const overrides = require('../config.local.json');
const config = require('../src/config');
const { wallpaper, getBlueprint } = require('../src/lib/wallpaperHelper.js');

module.exports = function writeBlueprint() {
  const blueprint = getBlueprint({ dependencies: config.templates });
  return new Promise(function(resolve, reject) {
    fs.writeFile(wallpaper.path + '/config.json', JSON.stringify(blueprint), err => {
      if(err) reject()
      resolve()
    });
  });
}
