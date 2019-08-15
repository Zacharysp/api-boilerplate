'use strict';
const logger = require('express-bunyan-logger');

module.exports = function(app) {
  app.middleware(
    'initial:before',
    logger({
      logger: app.logger,
      immediate: true,
      genReqId: function(req) {
        return req.get('x-transaction-id');
      },
      excludes: ['res', 'res-headers']
    })
  );

  app.middleware(
    'routes:before',
    logger({
      logger: app.logger,
      immediate: false,
      genReqId: function(req) {
        return req.get('x-transaction-id');
      }
    })
  );

  app.middleware('final:before', (err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      delete err.stack;
    }
    logger.errorLogger({
      logger: app.logger,
      immediate: false,
      genReqId: function(req) {
        return req.get('x-transaction-id');
      }
    })(err, req, res, next);
  });
};
