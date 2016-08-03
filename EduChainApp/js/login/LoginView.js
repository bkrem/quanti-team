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
import LoginForm from './LoginForm';

type Props = {
    navigator: Navigator
}

export default class LoginView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    routeToSignup() {
        return this.props.navigator.push({id: 'signup'});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.darkBackground}}>
                <View style={GlobalStyles.contentWrapper}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>QuantiTeam</Text>
                    </View>

                    <LoginForm />

                    <TouchableOpacity
                        style={{marginTop: 15}}
                        onPress={this.routeToSignup.bind(this)}
                    >
                        <Text style={styles.signupText}>
                            Not got an account? Sign up here.
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
    signupText: {
        color: Colors.softWhite
    }
});
