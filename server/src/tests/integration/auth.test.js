// server/src/tests/integration/auth.test.js

const request = require('supertest');
const app = require('../../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/user.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth API', () => {
  describe('POST /api/v1/auth/register', () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toEqual(newUser.email);
    });

    it('should fail if email already exists', async () => {
      await request(app).post('/api/v1/auth/register').send(newUser);
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(newUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      // THIS IS THE FINAL FIX: Expecting the correct error message
      expect(res.body.message).toEqual('Email already exists');
    });
  });
});
