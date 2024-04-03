const express = require('express');
const router = express.Router();
const colourController = require('../controllers/colourController');

router.get('/colours', colourController.getAllColours);
router.get('/colours/:id', colourController.getColourById);
router.post('/colours', colourController.createColour);
router.put('/colours/:id', colourController.updateColour);
router.delete('/colours/:id', colourController.deleteColour);

module.exports = router;
