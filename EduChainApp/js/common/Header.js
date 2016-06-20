/**
 *
 * @flow
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform
} from 'react-native'
import Colors from './Colors'

export type Props = {
    title: string;
    style: any;
    children: any;
};

class HeaderIOS extends Component {
  props: Props;

    render() {
        const content = React.Children.count(this.props.children) === 0
          ? <Text style={styles.titleText}>
              EduChain
            </Text>
          : this.props.children;

        return (
          <View style={[styles.header, this.props.style]}>
              <StatusBar
                  backgroundColor="white"
                  barStyle="light-content"
              />
            <View
              accessible={true}
              accessibilityLabel="TestTitle"
              accessibilityTraits="header"
              style={styles.centerItem}>
              {content}
            </View>
          </View>
        );
    }
}

let STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
let HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: Colors.darkBackground,
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});


const Header = Platform.OS === 'ios' ? HeaderIOS : null; // TODO GH issue #4
//Header.height = HEADER_HEIGHT;

module.exports = Header;
