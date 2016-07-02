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
import Header from '../../common/Header'
import CommentBox from '../../comments/CommentBox'

export type Task = {
    id: number,
    title: string,
    desc: string,
    reward: string,
    complete: string,
    status: string,
}

type Props = {
    task: Task,
    navigator: Navigator,
}

export default class TaskView extends Component {
    props: Props;

    render() {
        const {id, title, status, desc, reward, complete} = this.props.task;

        var comments = [
            {id: 1, author: "Pete Hunt", thumbURI: "https://randomuser.me/api/portraits/thumb/men/1.jpg", text: "This is one comment"},
            {id: 2, author: "Jordan Walke", thumbURI: "https://randomuser.me/api/portraits/thumb/men/2.jpg", text: "This is *another* comment"}
        ];
        /* TODO pass taskId to CommentBox and fetch comments */
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
                <View style={GlobalStyles.contentWrapper}>
                    <View style={styles.taskSummary}>
                        <Text style={[GlobalStyles.sectionHeader, styles.taskTitle]}>{title}</Text>
                        <Text style={styles.status}>Status: {status}</Text>
                        <Text style={styles.reward}>Reward: {reward}</Text>
                        <Text style={styles.complete}>Completed: {complete}</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={GlobalStyles.sectionHeader}>Description</Text>
                        <Text style={styles.descBody}>
                            {desc}
                        </Text>
                    </View>
                    <CommentBox comments={comments} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    taskSummary: {
    },
    taskTitle: {
        marginBottom: 5,
        textDecorationLine: 'underline',
    },
})
