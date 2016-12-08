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
      welcome: 'Good morning',
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
    var {isLoading, three, six, twelve} = this.state;
    var p = this.state.weatherJSON[0].phrases;
    var d = this.state.weatherJSON[0].weatherData;

    if ( !isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.section, styles.margin30}>
            <Text style={styles.time}>
              {three}
            </Text>
            <Text style={styles.h1}>
              {p.inThreeHours}
            </Text>
            <Text style={styles.h2}>
              Feels like {Math.round(d.hourly.data[3].apparentTemperature)}°F{"\n"}
              {d.hourly.data[3].summary}
            </Text>
          </View>
          <View style={styles.section, styles.margin30}>
            <Text style={styles.time}>
              {six}
            </Text>
            <Text style={styles.h1}>
              {p.inSixHours}
            </Text>
            <Text style={styles.h2}>
            Feels like {Math.round(d.hourly.data[6].apparentTemperature)}°F{"\n"}
            {d.hourly.data[6].summary}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.time}>
              {twelve}
            </Text>
            <Text style={styles.h1}>
              {p.inTwelveHours}
            </Text>
            <Text style={styles.h2}>
            Feels like {Math.round(d.hourly.data[12].apparentTemperature)}°F{"\n"}
            {d.hourly.data[12].summary}
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
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    // fontWeight: 'bold',
    color: 'rgba(255,255,255,.75)',
    color: '#b8bcc1'
  },
  h1: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 5,
    color: 'rgba(255,255,255,.9)',
    textAlign: 'center'
  },
  h2: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,.5)',
    textAlign: 'center',
    marginBottom: 0
  },
  margin30: {
    marginBottom: 30
  }
});

AppRegistry.registerComponent('Home', () => Home);
