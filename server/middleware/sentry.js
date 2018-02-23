'use strict';

const Raven = require('raven');
const env = require('env-var');
const DSN = env.get('SENTRY_DSN', '').asString()

if (DSN !== '') {
  Raven.config(DSN).install();
  module.exports = function() {
    return Raven.errorHandler();
  };
} else {
  module.exports = function() {};
}
