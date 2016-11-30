# Feelio for iOS
Building an iOS app for Feelio ☔️

Currently in beta. Built with [React Native](https://facebook.github.io/react-native/).


## Request new features
Make new requests (bugs, enhancements, etc) on the [issues page](https://github.com/marineb/feelio-ios-app/issues).


## Upcoming features
These are the features we're working on, mostly in that order.

You can also check out our [development roadmap](https://github.com/marineb/feelio-ios-app/projects/1).

- Smarter "now" algorithm that takes into account the rest of the day / night [#6](https://github.com/marineb/feelio-ios-app/issues/6)
- Get the weather no matter where I am (geolocate users, and create a new Feelio API) [~~#4~~](https://github.com/marineb/feelio-ios-app/issues/4) [#5](https://github.com/marineb/feelio-ios-app/issues/5)
- Get app notifications when I wake up or when I go to bed [#7](https://github.com/marineb/feelio-ios-app/issues/7)
- I want 3 themes:
  - Dark
  - Light
  - A theme that changes depending on day/night and the weather
- I want an algorithm that is personalized to me and my sensitivity to weather
- If it’s the evening, don’t give me upcoming hourly (like 4am) but just the weather for tomorrow. And if I’ll need an umbrella.
- A way to switch from °F to °C

## Setup
- `brew install node`
- `brew install watchman`
- `npm install -g react-native-cli`
- `npm install`
- `react-native run-ios`

## License

MIT License

Copyright (c) 2016 Marine Boudeau LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
