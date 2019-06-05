'use strict';

const createBlueprint = require('../blueprint');
const createWallpaperDirectory = require('../mkdir');
const copyTemplate = require('../copy-template');
const createPrompt = require('../prompt').create;
const notify = require('../../src/lib/notify');
const wp = require('../../src/lib/wallpaperHelper');
const analytics = require('../../src/lib/analytics');
const config = require('../../src/config');

module.exports = async function create(options) {
  notify.log('Creating wallpaper...');
  options = await createPrompt(options);
  wp.parse(options, 'create')
  .then(async wallpaper => {
    await createWallpaperDirectory();
    await Promise.all([createBlueprint(), copyTemplate()]);
    const editCommand = `we edit -w ${wallpaper.id}`;
    notify.success(`Your wallpaper was created. Run ${notify.highlight(editCommand)} to get started`);
    analytics.send(analytics.CREATE_ACTION);
  })
  .catch(errs => errs && notify.errorAndKill(errs));
}
