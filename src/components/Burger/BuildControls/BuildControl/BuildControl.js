import React from 'react';
import classes from './BuildControl.css';

import PropType from 'prop-types';

const buildControl = props => (
    <div className = {classes.BuildControl}>
        <div className = {classes.Label}>{props.label}</div>
        <button 
                onClick   = {props.removed} 
                className = {classes.Less}
                disabled  = {props.disable} 
        >Less</button>
        <button onClick = {props.added}   className = {classes.More}>More</button>
    </div>
);

buildControl.propTypes = {
        label    : PropType.string,
        removed  : PropType.func,
        disabled : PropType.bool,
        added    : PropType.func
}   


export default buildControl;