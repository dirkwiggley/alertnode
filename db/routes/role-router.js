const express = require('express')

const RoleCtrl = require('../controllers/role-ctrl')

const router = express.Router()

router.post('/role', RoleCtrl.createRole)
router.put('/role/:id', RoleCtrl.updateRole)
router.delete('/role/:id', RoleCtrl.deleteRole)
router.get('/role/:id', RoleCtrl.getRoleById)
router.get('/roles', RoleCtrl.getRoles)

module.exports = router
