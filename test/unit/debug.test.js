'use strict';

const path = require('path');
const lib = require('../../server/lib');

describe('Debug', () => {
  beforeAll((done) => {
    lib.app.boot(done());
  });

  it('should be there', () => {
    expect(lib.debug).toBeInstanceOf(Function);
  });

  describe('Init with no options', () => {
    let spyObj = {};

    it('can build a debug function', () => {
      spyObj.debug = lib.debug();
      expect(spyObj.debug).toBeInstanceOf(Function);
    });

    it('can output error', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug(new Error('lorem'));

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output string', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug('lorem');

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output object', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug({});

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output mix info', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug('lorem', {});
      expect(spyDebug).toHaveBeenCalled();
    });
  });

  describe('Init with a default message', () => {
    let spyObj = {};

    it('can build a debug function', () => {
      spyObj.debug = lib.debug('default message');
      expect(spyObj.debug).toBeInstanceOf(Function);
    });

    it('can output error', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug(new Error('lorem'));

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output string', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug('lorem');

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output object', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug({});

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output mix info', () => {
      const spyDebug = jest.spyOn(spyObj, 'debug');
      spyObj.debug('lorem', {});
      expect(spyDebug).toHaveBeenCalled();
    });
  });
});
