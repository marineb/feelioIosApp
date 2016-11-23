import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class Settings extends Component {
  static get defaultProps() {
    return {
      title: 'Settings'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}
