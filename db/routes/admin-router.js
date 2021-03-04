const express = require('express')

const AdminCtrl = require('../controllers/admin-ctrl')

const router = express.Router()

router.post('/admin/init-roles', AdminCtrl.initRoles)
router.post('/admin/init-titles', AdminCtrl.initTitles)
router.post('/admin/init-accounts', AdminCtrl.initAccounts)
router.post('/admin/init-sites', AdminCtrl.initSites)
router.post('/admin/init-buildings', AdminCtrl.initBuildings)
router.post('/admin/init-floors', AdminCtrl.initFloors)
router.post('/admin/init-units', AdminCtrl.initUnits)
router.post('/admin/init-rooms', AdminCtrl.initRooms)
router.post('/admin/init-users', AdminCtrl.initUsers)
router.put('/admin/updateIds', AdminCtrl.updateIds)

module.exports = router