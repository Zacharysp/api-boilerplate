'use strict';

require('should');
const path = require('path');
const lib = require('../lib');
const { WCLError } = lib.utils;
const { ERRORS } = require('../constants');

describe('WCLError', () => {
  it('Can create mohError object with message', () => {
    const error = new WCLError('test error message', { status: 400, code: 1008 });

    error.should.be.Object();
    error.statusCode.should.be.equal(400);
    error.code.should.be.equal(1008);
  });

  it('Can create mohError object with template', () => {
    const error = new WCLError(ERRORS.DATA_VALIDATE_ERROR, {
      code: 1008,
      someProps: 'need to appear'
    });

    error.should.be.Object();
    error.statusCode.should.be.equal(403);
    error.message.should.be.equal('data validation error');
    error.code.should.be.equal(1008);
    error.someProps.should.be.equal('need to appear');
  });
});
