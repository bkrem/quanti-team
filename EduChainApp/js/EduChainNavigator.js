/**
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react'
import {
    Navigator,
    StyleSheet
} from 'react-native'
import First from './First'
import Second from './Second'
import HomeView from './tabs/home/HomeView'

export default class EduChainNavigator extends Component {
    constructor(props: Object) {
        super(props);
    }

    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case "first":
                return (<First navigator={navigator} title="first" />);

            case "second":
                return (<Second navigator={navigator} title="second" />);

            default:
                return (<HomeView navigator={navigator} />);
        }
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={ {} }
                renderScene={this.renderScene}
            />
        );
    }

}
