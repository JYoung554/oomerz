const { User } = require('./models')
const Sequelize = require('Sequelize')
const Op = Sequelize.Op

function stringify(data) {
  JSON.stringify(data, null, 2)
}

const createUser = async () => {
  const result = await User.create({})
  stringify(result)
}

const findAllUsers = async () => {
  const result = User.findAll()
  stringify(result)
}

const findUsersOnlyEmail = async () => {
  const result = User.findAll({
    attributes: [email]
  })
  stringify(result)
}

const run = async () => {
  try {
    await createUser()
    await findAllUsers(await findUsersOnlyEmail())
  } catch (error) {
    throw error
  } finally {
    await Sequelize.close()
  }
}
run()
