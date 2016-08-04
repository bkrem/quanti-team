/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {Navigator} from 'react-native';
import WelcomeView from '../common/WelcomeView';
import SignupForm from './SignupForm';

type Props = {
    navigator: Navigator;
}

export default class SignupView extends React.Component {
    constructor(props: Props) {
        super(props);
    }

    routeToLogin() {
        this.props.navigator.push({id: 'login'});
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
