const AppRouter = require('express').Router()
const AuthRouter = require('./AuthRouter')
const ProfileRouter = require('./ProfileRouter')
const TriviaRouter = require('./TriviaRouter')

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/home', ProfileRouter)
AppRouter.use('/trivia', TriviaRouter)
module.exports = AppRouter
