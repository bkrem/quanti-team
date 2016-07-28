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

type State = {
    refreshing: boolean;
}

type Props = {
    onRefresh: () => Promise;
}

export default class RefreshablePureListView extends React.Component {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        (this: any).onRefresh = this.onRefresh.bind(this);

        this.state = {
            refreshing: false
        };
    }

    onRefresh() {
        this.setState({refreshing: true});

        this.props.onRefresh().then(() =>
          this.setState({refreshing: false})
        );
    }

    render() {
        const refreshControl =
            (<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />);

        return (
            <PureListView {...this.props} refreshControl={refreshControl} />
        );
    }
}
