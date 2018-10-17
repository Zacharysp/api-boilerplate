'use strict';

const uuid = require('uuid');
const expressLogger = require('express-bunyan-logger');
const { getTransactionId } = require('../lib/utils');
const app = require('../server');

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  const loggerFactory = require('../lib/logger');
  const logger = loggerFactory(options);

  const attr = options.attributeName || 'transactionId';
  let header = options.header;
  if (header == null) {
    header = 'x-transaction-id';
  } else {
    header = header.toLowerCase();
  }

  /**
   * Attach a transaction ID to the request, if not there already.
   */
  const attachTransactionId = function(req, res, next) {
    if (req.headers == null) {
      req.headers = {};
    }
    if (!req.headers[header]) {
      req.headers[header] = uuid.v4();
    }
    req[attr] = req.headers[header];
    return next();
  };

  /**
   * Log request.
   */
  const logRequest = expressLogger({
    logger,
    immediate: true,
    genReqId: getTransactionId(attr),
    excludes: ['res', 'res-headers']
  });

  /**
   * Log response.
   */
  const logResponse = expressLogger({
    logger,
    immediate: false,
    genReqId: getTransactionId(attr)
  });

  return app.loopback.Router().use(attachTransactionId, logRequest, logResponse);
};
