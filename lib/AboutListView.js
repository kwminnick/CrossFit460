import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  WebView,
  ActivityIndicator,
} from 'react-native';

import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';

const NewsScreen = () => (
  <View>
    <Text>News Screen</Text>
  </View>
);

const HomeScreen = ({ navigation }) => (
  <View
    style={styles.aboutListView}>
    <FlatList
      data={[
        {key: 'News'},
        {key: 'About CrossFit 460'},
        {key: 'About This App'},
      ]}
      renderItem={({item}) => {
        return (
          <ListItem
            title={`${item.key}`}
            fontFamily='Roboto'
            onPress={() => navigation.navigate('News', {})}
            //onPress={this.getAboutItem.bind(this, item.key)}
          />
        );
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  aboutListView: {
    backgroundColor: '#ffffff',
    flex: 1,
    margin: 0,
  },
});

const AboutNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'More',
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTitleStyle: {
        fontFamily: 'Roboto',
      },
    },
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      headerTitle: 'News',
    },
  },
});

export default AboutNavigator;
