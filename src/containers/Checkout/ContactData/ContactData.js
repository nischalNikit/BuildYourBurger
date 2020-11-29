import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './ContactData.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../../store/actions/action-index';
import {updateObject, checkValidity} from '../../../store/utilities/utility';

const contactData = React.memo((props) => {

    const dispatch  = useDispatch();
    const purchased = useSelector((state) => {
        return state.orderReducer.purchased;
    })

    const onOrderHandler = (order) => {
        dispatch(actionCreators.purchaseOrder(order));
    }

    const ingredients = useSelector(state => {
        return state.burgerReducer.ingredients; 
    });
    const totalPrice  = useSelector(state => {
        return state.burgerReducer.totalPrice;
    });
    const loading     = useSelector(state => {
        return state.orderReducer.loading;
    });
    const userId      = useSelector(state => {
        return state.authReducer.userId;
    })


    const [formValidity, modifyFormValidity] = useState(false);
    const [formOrder, modifyFormOrder]       = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                name: "Name",
                placeholder: "Name.",
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
                placeholder: "Email.",
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
                placeholder: "Street address.",
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
                placeholder: "Postal code.",
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
                placeholder: "Country.",
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
    });

    const orderHandler = (event) => {
        event.preventDefault();

        let orderDetails = {};
        for(let key in formOrder){
            orderDetails[key] = formOrder[key].elementConfig.value;
        }

        const order = {
            ingredients : ingredients,
            price       : totalPrice,
            orderData   : orderDetails,
            userId      : userId
        }

        onOrderHandler(order);
    }
 
    const inputChangeHandler = (event, formKey) => {
        let newformOrder = updateObject(formOrder, {
            [formKey] : updateObject(formOrder[formKey],{
                elementConfig : updateObject(formOrder[formKey].elementConfig, {
                    value : event.target.value
                }),
                touched : true,
                valid : checkValidity(event.target.value, formOrder[formKey].validation)
            })
        });
       
        let formValidity   = true;
        for(let formElement in newformOrder){
            formValidity = newformOrder[formElement].valid && formValidity;
        }

        modifyFormOrder(newformOrder);
        modifyFormValidity(formValidity);
    }


    let formElements = [];
    for(let formElement in formOrder){
        formElements.push({
            ...formOrder[formElement],
            id: formElement
        })
    }

    let form = (
        <form 
            className = {classes.ContactForm} 
            onSubmit  = {orderHandler}
        >
            {
                formElements.map((formElement) => (
                    <Input 
                        key           = {formElement.id} 
                        elementtype   = {formElement.elementType}
                        elementconfig = {formElement.elementConfig}
                        valid         = {formElement.valid}
                        invalid       = {!formElement.valid}
                        touched       = {formElement.touched}
                        inputChange   = {(event) => inputChangeHandler(event, formElement.id)}
                    />
                ))
            }
            <Button 
                btnType="Success" 
                disabled = {!formValidity}
            >
                Order Now
            </Button>
        </form> 
    )


    if(loading){
        form = <Spinner />
    }

    return(
        <div className = {classes.ContactData}>
            {
                purchased 
                ? <Redirect to = "/" /> 
                : null
            }
            <div className = {classes.Sidebar}>
                <h3>Some details please...</h3>
            </div>
            {form}      
        </div>
    )
});


export default contactData;
