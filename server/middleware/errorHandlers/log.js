'use strict';

const expressLogger = require('express-bunyan-logger');

const { getTransactionId } = require('../../lib/utils');
const loggerFactory = require('../../lib/logger');

module.exports = function(options) {
  return expressLogger.errorLogger({
    logger: loggerFactory(options),
    immediate: false,
    genReqId: getTransactionId(), // @see middleware/traceLog.js
    levelFn
  });
};

/**
 * This is different with the `defaultLevelFn()`, where the default one sends `error` log whenever
 * there's an `err`, and problem is with the error middleware there's always an `err`.
 */
function levelFn(status, err) {
  if (status >= 500) {
    return 'error';
  } else if (status >= 400) {
    return 'warn';
  }
  return 'info';
}
