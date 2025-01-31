import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appVersion: DeviceInfo.getVersion(),
      appBuild: DeviceInfo.getBuildNumber()
    };
  }

  render() {
    var {appVersion, appBuild} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.appDetails}>
          <Text style={styles.small}>Version {appVersion}</Text>
          <Text style={styles.small}>Build {appBuild}</Text>
        </View>
      </View>
    );
  }
  onReplaceTab2Press() {
    this._toggleDrawer();
    // push/pop navigator actions affect the navigation stack of the current screen only.
    // since side menu actions are normally directed at sibling tabs, push/pop will
    // not help us. the recommended alternative is to use deep links for this purpose
    this.props.navigator.handleDeepLink({
      link: "tab2/example.PushedScreen"
    });
  }

  onModalPress() {
    this._toggleDrawer();
  }

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111',
    justifyContent: 'center',
    width: 300
  },
  title: {
    textAlign: 'center',
    color: 'rgba(0,0,0,.5)',
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'white'
  },
  small: {
    color: 'rgba(255,255,255,.3)',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'AvenirNext-Medium'
  },
  appDetails: {
    bottom: 50,
    position: 'absolute',
    justifyContent: 'center',
    width: 300
  }
});
