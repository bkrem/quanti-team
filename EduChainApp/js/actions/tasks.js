/**
 *
 * @flow
 */
'use strict';

import type {Action, ThunkAction} from './types';
import type {Task} from '../reducers/tasks';
import ENV from '../common/Environment';
import {assignNewId} from './util';


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
// GET
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

// POST
// NOTE These actions do not modify state
export function requestAddTask(): Action {
    return {
        type: 'ADD_TASK_REQUEST'
    };
}
export function responseAddTask(isOverwrite: boolean): Action {
    return {
        type: 'ADD_TASK_RESPONSE',
        isOverwrite
    };
}
export function addTaskFail(error: Object): Action {
    return {
        type: 'ADD_TASK_FAIL',
        error
    };
}


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

export function addTask(partialTask: Task): ThunkAction {
    return (dispatch) => {
        dispatch(requestAddTask());

        return assignNewId(dispatch, 'task').then(newId => {
            let task = {...partialTask, id: newId};
            let request = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            };

            fetch(ENV.__API_BRIDGE+'/tasks', request)
                .then(response => response.text())
                .then(isOverwrite =>
                    dispatch(responseAddTask(isOverwrite))
                )
                .catch(rejection =>
                    dispatch(addTaskFail(rejection))
                );
        });
    };
}

/*function _assignNewTaskId(dispatch): Promise {
    dispatch(requestNewTaskId());

    return new Promise((resolve, reject) => {
        fetch(ENV.__API_BRIDGE+'/new-id')
            .then(response => response.json())
            .then(json => {
                dispatch(receiveNewTaskId(json.newId));
                resolve(json.newId);
            })
            .catch(rejection => {
                dispatch(assignNewTaskIdFail(rejection));
                reject(rejection);
            });
    });
}*/
