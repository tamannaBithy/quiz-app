import React, { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

const Answers = ({ options = [], handleAnswerChange, input }) => {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              className={classes.answer}
              value={index}
              text={option.title}
              checked={option.checked}
              onChange={(e) => handleAnswerChange(e, index)}
            />
          ) : (
            <Checkbox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Answers;
