// server/src/tests/integration/auth.test.js

const request = require('supertest');
const app = require('../../app'); // আমাদের Express অ্যাপ
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// টেস্ট শুরু হওয়ার আগে ইন-মেমোরি ডেটাবেস চালু হবে
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// প্রতিটি টেস্টের পর ডেটাবেস পরিষ্কার করা হবে
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// সব টেস্ট শেষ হলে ডেটাবেস বন্ধ হবে
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Auth API', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe(
        'User registered successfully. Please login.'
      );
    });

    it('should fail if email already exists', async () => {
      // প্রথমে একজন ইউজার রেজিস্টার করা হচ্ছে
      await request(app).post('/api/v1/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      // একই ইমেইল দিয়ে আবার চেষ্টা করা হচ্ছে
      const res = await request(app).post('/api/v1/auth/register').send({
        name: 'Another User',
        email: 'test@example.com',
        password: 'password456',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });
});
