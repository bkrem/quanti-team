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
 import {getProfile, logout} from '../../actions/user';

 type Props = {
     username: string;
     details: User;
     getProfile: (username: string) => void;
     logout: () => void;
     navigator: Navigator;
 }

 class ProfileView extends React.Component {
     props: Props;

     onLogout() {
         this.props.logout();
         this.props.navigator.push({id: "login"});
     }

     render() {
         return (
             <View>
                 <Header
                     title="Me"
                     rightItem={{
                         title: "Log out",
                         layout: "title",
                         onPress: () => this.onLogout()
                     }}
                 />

             <View style={GlobalStyles.contentWrapper}>
                    <ProfileSummary details={this.props.details} />

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
         getProfile: (username: string) => dispatch(getProfile(username)),
         logout: () => dispatch(logout())
     };
 };

 const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);
 export default Profile;
