// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Define routes
router.get('/stocks', stockController.getAllStocks);
router.get('/stocks/:productCode', stockController.getStockByProductCode);
router.post('/stocks', stockController.createStock);
router.put('/stocks/:productCode', stockController.updateStock);
router.delete('/stocks/:productCode', stockController.deleteStock);
router.post('/deduct-stock-from-order', stockController.deductStockFromOrder);
router.post('/addstocks', stockController.createOrUpdateStock);

module.exports = router;
