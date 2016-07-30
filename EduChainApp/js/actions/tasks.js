/**
 *
 * @flow
 */
'use strict';

import type {Action, ThunkAction} from './types';
import type {Task} from '../reducers/tasks';
import ENV from '../common/Environment';


// #############################
// UI EVENTS
// #############################
export function refreshTaskList(): Action {
    return {
        type: 'REFRESH_TASKLIST'
    };
}

// #############################
// `/tasks` API ENDPOINT ACTIONS
// #############################
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

// ##############################
// `/new-id` API ENDPOINT ACTIONS
// ##############################
export function requestNewTaskId(): Action {
    return {
        type: 'NEW_TASK_ID_REQUEST'
    };
}
export function


// ##############################
// THUNK ACTIONS
// ##############################
export function fetchTasks(): ThunkAction {
    return (dispatch) => {
        // State is set to `isFetching: true`
        dispatch(requestTasks());

        return fetch(ENV.__API_BRIDGE+'/tasks')
            .then(response => response.json())
            .then(json =>
                dispatch(receiveTasks(json.data))
            )
            .catch(rejection =>
                dispatch(fetchTasksFail(rejection))
            );
    };
}
