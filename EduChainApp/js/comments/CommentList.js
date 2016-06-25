/**
 * Created by BK on 25/06/16.
 *
 * @flow
 */

 'use strict';

 import React, { Component } from 'react'
 import {
     View,
     Text,
 } from 'react-native'
 import Comment from './Comment'

export default class CommentList extends Component {
    render() {
        let commentNodes = this.props.comments.map(comment => {
            return (
                <Comment author={comment.author} thumbURI={comment.thumbURI} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });

        return (
            <View>
                {commentNodes}
            </View>
        );
    }
}
