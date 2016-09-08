/**
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';
import type {User} from '../reducers/user';

export type Team = {
    name: string;
    score: number;
    members: Array<User>;
    founderUsername: string,
    founderAddress: string,
    address?: string;
}

type State = Team;

const initialState: State = {
    name: '',
    score: 0,
    members: [],
    founderUsername: '',
    founderAddress: '',
    address: ''
};

export default function team(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'CREATE_TEAM_REQUEST':
            return {
                ...state,
                ...action.form
            };

        case 'CREATE_TEAM_SUCCESS':
            return {
                ...state,
                address: action.address
            };

        case 'CREATE_TEAM_FAIL':
            console.error(action.error);
            return initialState;

        default:
            return state;
    }
}
