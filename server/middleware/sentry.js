'use strict';

const app = require('../lib');
const Raven = require('raven');
const env = require('env-var');
const DSN = env.get('SENTRY_DSN', '').asString();

let handler = function() { return function() {}; };

if (DSN !== '' && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  try {
    Raven.config(DSN).install();
    handler = function() {
      return Raven.errorHandler();
    };
  } catch (e) {
    console.error(`Sentry connection to '${DSN}' failed`);
  }
}

module.exports = handler;
