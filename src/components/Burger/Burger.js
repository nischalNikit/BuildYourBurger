import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = props => {
    let transformedIngredients = 
            Object.keys(props.ingredients).map((element) => {
                return [...Array(props.ingredients[element])].map((_,pos) => {
                    return <BurgerIngredient key = {element + pos} type = {element} />
                });  
            })
            .reduce((array,element) => {
                return array.concat(...element);
            }, [])

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start Adding Ingredients!</p>
    }        

    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;