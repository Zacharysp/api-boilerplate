'use strict';

require('should');
const request = require('supertest');
const app = require('./../server');
const loggerFactory = require('../lib/logger');

describe('The loggers', () => {
  let logger;

  describe('The debug', () => {
    it('can build a logger', () => {
      logger = loggerFactory('debug');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
    });

    it('can output', () => {
      logger.info(new Error('lorem'));
    });

    it('can output', () => {
      logger.info('lorem');
    });

    it('can output', () => {
      logger.info({});
    });

    it('can output', () => {
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

    it('can build a logger', () => {
      logger = loggerFactory('ringbuffer');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
      logger.should.have
        .property('streams')
        .which.is.Array()
        .with.length(1);
      ringbuffer = logger.streams[0].stream;
    });

    it('can output', () => {
      logger.info(new Error('lorem'));
      ringbuffer.records.should.be.Array().with.length(1);
    });

    it('can output', () => {
      logger.info('lorem');
      ringbuffer.records.should.be.Array().with.length(1);
    });

    it('can output', () => {
      logger.info({});
      ringbuffer.records.should.be.Array().with.length(1);
    });

    it('can output', () => {
      logger.info('lorem', {});
      ringbuffer.records.should.be.Array().with.length(1);
    });
  });

  describe('The syslog', () => {
    it('can build a logger', () => {
      logger = loggerFactory('syslog');
      logger.should.be.Object();
      logger.should.have.property('info').which.is.Function();
    });

    it('can output', () => {
      logger.info(new Error('lorem'));
    });

    it('can output', () => {
      logger.info('lorem');
    });

    it('can output', () => {
      logger.info({});
    });

    it('can output', () => {
      logger.info('lorem', {});
    });
  });

  describe('The global logger', () => {
    it('should be there', () => {
      app.should.have.property('logger').which.is.Object();
      app.logger.should.have.property('info').which.is.Function();
    });

    it('can output', () => {
      app.logger.info(new Error('lorem'));
    });

    it('can output', () => {
      app.logger.info('lorem');
    });

    it('can output', () => {
      app.logger.info({});
    });

    it('can output', () => {
      app.logger.info('lorem', {});
    });
  });

  describe('The middleware', () => {
    it('can output', () => {
      return request(app)
        .get('/api/test')
        .set('Accept', 'application/json')
        .expect(204);
    });

    it('can output', () => {
      return request(app)
        .get('/api/test/404')
        .set('Accept', 'application/json')
        .expect(404);
    });
  });
});
