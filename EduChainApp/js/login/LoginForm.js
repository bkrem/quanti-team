/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {
    View,
    Alert,
} from 'react-native';
import {connect} from 'react-redux';
import t from 'tcomb-form-native';
import Button from 'react-native-button';
import Colors from '../common/Colors';
import GlobalStyles from '../common/GlobalStyles';
import type {Login} from '../reducers/user';
import {login} from '../actions/user';
var cloneDeep = require('lodash').cloneDeep;



const alerts = {
    loginFailed: {
        title: "Login failed",
        text: "Sorry, the details you entered were incorrect. Please try again."
    }
};

class LoginFormView extends React.Component {

    processInputs(formStruct: Login): Login {
        const form = {
            ...formStruct,
            username: formStruct.username.toLowerCase() // prep for indexing
        };
        return form;
    }

    onPress() {
        const formStruct = this.refs.form.getValue();
        if (formStruct) {
            console.log("Submitted login form:\n", formStruct);
            const form = this.processInputs(formStruct);
            this.props.login(form)
                .then(isValid => {
                    // TODO forward view
                    isValid ? null
                            : Alert.alert(alerts.loginFailed.title, alerts.loginFailed.text);
                });
        }
    }

    render() {
        return (
            <View>
                <Form
                    ref="form"
                    type={LoginStruct}
                    options={options}
                />
            <Button
                containerStyle={[GlobalStyles.buttonContainer, {backgroundColor: Colors.iosBlue}]}
                style={{color: Colors.softWhite}}
                onPress={this.onPress.bind(this)}
            >
                Login
            </Button>
            </View>
        );
    }

}

const Form = t.form.Form;
const LoginStruct = t.struct({
    username: t.String,
    password: t.String
});
let formStyles = cloneDeep(Form.stylesheet);
formStyles.controlLabel.normal.color = Colors.softWhite;
formStyles.textbox.normal.color = Colors.softWhite;
formStyles.textbox.error.color = Colors.softWhite;

const options = {
    stylesheet: formStyles,
    fields: {
        password: {
            secureTextEntry: true
        }
    }
};


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (form) => dispatch(login(form))
    };
};

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormView);
export default LoginForm;
