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
     Navigator,
 } from 'react-native';
 import {connect} from 'react-redux';
 import GlobalStyles from '../../common/GlobalStyles';
 import Header from '../../common/Header';
 import ProfileSummary from './ProfileSummary';
 import type {User} from '../../reducers/user';
 import {getProfile} from '../../actions/user';

 type Props = {
     username: string;
     details: User;
     getProfile: (username: string) => void;
     navigator: Navigator;
 }

 class ProfileView extends React.Component {
     props: Props;

     render() {
         return (
             <View>
                 <Header
                     title="Me"
                     rightItem={{
                         title: "Settings",
                         layout: "icon",
                         icon: "ios-settings",
                         onPress: () => this.props.navigator.push({id: "settings"})
                     }}
                 />

             <View style={GlobalStyles.contentWrapper}>
                    <ProfileSummary details={this.props.details} />

                    <View ref="bioContainer" style={styles.bioContainer}>
                        <Text ref="bioTitle" style={[GlobalStyles.sectionHeader, styles.bioTitle]}>Bio</Text>
                        <Text ref="bio" style={styles.bioContent}>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       </Text>
                   </View>

                </View>
             </View>
         );
     }
 }

 const styles = StyleSheet.create({

 });

 // ##############
 // REDUX BINDINGS
 // ##############
 const mapStateToProps = (state) => {
     return {
         details: state.user.details
     };
 };

 const mapDispatchToProps = (dispatch) => {
     return {
         getProfile: (username: string) => dispatch(getProfile(username))
     };
 };

 const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);
 export default Profile;
