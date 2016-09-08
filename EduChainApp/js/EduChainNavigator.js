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
import AddTask from './tabs/tasks/AddTask';
import CreateTeam from './tabs/team/CreateTeam';
import AddMember from './tabs/team/AddMember';
import Login from './login/Login';
import Signup from './signup/Signup';

export default class EduChainNavigator extends React.Component {
    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case 'signup':
                return (<Signup navigator={navigator} />);
            case 'login':
                return (<Login navigator={navigator} />);
            case 'settings':
                return (<SettingsListView navigator={navigator} />);
            case 'task':
                return (<TaskView task={route.task} navigator={navigator} />);
            case 'addTask':
                return (<AddTask navigator={navigator} />);
            case 'createTeam':
                return (<CreateTeam navigator={navigator} />);
            case 'addMember':
                return (<AddMember navigator={navigator} />);

            case 'home':
            default:
                return (<TabsView navigator={navigator} />);
        }
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={{id: 'login'}}
                renderScene={this.renderScene}
            />
        );
    }

}
