'use strict';
import React, { 
  Component, 
  AppRegistry,
  Navigator
} from 'react-native';

var LoginScreen = require('./app/screens/login');

class BabysitterApp extends Component {
  renderScene(route, navigator) {
     return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator } )
  }
  
  render () {
    return (
          <Navigator
            style={{ flex:1 }}
            initialRoute={{ component: LoginScreen }}
            renderScene={ this.renderScene } />
      )
  }
}

AppRegistry.registerComponent('BabysitterApp', () => BabysitterApp);