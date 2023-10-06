const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    raw: true
  })
  if (
    user &&
    (await middleware.comparePassword(user.passwordDigest, req.body.password))
  ) {
    let payload = {
      id: user.id,
      email: user.email
    }
    let token = middleware.createToken(payload)
    return res.send({ user: token, payload })
  }
  res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
}

const Register = async (req, res) => {
  try {
    const { username, password, handle, email, avatarUrl } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      passwordDigest,
      handle,
      email,
      avatarUrl
    })

    console.log(user.password)
    res.send(user)
  } catch (error) {
    throw error
  }
}
module.exports = {
  Register,
  Login
}
