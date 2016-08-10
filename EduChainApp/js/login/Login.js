/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Navigator} from 'react-native';
import WelcomeView from '../common/WelcomeView';
import LoginForm from './LoginForm';

type Props = {
    navigator: Navigator
}

class LoginView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn)
            nextProps.navigator.push({id: 'home'})
    }

    render() {
        return (
            <WelcomeView
                alternateText={"Not got an account? Sign up here."}
                navigateToAlternate={this.routeToSignup.bind(this)}
            >
                <LoginForm />
            </WelcomeView>
        );
    }

    routeToSignup() {
        return this.props.navigator.push({id: 'signup'});
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

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginView);
export default Login;
