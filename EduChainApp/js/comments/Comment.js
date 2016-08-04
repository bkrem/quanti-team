/**
 * Created by BK on 25/06/16.
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
 import GlobalStyles from '../common/GlobalStyles';

 type Props = {
    author: string,
    thumbURI: string,
    children?: any,
}

 export default class Comment extends React.Component {
     props: Props;

     render() {
         return (
             <View style={styles.container}>
                 <View style={styles.thumbnailContainer}>
                     <Image
                         style={[GlobalStyles.thumbnail, styles.thumbnail]}
                         source={{uri: this.props.thumbURI}}
                     />
                 </View>
                 <View style={styles.textContainer}>
                     <Text style={styles.author}>{this.props.author}</Text>
                     <Text style={styles.text}>
                         {this.props.children}
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
         backgroundColor: '#dedede'
     },
     thumbnailContainer: {
         flex: 1,
         backgroundColor: '#ededed',
         justifyContent: 'center',
         alignItems: 'center'
     },
     textContainer: {
         flex: 6,
         flexDirection: 'column',
         //justifyContent: 'center',
         //alignItems: 'center'
     },
     thumbnail: {

     },
     author: {
         fontWeight: 'bold'
     },
     text: {

     }
 });
