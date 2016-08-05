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
import Header from '../../common/Header';
import GlobalStyles from '../../common/GlobalStyles';
import Loader from '../../common/Loader';
import TaskListRow from './TaskListRow';
import RefreshablePureListView from '../../common/RefreshablePureListView';

import type {Task} from '../../reducers/tasks';

type Rows = Array<TaskListRow>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

type TaskData = Rows | RowsAndSections;

type Props = {
    tasks: Array<Task>;
    refreshing: boolean;
    onRefresh: () => Promise;
    navigator: Navigator;
}

export default class TaskListView extends React.Component {
    props: Props;

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
                <RefreshablePureListView
                    data={(this: any).renderWithSections(this.props.tasks)}
                    renderEmptyList={this.renderEmptyList}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections={true}
                />
            </View>
        );
    }

    // TODO Implement the loading fragment properly instead of abusing `renderEmptyList`
    renderEmptyList() {
        return (
            <Loader title={"Tasks"} />
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
