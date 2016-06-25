/**
 * Created by BK on 25/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react'
 import {
     View,
     StyleSheet,
     Text,
 } from 'react-native'

type Props = {
    author: string,
    children: string,
}

 export default class Comment extends Component {
     props: Props;

     render() {
         return (
             <View>
                 <Text style={styles.author}>{this.props.author}</Text>
                 <Text style={styles.content}>
                     {this.props.children}
                 </Text>
             </View>
         );
     }
 }

 const styles = StyleSheet.create({
     author: {

     },
     content: {

     }
 })
