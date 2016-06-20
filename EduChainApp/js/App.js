/**
 * Created by BK on 19/06/16.
 * `App` is used as an entry point for the app in both index.ios.js
 * and index.android.js
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native'
import TabsView from './tabs/TabsView'
import Header from './common/Header'

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <TabsView />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
