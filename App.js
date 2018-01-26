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
  WebView,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  AppState,
} from 'react-native';

import Tabs from 'react-native-tabs';
import SplashScreen from 'react-native-splash-screen';

var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;
var { Answers } = Fabric;

import WodGetter from './lib/WodGetter';
import AboutListView from './lib/AboutListView';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      page: 'WOD',
      appState: AppState.currentState,
      pageIndex: 0,
    };
  }

  setPage(pageIndex) {
    let page = 'WOD';
    if (pageIndex ===  1) {
      page = 'Schedule';
    }
    else if (pageIndex === 2) {
      page = 'More';
    }
    this.setState({page:page});
  }

  componentDidMount() {
    SplashScreen.hide();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // refresh the wod if the app is opening
      this.setState({page:'WOD'});
    }
    this.setState({appState: nextAppState});
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
        <View style={{flex:1, flexDirection: 'row', justifyContent:'center', margin: 20}}>
          <WebView
            source={{uri: 'https://www.crossfit460.com/schedule-mobile-app'}}
            style={{flex: 1}}
            renderLoading={this.renderLoadingView}
            startInLoadingState={true}
          />
        </View>
      );
    }
    else if(this.state.page === 'More') {
      page = (<AboutListView />);
      /*
      page = (
        <View style={styles.aboutView}>
          <Text style={styles.aboutText}>©2018 Minnick Fitness, dba CrossFit 460</Text>
          <Text style={styles.aboutText}>All Rights Reserved</Text>
          <Text style={styles.aboutText}>Version 1.0.0</Text>
          <Text style={styles.aboutText}> </Text>
          <Text style={styles.aboutText}>CrossFit is a registered trademark of CrossFit, Inc.</Text>
          <Text style={styles.aboutText}>CrossFit 460 is a registered affiliate of CrossFit, Inc</Text>
        </View>
      );
      */
    }

    Answers.logCustom(`Viewed: ${this.state.page}`)

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CrossFit 460</Text>
        </View>
        <View style={styles.container}>
          {page}
        </View>
        <View style={{height: 50}}>
          <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                selectedIconStyle={{borderTopWidth:2,borderTopColor:'#E16D36'}}
                selectedStyle={{color:'#E16D36'}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="WOD">WOD</Text>
              <Text name="Schedule">Schedule</Text>
              <Text name="More">More</Text>
          </Tabs>
        </View>
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
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
    backgroundColor: '#F16521',
    height: 40,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    marginTop: 5,
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
    marginTop: 50,
  },
  aboutText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
  }
});
