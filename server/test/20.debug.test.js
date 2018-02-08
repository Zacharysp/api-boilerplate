'use strict';

require('should');

const lib = require('../lib');
const app = lib.app;

describe('The debug', () => {
  let debug;

  beforeAll((done) => {
    app.boot(done);
  });

  test('should be there', () => {
    lib.should.have.property('debug').which.is.Function();
  });

  describe('An instance with no options', () => {
    test('can build a debug function', () => {
      debug = lib.debug();
      debug.should.be.Function();
    });

    test('can output', () => {
      debug(new Error('lorem'));
    });

    test('can output', () => {
      debug('lorem');
    });

    test('can output', () => {
      debug({});
    });

    test('can output', () => {
      debug('lorem', {});
    });
  });

  describe('An instance with a default message', () => {
    test('can build a debug function', () => {
      debug = lib.debug('default message');
      debug.should.be.Function();
    });

    test('can output', () => {
      debug(new Error('lorem'));
    });

    test('can output', () => {
      debug('lorem');
    });

    test('can output', () => {
      debug({});
    });

    test('can output', () => {
      debug('lorem', {});
    });
  });
});
