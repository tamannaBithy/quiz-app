import React from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

const Answers = ({ options = [], handleAnswerChange }) => {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Checkbox
          key={index}
          className={classes.answer}
          value={index}
          text={option.title}
          checked={option.checked}
          onChange={(e) => handleAnswerChange(e, index)}
        />
      ))}
    </div>
  );
};

export default Answers;
