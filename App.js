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
  FlatList
} from 'react-native';

import Tabs from 'react-native-tabs';

import WodGetter from './lib/WodGetter';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class WodList extends Component {
  render() {
    return(
      <FlatList
        data={[
          {key: '20180118'},
          {key: '20180117'}
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    );
  }
}

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {page:'WOD'};
  }

  render() {
    let page = (<WodGetter />);
    if(this.state.page === 'News') {
      page = (<Text>News</Text>);
    }
    else if(this.state.page === 'About') {
      page = (<Text>About</Text>);
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
              <Text name="News">News</Text>
              <Text name="About">About</Text>
          </Tabs>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    flexDirection: 'column',
    backgroundColor: '#E16D36',
    height: 80,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});
