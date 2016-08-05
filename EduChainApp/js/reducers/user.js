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

type State = {
    isLoggedIn: boolean;
}

const initialState: State = {
    isLoggedIn: false
};

export default function user(state: State = initialState, action: Action): State {
    switch (action.type) {

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoggedIn: true
            };

        case 'SIGNUP_FAIL':
            console.error(action.error);
            return state;

        default:
            return state;
    }
}
