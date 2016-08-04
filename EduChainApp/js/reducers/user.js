/**
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type User = {
    id: number;
    name: string;
    handle: string;
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
        // TODO

        default:
            return state;
    }
}
