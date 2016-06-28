/**
 * Created by BK on 28/06/16.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

type Props = {
    title: string
}

export default class Loader extends React.Component {
    props: Props;

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading {this.props.title}...
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
