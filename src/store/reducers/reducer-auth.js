import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utilities/utility';

const initialState = {
    userEmail : null,
    loading   : false,
    userId    : null,
    idToken   : null,
    error     : null,
    path      : ""
}

const authStart = (state) => {
    return updateObject(state, {loading: true});
}

const authSucess = (state, action) => {
    return updateObject(state, {
        loading   : false,
        userId    : action.userId,
        idToken   : action.idToken,
        userEmail : action.email
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {
        loading : false,
        error   : action.error
    });
}

const authLogout = (state) => {
    return updateObject(state, {
        loading   : false,
        userId    : null,
        idToken   : null,
        error     : null,
        userEmail : ""
    })
}

const handleUserPath = (state, action) => {
    return updateObject(state, {
        path: action.path
    })
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START     :   return authStart(state);
        case actionTypes.AUTH_SUCCESS   :   return authSucess(state,action);
        case actionTypes.AUTH_FAILED    :   return authFailed(state,action);
        case actionTypes.AUTH_LOGOUT    :   return authLogout(state);
        case actionTypes.USER_PATH      :   return handleUserPath(state, action); 
        default: return state;
    }
}

export default AuthReducer;