/**
 * Created by BK on 20/06/16.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import Header from '../../common/Header';
import GlobalStyles from '../../common/GlobalStyles';
import Loader from '../../common/Loader';
import TasksListRow from './TasksListRow';

type Rows = Array<TasksListRow>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

type TaskData = Rows | RowsAndSections;

type State = {
    dataSource: TaskData,
    loaded: boolean
}

export default class TaskView extends React.Component {
    state: State;

    constructor(props: Object) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
                getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            loaded: false
        }
    }

    componentDidMount() {
        let testRows = () => {
            let arr = [];
            for (let i = 0; i < 10; i++) arr.push({
                id: i,
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

    // TODO GH #6; add searchBar header
    render() {
        if (!this.state.loaded)
            return <Loader title='Tasks' />

        return (
            <View style={styles.container}>
                <Header
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
                        <TasksListRow row={rowData} onPress={() => this.props.navigator.push({id: "task", task: rowData})} />
                    }
                    renderSeparator={(sectionId, rowId) =>
                        <View key={rowId} style={GlobalStyles.separator} />
                    }
                />
            </View>
        );
    }

} // END CLASS

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
