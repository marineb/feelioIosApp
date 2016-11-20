

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

  fetchWeather() {
    var url = 'https://www.feelio.cc/db_calls/feelio-api.php?format=json';
    // var url = 'http://unsplash.it/list';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        var phrase;
        var weatherData = [];
        console.log(jsonData);
        weather = jsonData.feelio_api.currently;
        weatherData.push(weather);

        this.setState({
          isLoading: false,
          weatherJSON: [].concat(weatherData)
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
    if ( !isLoading) {
      return (
        <View style={styles.container}>
            <View style={styles.main}>
              <Text style={styles.h1}>
                {weatherJSON[0].phrase}{"\n"}
              </Text>
            </View>
            <View style={styles.secondary}>
              <Text style={styles.h2}>
                Feels like {weatherJSON[0].feels_like}°F{"\n"}
                {weatherJSON[0].summary}
              </Text>
            </View>
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
    backgroundColor: '#fafafa'
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142233'
  },
  main: {
    margin: 0,
    padding: 0,
    height: 40
  },
  secondary: {

  },
  h1: {
    fontSize: 24,
    lineHeight: 32,
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  h2: {
    fontSize: 16,
    lineHeight: 24,
    color: '#999',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('feelioIosApp', () => feelioIosApp);
