import React, {Component} from 'react';
import axios from '../../../axios-orders';
import {connect} from 'react-redux';
import classes from './ContactData.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        loading: false,
        formOrder: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "Name",
                    placeholder: "Your Name.",
                    value: ""
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Name",
               
            },
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
                label: "E-mail",
            },
            street:{    
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your street address.",
                    value: ""
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Street",
            },
            pinCode:{
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Your postal code.",
                    value: ""
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                label: "PIN Code",
            },
            country:{
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your country.",
                    value: ""
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: "Country",
            },
            delivery:{
                elementType: "dropdown",
                elementConfig: {
                    options: ["Super", "Normal"],
                    value: ""
                },
                validation: {},
                valid: true,
                touched: true,
                label: "Delivery"
            }
        },
        formValidity: false
    }

    orderHandler = () => {
        this.setState({loading: true});

        let orderDetails = {};

        for(let key in this.state.formOrder){
            orderDetails[key] = this.state.formOrder[key].elementConfig.value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderDetails: orderDetails
        }

        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.replace("/");
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }
 
    inputChangeHandler = (event, formKey) => {
        
        let newformOrder   = {...this.state.formOrder};
        let formElement    = {...newformOrder[formKey]};
        let formValidity   = true;

        formElement.elementConfig.value = event.target.value;
        formElement.valid 
            = this.checkValidity(formElement.elementConfig.value, formElement.validation); 
        formElement.touched = true;
        newformOrder[formKey] = formElement;

        for(let formElement in this.state.formOrder){
            formValidity = this.state.formOrder[formElement].valid && formValidity;
        }


        this.setState({formOrder: newformOrder, formValidity: formValidity});
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    render(){
        let formElements = [];
        for(let formElement in this.state.formOrder){
            formElements.push({
                ...this.state.formOrder[formElement],
                id: formElement
            })
        }

        let form = (
            <form className = {classes.ContactForm} onSubmit = {this.orderHandler}>
                {
                    formElements.map((formElement) => (
                        <Input 
                            key           = {formElement.id} 
                            elementtype   = {formElement.elementType}
                            elementconfig = {formElement.elementConfig}
                            label         = {formElement.label}
                            valid         = {formElement.valid}
                            invalid       = {!formElement.valid}
                            touched       = {formElement.touched}
                            inputChange   = {(event) =>this.inputChangeHandler(event, formElement.id)}
                        />
                    ))
                }
            <Button btnType="Success" disabled = {!this.state.formValidity}>
                ORDER NOW
            </Button>
            </form> 
        )

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className = {classes.ContactData}>
                <h3>Some details please...</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
