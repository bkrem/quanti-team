/**
 *
 *
 * @flow
 */
'use strict';

import {combineReducers} from 'redux';

import navigation from './navigation';
import tasks from './tasks';

const rootReducer = combineReducers({
    navigation,
    tasks
});

export default rootReducer;
