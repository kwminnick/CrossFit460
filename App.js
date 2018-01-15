/**
 * CrossFit 460 React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  WebView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { ListItem } from 'react-native-elements';
import Tabs from 'react-native-tabs';

import WodGetter from './lib/WodGetter';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {page:'WOD'};
  }

  renderLoadingView() {
    return (
      <ActivityIndicator size='large' />
    );
  }

  render() {
    let page = (<WodGetter />);
    if(this.state.page === 'Schedule') {
      page = (
        <View style={{flex:1, flexDirection: 'row', justifyContent:'center'}}>
          <WebView
            source={{uri: 'https://www.crossfit460.com/schedule'}}
            style={{flex: 1}}
            renderLoading={this.renderLoadingView}
            startInLoadingState={true}
          />
        </View>
      );
    }
    else if(this.state.page === 'About') {
      page = (
        <View style={styles.aboutView}>
          <Text style={styles.aboutText}>©2018 Minnick Fitness, dba CrossFit 460</Text>
          <Text style={styles.aboutText}>All Rights Reserved</Text>
          <Text style={styles.aboutText}>Version 1.0.0</Text>
          <Text style={styles.aboutText}> </Text>
          <Text style={styles.aboutText}>CrossFit is a registered trademark of CrossFit, Inc.</Text>
          <Text style={styles.aboutText}>CrossFit 460 is a registered affiliate of CrossFit, Inc</Text>
        </View>
        /*
         // TODO - Switch app to navigation app in next version
        <View
          style={styles.aboutListView}>
        <FlatList
          data={[
            {key: 'News'},
            {key: 'About'},
          ]}
          renderItem={({item}) => {
            return (
              <ListItem
                title={`${item.key}`}
                fontFamily='Roboto'
                onPress={this.getAboutItem.bind(this, item.key)}
              />
            );
          }}
        />
      </View>
      */
      );
    }

    return (
      <View style={{flex:1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CrossFit 460</Text>
        </View>
        <View style={styles.container}>
          {page}
          <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                selectedIconStyle={{borderTopWidth:2,borderTopColor:'#E16D36'}}
                selectedStyle={{color:'#E16D36'}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="WOD">WOD</Text>
              <Text name="Schedule">Schedule</Text>
              <Text name="About">About</Text>
          </Tabs>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    flexDirection: 'column',
    backgroundColor: '#F16521',
    height: 80,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  aboutListView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginRight: 20,
  },
  aboutView: {
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  aboutText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
  }
});
