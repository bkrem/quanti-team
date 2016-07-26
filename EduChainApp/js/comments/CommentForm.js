/**
 * Created by BK on 25/06/16.
 */

'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import GlobalStyles from '../common/GlobalStyles';
import Button from 'react-native-button';
import t from 'tcomb-form-native';

export default class CommentForm extends React.Component {
    onPress() {
        const val = this.refs.form.getValue();
        if (val) console.log(val);
        // TODO GH #13 add action dispatch
    }

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
                    onPress={this.onPress.bind(this)}
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
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    button: {
    }
});
