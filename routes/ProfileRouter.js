const router = require('express').Router()
const { StripToken, VerifyToken } = require('../middleware')
const controller = require('../controllers/ProfileController')
//router.get('/:user_id', controller.getOneProfileCard)
router.get('/:handle', controller.getOneUser)
router.get('/', controller.getAllUsers)
router.get('/profileCard', controller.getProfileCards)
router.get('/profileCard/:user_id', controller.getProfileCardsByUser)
router.get('/:profileCard_id', controller.getOneProfileCard)
router.put('/:user_id', StripToken, VerifyToken, controller.updateProfileCard)
router.post('/:user_id', StripToken, VerifyToken, controller.createProfileCard)

module.exports = router
