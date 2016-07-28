/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import TaskListView from './TaskListView';
import type {Task} from '../../reducers/tasks';
import ENV from '../../common/Environment';

export default class TaskListContainer extends React.Component {
    state: {
        tasks: Array<Task>
    };

    constructor() {
        super();
        this.state = {
            tasks: []
        };
    }

    setTasks(tasks: Array<Task>) {
        return this.setState({tasks: tasks});
    }

    async getAllTasks(): Promise {
        try {
            let response = await fetch(ENV.__API_BRIDGE+'/tasks');
            let responseJSON = await response.json();
            return responseJSON.data;
        } catch (err) {
            console.error("getAllTasks() -> Error: ", err);
        }
    }


    async onRefresh(): Promise {
        console.log("Refreshing TaskList...");
        this.getAllTasks().then(tasks => this.setTasks(tasks));
    }

    componentDidMount() {
        this.getAllTasks().then(tasks => this.setTasks(tasks));
    }

    render() {
        return (
            <TaskListView
                tasks={this.state.tasks}
                navigator={this.props.navigator}
                onRefresh={this.onRefresh.bind(this)}
            />
        );
    }
}
