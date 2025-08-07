// server/src/app.js
const express = require('express');
const cors = require('cors');
const { corsOrigin } = require('./config/app.config');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const authRoutes = require('./routes/api/v1/auth.routes');
const productRoutes = require('./routes/api/v1/product.routes');
const orderRoutes = require('./routes/api/v1/order.routes');
const adminRoutes = require('./routes/admin/admin.routes');

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Spondonhub API! Server is up and running.',
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares (must be at the end)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
