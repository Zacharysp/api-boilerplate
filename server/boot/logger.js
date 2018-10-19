'use strict';

const loggerFactory = require('../lib/logger');

/**
 * Initialize the logger.
 */
module.exports = function(app) {
  // The logger.
  app.logger = loggerFactory(app.get('logStream'));
};
