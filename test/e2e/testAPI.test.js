'use strict';

const request = require('supertest');

const lib = require('../../server/lib');
const app = lib.app;

beforeAll(done => {
  app.boot(done);
});

describe('Test API', () => {
  it('should return 204 response', () => {
    request(app)
      .get('/api/test')
      .set('Accept', 'application/json')
      .expect(204);
  });

  it('should return 404 response', () => {
    request(app)
      .get('/api/test/404')
      .set('Accept', 'application/json')
      .expect(404);
  });
});
