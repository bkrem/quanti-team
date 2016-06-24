/**
 * Created by BK on 20/06/16.
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import HeaderIOS from '../../common/Header'
import TasksListRow from './TasksListRow'

type Rows = Array<TasksListRow>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

type Data = Rows | RowsAndSections;

type State = {
    dataSource: Data,
    loaded: boolean
}

export default class TaskView extends Component {
    state: State;

    constructor(props: Object) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false
        }
    }

    componentDidMount() {
        let testRows = () => {
            let arr = [];
            for (let i = 0; i < 50; i++) arr.push({
                title: `row${i}`,
                desc: `desc for row${i}`,
                reward: '200 XP',
                complete: '3/5'
            });
            return arr;
        }
        let tr = testRows();

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tr),
            loaded: true
        })
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
              <Text>
                Loading Tasks...
              </Text>
            </View>
        );
    }

    // TODO GH #6; add searchBar header
    render() {
        if (!this.state.loaded)
        return this.renderLoadingView();

        return (
            <View>
                <HeaderIOS
                    title="My Tasks"
                    rightItem={{
                        title: "Add Task",
                        layout: "icon",
                        icon: "ios-add"
                    }}
                />
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <TasksListRow row={rowData} onPress={() => this.props.navigator.push({id: "task"})} />
                    }
                    renderSeparator={(sectionId, rowId) =>
                        <View key={rowId} style={styles.separator} />
                    }
                />
            </View>
        );
    }

} // END CLASS

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
