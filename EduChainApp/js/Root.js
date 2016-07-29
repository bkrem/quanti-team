/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

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
        const {store} = this.state;
        console.info("store state at root:", store.getState());

        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }

}
