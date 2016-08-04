/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {Navigator} from 'react-native';
import WelcomeView from '../common/WelcomeView';
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
            <WelcomeView
                alternateText={"Not got an account? Sign up here."}
                navigateToAlternate={this.routeToSignup.bind(this)}
            >
                <LoginForm />
            </WelcomeView>
        );
    }

}
