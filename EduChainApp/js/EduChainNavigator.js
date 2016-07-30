/**
 *
 * @flow
 */

'use strict';

import React from 'react';
import {Navigator} from 'react-native';
import TabsView from './tabs/TabsView';
import TaskView from './tabs/tasks/TaskView';
import SettingsListView from './settings/SettingsListView';
import AddTaskContainer from './tabs/tasks/AddTaskContainer';

export default class EduChainNavigator extends React.Component {
    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case 'settings':
                return (<SettingsListView navigator={navigator} />);
            case 'task':
                return (<TaskView task={route.task} navigator={navigator} />);
            case 'addTask':
                return (<AddTaskContainer navigator={navigator} />);

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
