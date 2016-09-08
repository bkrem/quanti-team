/**
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type Team = {
    name: string;
    score: number;
    members: Array<string>;
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

        case 'ADD_MEMBER_SUCCESS':
            return {
                ...state,
                members: state.members.concat(action.username)
            };

        case 'ADD_MEMBER_FAIL':
            console.error(action.error);
            return state;

        case 'CREATE_TEAM_FAIL':
            console.error(action.error);
            return initialState;

        default:
            return state;
    }
}
