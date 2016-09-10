/**
 * Created by BK on 21/06/16.
 *
 * @flow
 */

 'use strict';

 import React from 'react';
 import {
     Text,
     View,
     TouchableOpacity,
     StyleSheet
 } from 'react-native';

 import type {Task} from '../../reducers/tasks';

 type Props = {
     onPress: () => void,
     row: Task
 }

 export default class TasksListRow extends React.Component {
     props: Props;

     render() {
         const {title, reward, complete, token} = this.props.row;

         return (
             <TouchableOpacity onPress={this.props.onPress.bind(this)}>
                 <View style={styles.container}>
                     <View style={styles.leftColumn}>
                         <Text style={styles.title}>{title}</Text>
                         <Text style={styles.token}>{token}</Text>
                     </View>
                     <View style={styles.rightColumn}>
                         <Text style={styles.reward}>Reward: {reward}</Text>
                         <Text style={styles.complete}>Completed: {complete}</Text>
                     </View>
                 </View>
             </TouchableOpacity>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         flexDirection: 'row',
         backgroundColor: '#dedede'
     },
     leftColumn: {
         flex: 7,
         backgroundColor: '#ededed',
         justifyContent: 'center',
         alignItems: 'center'
     },
     rightColumn: {
         flex: 3,
         justifyContent: 'center',
         alignItems: 'center'
     },
     title: {
         fontSize: 20,
     },
     token: {

     },
     reward: {

     },
     complete: {

     }
 });
