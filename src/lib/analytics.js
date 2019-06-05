const Mixpanel = require('mixpanel');
const config = require('../config');
const mixpanel = Mixpanel.init(config.tracking.mixpanel_key);
const { wallpaper, getBlueprint } = require('./wallpaperHelper');

const CREATE_ACTION = 'create';
const EDIT_ACTION = 'edit';
const EXPORT_ACTION = 'export';

module.exports = {
  CREATE_ACTION,
  EDIT_ACTION,
  EXPORT_ACTION,
  send: function(event) {
    if(!config.tracking.active) return;
    const data = Object.assign(wallpaper, getBlueprint(config.templates.prod));
    data.distinct_id = Math.floor((Math.random() * 10e10) + 1);
    mixpanel.track(event, data);
  }
}
