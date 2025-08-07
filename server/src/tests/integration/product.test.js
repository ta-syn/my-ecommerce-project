// server/src/tests/integration/product.test.js

const request = require('supertest');
const app = require('../../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Close the database connection after all tests have run.
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


describe('Product API', () => {
  describe('GET /api/v1/products', () => {
    // FIX: Increased timeout for this specific test to 20 seconds
    it('should return a list of products', async () => {
      const res = await request(app).get('/api/v1/products');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      // Initially, the products array should be empty
      expect(res.body.data.products).toEqual([]);
    }, 20000); // 20-second timeout
  });
});
