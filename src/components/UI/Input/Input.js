import React from 'react';
import classes from './Input.css';

const Input = props => {

    let inputElement = null;
    
    switch(props.elementtype){
        case ('input'):
            inputElement = (
                <input 
                    className = {classes.Input}
                    onChange  = {props.inputChange} 
                    {...props.elementconfig} 
                />
            );
            break;
        case ('dropdown'):
            inputElement = (
                <select 
                    className = {classes.Input} 
                    value     = {props.elementconfig.value}
                    onChange  = {props.inputChange}     
                > 
                   {
                       props.elementconfig.options.map((option) => (
                        <option key = {option}>
                            {option}
                        </option>
                       ))
                   }
                </select>
            );
            break;
        case ('textarea'):
            inputElement = (
               <textarea className = {classes.Input} {...props.elementConfig} />
            );
            break;
        default:
            break;
    }
  
    return(
        <div className = {classes.formElement}>
            <label className = {classes.Label}>
                {props.label}
            </label>
            {inputElement}
        </div>
    )
}

export default Input;