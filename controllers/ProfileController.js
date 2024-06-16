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
    let profileCardId = parseInt(req.params.profileCard_id)
    const profileCard = await ProfileCard.findOne({
      attributes: ['id', 'caption', 'genStatus', 'triviaTotal'],
      where: { profileCardId: profileCardId }
    })
    res.send(profileCard)
    console.log(profileCard)
  } catch (error) {
    throw error
  }
}

const getOneUser = async (req, res) => {
  try {
    let handle = req.params.handle
    const user = await User.findOne({
      attributes: ['id', 'handle', 'avatarUrl'],
      where: { handle: handle },
      include: [
        {
          model: ProfileCard,
          required: false,
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
      attributes: ['id', 'handle', 'avatarUrl'],
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
    const userId = parseInt(req.params.user_id)
    const profileCards = await ProfileCard.findAll({
      where: { userId: userId },
      attributes: ['id', 'caption', 'genStatus', 'triviaTotal'],
      include: [{ model: User, attributes: ['id', 'handle'] }]
    })
    res.send(profileCards)
  } catch (error) {
    throw error
  }
}

const getProfileCards = async (req, res) => {
  try {
    const profileCards = await ProfileCard.findAll({
      attributes: ['id', 'caption', 'genStatus', 'triviaTotal'],
      include: [{ model: User, attributes: ['id', 'handle'] }]
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
    const updatedProfileCard = await ProfileCard.update(req.body, {
      where: { id: user_id },
      returning: true
    })
    res.send(updatedProfileCard)
  } catch (error) {
    throw error
  }
}

const deleteProfile = async (res, req) => {
  try {
    let user_id = parseInt(req.params.user_id)
    const delProfile = await ProfileCard.destroy({
      where: { id: user_id }
    })
    res.send({ message: `deleted Profile Card ${user_id}` })
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
  getProfileCards,
  getOneUser,
  getAllUsers,
  getPosts,
  updateProfileCard,
  deleteProfile,
  getAllTriviaCards
}
