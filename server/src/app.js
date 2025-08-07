// server/src/app.js
const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const { corsOrigin } = require('./config/app.config');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');

// Route Imports
const authRoutes = require('./routes/api/v1/auth.routes');
const productRoutes = require('./routes/api/v1/product.routes');
const adminRoutes = require('./routes/admin/admin.routes');

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert other errors to ApiError
app.use(errorConverter);

// Global error handler
app.use(errorHandler);

module.exports = app;
