'use strict';

const loggerFactory = require('bunyan-logger-factory');

module.exports = app => {
  app.lib = app.lib || {};

  app.logger = app.lib.logger = loggerFactory.init({
    logName: 'wcl-service',
    logStream: app.get('logStream'),
    logHost: app.get('logHost'),
    logPort: app.get('logPort'),
    logProto: app.get('logProto')
  });
};
