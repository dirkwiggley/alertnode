const express = require('express')

const UserCtrl = require('../controllers/user-crtl')

const router = express.Router()

router.post('/user', UserCtrl.insertUser)
router.put('/user', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/user', UserCtrl.getAllUsers)
router.post('/user/login', UserCtrl.login)
router.post('/user/refreshtoken', UserCtrl.refreshToken)
router.post('/user/checktoken', UserCtrl.checkToken)

module.exports = router