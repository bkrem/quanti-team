/**
 *
 * @flow
 */

 'use strict';

 import React from 'react';
 import {
     View,
     StyleSheet,
     Alert,
 } from 'react-native';
 import {connect} from 'react-redux';
 import t from 'tcomb-form-native';
 import Button from 'react-native-button';
 import Header from '../../common/Header';
 import GlobalStyles from '../../common/GlobalStyles';
 import {createTeam} from '../../actions/team';

 const alerts = {
     createSuccess: {
         title: "Success",
         text: "Team created."
     },
     createFail: {
         title: "Failed",
         text: "Sorry, it seems like there was an issue with creating your team. Please try again with another name."
     }
 };

 class CreateTeamView extends React.Component {
     constructor(props) {
         super(props);
     }

     onPress() {
         const partialForm = this.refs.form.getValue();
         // Validate all mandatory inputs have been filled
         if (!partialForm) {
             console.info("Form returned null, mandatory fields missing.");
             return null;
         }

         console.log("Submitted a team form: ", partialForm);
         const teamForm = {
             ...partialForm,
             founderUsername: this.props.founderUsername,
             founderAddress: this.props.founderAddress,
             createdAt: Date.now()
         };

         this.props.createTeam(teamForm)
            .then(success => {
                // if the new team's address was returned we've succeeded
                success
                ? Alert.alert(alerts.createSuccess.title, alerts.createSuccess.text)
                : Alert.alert(alerts.createFail.title, alerts.createFail.text);
            });
     }

     render() {
         return (
            <View>
                <Header
                    title="Create Team"
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
                         type={TeamForm}
                         options={options}
                     />
                     <Button
                         containerStyle={GlobalStyles.buttonContainer}
                         style={styles.button}
                         onPress={this.onPress.bind(this)}
                     >
                         Create Team
                     </Button>
                 </View>

            </View>
         );
     }

 }

 const Form = t.form.Form;
 const TeamForm = t.struct({
     name: t.String
 });
 const options = {
     fields: {
         name: {
             placeholder: 'Add a team name...'
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
         founderUsername: state.user.details.username,
         founderAddress: state.user.details.address
     };
 };

 const mapDispatchToProps = (dispatch) => {
     return {
         createTeam: (form: Object) => dispatch(createTeam(form))
     };
 };

 const CreateTeam = connect(mapStateToProps, mapDispatchToProps)(CreateTeamView);
 export default CreateTeam;
