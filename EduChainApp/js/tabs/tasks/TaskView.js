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
import CommentBox from '../../comments/CommentBox'

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
        var comments = [
            {id: 1, author: "Pete Hunt", thumbURI: "https://randomuser.me/api/portraits/thumb/men/1.jpg", text: "This is one comment"},
            {id: 2, author: "Jordan Walke", thumbURI: "https://randomuser.me/api/portraits/thumb/men/2.jpg", text: "This is *another* comment"}
        ];

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
                        <Text style={styles.descBody}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
