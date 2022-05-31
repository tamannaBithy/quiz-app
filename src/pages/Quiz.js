import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Answers from "../components/Answers";
import MiniPlayer from "../components/MiniPlayer";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../contexts/AuthContext";
import UseQuestion from "../Hooks/UseQuestion";

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
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, quiz } = UseQuestion(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: quiz,
    });
  }, [quiz]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  console.log(currentQuestion);
  console.log(quiz.length);

  function nextQuestion() {
    if (currentQuestion <= quiz.length) {
      setCurrentQuestion((prevQues) => prevQues + 1);
    }
  }

  function previousQues() {
    if (currentQuestion >= 1 && currentQuestion <= quiz.length) {
      setCurrentQuestion((prevQues) => prevQues - 1);
    }
  }

  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    history.push({
      pathname: `result/${id}`,
      state: { qna },
    });
  }

  const percentage =
    quiz.length > 0 ? ((currentQuestion + 1) / quiz.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There is an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleAnswerChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={previousQues}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
};

export default Quiz;
