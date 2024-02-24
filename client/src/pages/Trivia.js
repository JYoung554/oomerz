import axios from 'axios'
import { BASE_URL } from '../globals'
import {
  SET_USER,
  ANSWER_FORM,
  SUBMIT_ANSWER_FORM,
  CLICKED_POST_ANSWER
} from '../store/types'
import { useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [trivia, setTriviaQuestions] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [state, dispatch] = useReducer(reducer, iState)
  /*const getTriviaQuestions = async () => {
    const res = await axios.get(`${BASE_URL}/trivia`)
    console.log(questions)
    setTriviaQuestions(res)
  }*/

  const handleSubmitAnswer = async () => {
    const nextQuestion = trivia + 1
    if (nextQuestion < questions.length) {
      setTriviaQuestions(nextQuestion)
      console.log(questions[trivia].answer)
    } else {
      setShowScore(true)
      history('/profile')
    }
  }

  useEffect(() => {
    //getTriviaQuestions()
  }, [selectedUser])
  return questions.length ? (
    <div>
      {false ? (
        <div>Trivia Completed!</div>
      ) : (
        <div>
          <p>{questions[trivia].question}</p>
          {questions[trivia].answer.map((answerChoice) => (
            <button
              onClick={(e) => {
                handleSubmitAnswer(e)
              }}
            >
              {answerChoice.answerText}
            </button>
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
