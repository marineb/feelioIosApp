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
        <Text style={styles.title}>Settings</Text>

        <TouchableOpacity onPress={ this.onReplaceTab2Press.bind(this) }>
          <Text style={styles.button}>Unit toggle coming soon.</Text>
        </TouchableOpacity>

        <Text style={styles.small}>Version {appVersion}</Text>
        <Text style={styles.small}>Build {appBuild}</Text>

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
    this.props.navigator.showModal({
      title: "Modal",
      screen: "example.ModalScreen"
    });
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
    backgroundColor: '#25364B',
    justifyContent: 'center',
    width: 300
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    fontWeight: '500'
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'white'
  },
  small: {
    color: 'rgba(255,255,255,.3)'
  }
});
