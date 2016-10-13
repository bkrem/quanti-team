/**
 * Created by BK on 24/06/16.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Navigator,
} from 'react-native';
import {connect} from 'react-redux'
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../common/Header';
import Button from 'react-native-button';
import type {Task} from '../../reducers/tasks';
import {markTaskCompleted} from '../../actions/tasks';

type Props = {
    task: Task,
    markTaskCompleted: (taskToken: string) => void;
    navigator: Navigator,
}

class TaskDetailsView extends React.Component {
    props: Props;

    onComplete() {
        this.props.markTaskCompleted(this.props.task.token);
    }

    render() {
        const {title, status, desc, reward, token} = this.props.task;

        return (
            <View>
                <Header
                    title="Task"
                    leftItem={{
                        title: "Back",
                        layout: "icon",
                        icon: "ios-arrow-back",
                        onPress: () => this.props.navigator.pop()
                    }}
                />
            <View style={[GlobalStyles.contentWrapper, styles.container]}>
                    <View style={styles.taskSummary}>
                        <Text style={[GlobalStyles.sectionHeader, styles.taskTitle]}>{title}</Text>
                        <Text style={styles.status}>Status: {status}</Text>
                        <Text style={styles.reward}>Reward: {reward}</Text>
                        <Text style={styles.token}>Token: {token}</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={GlobalStyles.sectionHeader}>Description</Text>
                        <Text style={styles.descBody}>
                            {desc}
                        </Text>
                    </View>
                    <Button
                        containerStyle={[GlobalStyles.buttonContainer, styles.buttonContainer]}
                        style={styles.button}
                        onPress={this.onComplete.bind(this)}
                    >
                        Mark Task Complete
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    taskSummary: {
    },
    buttonContainer: {
        marginTop: 300,
        backgroundColor: '#0BD318'
    },
    button: {
        color: '#fff'
    },
    taskTitle: {
        marginBottom: 5,
        textDecorationLine: 'underline',
    },
});


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        markTaskCompleted: (taskToken: string) => dispatch(markTaskCompleted(taskToken))
    };
};

const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(TaskDetailsView);
export default TaskDetails;
