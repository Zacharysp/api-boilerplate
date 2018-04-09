'use strict';

const lib = require('../lib');
const { initWCLError } = lib.utils;

/**
 * Initialize the WCLError.
 */
module.exports = function(app) {
  initWCLError();
};
