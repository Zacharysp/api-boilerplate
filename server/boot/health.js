'use strict';

module.exports = function(app) {
  // TODO: more info
  app.get(app.get('healthApiRoot') || '/health', app.loopback.status());
};
