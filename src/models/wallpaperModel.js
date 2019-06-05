'use strict';

const templates = require('../templates');

module.exports = {
  rules: {
    create: {
      account: 'required|url',
      campaign: 'required|url',
      template: 'valid'
    },
    edit: {
      wallpaper: 'required|url'
    },
    build: {
      wallpaper: 'required|url'
    },
    serve: {
      wallpaper: 'url'
    }
  },
  default: {
    template: 'static'
  },
  allowed: {
    template: templates.valid()
  },
  namesForHumans: {
    account: 'Account (-a)',
    campaign: 'Campaign (-c)',
    template: 'Template (-t)',
    wallpaper: 'Wallpaper ID (-w)'
  }
}
