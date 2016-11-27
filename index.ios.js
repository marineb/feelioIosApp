import React, { Component } from 'react';
import {
  AppRegistry,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { registerViews } from './views';
registerViews(); // register all of the app's screens

const createTabs = () => {
  let tabs = [
    {
      label: 'Now',
      screen: 'feelio.NowScreen',
      icon: require('./img/now.png'),
      selectedIcon: require('./img/now_selected.png'),
      title: 'Now'
    },
    {
      label: 'Later',
      screen: 'feelio.TodayScreen',
      icon: require('./img/today.png'),
      selectedIcon: require('./img/today_selected.png'),
      title: 'Later'
    }
  ];
  return tabs;
};

// this will start our app
Navigation.startTabBasedApp({
  tabs: createTabs(),
  tabsStyle: { // for Android, use appStyle
    tabBarBackgroundColor: '#142233',
    tabBarButtonColor: 'white',
    tabBarSelectedButtonColor: 'white'
  },
  drawer: {
    left: {
      screen: 'feelio.Settings'
    }
  }
});

AppRegistry.registerComponent('feelioIosApp', () => feelioIosApp);
