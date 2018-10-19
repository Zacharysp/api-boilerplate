'use strict';

const Logger = require('bunyan-logger');

const app = require('../../server');

module.exports = function(name) {
  return new Logger({
    name: name,
    level: 'debug',
    stream: {
      name: 'syslog',
      options: {
        name: name,
        host: app.get('syslogHost') || 'localhost',
        port: app.get('syslogPort') || 514,
        type: app.get('syslogProto') || 'udp'
      }
    }
  });
};
