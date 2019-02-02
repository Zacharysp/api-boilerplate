'use strict';

const request = require('supertest');

const app = require('../../server/server');

test('health api should return status', () => {
  return request(app)
    .get('/health')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(typeof res).toBe('object');
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.started).toBe('string');
      expect(typeof res.body.uptime).toBe('number');
      expect(res.body.version).toBe('1.0.0');
    });
});
