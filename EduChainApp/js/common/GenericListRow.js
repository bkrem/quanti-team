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
    ListView,
    StyleSheet,
} from 'react-native';

type Props = {
    rowData: Object,
    style?: Object,
}

export default class GenericListRow extends React.Component {
    props: Props;

    render() {
        return (
            <View style={[styles.rowContainer, this.props.style.rowContainer]}>
                <Text style={[styles.rowHeader, this.props.style.rowHeader]}>
                    {this.props.rowData.title}
                </Text>
                <Text style={[styles.rowSubtitle, this.props.style.rowSubtitle]}>
                    {this.props.rowData.subtitle}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        padding: 8,
    },
    rowHeader: {
        fontSize: 18,
    },
    rowSubtitle: {
        color: 'gray'
    }
})
