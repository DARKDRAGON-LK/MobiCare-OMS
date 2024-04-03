const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.get('/types', typeController.getAllTypes);
router.get('/types/:id', typeController.getTypeById);
router.post('/types', typeController.createType);
router.put('/types/:id', typeController.updateType);
router.delete('/types/:id', typeController.deleteType);

module.exports = router;
