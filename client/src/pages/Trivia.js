import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  SET_USER,
  ANSWER_FORM,
  SUBMIT_ANSWER_FORM,
  CLICKED_POST_ANSWER
} from '../store/types'
import { useEffect, useState, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import questions from '../store/triviaList'

const iState = {
  answerForm: '',
  submittedAnswer: false,
  clickedPostAnswer: false
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
  const { currentUser, currentUserData, selectedUser, appDispatch } = props
  const history = useNavigate()
  let handle = useParams()
  const [trivia, setTriviaQuestions] = useState(0)
  const [user, setUser] = useState([])
  const [answerForm, setAnswerForm] = useState('')
  const [boomer, setBoomer] = useState(0)
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

  const handleSubmitAnswer = async (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1)
    }
    console.log(score)
    const nextQuestion = trivia + 1
    if (nextQuestion < questions.length) {
      setTriviaQuestions(nextQuestion)
      setAnswerForm('')
      console.log(questions[trivia].answer)
    } else {
      setShowScore(true)
      history('/home/:handle')
    }
  }

  useEffect(() => {
    //getTriviaQuestions()
    getUser()
  }, [selectedUser])
  return questions.length ? (
    <div>
      {showScore ? (
        <div>Trivia Completed!</div>
      ) : (
        <div>
          <div>
            <p>{questions[trivia].question}</p>
          </div>
          {questions[trivia].answer.map((answerChoice, idx) => (
            <div key={idx}>
              <button
                onClick={() => {
                  handleSubmitAnswer(answerChoice.isCorrect)
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
