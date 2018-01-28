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
  ActivityIndicator,
  SafeAreaView,
  AppState,
} from 'react-native';

import { Header } from 'react-native-elements';
import Tabs from 'react-native-tabs';
import SplashScreen from 'react-native-splash-screen';

var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;
var { Answers } = Fabric;

import WodGetter from './lib/WodGetter';
import AboutListView from './lib/AboutListView';
import ToolsListView from './lib/ToolsListView';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      page: 'WOD',
      appState: AppState.currentState,
      pageIndex: 0,
    };
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

  render() {
    let page = (<WodGetter />);
    if(this.state.page === 'Tools') {
      page = (<ToolsListView />);
    }
    else if(this.state.page === 'About') {
      page = (<AboutListView />);
    }

    Answers.logCustom(`Viewed: ${this.state.page}`)

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header
            backgroundColor='#F16521'
            centerComponent={{ text: 'CrossFit 460', style: styles.header }}
        />
        <View style={{flex:1, justifyContent: 'space-between'}}>
          <View style={styles.container}>
            {page}
          </View>
          <View style={{height: 50}}>
            <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
              selectedIconStyle={{borderTopWidth:2,borderTopColor:'#E16D36'}}
              selectedStyle={{color:'#E16D36'}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="WOD">WOD</Text>
              <Text name="Tools">Tools</Text>
              <Text name="About">About</Text>
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
  header: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#fff',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});
