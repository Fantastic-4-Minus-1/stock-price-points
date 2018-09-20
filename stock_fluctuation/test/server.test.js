const app = require('../server/app.js').app;
const mongoose = require('../server/app.js').mongoose;
const request = require('supertest');

afterAll(() => {
  mongoose.connection.close();
});

describe('GET /', () => {
  test('should get 200 response', done => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
describe('GET /api', () => {
  test('should get all companies', done => {
    request(app)
      .get('/api')
      .expect(200)
      // .expect(res => {
      //   expect(res.body.length).toBe(4);
      // })
      .end(done);
  });
});
