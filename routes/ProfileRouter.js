const router = require('express').Router()
const { StripToken, VerifyToken } = require('../middleware')
const controller = require('../controllers/ProfileController')
//router.get('/:user_id', controller.getOneProfileCard)
router.get('/:handle', controller.getOneUser)
router.get('/', controller.getAllUsers)
router.get('/users', controller.getUsers)
router.get('/profileCard', controller.getProfileCards)
router.get('/profileCard/:user_id', controller.getProfileCardsByUser)
router.get('/:profileCard_id', controller.getOneProfileCard)
router.put('/:user_id', StripToken, VerifyToken, controller.updateProfileCard)
router.put(
  '/profileCard/:user_id',
  StripToken,
  VerifyToken,
  controller.updateProfileCardsByUser
)
router.post('/:user_id', StripToken, VerifyToken, controller.createProfileCard)
router.delete('/:handle', StripToken, VerifyToken, controller.deleteUser)
router.delete('/:user_id', StripToken, VerifyToken, controller.deleteProfile)
module.exports = router
