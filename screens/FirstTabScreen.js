import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Home from './Home';

export default class FirstTabScreen extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../img/settings.png'),
      id: 'settings'
    }]
  };
  static navigatorStyle = {
    navBarBackgroundColor: '#142233',
    navBarTextColor: '#ffffff',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    // statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'settings') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: '#142233'}}>
        <Home />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'white'
  }
});
