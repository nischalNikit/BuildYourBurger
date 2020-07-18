import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/*Purchasing Order Functions*/
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    }
}

const purchaseOrderSuccess = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS
    }
}

const purchaseOrderFailed = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAILED
    }
}

export const purchaseOrder = (order) => {
    return (dispatch, getState) => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json?auth=' +  getState().authReducer.idToken, order)
        .then(response => {
            dispatch(purchaseOrderSuccess());
        })
        .catch(error => {
            dispatch(purchaseOrderFailed());
        });
    }
} 

/*Showing All Previous Orders Functions*/
const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type   : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : fetchedOrders
    }
}

const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error.message
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        const queryParams = 
        '?auth=' 
        + getState().authReducer.idToken 
        + '&orderBy="userId"&equalTo="' 
        + getState().authReducer.userId + '"';

        axios.get('/orders.json' + queryParams)
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    }
}