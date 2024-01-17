/* eslint-disable default-case */
import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import PogressBar from "../PogressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionsIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestions] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useNavigate();

  const { state } = useLocation();
  const { videoTitle } = state;

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handelAnswersChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionsIndex: index,
      value: e.target.checked,
    });
  };

  // handel when user clicks the next button to get the next questions
  const nextQuestions = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestions((prevQuestions) => prevQuestions + 1);
    }
  };

  // handel when user clicks the prev button to get the back to the prev questions
  const prevQuestions = () => {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestions((prevQuestions) => prevQuestions - 1);
    }
  };

  // calculate parcentage of pogress
  const precentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const restultRef = ref(db, `result/${uid}`);

    await set(restultRef, {
      [id]: qna,
    });

    history(`/result/${id}`, {
      state: {
        qna,
      },
    });
  }

  return (
    <>
      {loading && <div>Loading ...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handelAnswersChange}
          />
          <PogressBar
            next={nextQuestions}
            prev={prevQuestions}
            submit={submit}
            pogress={precentage}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
