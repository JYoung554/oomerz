const router = require('express').Router()
const controller = require('../controllers/AuthController.js')
const { StripToken, VerifyToken } = require('../middleware').default

router.get('/session', StripToken, VerifyToken, controller.GetCurrentUser)
router.post('/register', controller.Register)
router.post('/login', controller.Login)

module.exports = router

