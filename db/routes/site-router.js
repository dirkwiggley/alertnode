const express = require('express')

const SiteCtrl = require('../controllers/site-ctrl')

const router = express.Router()

router.post('/site', SiteCtrl.createSite)
router.put('/site/:id', SiteCtrl.updateSite)
router.delete('/site/:id', SiteCtrl.deleteSite)
router.get('/site/:id', SiteCtrl.getSiteById)
router.get('/sites', SiteCtrl.getSites)
router.get('/sites/:id', SiteCtrl.getSitesByAccount)

module.exports = router
