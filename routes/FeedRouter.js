const router = require('express').Router()
const controller = require('../controllers/FeedController')
const middleware = require('../middleware')

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAllProfileCards
)

module.exports = router
