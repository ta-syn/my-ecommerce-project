require('dotenv').config({ path: '../../.env' });

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

// নিশ্চিত করুন যে JWT SECRET সেট করা আছে
if (!jwtConfig.secret) {
  throw new Error(
    'FATAL ERROR: JWT_SECRET is not defined in the environment variables.'
  );
}

module.exports = jwtConfig;
