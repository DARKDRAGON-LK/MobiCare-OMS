// routes/orderProductRoutes.js
const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');

// Define routes
router.get('/order-products', orderProductController.getAllOrderProducts);
router.get('/order-products/:id', orderProductController.getOrderProductById);
router.post('/order-products', orderProductController.createOrderProduct);
router.put('/order-products/:id', orderProductController.updateOrderProduct);
router.delete('/order-products/:id', orderProductController.deleteOrderProduct);

module.exports = router;
