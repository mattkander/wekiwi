'use strict';

var wetransfer = require('../api');

module.exports = {
  trackEvent: function(filename, event) {
    wetransfer.vast(filename, event);
  }
}
