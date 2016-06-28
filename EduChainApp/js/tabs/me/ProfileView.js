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
 } from 'react-native';
 import GlobalStyles from '../../common/GlobalStyles';
 import Header from '../../common/Header';
 import ProfileSummary from './ProfileSummary';

// TODO How to avoid declaring types twice, once here in top-lvl, once at component lvl?
 export default class ProfileView extends React.Component {
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
                    <ProfileSummary
                        username="@bkrem"
                        name="Ben Kremer"
                        teamname="Team λαμδα"
                    />

                    <View ref="bioContainer" style={styles.bioContainer}>
                        <Text ref="bioTitle" style={[GlobalStyles.sectionHeader, styles.bioTitle]}>Bio</Text>
                        <Text ref="bio" style={styles.bioContent}>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                       </Text>
                   </View>

                   <View ref="statsContainer" style={styles.statsContainer}>
                       <Text ref="statsTitle" style={[GlobalStyles.sectionHeader, styles.statsTitle]}>Statistics</Text>
                       {/* TODO GH issue #10 */}
                   </View>
                </View>
             </View>
         );
     }
 }

 const styles = StyleSheet.create({

 })
