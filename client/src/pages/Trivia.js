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
  SET_CARD,
  ADD_TRIVIA,
  SET_CURRENT_USER_DATA,
  SET_CURRENT_USER_SELECTED_PROFILE_CARD
} from '../store/types'

import { useEffect, useState, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import questions from '../store/triviaList'

const iState = {
  answerForm: '',
  addTrivia: 0,
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
    profileCard,
    selectedUser,
    appDispatch,
    triviaTotal
  } = props

  const history = useNavigate()
  let handle = useParams()
  const [trivia, setTriviaQuestions] = useState(0)
  const [user, setUser] = useState('')
  let [triviaTotalNumber, setTriviaTotalNumber] = useState(triviaTotal)
  //const [triviaEnd, setTriviaEnd] = useState(triviaEnd ? false : true)
  const [boomer, setBoomer] = useState(0)
  const [genX, setGenX] = useState(0)
  const [millennial, setMillennial] = useState(0)
  const [zoomer, setZoomer] = useState(0)
  const [genText, setGenText] = useState(
    currentUserSelectedProfileCard.genStatus
  )
  let [addTrivia, setAddTrivia] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [state, dispatch] = useReducer(reducer, iState)

  const nextQuestion = trivia + 1

  const resetGenStatus = async () => {
    try {
      await axios.put(`${BASE_URL}/home/${currentUser.id}`, {
        genStatus: genText
      })
      setGenText('')

      console.log(currentUser.id)
    } catch (error) {
      console.log(error)
    }
  }

  const postTrivia = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/home/${profileCard.id}`, {
        genStatus: genText,
        triviaTotal: triviaTotalNumber
      })
      console.log(triviaTotalNumber)
      const profile = res.data[1][0]
      console.log(res.data[1][0])
      appDispatch({
        type: SET_CARD,
        payload: {
          ...profile,
          id: profile.id,
          genStatus: genText,
          triviaTotal: profile.triviaTotalNumber
        }
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
      console.log(currentUserSelectedProfileCard)
      history(`/home/${currentUser.handle}`)
    } catch (error) {
      console.log(error)
    }
  }

  const addTriviaFunction = async () => {
    setTriviaTotalNumber((triviaTotalNumber) => triviaTotalNumber + 1)
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

    if (nextQuestion < questions.length) {
      setTriviaQuestions(nextQuestion)
      console.log(questions[trivia].answer)
      if (boomer > genX && boomer > millennial && boomer > zoomer) {
        setGenText('Boomer')

        console.log(user)
      } else if (genX > boomer && genX > millennial && genX > zoomer) {
        setGenText('Generation X')

        console.log(genText)
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
      console.log('done')
      setShowScore(true)
      addTriviaFunction()

    }
  }

  const backToHome = async (e) => {
    history(`/home/${currentUser.handle}`)
  }

  useEffect(() => {
    //resetGenStatus()
    console.log(profileCard)
    console.log(triviaTotalNumber)
  }, [
    selectedUser,
    triviaTotalNumber,
    currentUserSelectedProfileCard.triviaTotal
  ])
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
        <div>
          Trivia Completed!
          {nextQuestion == questions.length ? (
            <div>
              <button onClick={() => postTrivia()}>Finish</button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      ) : currentUserData.ProfileCard !== null ? (
        <div>
          {' '}
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
        </div>
      ) : (
        <p>Type a Caption at the home screen to access Trivia!</p>
      )}
    </div>
  ) : (
    <p>No trivia</p>
  )
}
export default Trivia
