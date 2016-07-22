/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import {
    TabBarIOS,
    Navigator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../common/Colors';
import type {Tab} from './../reducers/navigation';
import HomeView from './home/HomeView';
import NotificationsListView from './notifications/NotificationsListView';
import TasksListView from './tasks/TasksListView';
import ProfileView from './me/ProfileView';
import TeamView from './team/TeamView';

const ICONSIZE = 30;

type State = {
    selectedTab: string
};

type Props = {
    navigator: Navigator
}

export default class TabsView extends Component {
    state: State;
    props: Props;

    constructor() {
        super();
        this.state = {
            selectedTab: 'home'
        };
    }

    onTabSelect(tab: Tab): void {
        if (this.state.selectedTab !== tab) {
            this.setState({
                selectedTab: tab
            });
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor={Colors.unselectedGrey}
                tintColor={Colors.tintColor}
                barTintColor={Colors.darkBackground}
            >
                <Icon.TabBarItemIOS
                    title="Home"
                    selected={this.state.selectedTab === 'home'}
                    onPress={this.onTabSelect.bind(this, 'home')}
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    iconSize={ICONSIZE}
                >
                    <HomeView navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Notifications"
                    selected={this.state.selectedTab === 'notifications'}
                    onPress={this.onTabSelect.bind(this, 'notifications')}
                    iconName="ios-notifications-outline"
                    selectedIconName="ios-notifications"
                    iconSize={ICONSIZE}
                >
                    <NotificationsListView navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Tasks"
                    selected={this.state.selectedTab === 'tasks'}
                    onPress={this.onTabSelect.bind(this, 'tasks')}
                    iconName="ios-checkmark-circle-outline"
                    selectedIconName="ios-checkmark-circle"
                    iconSize={ICONSIZE}
                >
                        <TasksListView navigator={this.props.navigator} />
                    </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Team"
                    selected={this.state.selectedTab === 'team'}
                    onPress={this.onTabSelect.bind(this, 'team')}
                    iconName="ios-people-outline"
                    selectedIconName="ios-people"
                    iconSize={ICONSIZE}
                >
                    <TeamView navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Me"
                    selected={this.state.selectedTab === 'me'}
                    onPress={this.onTabSelect.bind(this, 'me')}
                    iconName="ios-contact-outline"
                    selectedIconName="ios-contact"
                    iconSize={ICONSIZE}
                >
                    <ProfileView navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}
