'use strict';

const { createTimestamp, check } = require('./updates');
const config = require('../config');
const updateTask = require('../../tasks/commands/update');

module.exports = async function autoUpdate(options, callback) {
  // If user has enabled updates
  if(config.auto_updates) {
    // Check against last update timestamp
    const needsUpdate = await check();
    if(needsUpdate)
      // Perform update
      await updateTask(needsUpdate);
    else
      // Update timestamp
      await createTimestamp();
  }
  // Run callback task
  callback(options);
}
