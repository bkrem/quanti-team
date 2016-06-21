/**
 * Created by BK on 21/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react';
 import {
     Text,
     View,
     StyleSheet
 } from 'react-native';

 export default class TaskRow extends Component {
     render() {
         return (
             <View style={styles.container}>
                 <View style={styles.leftColumn}>
                     <Text style={styles.title}>{this.props.row.title}</Text>
                     <Text style={styles.desc}>{this.props.row.desc}</Text>
                 </View>
                 <View style={styles.rightColumn}>
                     <Text style={styles.reward}>{this.props.row.reward}</Text>
                     <Text style={styles.complete}>{this.props.row.complete}</Text>
                 </View>
             </View>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
       flex: 1,
       flexDirection: 'row',
       marginBottom: 10,
       backgroundColor: '#dedede'
     },
     leftColumn: {
         flex: 1,
         backgroundColor: '#ededed',
         justifyContent: 'center',
         alignItems: 'center'
     },
     rightColumn: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
     },
     title: {
       fontSize: 20,
       //marginBottom: 8,
     },
     desc: {

     },
     reward: {

     },
 })
