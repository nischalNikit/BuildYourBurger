import React, {Component} from 'react';
import classes from './OrderSummary.css';

import Button from '../../UI/Button/Button';
import PropType from 'prop-types';

class OrderSummary extends Component{

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return (<li key = {igkey}>
                            <span style={{textTransform: "capitalize"}}>
                                {igkey}
                            </span>
                            : {this.props.ingredients[igkey]}
                        </li>
                )
            });

        return(
            <div className = {classes.OrderSummary}>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p className = {classes.OrderPrice}>
                    Total Price: <strong>${this.props.price.toFixed(2)}</strong>
                </p>
                <Button clicked = {this.props.noOrder} btnType = "Danger">CANCEL</Button>
                <Button clicked = {this.props.continueOrder} btnType = "Success">CONTINUE</Button>
            </div>
        )
    }    
}

OrderSummary.propTypes = {
    ingredients   : PropType.object,
    price         : PropType.number,
    noOrder       : PropType.func,
    continueOrder : PropType.func
}



export default OrderSummary;