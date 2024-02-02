const router = require('express').Router()
const controller = require('../controllers/TriviaController')
const { StripToken, VerifyToken } = require('../middleware')

router.get('/', controller.getTriviaCard)
router.post('/', StripToken, VerifyToken, controller.createProfileCard)

module.exports = router
