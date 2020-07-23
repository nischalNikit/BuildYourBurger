import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../../store/actions/action-index';
import {updateObject, checkValidity} from '../../../store/utilities/utility';

class ContactData extends Component {

    state = {
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

    orderHandler = (event) => {
        event.preventDefault();

        let orderDetails = {};
        for(let key in this.state.formOrder){
            orderDetails[key] = this.state.formOrder[key].elementConfig.value;
        }

        const order = {
            ingredients : this.props.ingredients,
            price       : this.props.totalPrice,
            orderData   : orderDetails,
            userId      : this.props.userId
        }

        this.props.onOrderHandler(order);
    }
 
    inputChangeHandler = (event, formKey) => {
    
        let newformOrder = updateObject(this.state.formOrder, {
            [formKey] : updateObject(this.state.formOrder[formKey],{
                elementConfig : updateObject(this.state.formOrder[formKey].elementConfig, {
                    value : event.target.value
                }),
                touched : true,
                valid : checkValidity(event.target.value, this.state.formOrder[formKey].validation)
            })
        });
       
        let formValidity   = true;
        for(let formElement in newformOrder){
            formValidity = newformOrder[formElement].valid && formValidity;
        }

        this.setState({formOrder: newformOrder, formValidity: formValidity});
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
            <form 
                className = {classes.ContactForm} 
                onSubmit  = {this.orderHandler}
            >
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
            <Button 
                btnType="Success" 
                disabled = {!this.state.formValidity}
            >
                ORDER NOW
            </Button>
            </form> 
        )


        if(this.props.loading){
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
        ingredients : state.burgerReducer.ingredients,
        totalPrice  : state.burgerReducer.totalPrice,
        loading     : state.orderReducer.loading,
        purchased   : state.orderReducer.purchased,
        userId      : state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler : (order) => dispatch(actionCreators.purchaseOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
