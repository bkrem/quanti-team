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
import {connect} from 'react-redux';
import Header from '../../common/Header';
import GlobalStyles from '../../common/GlobalStyles';
import Loader from '../../common/Loader';
import TaskListRow from './TaskListRow';

import type {Task} from '../../reducers/tasks';
import {loadTasks} from '../../actions/tasks';

type Rows = Array<TaskListRow>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

type TaskData = Rows | RowsAndSections;

type State = {
    dataSource: TaskData,
    loaded: boolean
}

export default class TaskList extends React.Component {
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
        };
    }

    componentDidMount() {
        console.info("TaskList: this.props.tasks: ", this.props.tasks);

        let {dataBlob, sectionIds} = this.renderListViewData(this.props.tasks);

        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds),
            loaded: true
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tasks !== nextProps.tasks) {
            console.log("componentWillReceiveProps", nextProps);
            let {dataBlob, sectionIds} = this.renderListViewData(nextProps.tasks);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds)
            });
        }
    }

    renderListViewData(tasks: Array<Task>) {
        let dataBlob = {};
        const sectionIds = ["To Do"];

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
            <TaskListRow
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
            return (<Loader title='Tasks' />);

        return (
            <View style={styles.container}>
                <Header
                    title="Tasks"
                    rightItem={{
                        title: "Add Task",
                        layout: "icon",
                        icon: "ios-add",
                        onPress: this.props.addTask.bind(this, {
                            id: "rnId1",
                            title: `Task rnId1`,
                            desc: `desc for task rnId1`,
                            reward: '200',
                            complete: '3/5',
                            status: 'Completed',
                        })
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
