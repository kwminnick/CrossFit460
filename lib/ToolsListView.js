import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import Calculator from './Calculator.js';

const CalculatorScreen = () => (
  <Calculator />
);

const TimerScreen = () => (
  <View>

  </View>
);

const HomeScreen = ({ navigation }) => (
  <View
    style={styles.toolsListView}>
    <FlatList
      data={[
        {key: 'Training Weights', screen: 'Calculator'},
        {key: 'Timer', screen: 'Timer'},
      ]}
      renderItem={({item}) => {
        return (
          <ListItem
            title={`${item.key}`}
            fontFamily='Roboto'
            onPress={() => navigation.navigate(item.screen, {})}
          />
        );
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  toolsListView: {
    backgroundColor: '#ffffff',
    flex: 1,
    margin: 0,
  },
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    fontFamily: 'Roboto',
  }
});

const ToolsListView = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Tools',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
  Calculator: {
    screen: CalculatorScreen,
    navigationOptions: {
      headerTitle: 'Training Weights',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
  Timer: {
    screen: TimerScreen,
    navigationOptions: {
      headerTitle: 'Timer',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
    },
  },
},
{
  cardStyle: {
    backgroundColor: '#ffffff',
  }
});

export default ToolsListView;
