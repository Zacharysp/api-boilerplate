'use strict';

const request = require('supertest');

const app = require('../../server/server');

test('health api should return status', () => {
  request(app)
    .get('/health')
    .set('Accept', 'application/json')
    .expect(200)
    .expect(res => {
      expect(res).toBeInstanceOf(Object);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.started).toBeInstanceOf(String);
      expect(res.body.uptime).toBeInstanceOf(Number);
    });
});
