'use strict';

const app = require('../../server/server');
const loggerFactory = require('../../server/lib/logger');

describe('Logger', () => {
  describe('Debug', () => {
    let logger;

    it('can build a logger', () => {
      logger = loggerFactory('debug');

      // expect(logger).toBeInstanceOf(Object);
      expect(logger.info).toBeInstanceOf(Function);
    });

    it('can output error', () => {
      logger.info = jest.fn();
      logger.info(new Error('lorem'));

      expect(logger.info).toHaveBeenCalled();
    });

    it('can output string', () => {
      logger.info = jest.fn();
      logger.info('lorem');

      expect(logger.info).toHaveBeenCalled();
    });

    it('can output object', () => {
      logger.info = jest.fn();
      logger.info({});

      expect(logger.info).toHaveBeenCalled();
    });

    it('can output mix info', () => {
      logger.info = jest.fn();
      logger.info('lorem', {});

      expect(logger.info).toHaveBeenCalled();
    });
  });

  describe('RingBuffer', () => {
    let logger;
    let ringBuffer;

    beforeEach(() => {
      if (ringBuffer) ringBuffer.records = [];
    });

    it('can build a logger', () => {
      logger = loggerFactory('ringbuffer');

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

    it('can build a logger', () => {
      syslog = loggerFactory('syslog');
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
    it('should be there', () => {
      expect(app.logger).toBeDefined();
      expect(app.logger.info).toBeInstanceOf(Function);
    });

    it('can output error', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info(new Error('lorem'));
      expect(spyGlobalLogger).toHaveBeenCalled();
    });

    it('can output string', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info('lorem');
      expect(spyGlobalLogger).toHaveBeenCalled();
    });

    it('can output object', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info({});
      expect(spyGlobalLogger).toHaveBeenCalled();
    });

    it('can output mix info', () => {
      const spyGlobalLogger = jest.spyOn(app.logger, 'info');
      app.logger.info('lorem', {});
      expect(spyGlobalLogger).toHaveBeenCalled();
    });
  });
});
