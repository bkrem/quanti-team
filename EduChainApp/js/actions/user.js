/**
 *
 * @flow
 */
'use strict';

import ENV from '../common/Environment';
import type {Action, ThunkAction} from './types';
import type {User} from '../reducers/user';
import {assignNewId} from './util';

// #############################
// UI EVENTS
// #############################


// ####################################
// POST `/user/signup` API ENDPOINT ACTIONS
// ####################################
export function signupRequest(form: User): Action {
    return {
        type: 'SIGNUP_REQUEST',
        form
    };
}
export function signupSuccess(address: string): Action {
    return {
        type: 'SIGNUP_SUCCESS',
        address
    };
}
export function signupFail(error: Object): Action {
    return {
        type: 'SIGNUP_FAIL',
        error
    };
}


// ####################################
// POST `/user/taken` API ENDPOINT ACTIONS
// ####################################
export function checkUsernameRequest(username: string): Action {
    return {
        type: 'CHECK_USERNAME_REQUEST',
        username
    };
}
export function checkUsernameSuccess(isTaken: boolean): Action {
    return {
        type: 'CHECK_USERNAME_SUCCESS',
        isTaken
    };
}
export function checkUsernameFail(error: Object): Action {
    return {
        type: 'CHECK_USERNAME_FAIL',
        error
    };
}


// ##############################
// THUNK ACTIONS
// ##############################
export function signup(partialUser: User): ThunkAction {
    return (dispatch) => {
        dispatch(signupRequest(partialUser));

        return assignNewId(dispatch, 'user').then(newId => {
            const user = {...partialUser, id: newId};
            const request = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            };

            return fetch(ENV.__API_BRIDGE + '/user/signup', request)
                .then(response => response.json())
                .then(json =>
                    dispatch(signupSuccess(json.address))
                )
                .catch(rejection =>
                    dispatch(signupFail(rejection))
                );
        });
    };
}

export function isUsernameTaken(username: string): ThunkAction {
    return (dispatch) => {
        dispatch(checkUsernameRequest(username));

        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username})
        };

        return fetch(ENV.__API_BRIDGE+'/user/taken', request)
            .then(response => response.json())
            .then(json => {
                dispatch(checkUsernameSuccess(json.isTaken));
                return json.isTaken;
            })
            .catch(rejection => {
                dispatch(checkUsernameFail(rejection));
                return rejection;
            });
    };
}
