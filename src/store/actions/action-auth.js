import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (userId, idToken, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        userId: userId,
        idToken: idToken
    }
}

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error.message
    }
}

const authAutoLogout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, time * 1000);
    }
}

export const authLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userEmail");

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const handleUserPath = (path) => {
    return {
        type: actionTypes.USER_PATH,
        path: path
    }
}

export const auth = (email, password, isSignUp) => {
    const info = {
        email    : email,
        password : password,
        returnSecureToken: true
    }

    let apiURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjMEV2Ve10GKqxAgaCM7Sp_nxXPZyTxKM';

    if(!isSignUp){
        apiURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjMEV2Ve10GKqxAgaCM7Sp_nxXPZyTxKM';
    }

    return dispatch => {
        dispatch(authStart());

        axios.post(apiURL, info)
        .then(response => { 
            dispatch(authSuccess(response.data.localId, response.data.idToken, info.email));
            
            localStorage.setItem("idToken",response.data.idToken);
            localStorage.setItem("userId",response.data.localId);
            localStorage.setItem("userEmail", info.email);

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000 * 24);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authAutoLogout(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        let tokenId = localStorage.getItem("idToken");

        if(!tokenId){
            dispatch(authLogout());
        }
        else {
            let currentExpirationDate = new Date(localStorage.getItem("expirationDate"));

            if(currentExpirationDate > new Date()){
                const userId    = localStorage.getItem("userId");
                const idToken   = localStorage.getItem("idToken");
                const userEmail = localStorage.getItem("userEmail"); 

                dispatch(authSuccess(userId, idToken, userEmail));
            }
            else{
                authLogout();
            }

        }
    }
}

