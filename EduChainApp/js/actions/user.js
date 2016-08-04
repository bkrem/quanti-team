/**
 *
 * @flow
 */
'use strict';

import ENV from '../common/Environment';
import type {Action, ThunkAction} from './types';
import type {User} from '../reducers/user';

// #############################
// UI EVENTS
// #############################


// ####################################
// POST `/signup` API ENDPOINT ACTIONS
// ####################################
export function signupRequest(form: User): Action {
    return {
        type: 'SIGNUP_REQUEST',
        form
    };
}
export function signupSuccess(address: string): Action {
    return {
        type: 'SIGNUP_SUCCESS'
    };
}
export function signupFail(error: Object): Action {
    return {
        type: 'SIGNUP_FAIL',
        error
    };
}


// ##############################
// THUNK ACTIONS
// ##############################
export function signup(form: User): ThunkAction {
    return (dispatch) => {
        dispatch(signupRequest(form));

        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        };
        fetch(ENV.__API_BRIDGE + '/user/signup', request)
            .then(response => response.json())
            .then(json =>
                dispatch(signupSuccess(json.address))
            )
            .catch(rejection =>
                dispatch(signupFail(rejection))
            );
    };
}
