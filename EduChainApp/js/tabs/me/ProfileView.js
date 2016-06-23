/**
 * Created by BK on 23/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react';
 import {
     View,
 } from 'react-native'
 import HeaderIOS from '../../common/Header'

 export default class ProfileView extends Component {
     render() {
         return (
             <View>
                 <HeaderIOS
                     title="Me"
                     rightItem={{
                         title: "Settings",
                         layout: "icon",
                         icon: "ios-settings"
                     }} />
             </View>
         );
     }
 }
