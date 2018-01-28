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

import {
  List,
  ListItem,
  FormLabel,
  FormInput,
  Divider,
} from 'react-native-elements';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '135',
      kilos: false,
      roundToFive: true,
      data: [],
    };
  }

  componentDidMount() {
    this.calculatePercentages(this.state.weight);
  }

  round5(x) {
    return Math.ceil(x/5)*5;
  }

  handleWeightChange = (text) => {
    if (isNaN(text)) {
      return;
    }
    this.setState({weight: text});
    this.calculatePercentages(text);
  }

  calculatePercentages(weight) {
    weight = parseInt(weight);

    let data = [];
    this.setState({data: data});

    if(isNaN(weight)) {
      return;
    }

    for(i=5; i<100; i=i+5) {
      let pWeight = Math.round(weight * 0.01 * i);
      if(this.state.roundToFive) {
        pWeight = this.round5(pWeight);
      }
      data.push({key: i, weight: pWeight});
    }
    data = data.reverse();
    this.setState({data: data});
  }

  render() {
    return (
      <View>
        <FormLabel fontFamily='Roboto'>Weight</FormLabel>
        <FormInput
          inputStyle={{
            fontFamily: 'Roboto',
            fontSize: 44,
            color: '#000000',
          }}
          onChangeText={this.handleWeightChange}
          ref={weight => this.weight = weight}
          value={this.state.weight}
        />
      <ScrollView style={{margin: 20}}>
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          renderItem={({item}) => {
            return (
                <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  borderRadius: 4,
                  borderWidth: 0.5,
                  borderColor: '#d6d7da',
                }}
              >
                  <View>
                      <Text style={styles.weightText}>{`${item.key}`}%</Text>
                  </View>
                  <View>
                    <Text style={styles.weightText}>{`${item.weight}`} lbs</Text>
                  </View>
              </View>
            );
          }}
        />
      </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  weightText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
});
