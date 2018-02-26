'use strict';

const app = require('../lib');
const Raven = require('raven');

let handler = function() { return function() {}; };

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  handler = function(options) {
    try {
      Raven.config(options.sentryDSN).install();
      return Raven.errorHandler();
    } catch (e) {
      console.error(`Sentry configuration failed! Sentry DSN: '${options.sentryDSN}'`);
    }
  };
}

module.exports = handler;
