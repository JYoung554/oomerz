const router = require('express').Router()
const controller = require('../controllers/FeedController')
const { StripToken, VerifyToken } = require('../middleware')

router.get('/', controller.getPosts)
router.post('/', StripToken, VerifyToken, controller.createProfileCard)

module.exports = router
