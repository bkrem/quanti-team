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
import {Tab} from './../reducers/navigation'
import First from './../First'
import Second from './../Second'

export default class TabsView extends Component {
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
                unselectedTintColor="yellow"
                tintColor="white"
                barTintColor="darkslateblue">
                <TabBarIOS.Item
                    title="Home"
                    selected={this.state.selectedTab === 'home'}
                    onPress={this.onTabSelect.bind(this, 'home')}
                    icon={require('./../img/iconbeast-lite/png/home-7.png')}>
                    <First navigator={{}} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Notifications"
                    selected={this.state.selectedTab === 'notifications'}
                    onPress={this.onTabSelect.bind(this, 'notifications')}
                    icon={require('./../img/iconbeast-lite/png/bell-7.png')}>
                    <Second navigator={{}} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="My Tasks"
                    selected={this.state.selectedTab === 'tasks'}
                    onPress={this.onTabSelect.bind(this, 'tasks')}
                    icon={require('./../img/iconbeast-lite/png/file-list-tick-7.png')}>
                    <Second navigator={{}} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="My Team"
                    selected={this.state.selectedTab === 'team'}
                    onPress={this.onTabSelect.bind(this, 'team')}
                    icon={require('./../img/iconbeast-lite/png/woman-man-7.png')}>
                    <Second navigator={{}} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Me"
                    selected={this.state.selectedTab === 'me'}
                    onPress={this.onTabSelect.bind(this, 'me')}
                    icon={require('./../img/iconbeast-lite/png/circle-user-7.png')}>
                    <Second navigator={{}} />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}