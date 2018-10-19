'use strict';

let func;
exports.getTransactionId = function(attr) {
  if (!func) {
    attr = attr || 'transactionId';
    func = function(req) {
      return req[attr];
    };
  }
  return func;
};
