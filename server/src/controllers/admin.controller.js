const adminService = require('../services/admin.service');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

/**
 * Get all users (Admin Only)
 * GET /api/v1/admin/users
 */
const getAllUsers = catchAsync(async (req, res) => {
  const users = await adminService.getAllUsers();
  
  res.status(httpStatus.OK).json({
    success: true,
    message: users.length > 1 ? 'Users fetched successfully' : 'User fetched successfully',
    count: users.length,
    data: users,
  });
});

/**
 * Get all orders (Admin Only)
 * GET /api/v1/admin/orders
 */
const getAllOrders = catchAsync(async (req, res) => {
  const orders = await adminService.getAllOrders();
  
  res.status(httpStatus.OK).json({
    success: true,
    message: orders.length > 1 ? 'Orders fetched successfully' : 'Order fetched successfully',
    count: orders.length,
    data: orders,
  });
});

module.exports = {
  getAllUsers,
  getAllOrders,
};
