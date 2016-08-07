/**
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type User = {
    id: number;
    name: string;
    username: string;
    score: number;
    teamId?: number;
    email?: string;
    address?: string;
}

export type Login = {
    username: string;
    password: string;
}

type State = {
    isLoggedIn: boolean;
    username: string;
}

const initialState: State = {
    isLoggedIn: false,
    username: ""
};

export default function user(state: State = initialState, action: Action): State {
    switch (action.type) {

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoggedIn: true
            };

        case 'LOGIN_REQUEST':
            return {
                ...state,
                username: action.form.username
            };

        case 'LOGIN_RESPONSE':
            return {
                ...state,
                isLoggedIn: action.isValid,
                username: action.isValid ? state.username : initialState.username
            };

        case 'SIGNUP_FAIL':
        case 'CHECK_USERNAME_FAIL':
        case 'LOGIN_FAIL':
            console.error(action.error);
            return state;

        default:
            return state;
    }
}
