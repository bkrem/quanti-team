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

    async getAllTasks(): Promise {
        try {
            let response = await fetch(ENV.__API_BRIDGE+'/tasks');
            let responseJSON = await response.json();
            return responseJSON.data;
        } catch (err) {
            console.error("getAllTasks() -> Error: ", err);
        }
    }

    componentWillMount() {
        let testRows = () => {
            let arr = [];
            let flip = false;
            for (let i = 0; i < 20; i++) {
                arr.push({
                    id: `${i}`,
                    title: `Task ${i}`,
                    desc: `desc for task ${i}`,
                    reward: '200',
                    complete: '3/5',
                    status: flip ? 'To Do' : 'Completed',
                    address: "asdasdadasdas"
                });
                flip = !flip;
            }
            return arr;
        };
        let tr: Array<Task> = testRows();
        this.setState({tasks: tr});
    }

    componentDidMount() {
        this.getAllTasks().then(tasks => {
            this.setState({tasks: tasks});
        });
    }

    render() {
        return (
            <TaskListView navigator={this.props.navigator} tasks={this.state.tasks} />
        );
    }
}
