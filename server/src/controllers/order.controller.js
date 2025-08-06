const orderService = require('../services/order.service');
const catchAsync = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id; // auth.middleware থেকে
  const order = await orderService.createOrder(userId, req.body);
  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const orders = await orderService.getOrdersByUser(userId);
  res.status(200).json({
    success: true,
    message: 'Your orders fetched successfully',
    data: orders,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
};

