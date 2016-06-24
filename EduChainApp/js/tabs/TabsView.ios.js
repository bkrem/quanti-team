/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */

'use strict';

import React, {Component} from 'react'
import {
    TabBarIOS,
    Navigator
} from 'react-native'
import Colors from '../common/Colors'
import type {Tab} from './../reducers/navigation'
import HomeView from './home/HomeView'
import NotificationsListView from './notifications/NotificationsListView'
import TasksListView from './tasks/TasksListView'
import ProfileView from './me/ProfileView'
import TeamView from './team/TeamView'

type State = {
    selectedTab: string
};

type Props = {
    navigator: Navigator
}

export default class TabsView extends Component {
    state: State;
    props: Props;

    constructor(props: Object) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    onTabSelect(tab: Tab): void {
        if (this.state.selectedTab !== tab) {
            this.setState({
                selectedTab: tab
            })
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor={Colors.unselectedGrey}
                tintColor={Colors.tintColor}
                barTintColor={Colors.darkBackground}>
                <TabBarIOS.Item
                    title="Home"
                    selected={this.state.selectedTab === 'home'}
                    onPress={this.onTabSelect.bind(this, 'home')}
                    icon={require('./../img/iconbeast-lite/png/home-7.png')}>
                    <HomeView navigator={this.props.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Notifications"
                    selected={this.state.selectedTab === 'notifications'}
                    onPress={this.onTabSelect.bind(this, 'notifications')}
                    icon={require('./../img/iconbeast-lite/png/bell-7.png')}>
                    <NotificationsListView navigator={this.props.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="My Tasks"
                    selected={this.state.selectedTab === 'tasks'}
                    onPress={this.onTabSelect.bind(this, 'tasks')}
                    icon={require('./../img/iconbeast-lite/png/file-list-tick-7.png')}>
                    <TasksListView navigator={this.props.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="My Team"
                    selected={this.state.selectedTab === 'team'}
                    onPress={this.onTabSelect.bind(this, 'team')}
                    icon={require('./../img/iconbeast-lite/png/woman-man-7.png')}>
                    <TeamView navigator={this.props.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Me"
                    selected={this.state.selectedTab === 'me'}
                    onPress={this.onTabSelect.bind(this, 'me')}
                    icon={require('./../img/iconbeast-lite/png/circle-user-7.png')}>
                    <ProfileView navigator={this.props.navigator} />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
