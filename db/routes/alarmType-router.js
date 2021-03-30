const express = require('express')

const AlarmTypeCtrl = require('../controllers/alarmType-ctrl')

const router = express.Router()

router.post('/alarmType', AlarmTypeCtrl.createAlarmType)
router.put('/alarmType/:id', AlarmTypeCtrl.updateAlarmType)
router.delete('/alarmType/:id', AlarmTypeCtrl.deleteAlarmType)
router.get('/alarmType/:id', AlarmTypeCtrl.getAlarmTypeById)
router.get('/alarmTypes', AlarmTypeCtrl.getAlarmTypes)

module.exports = router
