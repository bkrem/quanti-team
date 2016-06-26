/**
 * Created by BK on 25/06/16.
 */

 'use strict';

 import React, { Component } from 'react'
 import {
     View,
     StyleSheet,
     TouchableHighlight,
     Text,
 } from 'react-native'
 import GlobalStyles from '../common/GlobalStyles'
 import Button from 'react-native-button'
 import t from 'tcomb-form-native'

export default class CommentForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={Comment}
                    options={options}
                />
                <Button
                    containerStyle={GlobalStyles.buttonContainer}
                    style={styles.button}
                >
                    Submit
                </Button>
            </View>
        );
    }
}

const Form = t.form.Form;
const Comment = t.struct({ // Yayyy Golang syntax in JSX + ANOTHER static type schema -__-
    comment: t.String
});

const options = {
    fields: {
        comment: {
            placeholder: 'Add comment...'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    button: {
    }
})
