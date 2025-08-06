require('dotenv').config({ path: '../../.env' }); // .env ফাইলের সঠিক পাথ দিন

const appConfig = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

module.exports = appConfig;
