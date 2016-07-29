/**
 *
 * @flow
 */
'use strict';

import {connect} from 'react-redux';
import TaskListView from './TaskListView';
import {refreshTaskList, fetchTasks} from '../../actions/tasks';

const mapStateToProps = (state) => {
    return {
        refreshing: state.tasks.isFetching,
        tasks: state.tasks.taskList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: () => {
            dispatch(refreshTaskList());
            dispatch(fetchTasks());
        }
    };
};

const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListView);

export default TaskListContainer;
