import React, {Component} from 'react';
import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://my-burger-builder-988b4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: error});
            })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCounted;
        this.setState({ingredients: updatedIngredients});

        const priceAddition = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount >= 1){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            this.setState({ingredients: updatedIngredients});

            const priceReduction = INGEDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const updatedPrice = oldPrice - priceReduction;
            this.setState({totalPrice : updatedPrice});
            this.updatePurchaseState(updatedIngredients);
        }
        else {
            return;
        }    
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingkey => {
                return ingredients[ingkey];
            }
        ).reduce((sum, element) => {
            return sum + element;
        },0);

        this.setState({purchasable: sum > 0 });
    }

    purchaseEnableHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseDisableHandler = () => {
        this.setState({purchasing: false});
    }

    continueOrderHandler = () => {

        let queryParams = [];

        for(let ingredient in this.state.ingredients){
            queryParams.push(ingredient + "=" + this.state.ingredients[ingredient]);
        }
        queryParams.push("price=" + this.state.totalPrice);

        let queryString = queryParams.join("&");

        this.props.history.push("/checkout?" + queryString);
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            if(disabledInfo[key] < 1)
                disabledInfo[key] = true;
            else
                disabledInfo[key] = false;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: "center"}}>
                                           {this.state.error.message}
                                        </p>
                    :<Spinner />;
                    

        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded   = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled          = {disabledInfo}
                        price             = {this.state.totalPrice}
                        purchasable       = {this.state.purchasable}
                        order             = {this.purchaseEnableHandler}
                    />
                </Auxiliary>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients   = {this.state.ingredients}
                    noOrder       = {this.purchaseDisableHandler}
                    continueOrder = {this.continueOrderHandler}
                    price         = {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);