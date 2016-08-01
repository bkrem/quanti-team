/**
 *
 * @flow
 */
'use strict';

import type {Dispatch, Action} from './types';
import ENV from '../common/Environment';

// ##############################
// `/new-id` API ENDPOINT ACTIONS
// NOTE These actions do not modify state,
// they simply pipe into the `addTask()` func
// ##############################
function requestNewId(target: string): Action {
    return {
        type: 'NEW_ID_REQUEST',
        target
    };
}

function receiveNewId(newId: string): Action {
    return {
        type: 'NEW_ID_SUCCESS',
        newId
    };
}

function assignNewIdFail(error: Object): Action {
    return {
        type: 'NEW_ID_FAIL',
        error
    };
}

export function assignNewId(dispatch: Dispatch, endpoint: string): Promise {
    dispatch(requestNewId(endpoint));

    return new Promise((resolve, reject) => {
        fetch(ENV.__API_BRIDGE + '/new-id/' + endpoint)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveNewId(json.newId));
                resolve(json.newId);
            })
            .catch(rejection => {
                dispatch(assignNewIdFail(rejection));
                reject(rejection);
            });
    });
}
