/**
 *
 * @flow
 */
'use strict';

import React from 'react';
import {
    View,
} from 'react-native';
import t from 'tcomb-form-native';
import Button from 'react-native-button';
import Colors from '../common/Colors';
import GlobalStyles from '../common/GlobalStyles';
var cloneDeep = require('lodash').cloneDeep;

export default class LoginForm extends React.Component {
    onPress() {
        const formVals = this.refs.form.getValue();
        if (formVals) console.log(formVals);
    }

    render() {
        return (
            <View>
                <Form
                    ref="form"
                    type={Login}
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
const Login = t.struct({
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
