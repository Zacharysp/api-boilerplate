'use strict';

/**
 * Build a logger instance.
 */
module.exports = function(options) {
  if (options == null) {
    options = {};
  } else if (typeof options === 'string') {
    options = { stream: options };
  }

  const builder = require(`./loggers/${options.stream ? options.stream.toLowerCase() : 'debug'}`);
  if (builder == null) {
    throw new Error('bad stream name ' + options.stream);
  }

  return builder(options.name || 'myapp');
};
