import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

export default class TodayData extends Component {

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
    this.setHours();
    console.log("Component mounted.");
  }

  render() {
    var {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  getTimeIn(aFewHours) {
    var now = new Date();
    var then = new Date(now.getTime() + (aFewHours*60)*60000);
    var amOrPm = then.getHours() >= 12 ? "PM" : "AM";
    var hour = then.getHours() % 12;
    hour = hour ? hour : 12;
    return hour+":00 "+amOrPm;
  }

  setHours() {
    this.setState({
      three: this.getTimeIn(3),
      six: this.getTimeIn(6),
      twelve: this.getTimeIn(12)
    });
  }

  fetchWeather() {
    var url = 'https://www.feelio.cc/api-1.0.php?format=json';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        var phrase;
        var weatherData = [];
        console.log(jsonData);
        weather = jsonData.feelio_api;
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
    var {weatherJSON, isLoading, three, six, twelve} = this.state;
    if ( !isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.time}>
              {three}
            </Text>
            <Text style={styles.h1}>
              {weatherJSON[0].inThreeHours.phrase}
            </Text>
            <Text style={styles.h2}>
              Feels like {weatherJSON[0].inThreeHours.feels_like}°F{"\n"}
              {weatherJSON[0].inThreeHours.summary}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.time}>
              {six}
            </Text>
            <Text style={styles.h1}>
              {weatherJSON[0].inSixHours.phrase}
            </Text>
            <Text style={styles.h2}>
              Feels like {weatherJSON[0].inSixHours.feels_like}°F{"\n"}
              {weatherJSON[0].inSixHours.summary}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.time}>
              {twelve}
            </Text>
            <Text style={styles.h1}>
              {weatherJSON[0].inTwelveHours.phrase}
            </Text>
            <Text style={styles.h2}>
              Feels like {weatherJSON[0].inTwelveHours.feels_like}°F{"\n"}
              {weatherJSON[0].inTwelveHours.summary}
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
  time: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: 'rgba(255,255,255,.3)'
  },
  h1: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center'
  },
  h2: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,.3)',
    textAlign: 'center',
    marginBottom: 30
  }
});

AppRegistry.registerComponent('Home', () => Home);
