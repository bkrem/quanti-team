/**
 *
 * @flow
 */
'use strict';

import ENV from '../common/Environment';
import type {Action, ThunkAction} from './types';
import type {Team} from '../reducers/team';

export function createTeamRequest(form: Object): Action {
    return {
        type: 'CREATE_TEAM_REQUEST',
        form
    };
}
export function createTeamSuccess(address: string): Action {
    return {
        type: 'CREATE_TEAM_SUCCESS',
        address
    };
}
export function createTeamFail(error: Object): Action {
    return {
        type: 'CREATE_TEAM_FAIL',
        error
    };
}


// ##############################
// THUNK ACTIONS
// ##############################

export function createTeam(form: Object): ThunkAction {
    return (dispatch) => {
        dispatch(createTeamRequest(form));

        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({form: form})
        };

        return fetch(ENV.__API_BRIDGE+'/team', request)
            .then(response => response.json())
            .then(json =>
                dispatch(createTeamSuccess(json.address))
            )
            .catch(rejection =>
                dispatch(createTeamFail(rejection))
            );
    };
}
