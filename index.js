import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import Cam from './src/Camera';
import Gps from './src/Gps'
import {StackNavigator, TabNavigator} from 'react-navigation';

class normacore extends Component{
  static navigationOptions = {
    title: 'NormaCore',
  };

  render(){
    return(
      <App />

    );
  }
}

const TestApp = TabNavigator({
  HomeAPI: { screen: App},
  Camera: {screen: Cam},
  GPS: {screen: Gps}
});

AppRegistry.registerComponent('normacore', () => TestApp);
