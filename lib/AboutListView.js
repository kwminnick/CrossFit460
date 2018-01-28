import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  WebView,
  ActivityIndicator,
  Linking,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

const renderLoadingView = () => (
  <ActivityIndicator size='large' />
);

const ScheduleScreen = () => (
  <View style={{flex:1, flexDirection: 'row', justifyContent:'center', margin: 20}}>
    <WebView
      source={{uri: 'https://www.crossfit460.com/schedule-mobile-app'}}
      style={{flex: 1}}
      renderLoading={this.renderLoadingView}
      startInLoadingState={true}
    />
  </View>
);

const NewsScreen = () => (
  <View>
    <Text>News Screen</Text>
  </View>
);

const About460AppScreen = () => (
  <View style={styles.aboutView}>
    <Text style={styles.aboutText}>©2018 Minnick Fitness, dba CrossFit 460</Text>
    <Text style={styles.aboutText}>All Rights Reserved</Text>
    <Text style={styles.aboutText}>Version 1.0.0</Text>
    <Text style={styles.aboutText}> </Text>
    <Text style={styles.aboutText}>CrossFit is a registered trademark of CrossFit, Inc.</Text>
    <Text style={styles.aboutText}>CrossFit 460 is a registered affiliate of CrossFit, Inc</Text>
  </View>
);

const handlePress = (navigation, item) => {
  if(item.screen === 'About460') {
    const url = "https://www.crossfit460.com"
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  else {
    navigation.navigate(item.screen, {});
  }
}

const HomeScreen = ({ navigation }) => (
  <View
    style={styles.aboutListView}>
    <FlatList
      data={[
        {key: 'Schedule', screen: 'Schedule'},
        {key: 'CrossFit 460 Website', screen: 'About460'},
        {key: 'About This App', screen: 'About460App'},
      ]}
      renderItem={({item}) => {
        return (
          <ListItem
            title={`${item.key}`}
            fontFamily='Roboto'
            onPress={() => handlePress(navigation, item)}
            //onPress={() => navigation.navigate(item.screen, {})}
            //onPress={this.getAboutItem.bind(this, navigation, item.screen)}
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
  aboutView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
  },
  aboutText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    fontFamily: 'Roboto',
  }
});

const AboutListView = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'About',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: {
      headerTitle: 'Schedule',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      headerTitle: 'News',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
  About460App: {
    screen: About460AppScreen,
    navigationOptions: {
      headerTitle: 'About This App',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
},
{
  cardStyle: {
    backgroundColor: '#ffffff',
  }
}
);

export default AboutListView;
