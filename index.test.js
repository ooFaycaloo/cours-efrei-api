import request from 'supertest';
import app from './index.js';

describe('Express App', () => {
  it('GET / should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });

  // it('POST /echo should return posted JSON', async () => {
  //   const data = { name: 'Alice' };
  //   const res = await request(app).post('/echo').send(data);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({ youSent: data });
  // });
});
