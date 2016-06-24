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
} from 'react-native'
import HeaderIOS from '../../common/Header'

export default class TaskView extends Component {
    render() {
        return (
            <View>
                <HeaderIOS
                    title="Me"
                    leftItem={{
                        title: "Back",
                        layout: "icon",
                        icon: "ios-arrow-back",
                        onPress: () => this.props.navigator.pop()
                    }}
                    rightItem={{
                        title: "Settings",
                        layout: "icon",
                        icon: "ios-settings"
                    }}
                />
                <Text>Router worked!</Text>
            </View>
        );
    }
}
