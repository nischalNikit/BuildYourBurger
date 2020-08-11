import React from 'react';
import classes from './Order.css';

const order = React.memo((props) => {
  
    const ingredients = [];
    for(let ing in props.ingredients){
        ingredients.push({
            ingredient: ing,
            ingredientAmount: props.ingredients[ing]
        });
    }

    let ingredientOutput = ingredients.map((element) => {
        return (
            <span key = {element.ingredient}>
                {element.ingredient} &rarr; {element.ingredientAmount}
            </span>
        )
    });

    return(
        <div className = {classes.Order}>
            <div>
                {ingredientOutput}
            </div>
            <p>Price = ${props.price}</p>
        </div>
    )
});

export default order;