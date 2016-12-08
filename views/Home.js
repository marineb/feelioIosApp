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
      welcome: 'Good morning',
      // latitude: 40.7128,
      // longitude: -74.0059,
      latitude: 'unknown',
      longitude: 'unknown'
    };

    // Refresh data every 60 seconds (60,000 ms)
    setInterval(() => {
      this.componentDidMount();
    }, 60000);

  }

  componentDidMount() {
    this.getLocation();
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

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var latitude = JSON.stringify(position.coords.latitude);
        var longitude = JSON.stringify(position.coords.longitude);
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
        this.fetchWeather(latitude, longitude);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  fetchWeather(latitude, longitude) {
    var url = "https://www.feelio.cc/api-1.1.php?latitude=" + latitude + "&longitude=" + longitude;
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        var weatherData = [];
        console.log(jsonData);
        weatherData.push(jsonData);

        this.setState({
          isLoading: false,
          weatherJSON: [].concat(weatherData)
        });
      })
    .catch( error => console.log('Fetch error ' + error) );
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

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
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
    var p = this.state.weatherJSON[0].phrases;
    var d = this.state.weatherJSON[0].weatherData;

    if ( !isLoading ) {
      return (
        <View style={styles.container}>
          <View style={styles.main}>
          <Text style={styles.welcome}>
            {this.state.welcome}
          </Text>
            <Text style={styles.h1}>
              {p.now}
            </Text>
          </View>
          <View style={styles.secondary}>
            <Text style={styles.h2}>
              Feels like {Math.round(d.currently.apparentTemperature)}°F. {d.currently.summary}.
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
    alignItems: 'flex-start',
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
    width: 250
  },
  welcome: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,1)'
  },
  h1: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: 'rgba(255,255,255,.9)'
  },
  h2: {
    fontSize: 12,
    lineHeight: 20,
    color: 'rgba(255,255,255,.5)',
  }
});

AppRegistry.registerComponent('Home', () => Home);
