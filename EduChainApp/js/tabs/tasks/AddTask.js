/**
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
    Navigator
} from 'react-native';
import {connect} from 'react-redux';
import {addTask} from '../../actions/tasks';
import t from 'tcomb-form-native';
import Button from 'react-native-button';
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../common/Header';

type Props = {
    username: string;
    addTask: (partialTask: Object) => Promise;
    navigator: Navigator;
}

class AddTaskView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    onPress() {
        const taskForm = this.refs.form.getValue();
        // Validate all mandatory inputs have been filled
        if (!taskForm) {
            console.info("Form returned null, mandatory fields missing.");
            return null;
        }
        console.log("Submitted a task: ", taskForm);
        // TODO remove temporary hardcoded fill
        let partialTask = {
            ...taskForm,
            complete: "IMPLEMENT ME",
            reward: "200",
            participants: ["Ben", "Liza", "Bombo"],
            creator: "Ben",
            createdAt: Date.now()
        };

        this.props.addTask(partialTask, this.props.username);
    }

    render() {
        return (
            <View>
                <Header
                    title="Add Task"
                    leftItem={{
                        title: "Back",
                        layout: "icon",
                        icon: "ios-arrow-back",
                        onPress: () => this.props.navigator.pop()
                    }}
                 />
                <View style={[GlobalStyles.contentWrapper, styles.container]}>
                     <Form
                         ref="form"
                         type={TaskForm}
                         options={options}
                         value={defaultValues}
                     />
                     <Button
                         containerStyle={GlobalStyles.buttonContainer}
                         style={styles.button}
                         onPress={this.onPress.bind(this)}
                     >
                         Add Task
                     </Button>
                 </View>
            </View>
        );
    }
} // END CLASS

const Form = t.form.Form;
const Status = t.enums({
    "To Do": "To Do",
    "Completed": "Completed"
});
const TaskForm = t.struct({
    title: t.String,
    desc: t.String,
    status: Status
    // participants: t.maybe(t.String) // TODO GH #41
});

const defaultValues = {
    title: '',
    desc: '',
    status: "To Do"
};

const options = {
    fields: {
        title: {
            placeholder: 'Add a title...'
        },
        desc: {
            label: 'Description',
            placeholder: 'Let people know what this task is about'
        },
        status: {
            nullOption: false
        },
        participants: {
            placeholder: 'Add others to this task with "@name"'
        }
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
});


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
    return {
        username: state.user.details.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (partialTask, username) => dispatch(addTask(partialTask, username))
    };
};

const AddTask = connect(mapStateToProps, mapDispatchToProps)(AddTaskView);

export default AddTask;
