import React, {Component} from 'react';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from "../../components/UI/Spinner/Spinner";
import {updateObject, checkValidity} from "../../store/utilities/utility";

import * as actionCreators from '../../store/actions/action-index';

class Auth extends Component {
    constructor(props){
        super(props);

        this.state = {
            authForm : {
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
            },
            isForSignUp : true
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.orderHandler       = this.orderHandler.bind(this);
        this.changeFormStatus   = this.changeFormStatus.bind(this);
    }

    componentDidUpdate(){
        if(this.props.burgerBuilding){
            this.props.onPath("/checkout")
        }else{
            this.props.onPath("/")
        }
    }

    inputChangeHandler(event, formKey){
        let newformOrder = updateObject(this.state.authForm, {
            [formKey] : updateObject(this.state.authForm[formKey], {
                elementConfig : updateObject(this.state.authForm[formKey].elementConfig, {
                    value : event.target.value
                }),
                valid : checkValidity(event.target.value, this.state.authForm[formKey].validation),
                touched : true
            })
        })

       this.setState({authForm: newformOrder});
    }

    changeFormStatus(event){
        event.preventDefault();
        let prevFromStatus = this.state.isForSignUp;
        this.setState({isForSignUp: !prevFromStatus});
    }

    orderHandler(event){
        event.preventDefault();
        let email      = this.state.authForm.email.elementConfig.value;
        let password   = this.state.authForm.password.elementConfig.value;
        let formStatus = this.state.isForSignUp;
        this.props.onAuth(email, password, formStatus);
    }

    render(){
        let formElements = [];
        for(let formElement in this.state.authForm){
            formElements.push({
                ...this.state.authForm[formElement],
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
                inputChange   = {(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ))

        let formJSX = null;
        formJSX = (
            <form 
                className = {classes.ContactForm} 
            >
                {
                    this.props.errorMessage
                    ? <h2 style = {{textAlign:"center", color:"red", fontSize:"20px"}}>
                        {this.props.errorMessage.split("_").join(" ")}
                      </h2>
                    : null
                }
                {form}
                <div style={{textAlign:"center", marginBottom:"1rem"}}>
                    <button 
                        onClick = {this.orderHandler} 
                        className = {classes.AuthButton}
                    >
                    {
                        this.state.isForSignUp ? "SIGN UP" : "LOGIN"
                    }
                    </button>
                </div>
                <div style={{textAlign:"center", marginBottom:"1rem"}}>
                    <button 
                        className = {classes.AuthChangeButton}
                        onClick   = {this.changeFormStatus} 
                    >
                    {
                        this.state.isForSignUp 
                        ? "ALREADY A USER ? SIGN IN." 
                        : "FIRST TIME HERE ? SIGN UP."
                    }
                    </button>
                </div> 
            </form>
        );

        if(this.props.loading){
            formJSX = <Spinner />
        }


        return(
            <div className = {classes.Auth}>
                <h1>
                {
                    this.state.isForSignUp ? "SIGN UP TO BURGER BUILDER" : "LOGIN TO BURGER BUILDER"
                }
                </h1>
                {formJSX}
                {
                    this.props.isAuthenticated 
                    ? <Redirect to = {this.props.userPath} />
                    : null
                } 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading         : state.authReducer.loading,
        burgerBuilding  : state.burgerReducer.building,
        isAuthenticated : state.authReducer.userId !== null,
        userPath        : state.authReducer.path,
        errorMessage    : state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password, formStatus) => dispatch(actionCreators.auth(email,password, formStatus)),
        onPath : (path) => dispatch(actionCreators.handleUserPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);