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
 import {createTeam} from '../../actions/team';


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

         this.props.createTeam(teamForm);
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
