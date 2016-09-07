/**
 *
 * @flow
 */

 'use strict';

 import React from 'react';
 import {
     View,
     StyleSheet,
     Text,
     Image,
 } from 'react-native';
 import {connect} from 'react-redux';
 import t from 'tcomb-form-native';
 import Button from 'react-native-button';
 import Header from '../../common/Header';
 import GlobalStyles from '../../common/GlobalStyles';


 class CreateTeam extends React.Component {
     constructor(props) {
         super(props);
     }

     onPress() {

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
     name: t.String,
     members: t.maybe(t.String)
 });
 const options = {
     fields: {
         name: {
             placeholder: 'Add a team name...'
         },
         members: {
             placeholder: 'Add others to this task with "@name"'
         }
     }
 };

 const styles = StyleSheet.create({
     container: {
         marginTop: 15,
     },
 });

 export default CreateTeam;
