/**
 * TODO add partial FB src
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    Text,
    View,
    Navigator,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../common/Header';
import GlobalStyles from '../../common/GlobalStyles';
import TaskListRow from './TaskListRow';
import PureListView from '../../lib/facebook/PureListView';

import type {Task} from '../../reducers/tasks';
import {loadTasks} from '../../actions/tasks';

type Rows = Array<TaskListRow>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

type TaskData = Rows | RowsAndSections;

type Props = {
    tasks: Array<Task>,
    navigator: Navigator
}

type State = {
    dataSource: TaskData,
    loaded: boolean
}

export default class TaskListView extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);

        (this: any).renderEmptyList = this.renderEmptyList.bind(this);
        (this: any).renderRow = this.renderRow.bind(this);
        (this: any).renderSeparator = this.renderSeparator.bind(this);
        (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
        (this: any).renderWithSections = this.renderWithSections.bind(this);
    }

    // TODO GH #6; add searchBar header
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title="Tasks"
                    rightItem={{
                        title: "Add Task",
                        layout: "title",
                        icon: "ios-add",
                        onPress: () => this.props.navigator.push({id: "addTask"})
                    }}
                />
                <PureListView
                    data={(this: any).renderWithSections(this.props.tasks)}
                    renderEmptyList={this.renderEmptyList}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections={true}
                />
            </View>
        );
    }

    renderEmptyList() {
        return (
            <View style={styles.emptyListContainer}>
                <Text style={styles.text}>
                    Looks like there aren't any tasks...
                </Text>
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

    renderWithSections(tasks: Array<Task>) {
        let dataBlob = {};

        tasks.map((task: Task) => {
            let section = task.status;
            // add section key to `dataBlob` if not present yet
            if (!dataBlob[section]) dataBlob[section] = [];
            // add this task to said section
            dataBlob[section].push(task);
        });

        return dataBlob;
    }

    renderSectionHeader(data: Object, sectionId: string) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{sectionId}</Text>
            </View>
        );
    }

    renderSeparator(sectionId: string, rowId: string) {
        return (
            <View key={sectionId+rowId} style={GlobalStyles.separator} />
        );
    }

} // END CLASS

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyListContainer: {
        flex: 1,
        alignItems: 'center'
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
