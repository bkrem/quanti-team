/**
 * Partial src: https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 *
 * @flow
 */
'use strict';

import type {Task} from '../reducers/tasks';

export type Action =
    { type: 'REFRESH_TASKLIST' }
  | { type: 'FETCH_TASKS_REQUEST' }
  | { type: 'FETCH_TASKS_SUCCESS', tasks: Array<Task>, receivedAt: number }
  | { type: 'FETCH_TASKS_FAIL', error: Object }
  ;


export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
