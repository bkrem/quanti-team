/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type Task = {
    id: string,
    title: string,
    desc: string,
    reward: string,
    complete: string,
    status: string,
    address?: string
}

type State = {
    didRefresh: boolean;
    isFetching: boolean;
    taskList: Array<Task>;
}

const initialState: State = {
    didRefresh: false,
    isFetching: false,
    taskList: [],
};

export default function tasks(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'REFRESH_TASKLIST':
            return {...state, didRefresh: true};

        case 'FETCH_TASKS_REQUEST':
            return {
                ...state,
                didRefresh: false,
                isFetching: true
            };

        case 'FETCH_TASKS_SUCCESS':
            return {
                ...state,
                didRefresh: false,
                isFetching: false,
                taskList: action.tasks
            };

        default:
            return state;
    }

}
