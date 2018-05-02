'use strict';

const path = require('path');
const lib = require('../../server/lib');

describe('Lib', () => {
  it('should be there', () => {
    expect(lib).toBeDefined();
    expect(lib.app).toBeInstanceOf(Function);
  });

  it('should can boot', (done) => {
    expect(lib.app.boot).toBeInstanceOf(Function);
    lib.app.boot(done());
  });

  it('should have the configs now', () => {
    expect(lib.app.get).toBeInstanceOf(Function);
    // expect(lib.app.get('host')).toBe('0.0.0.0'); // TOFIX
  });

  it('should have a root directory', () => {
    expect(lib.app.get('rootDir')).toBe(path.resolve(__dirname, '../../server'));
  });
});
