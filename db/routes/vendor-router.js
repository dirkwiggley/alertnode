const express = require('express')

const VendorCtrl = require('../controllers/vendor-ctrl')

const router = express.Router()

router.post('/vendor', VendorCtrl.createVendor)
router.put('/vendor/:id', VendorCtrl.updateVendor)
router.delete('/vendor/:id', VendorCtrl.deleteVendor)
router.get('/vendor/:id', VendorCtrl.getVendorById)
router.get('/vendors', VendorCtrl.getVendors)

module.exports = router
