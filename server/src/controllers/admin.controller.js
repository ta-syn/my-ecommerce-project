// server/src/controllers/admin.controller.js

// THIS IS THE FIX: Correct path to the service file
const adminService = require('../services/admin.service');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

const getAllUsers = catchAsync(async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(httpStatus.OK).json({
    success: true,
    data: users,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await adminService.getAllOrders();
  res.status(httpStatus.OK).json({
    success: true,
    data: orders,
  });
});

module.exports = {
  getAllUsers,
  getAllOrders,
};
