/**
 *
 * @flow
 */

'use strict';

import {connect} from 'react-redux';
import AddTaskView from './AddTaskView';
import {addTask} from '../../actions/tasks';

const mapStateToProps = (state) => {
    return {}; // no state to map for now
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (partialTask) => dispatch(addTask(partialTask))
    };
};

const AddTaskContainer = connect(mapStateToProps, mapDispatchToProps)(AddTaskView);

export default AddTaskContainer;
