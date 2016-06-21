/**
 * Created by BK on 20/06/16.
 *
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    ListView,
    StyleSheet
} from 'react-native';
import TaskRow from './TaskRow'

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;

type State = {
    dataSource: any, // FIXME
    loaded: boolean
}

export default class TaskView extends Component {
    state: State;

    constructor(props: Object) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false
        }
    }

    componentDidMount() {
        let testRows = () => {
            let arr = [];
            for (let i = 0; i < 50; i++) arr.push({
                title: `row${i}`,
                desc: `desc for row${i}`,
                reward: '200 XP',
                complete: '3/5'
            });
            return arr;
        }
        let tr = testRows();

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tr),
            loaded: true
        })
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
              <Text>
                Loading Tasks...
              </Text>
            </View>
        );
    }

    render() {
        if (!this.state.loaded)
        return this.renderLoadingView();

        return (
            <View>
              <ListView
                  style={styles.listView}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => <TaskRow row={rowData} />}
              />
            </View>
        );
    }

} // END CLASS

const styles = StyleSheet.create({
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    }
});
