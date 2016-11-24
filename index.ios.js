import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
registerScreens(); // this is where you register all of your app's screens

const createTabs = () => {
  let tabs = [
    {
      label: 'Now',
      screen: 'example.FirstTabScreen',
      icon: require('./img/now.png'),
      selectedIcon: require('./img/now_selected.png'),
      title: 'Now'
    },
    {
      label: 'Today',
      screen: 'example.SecondTabScreen',
      icon: require('./img/today.png'),
      selectedIcon: require('./img/today_selected.png'),
      title: 'Today',
      navigatorStyle: {
        tabBarBackgroundColor: 'pink',
      }
    }
  ];
  return tabs;
};
// this will start our app
Navigation.startTabBasedApp({
  tabs: createTabs(),
  appStyle: {
    tabBarBackgroundColor: 'black',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: 'white'
  },
  drawer: {
    left: {
      screen: 'example.SideMenu'
    }
  }
});

{/* AppRegistry.registerComponent('feelioIosApp', () => feelioIosApp); */}
