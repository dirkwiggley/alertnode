const express = require('express')

const TitleCtrl = require('../controllers/title-ctrl')

const router = express.Router()

router.post('/title', TitleCtrl.createTitle)
router.put('/title/:id', TitleCtrl.updateTitle)
router.delete('/title/:id', TitleCtrl.deleteTitle)
router.get('/title/:id', TitleCtrl.getTitleById)
router.get('/titles', TitleCtrl.getTitles)

module.exports = router
