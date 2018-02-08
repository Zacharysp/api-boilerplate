'use strict';

require('should');
const request = require('supertest');

const lib = require('../lib');
const app = lib.app;

describe('The loggers', () => {
  let logger;

  beforeAll((done) => {
    app.boot(done);
  });

  test('should be there', () => {
    lib.should.have.property('logger').which.is.Function();
    lib.should.have.property('loggers').which.is.Object();
  });

  describe('The debug', () => {
    test('should be there', () => {
      lib.loggers.should.have.property('debug').which.is.Function();
    });

    test('can build a logger', () => {
      logger = lib.logger('debug');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
    });

    test('can output', () => {
      logger.info(new Error('lorem'));
    });

    test('can output', () => {
      logger.info('lorem');
    });

    test('can output', () => {
      logger.info({});
    });

    test('can output', () => {
      logger.info('lorem', {});
    });
  });

  describe('The ringbuffer', () => {
    let ringbuffer;

    beforeEach(() => {
      if (ringbuffer) {
        ringbuffer.records = [];
      }
    });

    test('should be there', () => {
      lib.loggers.should.have.property('ringbuffer').which.is.Function();
    });

    test('can build a logger', () => {
      logger = lib.logger('ringbuffer');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
      logger.should.have.property('streams').which.is.Array().with.length(1);
      ringbuffer = logger.streams[0].stream;
    });

    test('can output', () => {
      logger.info(new Error('lorem'));
      ringbuffer.records.should.be.Array().with.length(1);
    });

    test('can output', () => {
      logger.info('lorem');
      ringbuffer.records.should.be.Array().with.length(1);
    });

    test('can output', () => {
      logger.info({});
      ringbuffer.records.should.be.Array().with.length(1);
    });

    test('can output', () => {
      logger.info('lorem', {});
      ringbuffer.records.should.be.Array().with.length(1);
    });
  });

  describe('The syslog', () => {
    test('should be there', () => {
      lib.loggers.should.have.property('syslog').which.is.Function();
    });

    test('can build a logger', () => {
      logger = lib.logger('syslog');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
    });

    test('can output', () => {
      logger.info(new Error('lorem'));
    });

    test('can output', () => {
      logger.info('lorem');
    });

    test('can output', () => {
      logger.info({});
    });

    test('can output', () => {
      logger.info('lorem', {});
    });
  });

  describe('The global logger', () => {
    test('should be there', () => {
      app.should.have.property('logger').which.is.Object();
      app.logger.should.have.property('info').which.is.Function();
    });

    test('can output', () => {
      app.logger.info(new Error('lorem'));
    });

    test('can output', () => {
      app.logger.info('lorem');
    });

    test('can output', () => {
      app.logger.info({});
    });

    test('can output', () => {
      app.logger.info('lorem', {});
    });
  });

  describe('The middleware', () => {
    test('can output', () => {
      return request(app)
        .get('/api/test')
        .set('Accept', 'application/json')
        .expect(204);
    });

    test('can output', () => {
      return request(app)
        .get('/api/test/404')
        .set('Accept', 'application/json')
        .expect(404);
    });
  });
});
