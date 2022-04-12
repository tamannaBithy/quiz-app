import React from 'react';
import signupImage from '../Images/signup.svg';
import classes from '../styles/illustration.module.css';

const Illustration = () => {
    return (
        <div className={classes.illustration}>
            <img src={signupImage} alt="Signup" />
        </div>
    );
};

export default Illustration;