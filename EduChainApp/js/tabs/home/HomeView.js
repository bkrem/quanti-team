/**
 * Created by BK on 19/06/16.
 *
 * @flow
 */

'use strict';

import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import Header from '../../common/Header'

export default class HomeView extends Component {
    render() {
        return (
            <View>
                <Header title="Home" />
                <Text>
                    Test Text
                </Text>
            </View>
        );
    }
}
