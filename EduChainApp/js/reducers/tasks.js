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
    taskList: Array<Task>
}

const initialState: State = {
    taskList: []
};

export default function tasks(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'TASKS_LOADED':
            return {...state, taskList: action.taskList};

        default:
            return state;
    }

}
