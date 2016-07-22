/**
 * Partial src: https://github.com/fbsamples/f8app/blob/master/js/store/configureStore.js
 *
 * @flow
 */

'use strict';

import {applyMiddleware, createStore} from 'redux';
// import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// TODO log only in DEV/provide option
const logger = createLogger();
// TODO implement `persist` config
const composeStore = applyMiddleware(thunk, logger)(createStore)(rootReducer);

function configureStore() {
    const store = composeStore;

    if (isDebuggingInChrome)
        window.store = store;

    return store;
}

export default configureStore;
