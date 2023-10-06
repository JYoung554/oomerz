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

const verifyToken = (req, res, next) => {
  const { token } = res.locals
  try {
    let payload = jwt.verify(token, APP_SECRET)
    if (payload) {
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const stripToken = (res, req, next) => {
  const token = req.headers[`Authorization`].split(' ')[1]
  try {
    if (token) {
      res.locals.token = token
      return next()
    }
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}
module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  stripToken
}