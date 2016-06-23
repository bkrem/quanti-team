/**
 * Created by BK on 21/06/16.
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    StyleSheet
} from 'react-native';
import NotificationsRow from './NotificationsRow'
import HeaderIOS from '../../common/Header'

type State = {
    dataSource: Object,
    loaded: boolean
}

export default class NotificationsListView extends Component {
    state: State;

    constructor(props: Object) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false
        }
    }

    componentDidMount() {
        let date = new Date();
        let dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        let testRows = () => {
            let arr = [];
            for (let i = 1; i < 50; i++) arr.push({
                title: `Notification ${i}`,
                desc: `desc for notification ${i}`,
                timestamp: dateString,
                thumbURI: `https://randomuser.me/api/portraits/thumb/women/${i}.jpg`
            });
            return arr;
        }
        let tr = testRows();

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tr),
            loaded: true
        })
    }

    render() {
        return (
            <View>
                <HeaderIOS title="Notifications" />
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <NotificationsRow row={rowData} />
                    }
                    renderSeparator={(sectionId, rowId) =>
                        <View key={rowId} style={styles.separator} />
                    }
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: '#F5FCFF',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    }
});
