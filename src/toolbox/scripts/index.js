'use strict';

require('babel-polyfill');
require('viewport-units-buggyfill').init();
require('./app/support/polyfills/array');
require('./app/support/querySelector');

require('./app/views/we-background');
require('./app/views/we-button');
require('./app/views/we-clickbutton');
require('./app/views/we-container');
require('./app/views/we-lang');
require('./app/views/we-video');
require('./app/views/we-wallpaper');
require('./app/views/we-embed');

const Riot = require('riot');
const wetransfer = require('./app/api.js');

wetransfer.ready(() => {
  Riot.mount('we-wallpaper');
});
