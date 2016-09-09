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
export function createTeamSuccess(address: string, linkSuccess: boolean): Action {
    return {
        type: 'CREATE_TEAM_SUCCESS',
        address,
        linkSuccess
    };
}
export function createTeamFail(error: Object): Action {
    return {
        type: 'CREATE_TEAM_FAIL',
        error
    };
}


export function addMemberRequest(form: Object): Action {
    return {
        type: 'ADD_MEMBER_REQUEST',
        form
    };
}
export function addMemberSuccess(username: string, linkSuccess: boolean): Action {
    return {
        type: 'ADD_MEMBER_SUCCESS',
        username,
        linkSuccess
    };
}
export function addMemberFail(error: Object): Action {
    return {
        type: 'ADD_MEMBER_FAIL',
        error
    };
}


export function getTeamDetailsRequest(teamname: string) {
    return {
        type: 'GET_TEAM_DETAILS_REQUEST',
        teamname
    };
}
export function getTeamDetailsSuccess(team: Team) {
    return {
        type: 'GET_TEAM_DETAILS_SUCCESS',
        team
    };
}
export function getTeamDetailsFail(error: Object) {
    return {
        type: 'GET_TEAM_DETAILS_FAIL',
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
            .then(json => {
                dispatch(createTeamSuccess(json.address, json.linkSuccess));
                return json.linkSuccess;
            })
            .catch(rejection =>
                dispatch(createTeamFail(rejection))
            );
    };
}

export function getTeamDetails(teamname: string): ThunkAction {
    return (dispatch) => {
        dispatch(getTeamDetailsRequest(teamname));

        return fetch(ENV.__API_BRIDGE+`/team/${teamname}`)
            .then(response => response.json())
            .then(json => dispatch(getTeamDetailsSuccess(json.team)))
            .catch(rejection => dispatch(getTeamDetailsFail(rejection)));
    };
}

export function addTeamMember(form: Object): ThunkAction {
    return (dispatch) => {
        dispatch(addMemberRequest(form));

        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({form: form})
        };

        return fetch(ENV.__API_BRIDGE+'/team/add-member', request)
            .then(response => response.json())
            .then(json => {
                if (json.linkSuccess) {
                    dispatch(addMemberSuccess(json.username, json.linkSuccess));
                    // fetch the team details again now there's a new member
                    dispatch(getTeamDetails(form.teamname));
                } else {
                    dispatch(addMemberFail({error: 'Adding failed: `username` returned `null`'}));
                }


                return json.linkSuccess;
            })
            .catch(rejection =>
                dispatch(addMemberFail(rejection))
            );
    };
}
