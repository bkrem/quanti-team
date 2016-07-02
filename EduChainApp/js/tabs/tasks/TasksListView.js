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
import type {Task} from './TaskView'

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
            let flip = false;
            for (let i = 0; i < 20; i++) {
                arr.push({
                    id: i,
                    title: `Task ${i}`,
                    desc: `desc for task ${i}`,
                    reward: 'Reward: 200 XP',
                    complete: 'Completed: 3/5',
                    status: flip ? 'To Do' : 'Done'
                });
                flip = !flip;
            }
            return arr;
        }
        let tr = testRows();
        let {dataBlob, sectionIds} = this.renderListViewData(tr);

        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds),
            loaded: true
        })
    }

    renderListViewData(tasks: Array<Task>) {
        let dataBlob = {};
        const sectionIds = ["To Do", "Done"];

        tasks.map((task: Task) => {
            let section = task.status;
            // add section key to `dataBlob` if not present yet
            if (!dataBlob[section]) dataBlob[section] = [];
            // add this task to said section
            dataBlob[section].push(task);
        });

        return {dataBlob, sectionIds};
    }

    renderSectionHeader(data: Object, sectionId: string) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{sectionId}</Text>
            </View>
        );
    }

    renderRow(rowData: Object) {
        return (
            <TasksListRow
                row={rowData}
                onPress={() => this.props.navigator.push({id: "task", task: rowData})}
            />
        );
    }

    renderSeparator(sectionId: string, rowId: string) {
        return (
            <View key={sectionId+rowId} style={GlobalStyles.separator} />
        );
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
                    automaticallyAdjustContentInsets={false}
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                />
            </View>
        );
    }

} // END CLASS

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        backgroundColor: 'gray'
    },
    sectionHeaderText: {
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    },
});
