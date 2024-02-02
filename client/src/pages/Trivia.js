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
import { triviaQuestions } from '../store/triviaList'

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
  const questions = triviaQuestions.questions
  const [trivia, setTriviaQuestions] = useState([questions])
  const [state, dispatch] = useReducer(reducer, iState)
  const getTriviaQuestions = async () => {
    const res = await axios.get(`${BASE_URL}/trivia`)
    console.log(questions)
    setTriviaQuestions(res)
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault(e)
    try {
      dispatch({ type: SUBMIT_ANSWER_FORM, payload: true })
      dispatch({ type: CLICKED_POST_ANSWER, payload: !state.clickedPostAnswer })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTriviaQuestions()
  }, [selectedUser])
  return questions.length ? (
    <div>
      {questions.map((triviaQuestion, i) => (
        <div key={`${triviaQuestion.id}`}>
          {i === 0 ? <p>{triviaQuestion.question}</p> : <p></p>}
        </div>
      ))}
      <form onSubmit={(e) => handleSubmitAnswer(e)}>
        <input
          type="text"
          name="answerForm"
          placeholder="Answer"
          value={state.answerForm}
          onChange={(e) =>
            dispatch({
              type: ANSWER_FORM,
              payload: e.target.value
            })
          }
        ></input>
      </form>
      <button>Next</button>
    </div>
  ) : (
    <p>No trivia</p>
  )
}
export default Trivia
