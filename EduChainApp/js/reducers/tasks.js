/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type Task = {
    id: number,
    title: string,
    desc: string,
    reward: string,
    complete: string,
    status: string,
}

type State = {
    tasks: Array<Task>
}

const initialState: State = {
    tasks: []
};

export default function tasks(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'LOADED_TASKS':
            return {...state, tasks: action.tasks};
    }
}
