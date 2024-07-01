import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  SET_USER,
  ANSWER_FORM,
  SUBMIT_ANSWER_FORM,
  CLICKED_POST_ANSWER,
  SET_TRIVIA_TOTAL,
  SET_GEN_STATUS,
  UPDATE_PROFILE_CARD,
  SET_CURRENT_USER_SELECTED_PROFILE_CARD
} from '../store/types'

import { useEffect, useState, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import questions from '../store/triviaList'


const iState = {
  answerForm: '',
  submittedAnswer: false,
  clickedPostAnswer: false
  //genStatus: 'a'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ANSWER_FORM:
      return { ...state, answerForm: action.payload }
    case SUBMIT_ANSWER_FORM:
      return { ...state, submittedAnswer: action.payload }
    case CLICKED_POST_ANSWER:
      return { ...state, clickedPostAnswer: action.payload }
    default:
      return state
  }
}

const Trivia = (props) => {
  const {
    currentUser,
    currentUserData,
    currentUserSelectedProfileCard,
    selectedUser,
    appDispatch,
    triviaTotal,
    genStatus
  } = props
  const history = useNavigate()
  let handle = useParams()
  const [trivia, setTriviaQuestions] = useState(0)
  const [user, setUser] = useState('')
  const [triviaTotalNumber, setTriviaTotalNumber] = useState(0)
  const [boomer, setBoomer] = useState(0)
  const [genX, setGenX] = useState(0)
  const [millennial, setMillennial] = useState(0)
  const [zoomer, setZoomer] = useState(0)
  const [genText, setGenText] = useState(
    currentUserSelectedProfileCard.genStatus
  )
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [state, dispatch] = useReducer(reducer, iState)

  const resetGenStatus = async () => {
    try {
      await axios.put(`${BASE_URL}/home/${currentUser.id}`, {
        genStatus: genText
      })
      setGenText('')
    } catch (error) {
      console.log(error)
    }
  }
  const postTrivia = async () => {
    try {
      let triviaStart = 0
      triviaStart++
      const res = await axios.put(`${BASE_URL}/home/${currentUser.id}`, {
        triviaTotal: triviaStart,
        genStatus: genText
      })
      console.log(currentUser.id)
      console.log(user)
      console.log(res.data[1][0])
      console.log(genStatus)
      const profileCard = res.data[1][0]
      appDispatch({
        type: UPDATE_PROFILE_CARD,
        payload: { profileCard: profileCard, id: profileCard.id }
      })
      appDispatch({
        type: SET_CURRENT_USER_SELECTED_PROFILE_CARD,
        payload: {
          ...currentUserSelectedProfileCard,
          genStatus: genText,
          triviaTotal: triviaStart++
        }
      })
      console.log(currentUserSelectedProfileCard.genStatus)
      console.log(currentUserSelectedProfileCard)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitAnswer = async (isCorrect, genName) => {
    if (isCorrect === true && genName === 'b') {
      setBoomer(boomer + 1)
      setScore(score + 1)
      console.log(score)
      console.log(boomer)
    } else if (isCorrect === true && genName === 'x') {
      setGenX(genX + 1)
      setScore(score + 1)
      console.log(score)
      console.log(genX)
    } else if (isCorrect === true && genName === 'm') {
      setMillennial(millennial + 1)
      setScore(score + 1)
      console.log(score)
      console.log(millennial)
    } else if (isCorrect === true && genName === 'z') {
      setZoomer(zoomer + 1)
      setScore(score + 1)
      console.log(score)
      console.log(zoomer)
    }

    const nextQuestion = trivia + 1

    if (nextQuestion < questions.length) {
      setTriviaQuestions(nextQuestion)
      console.log(questions[trivia].answer)
      if (boomer > genX && boomer > millennial && boomer > zoomer) {
        console.log(user)
        setGenText('Boomer')
      } else if (genX > boomer && genX > millennial && genX > zoomer) {
        console.log(genText)
        setGenText('Generation X')
      } else if (
        millennial > boomer &&
        millennial > genX &&
        millennial > zoomer
      ) {
        setGenText('Millennial')
        console.log('Your gen Name is: Millennial')
      } else if (zoomer > boomer && zoomer > genX && zoomer > millennial) {
        setGenText('Zoomer')
        console.log('Your gen Name is: Zoomer')
      }
    } else {
      setShowScore(true)
      console.log(genText)
      currentUserSelectedProfileCard.triviaTotal++
      setTriviaTotalNumber(triviaTotal + 1)
      postTrivia()

      history(`/home/${currentUser.handle}`)
    }
  }

  const backToHome = async (e) => {
    history(`/home/${currentUser.handle}`)
  }

  useEffect(() => {
    resetGenStatus()

    console.log(currentUserSelectedProfileCard.triviaTotal)
  }, [selectedUser])
  return questions.length ? (
    <div>
      <button
        onClick={(e) => {
          backToHome(e)
        }}
      >
        Back
      </button>
      {showScore ? (
        <div>Trivia Completed!</div>
      ) : (
        <div class="main-container">
          <div>
            <p>{questions[trivia].question}</p>
          </div>
          {questions[trivia].answer.map((answerChoice, idx) => (
            <div key={idx}>
              <button
                class="trivia-answers"
                onClick={() => {
                  handleSubmitAnswer(
                    answerChoice.isCorrect,
                    answerChoice.genName
                  )
                }}
              >
                {answerChoice.answerText}
              </button>
            </div>
          ))}
          <p></p>
        </div>
      )}
    </div>
  ) : (
    <p>No trivia</p>
  )
}
export default Trivia
