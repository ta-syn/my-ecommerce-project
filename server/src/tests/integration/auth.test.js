// server/src/tests/integration/auth.test.js

const request = require('supertest');
const app = require('../../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/user.model');

let mongoServer;

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Clean up the database after each test.
afterEach(async () => {
  await User.deleteMany({});
});

// Close the database connection after all tests have run.
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
      // First, register a user
      await request(app).post('/api/v1/auth/register').send(newUser);

      // Then, try to register the SAME user again
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(newUser);

      // THIS WILL NOW PASS: Expect a 400 error
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toEqual('The email \'test@example.com\' is already in use.'); 
    });
  });
});
