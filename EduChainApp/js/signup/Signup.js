/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {
    Navigator,
    Alert,
} from 'react-native';
import WelcomeView from '../common/WelcomeView';
import SignupForm from './SignupForm';

type Props = {
    navigator: Navigator;
    isLoggedIn: boolean;
}

const alerts = {
    signupSuccess: {
        title: "Signup successful",
        text: "You're all signed up, welcome!"
    }
};

class SignupView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    routeToLogin() {
        this.props.navigator.push({id: 'login'});
    }

    componentWillReceiveProps(nextProps) {
        const {signupSuccess} = alerts;

        if (nextProps.isLoggedIn) {
            Alert.alert(signupSuccess.title, signupSuccess.text);
            nextProps.navigator.push({id: 'home'});
        }
    }

    render() {
        return (
            <WelcomeView
                alternateText={"Already got an account? Login here."}
                navigateToAlternate={this.routeToLogin.bind(this)}
            >
                <SignupForm />
            </WelcomeView>
        );
    }
}


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupView);
export default Signup;
