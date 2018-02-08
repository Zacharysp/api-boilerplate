'use strict';

require('should');
const path = require('path');
const lib = require('../lib');

describe('The lib', () => {
  test('should be there', () => {
    lib.should.be.Object();
    lib.should.have.property('app').which.is.Function();
  });

  test('can boot', (done) => {
    lib.app.should.have.property('boot').which.is.Function();
    lib.app.boot(done);
  });

  test('should have the configs now', () => {
    lib.app.should.have.property('get').which.is.Function();
    lib.app.get('host').should.equal('0.0.0.0');
  });

  test('should have a root directory', () => {
    lib.app.get('rootDir').should.equal(path.resolve(__dirname, '../'));
  });
});
