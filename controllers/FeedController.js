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

const getOneProfileCard = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id)
    const profileCard = await ProfileCard.findAll({
      attributes: ['id'],
      where: { id: user_id }
    })
    res.send(profileCard)
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

module.exports = {
  createProfileCard,
  getOneProfileCard,
  getAllProfileCards,
  updateProfileCard,
  deleteProfile
}
