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
import TaskView from './tabs/tasks/TaskView'

export default class EduChainNavigator extends Component {
    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case "task":
                return (<TaskView task={route.task} navigator={navigator} />);

            default:
                return (<TabsView navigator={navigator} />);
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
