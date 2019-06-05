'use strict';

var assert = require('assert');
var config = require('../../../../config.json');

assert(('wetransfer' in window), 'Include Wetransfer API in your HTML ' + config.templates.prod['wallpaper-api']);

module.exports = window.wetransfer || {};