import { Navigation } from 'react-native-navigation';

import NowScreen from './NowScreen';
import TodayScreen from './TodayScreen';
import Settings from './Settings';

// register all views of the app (including internal ones)
export function registerViews() {
  Navigation.registerComponent('feelio.NowScreen', () => NowScreen);
  Navigation.registerComponent('feelio.TodayScreen', () => TodayScreen);
  Navigation.registerComponent('feelio.Settings', () => Settings);
}
