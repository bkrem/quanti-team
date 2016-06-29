/**
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    Navigator,
    StyleSheet
} from 'react-native';
import TabsView from './tabs/TabsView';
import TaskView from './tabs/tasks/TaskView';
import SettingsListView from './settings/SettingsListView'

export default class EduChainNavigator extends React.Component {
    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case 'settings':
                return (<SettingsListView navigator={navigator} />);
            case 'task':
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
