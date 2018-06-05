'use strict';

require('should');
const app = require('../server');
var boot = require('loopback-boot');

describe('The server', () => {

  it('can boot', (done) => {
    app.should.have.property('boot').which.is.Function();
    boot(app, __dirname, (err)=> {
      if (err) throw err;
      app.start();
      done();
    });
    
  });

  it('should have the configs now', () => {
    app.should.have.property('get').which.is.Function();
    app.get('host').should.equal('0.0.0.0');
  });

});
