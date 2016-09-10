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
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../common/Header';
import Button from 'react-native-button';
import type {Task} from '../../reducers/tasks';

type Props = {
    task: Task,
    navigator: Navigator,
}

export default class TaskView extends React.Component {
    props: Props;

    render() {
        const {title, status, desc, reward, complete, token} = this.props.task;

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
                        <Text style={styles.complete}>Completed: {complete}</Text>
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
                        onPress={() => {}}
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
