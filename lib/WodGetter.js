import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';

import Dimensions from 'Dimensions';

import { DOMParser } from 'xmldom';
import HTML from 'react-native-render-html';

import Swiper from 'react-native-swiper';

export default class WodGetter extends Component {
  constructor() {
    super();
    this.state = {
      wods: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getWodsFromWebsite().done();
  }

  async getWodsFromWebsite() {
    this.setState({refreshing: true});
    try {
      let response = await fetch(
        'https://www.crossfit460.com/category/wod/feed/'
      );
      let responseText = await response.text();
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(responseText,'text/xml');
      let wods = xmlDoc.getElementsByTagName('item');

      this.setState({wods});
      this.setState({refreshing: false});
    } catch (error) {
      this.setState({refreshing: false});
      console.error(error);
    }
  }

  render() {
    let wods = this.state.wods;
    let texts = [];

    let wodDate = 'Loading...';
    let wodDescription = '<p></p>';
    let wodTitle = '';
    if(wods.length > 0) {
      try {
        let wod = wods[0];
        wodDate = wod.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
        wodTitle = wod.getElementsByTagName('title')[0].childNodes[0].nodeValue;
        wodDescription = wod.getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue;
      }
      catch (error) {
        console.error(error);
        wodDate = 'Failed to load today\'s WOD. :(';
        wodDescription = '<p>So let\'s just do 100 burpees for time!</p>';
      }

      // try to fix the pubDate
      try {
        let pubDate = new Date(wodDate);
        let options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        wodDate = pubDate.toLocaleDateString('en-US', options);
      }
      catch(error) {
        console.error(error);
        wodDate = '';
      }
    }

    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        containerStyle={{
          margin: 20,
//          width: Dimensions.get('window').width - 40,
//          height: Dimensions.get('window').height,
        }}
      >
        <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.getWodsFromWebsite.bind(this)}
                />
              }
            >
          <View>
            <Text style={styles.wodDate}>{wodDate}</Text>
            <HTML html={wodDescription} />
          </View>
        </ScrollView>
        <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.getWodsFromWebsite.bind(this)}
                />
              }
            >
          <View>
            <Text style={styles.wodDate}>{wodDate}</Text>
            <HTML html={wodDescription} />
          </View>
        </ScrollView>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  wodDate: {
    fontSize: 22,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  wodTitle: {
    fontSize: 18,
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
});
