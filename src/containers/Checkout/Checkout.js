import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Checkout.css';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';

const checkout = React.memo((props) => {

    const ingredients = useSelector((state) => {
        return state.burgerReducer.ingredients;
    });
    const totalPrice  = useSelector((state) => {
        return state.burgerReducer.totalPrice;
    });

    const cancelOrderHandler = () => {
        props.history.goBack();
    }

    const continueOrderHandler = () => {
        props.history.replace("/contact-form");
    }

    
    let burger = null;
    if(ingredients){
        burger = <Burger ingredients = {ingredients} />
    }

    return(
        <div className = {classes.Checkout}>     
            <div className = {classes.CheckoutSidebar}>
                <h1 className = {classes.CheckoutHeadline}>Here's your burger!</h1>
                <h3 className = {classes.BurgerPrice}>
                    This burger will cost you: <strong>${Math.round(totalPrice)} Only</strong>
                </h3>
                <div className = {classes.BtnGroup}>
                    <Button clicked = {cancelOrderHandler}   btnType = "Danger">Cancel</Button>
                    <Button clicked = {continueOrderHandler} btnType = "Success">Continue</Button>
                </div>
            </div>
            {burger}
        </div>
    )
});

export default checkout;