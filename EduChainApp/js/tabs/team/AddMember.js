/**
 *
 * @flow
 */
 'use strict';

 import React from 'react';
 import {
     View,
     StyleSheet,
 } from 'react-native';
 import {connect} from 'react-redux';
 import t from 'tcomb-form-native';
 import Button from 'react-native-button';
 import Header from '../../common/Header';
 import GlobalStyles from '../../common/GlobalStyles';

 class AddMemberView extends React.Component {
     constructor(props) {
         super(props);
     }

     onPress() {

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

     };
 };

 const mapDispatchToProps = (dispatch) => {
     return {

     };
 };

 const AddMember = connect(mapStateToProps, mapDispatchToProps)(AddMemberView);

 export default AddMember;
