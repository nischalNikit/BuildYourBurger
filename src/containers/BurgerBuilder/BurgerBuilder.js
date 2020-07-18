import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionCreators from '../../store/actions/action-index';


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.setUpIngredients();
        this.props.fetchIngredients();
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
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.history.push("/auth");
        }
       
    }

    purchaseDisableHandler = () => {
        this.setState({purchasing: false});
    }

    continueOrderHandler = () => {
        this.props.onInitPurchase();
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
        this.props.error 
            ? <p style={{textAlign: "center"}}>
                {this.props.error.message}
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
                <Modal 
                    noOrder = {this.purchaseDisableHandler} 
                    show    = {this.state.purchasing}
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
        ingredients     : state.burgerReducer.ingredients,
        totalPrice      : state.burgerReducer.totalPrice,
        error           : state.burgerReducer.error,
        isAuthenticated : state.authReducer.userId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUpIngredients : () => dispatch(actionCreators.setUpIngredients()),
        addIngredient    : (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        removeIngredient : (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        fetchIngredients : () => dispatch(actionCreators.fetchIngredients()),
        onInitPurchase   : () => dispatch(actionCreators.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));