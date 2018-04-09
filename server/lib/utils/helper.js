'use strict';

const lib = require('../');

exports.disableRemoteMethods = function(model, allowedMethods) {
  model.sharedClass.methods().forEach(method => {
    if (allowedMethods.indexOf(method.name) < 0) {
      if (method.isStatic) {
        model.disableRemoteMethodByName(method.name);
      } else {
        model.disableRemoteMethodByName('prototype.' + method.name);
      }
    }
  });
};
