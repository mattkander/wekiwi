const defaults = require('../config.json');
const overrides = require('../config.local.json');

module.exports = Object.assign(defaults, overrides);
