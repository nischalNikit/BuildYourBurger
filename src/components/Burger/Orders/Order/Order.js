import React, { Component } from 'react';
import classes from './Order.css';

class Order extends Component{
    
    state={
        ingredients: []
    }

    componentDidMount(){
        let orderedIngredients = [];
        for(let ing in this.props.ingredients){
            orderedIngredients.push({
                ingredient: ing,
                ingredientAmount: this.props.ingredients[ing]
            });
        }
        this.setState({ingredients: orderedIngredients});
    }

    render(){
        let ingredientOutput = this.state.ingredients.map((element) => {
            return (
            <span key = {element.ingredient}>
                {element.ingredient} &rarr; {element.ingredientAmount}
            </span>
        )});

        return(
        <div className = {classes.Order}>
            <div>
                {ingredientOutput}
            </div>
            <p>Price = ${this.props.price}</p>
        </div>
    )}
}

export default Order;