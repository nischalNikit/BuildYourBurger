import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Checkout.css';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import ContactData from './ContactData/ContactData';

const checkout = React.memo((props) => {

    const ingredients = useSelector((state) => {
        return state.burgerReducer.ingredients;
    });
    const totalPrice  = useSelector((state) => {
        return state.burgerReducer.totalPrice;
    });
    const purchased   = useSelector((state) => {
        return state.orderReducer.purchased;
    })

    const cancelOrderHandler = () => {
        props.history.goBack();
    }

    const continueOrderHandler = () => {
        props.history.replace(props.match.url + "/contact-form");
    }

    
    let burger = null;
    if(ingredients){
        burger = <Burger ingredients = {ingredients} />
    }

    return(
        <div className = {classes.Checkout}>
            <h1 className = {classes.CheckoutHeadline}>Here's your burger!</h1>
                {burger}
            <h3 className = {classes.BurgerPrice}>
                This burger will cost you: <strong>${totalPrice} Only</strong>
            </h3>
            <div className = {classes.BtnGroup}>
                <Button clicked = {cancelOrderHandler}   btnType = "Danger">Cancel</Button>
                <Button clicked = {continueOrderHandler} btnType = "Success">Continue</Button>
            </div>
            <Route 
                path      = {props.match.path + "/contact-form"} 
                component = {ContactData}
            />
            {
                purchased 
                ? <Redirect to = "/" /> 
                : null
            }
        </div>
    )
});

export default checkout;