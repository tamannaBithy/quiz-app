import _ from "lodash";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Analysis from "../components/Analysis";
import Summary from "../components/Summary";
import UseAnswer from "../Hooks/UseAnswer";

const Result = () => {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = UseAnswer(id);

  console.log(qna);
  console.log(answers);

  function calculate() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [];
      let checkIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkIndexes)) {
        score = score + 5;
      }
    });

    return score;
  }

  const useScore = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There is an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={useScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
};

export default Result;
