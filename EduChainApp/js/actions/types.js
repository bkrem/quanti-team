/**
 * Partial src: https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 *
 * @flow
 */
'use strict';

import type {Task} from '../reducers/tasks';
import type {User, Login} from '../reducers/user';

export type Action =
    { type: 'REFRESH_TASKLIST' }

  | { type: 'FETCH_TASKS_REQUEST' }
  | { type: 'FETCH_TASKS_SUCCESS', tasks: Array<Task>, receivedAt: number }
  | { type: 'FETCH_TASKS_FAIL', error: Object }

  | { type: 'NEW_ID_REQUEST', target: string }
  | { type: 'NEW_ID_SUCCESS', newId: string }
  | { type: 'NEW_ID_FAIL', error: Object }

  | { type: 'ADD_TASK_REQUEST' }
  | { type: 'ADD_TASK_SUCCESS', success: boolean, taskAddr: string }
  | { type: 'ADD_TASK_FAIL', error: Object }

  | { type: 'ADD_USER_REQUEST' }
  | { type: 'ADD_USER_SUCCESS', isOverwrite: boolean}
  | { type: 'ADD_USER_FAIL', error: Object  }

  | { type: 'SIGNUP_REQUEST', form: User }
  | { type: 'SIGNUP_SUCCESS', address: string }
  | { type: 'SIGNUP_FAIL', error: Object }

  | { type:'CHECK_USERNAME_REQUEST', username: string }
  | { type: 'CHECK_USERNAME_SUCCESS', isTaken: boolean }
  | { type: 'CHECK_USERNAME_FAIL', error: Object }

  | { type: 'LOGIN_REQUEST', form: Login }
  | { type: 'LOGIN_RESPONSE', isValid: boolean }
  | { type: 'LOGIN_FAIL', error: Object }
  ;

export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
