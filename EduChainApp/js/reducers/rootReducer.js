/**
 *
 *
 * @flow
 */
'use strict';

import {combineReducers} from 'redux';

import navigation from './navigation';
import tasks from './tasks';
import user from './user';

const rootReducer = combineReducers({
    tasks,
    user
});

export default rootReducer;
