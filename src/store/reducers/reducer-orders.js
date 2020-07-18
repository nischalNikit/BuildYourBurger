import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilities/utility';


const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const purchaseInit = (state) => {
    return updateObject(state, {
        purchased: false
    });
}

const purchaseOrderStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const purchaseOrderSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        purchased: true
    });
}

const purchaseOrderFailed = (state) => {
    return updateObject(state, {
        loading: false
    });
}

const fetchedOrdersStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchedOrdersSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    });
}

const fetchedOrdersFailed = (state, action) => {
    return updateObject(state, {
        loading : false,
        error   : action.error
    });
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT          : return purchaseInit(state);
        
        case actionTypes.PURCHASE_ORDER_START   : return purchaseOrderStart(state); 
        case actionTypes.PURCHASE_ORDER_SUCCESS : return purchaseOrderSuccess(state); 
        case actionTypes.PURCHASE_ORDER_FAILED  : return purchaseOrderFailed(state);

        case actionTypes.FETCH_ORDERS_START     : return fetchedOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS   : return fetchedOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED    : return fetchedOrdersFailed(state, action);
        default                                 : return state; 
    }
}

export default orderReducer;