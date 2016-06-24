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
    constructor(props: Object) {
        super(props);
    }

    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case "task":
                return (<TaskView navigator={navigator} />);

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
