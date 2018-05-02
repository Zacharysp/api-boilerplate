'use strict';

const request = require('supertest');

const lib = require('../../server/lib');
const app = lib.app;

describe('Logger', () => {
  beforeAll((done) => {
    app.boot(done());
  });

  it('should be there', () => {
    expect(lib.logger).toBeInstanceOf(Function);
    expect(lib.loggers).toBeInstanceOf(Object);
  });

  describe('Debug', () => {
    let logger;

    it('should be there', () => {
      expect(lib.loggers.debug).toBeInstanceOf(Function);
    });

    it('can build a logger', () => {
      logger = lib.logger('debug');

      // expect(logger).toBeInstanceOf(Object);
      expect(logger.info).toBeInstanceOf(Function);
    });

    it('can output error', () => {
      const spyDebug = jest.spyOn(logger, 'info');
      logger.info(new Error('lorem'));

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output string', () => {
      const spyDebug = jest.spyOn(logger, 'info');
      logger.info('lorem');

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output object', () => {
      const spyDebug = jest.spyOn(logger, 'info');
      logger.info({});

      expect(spyDebug).toHaveBeenCalled();
    });

    it('can output mix info', () => {
      const spyDebug = jest.spyOn(logger, 'info');
      logger.info('lorem', {});

      expect(spyDebug).toHaveBeenCalled();
    });
  });

  describe('RingBuffer', () => {
    let logger;
    let ringBuffer;

    beforeEach(() => {
      if (ringBuffer) ringBuffer.records = [];
    });

    it('should be there', () => {
      expect(lib.loggers.ringbuffer).toBeInstanceOf(Function);
    });

    it('can build a logger', () => {
      logger = lib.logger('ringbuffer');
      // expect(logger).toBeInstanceOf(Object); // TOFIX
      expect(logger.info).toBeInstanceOf(Function);
      expect(logger.streams).toBeInstanceOf(Array);
      expect(logger.streams).toHaveLength(1);
      ringBuffer = logger.streams[0].stream;
    });

    it('can output error', () => {
      logger.info(new Error('lorem'));
      expect(ringBuffer.records).toBeInstanceOf(Array);
      expect(ringBuffer.records).toHaveLength(1);
    });

    it('can output string', () => {
      logger.info('lorem');
      expect(ringBuffer.records).toBeInstanceOf(Array);
      expect(ringBuffer.records).toHaveLength(1);
    });

    it('can output object', () => {
      logger.info({});
      expect(ringBuffer.records).toBeInstanceOf(Array);
      expect(ringBuffer.records).toHaveLength(1);
    });

    it('can output mix info', () => {
      logger.info('lorem', {});
      expect(ringBuffer.records).toBeInstanceOf(Array);
      expect(ringBuffer.records).toHaveLength(1);
    });
  });

  describe('Syslog', () => {
    let syslog;

    it('should be there', () => {
      expect(lib.loggers.syslog).toBeInstanceOf(Function);
    });

    it('can build a logger', () => {
      syslog = lib.logger('syslog');
      // expect(syslog).toBeInstanceOf(Object); // TOFIX
      expect(syslog.info).toBeInstanceOf(Function);
    });

    it('can output error', () => {
      const spySyslogInfo = jest.spyOn(syslog, 'info');
      syslog.info(new Error('lorem'));

      expect(spySyslogInfo).toHaveBeenCalled();
    });

    it('can output string', () => {
      const spySyslogInfo = jest.spyOn(syslog, 'info');
      syslog.info('lorem');

      expect(spySyslogInfo).toHaveBeenCalled();
    });

    it('can output boject', () => {
      const spySyslogInfo = jest.spyOn(syslog, 'info');
      syslog.info({});

      expect(spySyslogInfo).toHaveBeenCalled();
    });

    it('can output mix info', () => {
      const spySyslogInfo = jest.spyOn(syslog, 'info');
      syslog.info('lorem', {});

      expect(spySyslogInfo).toHaveBeenCalled();
    });
  });

  describe('Global Logger', () => {
    it.skip('should be there', () => {
      expect(app.logger).toBeInstanceOf(Object); // TOFIX Undefined app.logger
      expect(app.logger.info).toBeInstanceOf(Function);
    });

    it.skip('can output error', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info(new Error('lorem'));
      expect(spyGlobalLogger).toHaveBeenCalled();
    });

    it.skip('can output string', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info('lorem');
      expect(spyGlobalLogger).toHaveBeenCalled();
    });

    it.skip('can output object', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info({});
      expect(spyGlobalLogger).toHaveBeenCalled();
    });

    it.skip('can output mix info', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info('lorem', {});
      expect(spyGlobalLogger).toHaveBeenCalled();
    });
  });
});
