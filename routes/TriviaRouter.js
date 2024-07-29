const router = require('express').Router()
const controller = require('../controllers/TriviaController')
const { StripToken, VerifyToken } = require('../middleware')

router.get('/', controller.getTriviaCard)
router.post(
  '/:profileCard_id',
  StripToken,
  VerifyToken,
  controller.createTriviaCard
)

module.exports = router
