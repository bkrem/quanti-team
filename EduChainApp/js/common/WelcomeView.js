/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {
     View,
     StyleSheet,
     Text,
     Platform,
     TouchableOpacity,
     Navigator
} from 'react-native';
import GlobalStyles from '../common/GlobalStyles';
import Colors from '../common/Colors';

type Props = {
    children: any;
    navigateToAlternate: () => void;
    alternateText: string;
}

export default class WelcomeView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    render () {
        return (
            <View style={{flex: 1, backgroundColor: Colors.darkBackground}}>
                <View style={GlobalStyles.contentWrapper}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>QuantiTeam</Text>
                    </View>

                    {this.props.children}

                    <TouchableOpacity
                        style={{marginTop: 15}}
                        onPress={this.props.navigateToAlternate}
                    >
                        <Text style={styles.alternateText}>
                            {this.props.alternateText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: STATUS_BAR_HEIGHT,
    },
    titleText: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        fontSize: 36,
        color: Colors.softWhite,
    },
    alternateText: {
        color: Colors.softWhite
    }
});
