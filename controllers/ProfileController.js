const { User, ProfileCard, TriviaCard } = require('../models')
const middleware = require('../middleware')

const createProfileCard = async (req, res) => {
  try {
    let userId = req.params.user_id
    const profileCard = await ProfileCard.create({
      userId,
      ...req.body
    })
    res.send(profileCard)
  } catch (error) {
    throw error
  }
}

const getOneProfileCard = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id)
    const profileCard = await ProfileCard.findOne({
      attributes: ['caption', 'genStatus', 'triviaTotal'],
      where: { userId: userId }
    })
    res.send(profileCard)
  } catch (error) {
    throw error
  }
}

const getOneUser = async (req, res) => {
  try {
    let handle = req.params.handle
    const user = await User.findOne({
      attributes: ['id', 'handle'],
      where: { handle: handle },
      include: [
        {
          model: ProfileCard,
          attributes: ['id', 'caption', 'genStatus', 'triviaTotal']
        }
      ]
    })
    res.send(user)
    console.log(user)
  } catch (error) {
    throw error
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'handle'],
      include: [
        {
          model: ProfileCard,
          attributes: ['caption', 'genStatus', 'triviaTotal']
        }
      ]
    })
    res.send(users)
  } catch (error) {
    throw error
  }
}

const getProfileCardsByUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let profileCards = await ProfileCard.findAll({
      where: { userId: userId },
      attributes: ['id', 'caption', 'genStatus', 'triviaTotal'],
      include: [
        {
          model: User,
          attributes: ['id', 'handle']
        }
      ]
    })
    res.send(profileCards)
  } catch (error) {
    throw error
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await ProfileCard.findAll()
    res.send(posts)
  } catch (error) {
    throw error
  }
}

const updateProfileCard = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id)
    const profileCard = await ProfileCard.update(req.body, {
      where: { id: user_id },
      returning: true
    })
    res.send(profileCard)
  } catch (error) {
    throw error
  }
}

const deleteProfile = async () => {
  try {
    const user_id = parseInt(req.params.user_id)
    const deleteProfile = await ProfileCard.destroy({
      where: { id: user_id }
    })
    res.send(deleteProfile)
  } catch (error) {
    throw error
  }
}

const getAllTriviaCards = async (req, res) => {
  try {
    let triviaCardId = parseInt(req.params.user_id)
    let triviaCards = await TriviaCard.findAll({ where: { id: triviaCardId } })
    res.send(triviaCards)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createProfileCard,
  getOneProfileCard,
  getProfileCardsByUser,
  getOneUser,
  getAllUsers,
  getPosts,
  updateProfileCard,
  deleteProfile,
  getAllTriviaCards
}
