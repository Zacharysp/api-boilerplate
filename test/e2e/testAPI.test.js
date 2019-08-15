'use strict';

const request = require('supertest');
const app = require('../../server/server');

describe('Test API', () => {
  it('should return 404 response', () => {
    return request(app)
      .get('/api/test/404')
      .set('Accept', 'application/json')
      .expect(404);
  });
});
