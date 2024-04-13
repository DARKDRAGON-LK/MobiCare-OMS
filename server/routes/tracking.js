// routes/trackingRoutes.js
const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

// Define routes
router.get('/trackings', trackingController.getAllTrackings);
router.get('/trackings/:trackingNumber', trackingController.getTrackingByNumber);
router.post('/trackings', trackingController.createTracking);
router.put('/trackings/:trackingNumber', trackingController.updateTracking);
router.delete('/trackings/:trackingNumber', trackingController.deleteTracking);

module.exports = router;
