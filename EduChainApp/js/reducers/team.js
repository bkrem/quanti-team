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
    address?: string;
}

type State = Team;

const initialState: State = {
    name: '',
    score: 0,
    members: [],
    address: ''
};

export default function team(state: State = initialState, action: Action): State {
    switch (action.type) {
        case '':
            return state;

        default:
            return state;
    }
}
