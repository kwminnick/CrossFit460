import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';

import Dimensions from 'Dimensions';

import { DOMParser } from 'xmldom';
import HTML from 'react-native-render-html';

import Swiper from 'react-native-swiper';

class Wod {
  constructor() {
    this.wodDate = 'Loading...';
    this.wodDescription = '<p></p>';
  }
}

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
    this.setState({wods: []});
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

    if(wods.length === 0) {
      return(
          <View>
            <Text style={styles.wodDate}>  Loading...</Text>
          </View>
      );
    }

    let wodsParsed = [];

    let count = 0;
    for(let i=0; i < wods.length; i = i + 1) {
      if(count >= 6) {
        break;
      }
      let wodParsed = new Wod();
      try {
        let wod = wods[i];
        wodParsed.wodDate = wod.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
        wodParsed.wodDescription = wod.getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue;
      }
      catch (error) {
        console.error(error);
        wodParsed.wodDate = 'Failed to load today\'s WOD. :(';
        wodParsed.wodDescription = '<p>So let\'s just do 100 burpees for time!</p>';
      }

      // try to fix the pubDate
      try {
        let pubDate = new Date(wodParsed.wodDate);
        let options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

        wodParsed.wodDate = pubDate.toLocaleDateString('en-US', options);
      }
      catch(error) {
        console.error(error);
        wodParsed.wodDate = '';
      }
      wodsParsed.push(wodParsed);
      count = count + 1;
    }

    let scrollViews = wodsParsed.map((wod, index) => {
      return(
        <ScrollView
          key={index}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getWodsFromWebsite.bind(this)}
            />
          }
        >
          <View>
            <Text style={styles.wodDate}>{wod.wodDate}</Text>
            <HTML html={wod.wodDescription} />
          </View>
        </ScrollView>
      );
    });

    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        showsButtons={false}
        containerStyle={{
          margin: 20,
//          width: Dimensions.get('window').width - 40,
//          height: Dimensions.get('window').height,
        }}
      >
        {scrollViews}
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
});
