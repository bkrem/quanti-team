/**
 *
 * @flow
 */
'use strict';

import type {Action, ThunkAction} from './types';
import type {Task} from '../reducers/tasks';
import ENV from '../common/Environment';

export function refreshTaskList(): Action {
    return {
        type: 'REFRESH_TASKLIST'
    };
}

export function requestTasks(): Action {
    return {
        type: 'FETCH_TASKS_REQUEST'
    };
}

export function receiveTasks(tasks: Array<Task>): Action {
    return {
        type: 'FETCH_TASKS_SUCCESS',
        tasks,
        receivedAt: Date.now()
    };
}

export function fetchTasksFail(error: Object): Action {
    return {
        type: 'FETCH_TASKS_FAIL',
        error
    };
}

// ###############
// THUNK ACTIONS
// ###############
// TODO Handle failed Promise
export function fetchTasks (): ThunkAction {
    return (dispatch) => {
        // State is set to `isFetching: true`
        dispatch(requestTasks());

        return fetch(ENV.__API_BRIDGE+'/tasks')
            .then(response => response.json())
            .then(json =>
                dispatch(receiveTasks(json.data))
            );
    };
}
