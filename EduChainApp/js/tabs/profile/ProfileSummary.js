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
     Image,
     Text,
 } from 'react-native';
 import type {User} from '../../reducers/user';

 type Props = {
     details: User
 }

 export default class ProfileSummary extends React.Component {
     props: Props;

     render() {
         const {name, username, email, teamname} = this.props.details;

         return (
             <View style={styles.container}>
                 <Image
                     style={styles.thumb}
                     source={require("../../img/avatar-default.png")}
                 />
                 <View style={styles.textContainer}>
                     <Text style={styles.name}>
                         {name}
                     </Text>
                     <Text style={styles.username}>
                         @{username}
                     </Text>
                     <Text style={styles.email}>
                         {email}
                     </Text>
                     <Text style={styles.teamname}>
                         {teamname}
                     </Text>
                 </View>
             </View>
         );
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
