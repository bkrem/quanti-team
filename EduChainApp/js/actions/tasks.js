/**
 *
 * @flow
 */
'use strict';

import type {Action, ThunkAction} from './types';

module.exports = {
    loadTasks: (): Action => ({
        type: 'TASKS_LOADED',
        taskList: ["test1", "test2"]
    })
};
