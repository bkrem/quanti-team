/**
 *
 * @flow
 */
'use strict';

import ENV from '../common/Environment';
import type {Action, ThunkAction} from './types';
import type {User, Login} from '../reducers/user';
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


// ####################################
// POST `/user/login` API ENDPOINT ACTIONS
// ####################################
export function loginRequest(form: Login): Action {
    return {
        type: 'LOGIN_REQUEST',
        form
    };
}
export function loginResponse(isValid: boolean) {
    return {
        type: 'LOGIN_RESPONSE',
        isValid
    };
}
export function loginFail(error: Object) {
    return {
        type: 'LOGIN_FAIL',
        error
    };
}


// ####################################
// GET `/user/profile/` API ENDPOINT ACTIONS
// ####################################
export function getProfileRequest(username: string) {
    return {
        type: 'GET_PROFILE_REQUEST',
        username
    };
}
export function getProfileSuccess(profile: User) {
    return {
        type: 'GET_PROFILE_SUCCESS',
        profile
    };
}
export function getProfileFail(error: Object) {
    return {
        type: 'GET_PROFILE_FAIL',
        error
    };
}


// ##############################
// THUNK ACTIONS
// ##############################
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
                .then(json => {
                    dispatch(signupSuccess(json.address));
                    dispatch(getProfile(user.username));
                })
                .catch(rejection =>
                    dispatch(signupFail(rejection))
                );
        });
    };
}

export function login(form: Object): ThunkAction {
    return (dispatch) => {
        dispatch(loginRequest(form));
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        };

        return fetch(ENV.__API_BRIDGE + '/user/login', request)
            .then(response => response.json())
            .then(json => {
                dispatch(loginResponse(json.isValid));
                dispatch(getProfile(form.username));
                return json.isValid;
            })
            .catch(rejection =>
                dispatch(loginFail(rejection))
            );
    };
}

export function getProfile(username: string): ThunkAction {
    return (dispatch) => {
        dispatch(getProfileRequest(username));
        return fetch(ENV.__API_BRIDGE + `/user/profile/${username}`)
            .then(response => response.json())
            .then(json =>
                dispatch(getProfileSuccess(json.profile))
            )
            .catch(rejection =>
                dispatch(getProfileFail(rejection))
            );
    };
}
