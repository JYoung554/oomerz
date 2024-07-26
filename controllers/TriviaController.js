const { User, ProfileCard, TriviaCard } = require('../models')
const middleware = require('../middleware').default

const getTriviaCard = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    const trivia = await TriviaCard.findAll()
    res.send(trivia)
  } catch (error) {
    console.log(error)
  }
}

const createTriviaCard = async (req, res) => {
  try {
    let profileCardId = parseInt(req.params.profileCard_id)
    const triviaCard = await TriviaCard.create({
      profileCardId,
      ...req.body
    })
    res.send(triviaCard)
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
      include: [{ model: User, attributes: ['id', 'username', 'handle'] }]
    })
    res.send(profileCards)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getTriviaCard,
  createTriviaCard,
  getAllProfileCards,
  getPosts
}
