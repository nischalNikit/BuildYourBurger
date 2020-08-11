import React, { useState, useEffect } from 'react';
import classes from './Auth.css';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from "../../components/UI/Spinner/Spinner";
import {updateObject, checkValidity} from "../../store/utilities/utility";

import * as actionCreators from '../../store/actions/action-index';

const auth = () => {

    const dispatch = useDispatch();
    const onAuth   = (email,password, formStatus) => {
        dispatch(actionCreators.auth(email,password, formStatus));
    };
    const onPath   = (path) => {
        dispatch(actionCreators.handleUserPath(path));
    }

    const loading = useSelector((state) => {
        return state.authReducer.loading;
    });
    const burgerBuilding = useSelector((state) => {
        return state.burgerReducer.building;
    });
    const isAuthenticated = useSelector((state) => {
        return state.authReducer.userId !== null;
    });
    const userPath = useSelector((state) => {
        return state.authReducer.path;
    });
    const errorMessage = useSelector((state) => {
        return state.authReducer.error;
    });

    const [isForSignUp, changeSignUp] = useState(true);
    const [authForm, modifyAuthForm]  = useState({
        email:{
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your Email.",
                value: ""
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            label: "E-mail"
        },
        password:{
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password.",
                value: ""
            },
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false,
            label: "Password"
        }
    });

    useEffect(() => {
        if(burgerBuilding){
            onPath("/checkout")
        }else{
            onPath("/")
        }
    });

    
    const inputChangeHandler = (event, formKey) => {
        let newformOrder = updateObject(authForm, {
            [formKey] : updateObject(authForm[formKey], {
                elementConfig : updateObject(authForm[formKey].elementConfig, {
                    value : event.target.value
                }),
                valid : checkValidity(event.target.value, authForm[formKey].validation),
                touched : true
            })
        });

        modifyAuthForm(newformOrder);
    }

    const changeFormStatus = (event) => {
        event.preventDefault();
        changeSignUp((prevSignUpState) => !prevSignUpState);
    }

    const orderHandler = (event) => {
        event.preventDefault();

        let email      = authForm.email.elementConfig.value;
        let password   = authForm.password.elementConfig.value;
        let formStatus = isForSignUp;
        
        onAuth(email, password, formStatus);
    }

 
    let formElements = [];
    for(let formElement in authForm){
        formElements.push({
            ...authForm[formElement],
            id: formElement
        })
    }

    let form = formElements.map((formElement) => (
        <Input 
            key           = {formElement.id} 
            elementtype   = {formElement.elementType}
            elementconfig = {formElement.elementConfig}
            label         = {formElement.label}
            valid         = {formElement.valid}
            invalid       = {!formElement.valid}
            touched       = {formElement.touched}
            inputChange   = {(event) => inputChangeHandler(event, formElement.id)}
        />
    ));

    let formJSX = null;
    formJSX = (
        <form 
            className = {classes.ContactForm} 
        >
            {
                errorMessage
                ? <h2 style = {{textAlign:"center", color:"red", fontSize:"20px"}}>
                    {errorMessage.split("_").join(" ")}
                   </h2>
                : null
            }
                {form}
            <div style={{textAlign:"center", marginBottom:"1rem"}}>
                <button 
                    onClick   = {orderHandler} 
                    className = {classes.AuthButton}
                >
                    {
                        isForSignUp ? "SIGN UP" : "LOGIN"
                    }
                </button>
            </div>
            <div style={{textAlign:"center", marginBottom:"1rem"}}>
                <button 
                    className = {classes.AuthChangeButton}
                    onClick   = {changeFormStatus} 
                >
                    {
                        isForSignUp 
                        ? "ALREADY A USER ? SIGN IN." 
                        : "FIRST TIME HERE ? SIGN UP."
                    }
                </button>
            </div> 
        </form>
    );

    if(loading){
        formJSX = <Spinner />
    }


    return(
        <div className = {classes.Auth}>
            <h1>
            {
                isForSignUp ? "SIGN UP TO BURGER BUILDER" : "LOGIN TO BURGER BUILDER"
            }
            </h1>
            {formJSX}
            {
                isAuthenticated 
                ? <Redirect to = {userPath} />
                : null
            } 
        </div>
    )
}

export default auth;