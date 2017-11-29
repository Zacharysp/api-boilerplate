'use strict';

const env = require('env-var');

/**
 * Environment variables, and constants.
 *
 * The idea: things in here would override all the other config files, so this is NOT considered the
 * place for default configs, but the `config.json` and the env-specific config files are.
 */
module.exports = {
  // Server.
  port: env.get('API_PORT').asInt(),

  // Log.
  logStream: env.get('LOG_STREAM').asString(),
  syslogHost: env.get('SYSLOG_HOST').asString(),
  syslogPort: env.get('SYSLOG_PORT').asInt()
};
