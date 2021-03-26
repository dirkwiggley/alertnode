const express = require('express')

const ModelCtrl = require('../controllers/model-ctrl')

const router = express.Router()

router.post('/model', ModelCtrl.createModel)
router.put('/model/:id', ModelCtrl.updateModel)
router.delete('/model/:id', ModelCtrl.deleteModel)
router.get('/model/:id', ModelCtrl.getModelById)
router.get('/models/:id', ModelCtrl.getModelsByVendorId)

module.exports = router
