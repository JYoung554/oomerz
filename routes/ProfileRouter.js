const router = require('express').Router()
const { StripToken, VerifyToken } = require('../middleware').default
const controller = require('../controllers/ProfileController')
//router.get('/:user_id', controller.getOneProfileCard)
router.get('/users/:handle', controller.getUser)
router.get('/:handle', controller.getOneUser)
router.get('/', controller.getAllUsers)
router.get('/profileCard', controller.getProfileCards)
router.get('/profileCard/:profileCard_id', controller.getProfileCardsByUser)
router.get('/:user_id', controller.getOneProfileCard)
router.put('/user/:handle', StripToken, VerifyToken, controller.updateUser)
router.put('/:profileCard_id', StripToken, VerifyToken, controller.updateUsers)
router.put(
  '/profileCard/:user_id',
  StripToken,
  VerifyToken,
  controller.updateProfileCardsByUser
)
router.post(
  '/:profileCard_id',
  StripToken,
  VerifyToken,
  controller.createProfileCard
)
router.delete('/:handle', StripToken, VerifyToken, controller.deleteUser)
router.delete('/:user_id', StripToken, VerifyToken, controller.deleteProfile)
module.exports = router
