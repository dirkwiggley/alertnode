const express = require('express')

const UnitCtrl = require('../controllers/unit-ctrl')

const router = express.Router()

router.post('/unit', UnitCtrl.createUnit)
router.put('/unit/:id', UnitCtrl.updateUnit)
router.delete('/unit/:id', UnitCtrl.deleteUnit)
router.get('/unit/:id', UnitCtrl.getUnitById)
router.get('/units', UnitCtrl.getUnits),
router.get('/units/:id', UnitCtrl.getUnitsByFloor)

module.exports = router
