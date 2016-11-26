import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from './Home';

export default class NowScreen extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../img/settings.png'),
      id: 'settings'
    }]
  };

  static navigatorStyle = {
    screenBackgroundColor: '#142233',
    navBarBackgroundColor: 'transparent',
    navBarTextColor: 'transparent',
    navBarButtonColor: '#ffffff',
    drawUnderNavBar: true,
    navBarTransparent: true,
    navBarTranslucent: true
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
});
