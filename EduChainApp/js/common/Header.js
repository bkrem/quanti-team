/**
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'
import Colors from './Colors';
import Icon from 'react-native-vector-icons/Ionicons';

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
  | 'icon'         // Always use icon
  | 'title';       // Always use title

export type Item = {
  title?: string;
  icon?: string;
  layout?: Layout;
  onPress?: () => void;
};

export type Props = {
  title: string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  //foreground?: Foreground;
  style?: any;
  children?: any;
};

class HeaderIOS extends React.Component {
    props: Props;

    render() {
        const {title, leftItem, rightItem} = this.props;
        const content = React.Children.count(this.props.children) === 0
          ? <Text style={styles.titleText}>
              {title}
            </Text>
          : this.props.children;

        return (
            <View>
                <View style={[styles.header, this.props.style]}>
                    <View style={styles.leftItem}>
                        <ItemWrapperIOS item={leftItem} />
                    </View>
                    <View
                      accessible={true}
                      accessibilityLabel={title}
                      accessibilityTraits="header"
                      style={styles.centerItem}>
                      {content}
                    </View>
                    <View style={styles.leftItem}>
                        <ItemWrapperIOS item={rightItem} />
                    </View>
                </View>
            </View>
        );
    }
}

class ItemWrapperIOS extends React.Component {
    props: {
        item: Item;
    };

    render() {
        const {item} = this.props;
        if (!item) {
            return null;
        }

        let content;
        const {title, icon, layout, onPress} = item;

        if (layout !== 'icon' && title) {
            content = (
                <Text style={styles.itemText}>
                    {title.toUpperCase()}
                </Text>
            );
        } else if (icon) { // TODO GH #8 let props pass any icon set
            content =
            <Icon style={styles.icon} name={icon} size={30} />
            ;
        }

        return (
            <TouchableOpacity
                accessibilityLabel={title}
                accessibilityTraits="button"
                onPress={onPress}
                style={styles.itemWrapper}>
                {content}
            </TouchableOpacity>
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
        color: '#DDDDDD',
        fontWeight: 'bold',
        fontSize: 20,
    },
    leftItem: {
        flex: 1,
        alignItems: 'center',
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
    icon: {
        color: '#DDDDDD'
    }
});


const Header = HeaderIOS; // Platform.OS === 'ios' ? HeaderIOS : null; // TODO GH issue #4
//Header.height = HEADER_HEIGHT;

module.exports = Header;
