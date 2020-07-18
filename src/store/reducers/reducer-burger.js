import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utilities/utility';

const initialState = {
    ingredients : null,
    totalPrice  : 4,
    error       : null,
    loading     : false,
    building    : false
}

const INGEDIENT_PRICES = {
    salad  : 0.5,
    cheese : 0.4,
    meat   : 1.3,
    bacon  : 0.7
}

const setUpIngredients = (state) => {
    return updateObject(state, {
        ingredients: null,
        totalPrice: 4,
        error: null,
        loading: false,
        building: false
    });
}

const fetchIngredientsStart = (state) => {
    return updateObject(state, {
        loading : true
    });
}

const fetchIngredientsSuccess = (state, action) => {
    return updateObject(state, {
        ingredients : action.ingredients,
        loading     : false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error   : action.error,
        loading : false
    });
} 

const addIngredient = (state, action) => {
    return updateObject(state, 
    {
        ingredients: updateObject(state.ingredients, {
            [action.ingredient]: state.ingredients[action.ingredient] + 1
        }), 
        totalPrice: state.totalPrice + INGEDIENT_PRICES[action.ingredient],
        building: true
    });
}

const removeIngredient = (state, action) => {
    return updateObject(state, 
    {
        ingredients: updateObject(state.ingredients, {
            [action.ingredient]: state.ingredients[action.ingredient] - 1
        }), 
        totalPrice: state.totalPrice - INGEDIENT_PRICES[action.ingredient],
        building: true
    });
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT            : return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT         : return removeIngredient(state, action);

        case actionTypes.SET_UP_INGREDIENTS        : return setUpIngredients(state);

        case actionTypes.FETCH_INGREDIENTS_START   : return fetchIngredientsStart(state);
        case actionTypes.FETCH_INGREDIENTS_SUCCESS : return fetchIngredientsSuccess(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED  : return fetchIngredientsFailed(state, action);
        
        default                                    : return state;
    }
}

export default burgerReducer;