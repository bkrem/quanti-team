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
export function requestTasks(username: string): Action {
    return {
        type: 'FETCH_TASKS_REQUEST',
        username
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
export function responseAddTask(success: boolean, taskAddr: string): Action {
    return {
        type: 'ADD_TASK_SUCCESS',
        success,
        taskAddr
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
export function fetchTasks(username: string): ThunkAction {
    return (dispatch) => {
        // State is set to `isFetching: true`
        dispatch(requestTasks(username));

        return fetch(ENV.__API_BRIDGE+`/tasks/${username}`)
            .then(response => response.json())
            .then(json =>
                dispatch(receiveTasks(json.data))
            )
            .catch(rejection =>
                dispatch(fetchTasksFail(rejection))
            );
    };
}

export function addTask(partialTask: Task, username: string): ThunkAction {
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
                body: JSON.stringify({task, username})
            };

            return fetch(ENV.__API_BRIDGE+'/task', request)
                .then(response => response.json())
                .then(json =>
                    dispatch(responseAddTask(json.success, json.taskAddr))
                )
                .catch(rejection =>
                    dispatch(addTaskFail(rejection))
                );
        });
    };
}
