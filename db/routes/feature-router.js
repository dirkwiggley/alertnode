const express = require('express')

const FeatureCtrl = require('../controllers/feature-ctrl')

const router = express.Router()

router.post('/feature', FeatureCtrl.createFeature)
router.put('/feature/:id', FeatureCtrl.updateFeature)
router.delete('/feature/:id', FeatureCtrl.deleteFeature)
router.get('/feature/:id', FeatureCtrl.getFeatureById)
router.get('/features', FeatureCtrl.getFeatures)

module.exports = router
