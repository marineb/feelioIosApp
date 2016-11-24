import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import Home from './Home';

export default class SecondTabScreen extends Component {
  static navigatorStyle: {
    drawUnderTabBar: true,
    navBarBackgroundColor: '#142233',
    navBarTextColor: '#ffffff',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff'
  };

  constructor(props) {
    super(props);
    this.buttonsCounter = 0;
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: '#142233'}}>
        <Home />
      </View>
    );
  }
  onChangeTitlePress() {
    this.props.navigator.setTitle({
      title: Math.round(Math.random() * 100000).toString()
    });
  }
  onChangeButtonsPress() {
    let buttons;
    if (this.buttonsCounter % 3 == 0) {
      buttons = [
        {
          title: 'Edit',
          id: 'edit',
          disabled: true
        },
        {
          icon: require('../img/settings.png'),
          id: 'add'
        }
      ];
    } else if (this.buttonsCounter % 3 == 1) {
      buttons = [{
        title: 'Save',
        id: 'save'
      }];
    } else {
      buttons = [];
    }
    this.buttonsCounter++;

    this.props.navigator.setButtons({
      rightButtons: buttons,
      animated: true
    });
  }
  onSwitchTabPress() {
    this.props.navigator.switchToTab({
      tabIndex: 0
    });
  }
  onSetTabBadgePress() {
    this.props.navigator.setTabBadge({
      badge: 12
    });
  }
  onToggleTabsPress() {
    this.props.navigator.toggleTabs({
      to: this.tabsHidden ? 'shown' : 'hidden'
    });
    this.tabsHidden = !this.tabsHidden;
  }
  onNavigatorEvent(event) {
    // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] == 'tab2') {
        this.props.navigator.resetTo({
          title: "Replaced Root",
          screen: parts[1],
          animated: true
        });
        this.props.navigator.switchToTab();
      }
    }
    // handle a button press
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'edit') {
        Alert.alert('NavBar', 'Dynamic Edit button pressed');
      }
      if (event.id == 'add') {
        Alert.alert('NavBar', 'Dynamic Add button pressed');
      }
      if (event.id == 'save') {
        Alert.alert('NavBar', 'Dynamic Save button pressed');
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});
