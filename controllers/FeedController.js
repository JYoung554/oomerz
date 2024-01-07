const { User, ProfileCard } = require('../models')
const middleware = require('../middleware')

const createProfileCard = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id)
    const profileCard = await ProfileCard.create({
      user_id: user_id,
      ...req.body
    })
    res.send(profileCard)
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

const getAllProfileCards = async () => {
  try {
    const profileCards = await ProfileCard.findAll({
      attributes: ['id', 'caption', 'genStatus', 'triviaTotal'],
      include: [{ model: User, attributes: ['id', 'username'] }]
    })
    res.send(profileCards)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createProfileCard,
  getAllProfileCards,
  getPosts
}
