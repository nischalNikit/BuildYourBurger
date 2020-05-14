import React from 'react';
import classes from './Error404.css';
import BurgerImg from '../../../assets/images/logo.png';

const Error = props => {
    return(
        <div className = {classes.Error}>
            <img src = {BurgerImg} alt = "BurgerLogo" />
            <h1>Error 404!</h1>
            <h2>You seem to have landed at the wrong address :(</h2>
        </div>
    )
}

export default Error;