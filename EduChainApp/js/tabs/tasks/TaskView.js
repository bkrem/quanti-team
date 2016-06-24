/**
 * Created by BK on 24/06/16.
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Navigator,
} from 'react-native'
import GlobalStyles from '../../common/GlobalStyles'
import HeaderIOS from '../../common/Header'

export type Task = {
    title: string,
    desc: string,
    reward: string,
    complete: string,
}

type Props = {
    task: Task,
    navigator: Navigator,
}

export default class TaskView extends Component {
    props: Props;

    render() {
        //const {title, desc, reward, complete} = this.props.task;

        return (
            <View>
                <HeaderIOS
                    title="Task"
                    leftItem={{
                        title: "Back",
                        layout: "icon",
                        icon: "ios-arrow-back",
                        onPress: () => this.props.navigator.pop()
                    }}
                />
                <View style={GlobalStyles.contentWrapper}>
                    <View style={styles.taskSummary}>
                        <Text style={[GlobalStyles.sectionHeader, styles.taskTitle]}>taskTitle</Text>
                        <Text style={styles.reward}>taskReward</Text>
                        <Text style={styles.complete}>taskCompletion</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={GlobalStyles.sectionHeader}>Description</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    taskSummary: {
    },
    taskTitle: {
    },
})
