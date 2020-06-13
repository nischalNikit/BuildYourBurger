import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        /*
        axios.get('https://my-burger-builder-988b4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: error});
            });
        */
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingkey => {
                return ingredients[ingkey];
            }
        ).reduce((sum, element) => {
            return sum + element;
        },0);

        return sum > 0;
    }

    purchaseEnableHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseDisableHandler = () => {
        this.setState({purchasing: false});
    }

    continueOrderHandler = () => {
        this.props.history.push("/checkout");
    }

    render(){

        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo){
            if(disabledInfo[key] < 1)
                disabledInfo[key] = true;
            else
                disabledInfo[key] = false;
        }

        let orderSummary = null;
        let burger = 
        this.state.error 
            ? <p style={{textAlign: "center"}}>
                {this.state.error.message}
              </p>
            :<Spinner />;
                    

        if(this.props.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded   = {this.props.addIngredient}
                        ingredientRemoved = {this.props.removeIngredient}
                        disabled          = {disabledInfo}
                        price             = {this.props.totalPrice}
                        purchasable       = {this.updatePurchaseState(this.props.ingredients)}
                        order             = {this.purchaseEnableHandler}
                    />
                </Auxiliary>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients   = {this.props.ingredients}
                    noOrder       = {this.purchaseDisableHandler}
                    continueOrder = {this.continueOrderHandler}
                    price         = {this.props.totalPrice}
                />
            );
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }
    
        return(
            <Auxiliary>
                <Modal noOrder = {this.purchaseDisableHandler} 
                        show   = {this.state.purchasing}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (value) => dispatch({type: actionTypes.ADD_INGREDIENT, value: value}),
        removeIngredient: (value) => dispatch({type: actionTypes.REMOVE_INGREDIENT, value: value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));