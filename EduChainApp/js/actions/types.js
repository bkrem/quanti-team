/**
 * Partial src: https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 *
 * @flow
 */
'use strict';

import type {Task} from '../reducers/tasks';

export type Action =
    { type: 'TASKS_LOADED', taskList: Array<Task> }
  | { type: 'TASK_TEST', val: string }
  ;


export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
