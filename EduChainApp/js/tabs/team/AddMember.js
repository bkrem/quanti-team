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
 import {addTeamMember} from '../../actions/team';

 const alerts = {
     addSuccess: {
         title: "Success",
         text: "Member added."
     },
     addFail: {
         title: "Failed",
         text: "Sorry, it seems like there was an issue with adding this user. Is the username spelt correctly?"
     }
 };

 class AddMemberView extends React.Component {
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

         const memberForm = {
             username: partialForm.username.toLowerCase(),
             teamname: this.props.teamname,
             teamAddress: this.props.teamAddress
         };
         this.props.addTeamMember(memberForm)
            .then(linkSuccess => {
                // if the linkSuccess was returned -> added successfully
                linkSuccess
                ? Alert.alert(alerts.addSuccess.title, alerts.addSuccess.text)
                : Alert.alert(alerts.addFail.title, alerts.addFail.text);
            });
     }

     render() {
         return (
             <View>
                 <Header
                     title="Add Member"
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
                          type={MemberForm}
                          options={options}
                      />
                      <Button
                          containerStyle={GlobalStyles.buttonContainer}
                          style={styles.button}
                          onPress={this.onPress.bind(this)}
                      >
                          Add Member
                      </Button>
                  </View>
             </View>
         );
     }
 }

 const Form = t.form.Form;
 const MemberForm = t.struct({
     username: t.String
 });
 const options = {
     fields: {
         username: {
             placeholder: 'Enter another user\'s username...'
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
         teamname: state.team.name,
         teamAddress: state.team.address
     };
 };

 const mapDispatchToProps = (dispatch) => {
     return {
         addTeamMember: (memberForm) => dispatch(addTeamMember(memberForm))
     };
 };

 const AddMember = connect(mapStateToProps, mapDispatchToProps)(AddMemberView);

 export default AddMember;
