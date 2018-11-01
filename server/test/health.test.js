'use strict';

const should = require('should');
const request = require('supertest');
const app = require('./../server');

describe('The health API', () => {
  it('can output', () => {
    return request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(res => {
        should(res).be.an.Object();
        should(res.body).be.an.Object();
        should(res.body.started).be.a.String();
        should(res.body.uptime).be.a.Number();
      });
  });
});
