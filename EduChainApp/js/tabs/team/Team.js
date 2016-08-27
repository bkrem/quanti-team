/**
 * Created by BK on 23/06/16.
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
 import Header from '../../common/Header';
 import GlobalStyles from '../../common/GlobalStyles';
 import type {User} from '../../reducers/user';

 class TeamView extends React.Component {
     constructor(props) {
         super(props);
     }

     render() {
         return(
             <View>
                 <Header title="Team"
                     rightItem={{
                         title: "Add Member",
                         layout: "title",
                         icon: "ios-add",
                         onPress: () => this.props.navigator.push({id: "addMember"}) // TODO popup dialog to add member
                     }}
                 />

                <View style={GlobalStyles.contentWrapper}>
                     <View style={styles.container}>
                         <Image
                             style={styles.thumb}
                             source={require("../../img/team-default.png")}
                         />
                         <View style={styles.textContainer}>
                             <Text style={styles.teamname}>
                                 Name: {this.props.name}
                             </Text>
                             <Text style={styles.score}>
                                 Score: {this.props.score}
                             </Text>
                         </View>
                     </View>

                     <Text style={[GlobalStyles.sectionHeader, styles.membersTitle]}>Members</Text>
                     <View>
                         {this.listMembers(this.props.members)}
                     </View>
                 </View>

             </View>
         );
     }

     listMembers(members: Array<User>) {
         return members.map(member => {
             return (
                 <Text style={styles.member} key={member.username}>
                     {member.name}
                 </Text>
             );
         });
     }

 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center',
         paddingTop: 20,
         marginBottom: 10,
         //backgroundColor: '#bbb',
     },
     textContainer: {
         flex: 2,
         flexDirection: 'column',
         alignItems: 'center',
     },
     thumb: {
         height: 90,
         width: 90,
         borderRadius: 45,
     },
     name: {
         fontSize: 20,
     },
     username: {
         color: '#bbb'
     }
 });


 // ##############
 // REDUX BINDINGS
 // ##############
 const mapStateToProps = (state) => {
     return {
         name: state.team.name,
         score: state.team.score,
         members: state.team.members
     };
 };

 const mapDispatchToProps = (dispatch) => {
     return {};
 };

 const Team = connect(mapStateToProps, mapDispatchToProps)(TeamView);

 export default Team;
