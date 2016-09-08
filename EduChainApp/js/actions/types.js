/**
 * Partial src: https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 *
 * @flow
 */
'use strict';

import type {Task} from '../reducers/tasks';
import type {User, Login} from '../reducers/user';
import type {Team} from '../reducers/team';

export type Action =
    { type: 'REFRESH_TASKLIST' }

  | { type: 'FETCH_TASKS_REQUEST', username: string }
  | { type: 'FETCH_TASKS_SUCCESS', tasks: Array<Task>, receivedAt: number }
  | { type: 'FETCH_TASKS_FAIL', error: Object }

  | { type: 'NEW_ID_REQUEST', target: string }
  | { type: 'NEW_ID_SUCCESS', newId: string }
  | { type: 'NEW_ID_FAIL', error: Object }

  | { type: 'ADD_TASK_REQUEST' }
  | { type: 'ADD_TASK_SUCCESS', isOverwrite: boolean, taskAddr: string }
  | { type: 'ADD_TASK_FAIL', error: Object }

  | { type: 'ADD_USER_REQUEST' }
  | { type: 'ADD_USER_SUCCESS', isOverwrite: boolean}
  | { type: 'ADD_USER_FAIL', error: Object }

  | { type: 'SIGNUP_REQUEST', form: User }
  | { type: 'SIGNUP_SUCCESS', address: string }
  | { type: 'SIGNUP_FAIL', error: Object }

  | { type: 'CHECK_USERNAME_REQUEST', username: string }
  | { type: 'CHECK_USERNAME_SUCCESS', isTaken: boolean }
  | { type: 'CHECK_USERNAME_FAIL', error: Object }

  | { type: 'LOGIN_REQUEST', form: Login }
  | { type: 'LOGIN_RESPONSE', isValid: boolean }
  | { type: 'LOGIN_FAIL', error: Object }

  | { type: 'GET_PROFILE_REQUEST', username: string }
  | { type: 'GET_PROFILE_SUCCESS', profile: User }
  | { type: 'GET_PROFILE_FAIL', error: Object }

  | { type: 'CREATE_TEAM_REQUEST', form: Object }
  | { type: 'CREATE_TEAM_SUCCESS', address: string }
  | { type: 'CREATE_TEAM_FAIL', error: Object }

  | { type: 'ADD_MEMBER_REQUEST', form: Object }
  | { type: 'ADD_MEMBER_SUCCESS', username: string }
  | { type: 'ADD_MEMBER_FAIL', error: Object }
  ;

export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
