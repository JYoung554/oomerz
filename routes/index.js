const AppRouter = require('express').Router()
const AuthRouter = require('./AuthRouter')
const ProfileRouter = require('./ProfileRouter')

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/home', ProfileRouter)
module.exports = AppRouter
