/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {
    View,
} from 'react-native';
import {connect} from 'react-redux';
import t from 'tcomb-form-native';
import Button from 'react-native-button';
import Colors from '../common/Colors';
import GlobalStyles from '../common/GlobalStyles';
import {signup} from '../actions/user';
import type {User} from '../reducers/user';

var cloneDeep = require('lodash').cloneDeep;

type Props = {
    signup: (form: User) => void;
}

class SignupFormView extends React.Component {
    props: Props;

    constructor(props) {
        super(props);
    }

    onPress() {
        let formVals = this.refs.form.getValue();
        if (formVals) {
            console.log('Submitted form:\n', formVals);
            console.log('Passwords match?: ', formVals.password === formVals.confirmPassword);
            //delete formVals.confirmPassword;
            //console.log(formVals);
            this.props.signup({
                id: String(12),
                name: "Ben Kremer",
                username: "bkrem_",
                score: String(0),
                email: "ben.kremer@hotmail.co.uk",
                teamId: String(1337),
                passwHash: '6asdgasda7d8a8sd8a9g7asd'
            });
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
    email: t.maybe(t.String),
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
    return {}; // no state to map for now
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (form) => dispatch(signup(form))
    };
};

const SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupFormView);
export default SignupForm;
