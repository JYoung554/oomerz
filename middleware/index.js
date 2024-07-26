import dotenv from 'dotenv'
require(dotenv).config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 12
const APP_SECRET = 'evkusbwjodnrnw'
const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  console.log(hashedPassword)
  return hashedPassword
}

const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword)
  return passwordMatch
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

const VerifyToken = (req, res, next) => {
  const { token } = res.locals
  try {
    let payload = jwt.verify(token, APP_SECRET)
    res.locals.token = payload
    return next()
  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}

const StripToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
    return res.status(401).json({ msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Unauthorized' })
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  VerifyToken,
  StripToken
}
