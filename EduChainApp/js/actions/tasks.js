/**
 *
 * @flow
 */
'use strict';

import type {Action, ThunkAction} from './types';
import type {Task} from '../reducers/tasks';

module.exports = {
    loadTasks: (tasks: Array<Task>): Action => ({
        type: 'TASKS_LOADED',
        taskList: tasks
    })
};
