// server/src/tests/unit/product.service.test.js

const productService = require('../../services/product.service');
const Product = require('../../models/product.model');

// Product মডেলকে মক করা হচ্ছে
jest.mock('../../models/product.model');

describe('Product Service', () => {
  describe('getProductById', () => {
    it('should throw an error if product is not found', async () => {
      // মক করে বলা হচ্ছে যে Product.findById কিছুই ফেরত দেবে না
      Product.findById.mockResolvedValue(null);

      // আমরা আশা করছি যে এই ফাংশনটি একটি এরর থ্রো করবে
      await expect(
        productService.getProductById('nonexistent-id')
      ).rejects.toThrow('Product not found');
    });
  });
});
