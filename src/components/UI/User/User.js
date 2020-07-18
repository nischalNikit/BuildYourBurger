import React from 'react';
import classes from './User.css';

const user = props => {
    return (
        <div className = {classes.User}>
            <span className = {classes.Online}>&nbsp;</span>
            <p>{props.user}</p>
        </div>
    )
}

export default user;