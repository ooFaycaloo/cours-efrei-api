import request from 'supertest';
import app from './index.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/my-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
describe('Express App', () => {
  it('GET / should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});
