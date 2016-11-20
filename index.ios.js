

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
      isLoading: true,
      isDaylight: true
    };

    // Refresh data every 60 seconds (60,000 ms)
    setInterval(() => {
      this.fetchWeather();
    }, 60000);

  }

  componentDidMount() {
    this.fetchWeather();
    this.fetchTimeOfDay();
  }

  render() {
    var {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  fetchTimeOfDay() {
    var now = new Date();
    if (now.getHours() < 17) {
      this.setState({
        isDaylight: true
      });
    } else {
      this.setState({
        isDaylight: false
      });
    }
  }

  fetchWeather() {
    var url = 'https://www.feelio.cc/db_calls/feelio-api.php?format=json';
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
                {weatherJSON[0].phrase}
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
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#142233'
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142233'
  },
  main: {
  },
  secondary: {

  },
  h1: {
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 10,
    padding: 0,
    color: '#fff',
    textAlign: 'center'
  },
  h2: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,.2)',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('feelioIosApp', () => feelioIosApp);
