const express = require('express');
const router = express.Router();
const materialController = require('../controllers/meterial.controller');

router.get('/', materialController.listMaterials);
router.post('/', materialController.registerMaterial);
router.put('/:id', materialController.updateMaterial);
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;