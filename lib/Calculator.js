import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Switch,
} from 'react-native';

import {
  List,
  ListItem,
  FormLabel,
  FormInput,
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
    this.calculatePercentages(this.state.weight, this.state.roundToFive, this.state.kilos);
  }

  round5(x) {
    return Math.ceil(x/5)*5;
  }

  handleWeightChange = (text) => {
    if (isNaN(text)) {
      return;
    }
    this.setState({weight: text});
    this.calculatePercentages(text, this.state.roundToFive, this.state.kilos);
  }

  handleRoundChange = (value) => {
    this.setState({ roundToFive: value });
    this.calculatePercentages(this.state.weight, value, this.state.kilos);
  }

  handleKilosChange = (value) => {
    let weight = parseInt(this.state.weight);
    if(value) { //use kilos
      weight = Math.round(weight / 2.2);
    }
    else { // use pounds
      weight = Math.round(weight * 2.2);
    }
    if(this.state.roundToFive) {
      weight = this.round5(weight);
    }
    this.setState({
      kilos: value,
      weight: weight + '',
    });
    this.calculatePercentages(weight, this.state.roundToFive, value);
  }

  calculatePercentages(weight, isRound, isKilos) {
    weight = parseInt(weight);

    let data = [];
    this.setState({data: data});

    if(isNaN(weight)) {
      return;
    }

    for(i=5; i<100; i=i+5) {
      let pWeight = Math.round(weight * 0.01 * i);
      if(isRound) {
        pWeight = this.round5(pWeight);
      }
      if(isKilos) {
        pWeight = pWeight + ' kgs';
      }
      else {
        pWeight = pWeight + ' lbs';
      }
      data.push({key: i, weight: pWeight});
    }
    data = data.reverse();
    this.setState({data: data});
  }

  render() {
    return (
      <View style={{flex: 2}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 150}}>
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
              keyboardType='numeric'
              maxLength={3}
            />
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <FormLabel fontFamily='Roboto'>Round to Nearest 5</FormLabel>
              <Switch
                onValueChange={this.handleRoundChange}
                value={this.state.roundToFive}
                style={{marginTop: 5}}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <FormLabel fontFamily='Roboto'>Use Kilos</FormLabel>
              <Switch
                  onValueChange={this.handleKilosChange}
                  value={this.state.kilos}
                  style={{marginTop: 5}}
                />
            </View>
          </View>
        </View>
      <ScrollView
        style={{margin: 20}}
      >
        <FlatList
          data={this.state.data}
          extraData={this.state}
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
                    <Text style={styles.weightText}>{`${item.weight}`}</Text>
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
