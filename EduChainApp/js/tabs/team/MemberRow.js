/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {
     Text,
     View,
     TouchableOpacity,
     StyleSheet
} from 'react-native';

type Props = {
    member: {
        name: string;
        username: string;
        score: string;
    }
}

export default class MemberRow extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    render() {
        const {name, username, score} = this.props.member;

        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.username}>(@{username})</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.score}>Score: {score}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#dedede'
    },
    leftColumn: {
        flex: 7,
        backgroundColor: '#ededed',
        justifyContent: 'center',
        //alignItems: 'center'
    },
    rightColumn: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
