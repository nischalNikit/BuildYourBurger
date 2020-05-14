import React from 'react';
import classes from './Backdrop.css';

import PropType from 'prop-types';

const backdrop = props => {
    return(
        props.show ? <div onClick = {props.cancel} className = {classes.Backdrop}></div> : null
    )
};

backdrop.propTypes = {
    show   : PropType.bool,
    cancel : PropType.func
}

export default backdrop;