/**
 * Created by BK on 19/06/16.
 * `App` is used as an entry point for the app in both index.ios.js
 * and index.android.js
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import EduChainNavigator from './EduChainNavigator';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="light-content"
                />
                <EduChainNavigator />
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
