/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */

'use strict';

import React, {Component} from 'react'
import {
    TabBarIOS
    TabBarItemIOS
} from 'react-native'

export default class TabsView extends Component {
    constructor(props: Object) {
        super(props);
    }

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {
        return (
            <TabBarIOS tintColor="green">
                <TabBarItemIOS
                    title="Home"
                    selected={this.props.tab === 'home'}
                    onPress={this.onTabSelect.bind(this, 'home')}
                    icon={scheduleIcon}
                    selectedIcon={scheduleIconSelected}>
                    <GeneralScheduleView
                        navigator={this.props.navigator}
                        onDayChange={this.handleDayChange}
                    />
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="My F8"
                    selected={this.props.tab === 'my-schedule'}
                    onPress={this.onTabSelect.bind(this, 'my-schedule')}
                    icon={require('./schedule/img/my-schedule-icon.png')}
                    selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}>
                    <MyScheduleView
                        navigator={this.props.navigator}
                        onJumpToSchedule={() => this.props.onTabSelect('schedule')}
                    />
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="Maps"
                    selected={this.props.tab === 'map'}
                    onPress={this.onTabSelect.bind(this, 'map')}
                    icon={require('./maps/img/maps-icon.png')}
                    selectedIcon={require('./maps/img/maps-icon-active.png')}>
                    <F8MapView />
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="Notifications"
                    selected={this.props.tab === 'notifications'}
                    onPress={this.onTabSelect.bind(this, 'notifications')}
                    badge={this.props.notificationsBadge || null}
                    icon={require('./notifications/img/notifications-icon.png')}
                    selectedIcon={require('./notifications/img/notifications-icon-active.png')}>
                    <F8NotificationsView navigator={this.props.navigator} />
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="Info"
                    selected={this.props.tab === 'info'}
                    onPress={this.onTabSelect.bind(this, 'info')}
                    icon={require('./info/img/info-icon.png')}
                    selectedIcon={require('./info/img/info-icon-active.png')}>
                    <F8InfoView navigator={this.props.navigator} />
                </TabBarItemIOS>
            </TabBarIOS>
        );
    }
}