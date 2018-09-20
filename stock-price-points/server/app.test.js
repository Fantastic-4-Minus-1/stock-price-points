const request = require('supertest');
const { mongoose } = require('../database/index.js');
const { app } = require('./app.js');

afterAll(() => {
  mongoose.connection.close();
});

describe('GET success response', () => {
  it('respond with 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

// describe('GET success response', () => {
//   test(
//     'it should respond with 200',
//     async (done) => {
//       await request(app)
//         .get('/')
//         .then((res) => {
//           expect(res.statusCode).toBe(200);
//           done();
//         });
//     },
//     6000,
//   );
// });
