/**
 * This component simply extends the FB library component `PureListView` by
 * adding React Native's <RefreshControl> component and adding `onRefresh`
 * event hooks. This enables refresh-on-pull-down capabilities.
 *
 * @flow
 */
'use strict';

import React from 'react';
import {
    RefreshControl
} from 'react-native';
import PureListView from '../lib/facebook/PureListView';

type Props = {
    refreshing: boolean;
    onRefresh: () => Promise;
}

export default class RefreshablePureListView extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    // FIXME GH issue #47
    componentWillMount() {
        //this.props.onRefresh();
    }

    render() {
        const refreshControl =
            (<RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.props.onRefresh}
            />);

        return (
            <PureListView {...this.props} refreshControl={refreshControl} />
        );
    }
}
