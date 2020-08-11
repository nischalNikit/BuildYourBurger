import React from 'react';
import classes from './OrderSummary.css';

import Button from '../../UI/Button/Button';
import PropType from 'prop-types';

const orderSummary = React.memo((props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return (
                <li key = {igkey}>
                    <span style={{textTransform: "capitalize"}}>
                        {igkey}
                    </span>
                    : {props.ingredients[igkey]}
                </li>
            )
        }
    );

    return(
        <div className = {classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p className = {classes.OrderPrice}>
                Total Price: <strong>${props.price.toFixed(2)}</strong>
            </p>
            <Button clicked = {props.noOrder} btnType = "Danger">CANCEL</Button>
            <Button clicked = {props.continueOrder} btnType = "Success">CONTINUE</Button>
        </div>
    )
});    

orderSummary.propTypes = {
    ingredients   : PropType.object,
    price         : PropType.number,
    noOrder       : PropType.func,
    continueOrder : PropType.func
}

export default orderSummary;