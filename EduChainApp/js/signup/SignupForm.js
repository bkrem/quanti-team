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
import {signup, isUsernameTaken} from '../actions/user';
import type {User} from '../reducers/user';

var cloneDeep = require('lodash').cloneDeep;

type Props = {
    isUsernameTaken: (username: string) => void;
    signup: (form: User) => void;
}

class SignupFormView extends React.Component {
    props: Props;

    constructor(props) {
        super(props);
    }

    validateInputs(formStruct: Object): boolean {
        let isValid = false;

        if (formStruct.password !== formStruct.confirmPassword) {
            console.log("Submitted passwords don't match!");
            Alert.alert(
                "Passwords don't match",
                "Sorry, the passwords you entered don't match. Please try again."
            );
        } else { // TODO `checkUsername` or verify in signup func
            isValid = true;
        }
        return isValid;
    }

    processInputs(formStruct: Object): User {
        const form = {
            ...formStruct,
            username: formStruct.username.toLowerCase() // prep for indexing
        };

        delete form.confirmPassword;
        return form;
    }

    onPress() {
        const formStruct = this.refs.form.getValue();
        if (formStruct && this.validateInputs(formStruct)) {
            console.log('Submitted form:\n', formStruct);
            const form = this.processInputs(formStruct);

            this.props.isUsernameTaken(form.username)
                .then(result =>
                    this.props.signup(form)
                )
                .catch(rejection =>
                    console.error(rejection)
                );
            //this.props.signup(form);
        }
    }

    render() {
        return (
            <View>
                <Form
                    ref="form"
                    type={Signup}
                    options={options}
                />
                <Button
                    containerStyle={[GlobalStyles.buttonContainer, {backgroundColor: Colors.iosBlue}]}
                    style={{color: Colors.softWhite}}
                    onPress={this.onPress.bind(this)}
                >
                    Sign up
                </Button>
            </View>
        );
    }

}

const Form = t.form.Form;
const Signup = t.struct({
    name: t.String,
    email: t.String,
    username: t.String,
    password: t.String,
    confirmPassword: t.String
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
        },
        confirmPassword: {
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
        isUsernameTaken: (username) => dispatch(isUsernameTaken(username)),
        signup: (form) => dispatch(signup(form))
    };
};

const SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupFormView);
export default SignupForm;
