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
import TabsView from './tabs/TabsView'
import First from './First'
import Second from './Second'

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
                return (<EduChainApp navigator={navigator} />);
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

} // END CLASS

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});