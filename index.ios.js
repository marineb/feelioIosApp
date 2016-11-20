

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

class feelioIosApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherJSON: [],
      isLoading: true
    };

  }

  componentDidMount() {
    this.fetchWeather();
  }

  // componentWillMount goes here

  render() {
    var {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  initialize() {
    this.setState({
      weatherJSON: [],
      isLoading: true
    });
  }

  fetchWeather() {
    var url = 'https://www.feelio.cc/db_calls/feelio-api.php?format=json';
    // var url = 'http://unsplash.it/list';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        var phrase;
        var weather = [];
        phrase = jsonData.feelio_api.currently.phrase;
        weather.push(phrase);

        this.setState({
          isLoading: false,
          weatherJSON: [].concat(weather)
        });
      })
    .catch( error => console.log('Fetch error ' + error) );
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        { /* used to be an loading icon there. felt too cheesy. */ }
        <Text style={{color: '#fff', fontSize: 24}}>Good evening</Text>
      </View>
    );
  }

  renderResults(phrase) {
    var {weatherJSON, isLoading} = this.state;
    console.log('weatherJSON: '+weatherJSON);
    if ( !isLoading) {
      return (
        <View style={styles.container}>
            <Text>
            Right now
            {phrase}
            <Text style={{color: 'red'}}>{weatherJSON}</Text>
            </Text>
        </View>
      );
    }
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142233'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('feelioIosApp', () => feelioIosApp);
