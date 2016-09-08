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
         if (!this.props.address) {
             console.info('TeamView: no team address present, rendering static "Create Team" info');
             return (
                 <View>
                     <Header title="Team"
                         rightItem={{
                             title: "Create Team",
                             layout: "title",
                             icon: "ios-add",
                             onPress: () => this.props.navigator.push({id: "createTeam"})
                         }}
                     />

                    <View style={[GlobalStyles.contentWrapper, styles.infoContainer]}>
                        <Text style={GlobalStyles.sectionHeader}>
                            You're currently not a member of a team
                        </Text>
                        <Text>
                            Create your own team by tapping "Create Team", or by
                            asking another QuantiTeam user to add you to their team.
                        </Text>
                    </View>

                 </View>
             );
         }

         // if user is in a team -> show the regular TeamView
         return (
             <View>
                 <Header title="Team"
                     rightItem={{
                         title: "Add Member",
                         layout: "title",
                         icon: "ios-add",
                         onPress: () => this.props.navigator.push({id: "addMember"})
                     }}
                 />

                <View style={GlobalStyles.contentWrapper}>
                     <View style={styles.container}>
                         <Image
                             style={styles.thumb}
                             source={require("../../img/team-default.png")}
                         />
                     <View style={styles.infoContainer}>
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

     listMembers(members: Array<string>) {
         return members.map(member => {
             return (
                 // TODO turn this into a full component
                 <Text style={styles.member} key={member}>
                     {member}
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
     },
     infoContainer: {
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         paddingTop: 20,
         marginBottom: 10,
     }
 });


 // ##############
 // REDUX BINDINGS
 // ##############
 const mapStateToProps = (state) => {
     return {
         address: state.team.address,
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
