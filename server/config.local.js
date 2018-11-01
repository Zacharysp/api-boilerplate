'use strict';

const env = require('env-var-defaults').injected(['test', 'development', 'dev', 'staging', 'production']);

/**
 * Environment variables, with defaults.
 */
module.exports = {
  // Server.
  port: env.get('HELLO_PORT').asInt(),
  rootCaFile: env.get('ROOT_CA_FILE').asString(),

  // Log.
  logStream: env
    .get('LOG_STREAM', [process.env.VERBOSE_TRACE_LOG ? 'debug' : 'file', 'debug', 'syslog', 'syslog', 'syslog'])
    .asString(),
  syslogHost: env.get('SYSLOG_HOST').asString(),
  syslogPort: env.get('SYSLOG_PORT').asInt(),
  syslogProto: env.get('SYSLOG_PROTO').asString()
};
