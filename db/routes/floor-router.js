const express = require('express')

const FloorCtrl = require('../controllers/floor-ctrl')

const router = express.Router()

router.post('/floor', FloorCtrl.createFloor)
router.put('/floor/:id', FloorCtrl.updateFloor)
router.delete('/floor/:id', FloorCtrl.deleteFloor)
router.get('/floor/:id', FloorCtrl.getFloorById)
router.get('/floors', FloorCtrl.getFloors)

module.exports = router
