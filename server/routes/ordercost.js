// routes/orderCostRoutes.js
const express = require('express');
const router = express.Router();
const orderCostController = require('../controllers/orderCostController');

// Define routes
router.get('/order-costs', orderCostController.getAllOrderCosts);
router.get('/order-costs/:orderId', orderCostController.getOrderCostByOrderId);
router.post('/order-costs', orderCostController.createOrderCost);
router.put('/order-costs/:orderId', orderCostController.updateOrderCost);
router.delete('/order-costs/:orderId', orderCostController.deleteOrderCost);

module.exports = router;
