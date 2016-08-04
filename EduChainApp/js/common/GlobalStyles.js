/**
 *
 * @flow
 */

'use strict';

import {StyleSheet} from 'react-native';

const GlobalStyles = {
    contentWrapper: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    sectionHeader: {
        fontSize: 20,
        marginTop: 10,
    },
    thumbnail: {
        height: 45,
        width: 45,
        borderRadius: 22,
    },
    buttonContainer: {
        padding:10,
        paddingTop: 11,
        height:45,
        overflow:'hidden',
        borderRadius:4,
        backgroundColor: '#ededed'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    backBtn: {
        title: "Back",
        layout: "icon",
        icon: "ios-arrow-back",
    }
};

module.exports = GlobalStyles;
