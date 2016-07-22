/**
 *
 * @flow
 */
'use strict';

import type {Task} from '../reducers/tasks';

export type Action =
    { type: 'TASKS_LOADED', tasks: Array<Task> }
