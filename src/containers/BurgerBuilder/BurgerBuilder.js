import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionCreators from '../../store/actions/action-index';


export const burgerBuilder = React.memo((props) => {

    const dispatch = useDispatch();
    const setUpIngredients = () => {
        dispatch(actionCreators.setUpIngredients());
    };
    const addIngredient = (ingredient) => {
        dispatch(actionCreators.addIngredient(ingredient));
    };
    const removeIngredient = (ingredient) => {
        dispatch(actionCreators.removeIngredient(ingredient));
    };
    const fetchIngredients = () => {
        dispatch(actionCreators.fetchIngredients());
    };
    const onInitPurchase = () => {
        dispatch(actionCreators.purchaseInit());
    };

    const ingredients = useSelector(state => {
       return state.burgerReducer.ingredients;
    });
    const totalPrice = useSelector(state => {
        return state.burgerReducer.totalPrice;
    });
    const error = useSelector(state => {
        return state.burgerReducer.error;
    });
    const isAuthenticated = useSelector(state => {
        return state.authReducer.userId !== null;
    });


    const [purchasing, changePurchasing]   = useState(false);


    useEffect(() => {
        setUpIngredients();
        fetchIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingkey => {
                return ingredients[ingkey];
            }
        ).reduce((sum, element) => {
            return sum + element;
        },0);

        return sum > 0;
    }

    const purchaseEnableHandler = () => {
        if(isAuthenticated){
            changePurchasing(true);
        }else{
            props.history.push("/auth");
        }
       
    }

    const purchaseDisableHandler = () => {
        changePurchasing(false);
    }

    const continueOrderHandler = () => {
        onInitPurchase();
        props.history.push("/checkout");
    }

 
    const disabledInfo = {
        ...ingredients
    };

    for(let key in disabledInfo){
        if(disabledInfo[key] < 1)
            disabledInfo[key] = true;
        else
            disabledInfo[key] = false;
    }

    let orderSummary = null;
    let burger = 
        error 
        ? <p style={{textAlign: "center"}}>
            {error.message}
          </p>
        :<Spinner />;
                    
    if(ingredients){
        burger = (
            <Auxiliary>
                <Burger ingredients = {ingredients}/>
                <BuildControls 
                    ingredientAdded   = {addIngredient}
                    ingredientRemoved = {removeIngredient}
                    disabled          = {disabledInfo}
                    price             = {totalPrice}
                    purchasable       = {updatePurchaseState(ingredients)}
                    order             = {purchaseEnableHandler}
                />
            </Auxiliary>
        );

        orderSummary = (
            <OrderSummary 
                ingredients   = {ingredients}
                noOrder       = {purchaseDisableHandler}
                continueOrder = {continueOrderHandler}
                price         = {totalPrice}
            />
        );
    }

    return(
        <Auxiliary>
            <Modal 
                noOrder = {purchaseDisableHandler} 
                show    = {purchasing}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
});

export default withErrorHandler(burgerBuilder, axios);