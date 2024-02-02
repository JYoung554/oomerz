const router = require('express').Router()
const { StripToken, VerifyToken } = require('../middleware')
const controller = require('../controllers/ProfileController')
//router.get('/:user_id', controller.getOneProfileCard)
router.get('/:handle', controller.getOneUser /*controller.getOneProfileCard*/)
router.get('/', controller.getAllUsers)
router.get('/profileCard/:user_id', controller.getProfileCardsByUser)
router.get('/profile/:user_id', controller.getOneProfileCard)
router.post('/:user_id', StripToken, VerifyToken, controller.createProfileCard)

module.exports = router
