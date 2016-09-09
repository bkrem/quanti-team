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

        case 'ADD_MEMBER_SUCCESS':
            return {
                ...state,
                members: state.members.concat(action.username)
            };

        case 'GET_TEAM_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.team
            };

        case 'ADD_MEMBER_FAIL':
            console.log(action.error);
            return state;

        case 'CREATE_TEAM_FAIL':
        case 'GET_TEAM_DETAILS_FAIL':
            console.log(action.error);
            return initialState;

        default:
            return state;
    }
}
