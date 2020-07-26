import authReducer from './reducer-auth';
import { updateObject } from '../utilities/utility';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {

    const initialAuthState = {
        userEmail : null,
        loading   : false,
        userId    : null,
        idToken   : null,
        error     : null,
        path      : ""
    }

    it('should return initial State if invalid action type is passed', () => {
        expect(authReducer(initialAuthState, {}))
        .toEqual(initialAuthState);
    });

    it('should store the token if the user is logged In', () => {
        expect(authReducer(initialAuthState, {
            type: actionTypes.AUTH_SUCCESS,
            email: "some-email",
            userId: "some-userId",
            idToken: "some-idToken"
        }))
        .toEqual(updateObject(initialAuthState, {
            userEmail : "some-email",
            userId    : "some-userId",
            idToken   : "some-idToken"
        }));
    })
});