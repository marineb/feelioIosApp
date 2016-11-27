import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherJSON: [],
      isLoading: true,
      welcome: 'Good morning'
    };

    // Refresh data every 60 seconds (60,000 ms)
    setInterval(() => {
      this.componentDidMount();
    }, 60000);

  }

  componentDidMount() {
    this.fetchWeather();
    this.fetchTimeOfDay();
    console.log("Component mounted.");
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
    if (now.getHours() < 12 && now.getHours() >= 5) {
      this.setState({
        welcome: 'Good morning.'
      });
    } else if (now.getHours() >= 12 && now.getHours() < 17) {
      this.setState({
        welcome: 'Good afternoon.'
      });
    } else {
      this.setState({
        welcome: 'Good evening.'
      });
    }
  }

  fetchWeather() {
    var url = 'https://www.feelio.cc/api-1.0.php?format=json';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
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
        <ActivityIndicator
          animating={true}
          color={'rgba(255,255,255,.5)'}
          size={'small'}
          style={{margin: 15}} />
        <Text style={{color: '#fff', fontSize: 24}}></Text>
      </View>
    );
  }

  renderResults() {
    var {isLoading} = this.state;
    if ( !isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.main}>
          <Text style={styles.welcome}>
            {this.state.welcome}
          </Text>
            <Text style={styles.h1}>
              {this.state.weatherJSON[0].phrase}
            </Text>
          </View>
          <View style={styles.secondary}>
            <Text style={styles.h2}>
              Feels like {this.state.weatherJSON[0].feels_like}°F{"\n"}
              {this.state.weatherJSON[0].summary}
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
  welcome: {
    fontSize: 24,
    lineHeight: 38,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)'
  },
  h1: {
    fontSize: 24,
    lineHeight: 38,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center'
  },
  h2: {
    fontSize: 16,
    lineHeight: 28,
    color: 'rgba(255,255,255,.3)',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('Home', () => Home);
