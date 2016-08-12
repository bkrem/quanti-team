/**
 *
 * @flow
 */

'use strict';

import {connect} from 'react-redux';
import AddTaskView from './AddTaskView';
import {addTask} from '../../actions/tasks';

const mapStateToProps = (state) => {
    return {
        username: state.user.details.username
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (partialTask, username) => dispatch(addTask(partialTask, username))
    };
};

const AddTaskContainer = connect(mapStateToProps, mapDispatchToProps)(AddTaskView);

export default AddTaskContainer;
