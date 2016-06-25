/**
 * Created by BK on 21/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react';
 import {
     Text,
     View,
     Image,
     ListView,
     TouchableHighlight,
     StyleSheet
 } from 'react-native';
 import GlobalStyles from '../../common/GlobalStyles'

type Props = {
    row: {
        thumbURI: string,
        title: string,
        desc: string,
        timestamp: string
    }
}

export default class NotificationsRow extends Component {
    props: Props;

    render() {
        return (
            <View>
                <TouchableHighlight>
                    <View style={styles.container}>
                        <View style={styles.thumbContainer}>
                            <Image
                                style={[GlobalStyles.thumbnail, styles.thumbnail]}
                                source={{uri: this.props.row.thumbURI}}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{this.props.row.title}</Text>
                            <Text style={styles.desc}>{this.props.row.desc}</Text>
                            <Text style={styles.reward}>{this.props.row.timestamp}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#dedede'
    },
    thumbContainer: {
        flex: 1,
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
    },
    desc: {

    },
    timestamp: {

    },
    thumbnail: {

    },
})
