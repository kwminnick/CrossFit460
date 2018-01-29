import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  FormLabel,
  FormInput,
} from 'react-native-elements';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '135',
      weightInKilos: '61'
    };
  }

  componentDidMount() {
  }

  handleLbsChange = (text) => {
    if (isNaN(text)) {
      return;
    }

    let weight = parseInt(text);
    if(isNaN(weight)) {
      weight = 0;
    }

    let weightInKilos = Math.round(weight / 2.2);

    this.setState({
      weight: text,
      weightInKilos: weightInKilos + '',
    });
  }

  handleKilosChange = (text) => {
    if (isNaN(text)) {
      return;
    }

    let weightInKilos = parseInt(text);
    if(isNaN(weightInKilos)) {
      weightInKilos = 0;
    }

    let weight = Math.round(weightInKilos * 2.2);

    this.setState({
      weight: weight + '',
      weightInKilos: text,
    });
  }

  render() {
    return (
      <View style={{flex: 2, alignItems: 'center'}}>
        <Text style={{
          fontFamily: 'Roboto',
          margin: 20,
          fontSize: 14,
        }}>Enter either lbs or kilos</Text>
        <View style={{width: 150}}>
          <FormLabel fontFamily='Roboto'>Weight in lbs</FormLabel>
          <FormInput
            inputStyle={{
              fontFamily: 'Roboto',
              fontSize: 44,
              color: '#000000',
            }}
            onChangeText={this.handleLbsChange}
            ref={weight => this.weight = weight}
            value={this.state.weight}
            keyboardType='numeric'
            maxLength={3}
          />
        </View>
        <Text style={{
          fontFamily: 'Roboto',
          margin: 20,
          fontSize: 44,
        }}>=</Text>
        <View style={{width: 150}}>
          <FormLabel fontFamily='Roboto'>Weight in kilos</FormLabel>
          <FormInput
            inputStyle={{
              fontFamily: 'Roboto',
              fontSize: 44,
              color: '#000000',
            }}
            onChangeText={this.handleKilosChange}
            ref={weightInKilos => this.weightInKilos = weightInKilos}
            value={this.state.weightInKilos}
            keyboardType='numeric'
            maxLength={3}
          />
        </View>
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
