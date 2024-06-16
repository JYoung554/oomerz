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
    selectedProfileCard,
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
  const [triviaTotalNumber, setTriviaTotalNumber] = useState(triviaTotal)
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
  /*const getTriviaQuestions = async () => {
    const res = await axios.get(`${BASE_URL}/trivia`)
    console.log(questions)
    setTriviaQuestions(res)
  }*/

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home/${handle}`)
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_USER, payload: res.data })
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_USER, payload: res.data })
        console.log(currentUser)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const postTrivia = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/home/${currentUser.id}`, {
        triviaTotal: triviaTotalNumber,
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
          triviaTotal: triviaTotalNumber
        }
      })
      console.log(currentUserSelectedProfileCard.genStatus)
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
        setTriviaTotalNumber(triviaTotal + 1)
      } else if (genX > boomer && genX > millennial && genX > zoomer) {
        console.log('Your gen Name is: Generation X')
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
      console.log(triviaTotalNumber)
      postTrivia()

      history(`/home/${currentUser.handle}`)
    }
  }

  useEffect(() => {
    //getTriviaQuestions()
    console.log(currentUserSelectedProfileCard.triviaTotal)
    //console.log(selectedUser.id)
  }, [selectedUser])
  return questions.length ? (
    <div>
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
