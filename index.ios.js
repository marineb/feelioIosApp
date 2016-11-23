import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Home from './components/Home';
import Settings from './components/Settings';

class feelioIosApp extends Component {
  render() {
     return (
       <Home />
     )
   }
};

AppRegistry.registerComponent('feelioIosApp', () => feelioIosApp);
