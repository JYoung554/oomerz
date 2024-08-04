const { User } = require('../models')
const { ProfileCard } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { handle: req.body.handle },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        handle: user.handle
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { username, password, handle, email, avatarUrl } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create(
      {
        username,
        passwordDigest,
        handle,
        email,
        avatarUrl,
        profileCard: {
          caption: '',
          genStatus: '',
          triviaTotal: 0,
          userId: user.id
        }
      },
      {
        include: [
          {
            model: ProfileCard,
            required: false,
            attributes: ['id', 'caption', 'genStatus', 'triviaTotal']
          }
        ]
      }
    )

    console.log(user.password)
    res.send(user)
  } catch (error) {
    throw error
  }
}




const GetCurrentUser = (req, res) => {
  try {
    res.send(res.locals.token)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register,
  Login,
  GetCurrentUser
}
