/**
 *
 *
 * @flow
 */
'use strict';

import {combineReducers} from 'redux';

import tasks from './tasks';
import user from './user';
import team from './team';

const rootReducer = combineReducers({
    tasks,
    user,
    team
});

export default rootReducer;
