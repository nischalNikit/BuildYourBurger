import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const setUpIngredients = () => {
    return {
        type: actionTypes.SET_UP_INGREDIENTS
    }
}

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredient
    }
}

const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    }
}

const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const fetchIngredients = () => {
    return dispatch =>  {
        dispatch(fetchIngredientsStart());
        axios.get('https://burger-builder-productio-675a8.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(fetchIngredientsSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed(error));
        });
    }
}

