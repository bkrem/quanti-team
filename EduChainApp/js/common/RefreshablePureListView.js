/**
 * This component extends the FB library component `PureListView` by
 * adding React Native's <RefreshControl> component and adding `onRefresh`
 * event hooks. This enables refresh-on-pull-down capabilities.
 *
 * @flow
 */
'use strict';

import React from 'react';
import {RefreshControl} from 'react-native';
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
        console.info("RefreshablePureListView will mount");
    }

    componentDidMount() {
        console.info("RefreshablePureListView did mount");
    }

    componentWillReceiveProps(nextProps) {
        console.info("RefreshablePureListView componentWillReceiveProps", nextProps);
    }

    componentWillUnmount() {
        console.info("RefreshablePureListView unmount");
    }

    render() {
        return (
            <PureListView
                {...this.props}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={this.props.onRefresh}
                    />
                }
            />
        );
    }

}
