/**
 * Created by BK on 21/06/16.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    View,
    ListView,
    StyleSheet
} from 'react-native';
import NotificationsRow from './NotificationsRow';
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../common/Header';
import Loader from '../../common/Loader';

type Rows = Array<NotificationsRow>;
type NotificationData = Rows;

type State = {
    dataSource: NotificationData,
    loaded: boolean
}

export default class NotificationsListView extends React.Component {
    state: State;

    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false
        };
    }

    componentDidMount() {
        let date = new Date();
        let dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let testRows = () => {
            let arr = [];
            for (let i = 1; i < 5; i++) arr.push({
                title: `Notification ${i}`,
                desc: `desc for notification ${i}`,
                timestamp: dateString,
                thumbURI: `https://randomuser.me/api/portraits/thumb/women/${i}.jpg`
            });
            return arr;
        };
        let tr = testRows();

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tr),
            loaded: true
        });
    }

    render() {
        if (!this.state.loaded)
            return (<Loader title='Notifications' />);

        return (
            <View style={styles.container}>
                <Header
                    title='Notifications'
                    rightItem={{
                        title: "Clear",
                        layout: "title"
                    }}
                />
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <NotificationsRow row={rowData} onPress={() => console.log("tapped notification")} />
                    }
                    renderSeparator={(sectionId, rowId) =>
                        <View key={rowId} style={GlobalStyles.separator} />
                    }
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
