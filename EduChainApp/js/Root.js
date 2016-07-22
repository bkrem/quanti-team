/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

import {loadTasks} from './actions/tasks';

export default class Root extends React.Component {
    state: {
        store: any
    };

    constructor() {
        super();
        this.state = {
            store: configureStore()
        };
    }

    render() {
        console.info("store state at root:", this.state.store.getState());
        this.state.store.dispatch(loadTasks());

        return (
            <Provider store={this.state.store}>
                <App />
            </Provider>
        );
    }

}
