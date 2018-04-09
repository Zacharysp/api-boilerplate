'use strict';

// Non need to init libs will be required directly from lib.xxx
// Other need to init libs will be required from app.xxx

const { disableRemoteMethods } = require('./helper');
const { WCLError, initWCLError } = require('./wclError');

exports.disableRemoteMethods = disableRemoteMethods;
exports.WCLError = WCLError;
exports.initWCLError = initWCLError;
