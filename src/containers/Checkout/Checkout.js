import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Checkout.css';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    continueOrderHandler = () => {
        this.props.history.replace(this.props.match.url + "/contact-form");
    }

    render()
    {  
        let burger = null;
        if(this.props.ingredients){
            burger = <Burger ingredients = {this.props.ingredients} />
        }

        return(
            <div className = {classes.Checkout}>
                <h1 className = {classes.CheckoutHeadline}>Here's your burger!</h1>
                {burger}
                <h3 className = {classes.BurgerPrice}>
                    This burger will cost you: <strong>${this.props.totalPrice} Only</strong>
                </h3>
                <div className = {classes.BtnGroup}>
                    <Button clicked = {this.cancelOrderHandler} btnType = "Danger">Cancel</Button>
                    <Button clicked = {this.continueOrderHandler} btnType = "Success">Continue</Button>
                </div>
                <Route 
                    path      = {this.props.match.path + "/contact-form"} 
                    component = {ContactData}
                />
                {
                    this.props.purchased 
                    ? <Redirect to = "/" /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerReducer.ingredients,
        totalPrice  : state.burgerReducer.totalPrice,
        purchased   : state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout);