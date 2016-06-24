/**
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react'
import {
    Navigator,
    StyleSheet
} from 'react-native'
import TabsView from './tabs/TabsView'

export default class EduChainNavigator extends Component {
    constructor(props: Object) {
        super(props);
    }

    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            default:
                return (<TabsView navigator={navigator} />);
        }
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={ {} }
                renderScene={this.renderScene}
            />
        );
    }

}
