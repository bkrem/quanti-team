/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    TabBarIOS,
    Navigator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../common/Colors';
import TaskList from './tasks/TaskList';
import Profile from './profile/Profile';
import Team from './team/Team';

const ICONSIZE = 30;

type Tab =
    'tasks'
  | 'team'
  | 'me'
  ;

type State = {
    selectedTab: string
};

type Props = {
    navigator: Navigator
}

export default class TabsView extends React.Component {
    state: State;
    props: Props;

    constructor() {
        super();
        this.state = {
            selectedTab: 'tasks'
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
                    title="Tasks"
                    selected={this.state.selectedTab === 'tasks'}
                    onPress={this.onTabSelect.bind(this, 'tasks')}
                    iconName="ios-checkmark-circle-outline"
                    selectedIconName="ios-checkmark-circle"
                    iconSize={ICONSIZE}
                >
                    <TaskList navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Team"
                    selected={this.state.selectedTab === 'team'}
                    onPress={this.onTabSelect.bind(this, 'team')}
                    iconName="ios-people-outline"
                    selectedIconName="ios-people"
                    iconSize={ICONSIZE}
                >
                    <Team navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Me"
                    selected={this.state.selectedTab === 'me'}
                    onPress={this.onTabSelect.bind(this, 'me')}
                    iconName="ios-contact-outline"
                    selectedIconName="ios-contact"
                    iconSize={ICONSIZE}
                >
                    <Profile navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

/* <Icon.TabBarItemIOS
    title="Home"
    selected={this.state.selectedTab === 'home'}
    onPress={this.onTabSelect.bind(this, 'home')}
    iconName="ios-home-outline"
    selectedIconName="ios-home"
    iconSize={ICONSIZE}
>
    <HomeView navigator={this.props.navigator} />
</Icon.TabBarItemIOS> */

/*
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
 */
