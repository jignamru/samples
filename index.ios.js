'use strict';
import React, { 
  Component, 
  AppRegistry,
  Navigator
} from 'react-native';

var LoginScreen = require('./app/screens/login');
var SignUpScreen = require('./app/screens/signup');
var HomeScreen = require('./app/screens/home');
var AddSitterScreen = require('./app/screens/addSitter');
var SittersListScreen = require('./app/screens/sittersList');
var SitterDetailsScreen = require('./app/screens/sitterDetails');


class BabysitterApp extends Component {
  render () {
    return <Navigator
            initialRoute={{id: 'login'}}
            renderScene={this.navigatorRenderScene}/>
  }

  navigatorRenderScene(route, nav) {
    switch (route.id) {
      case 'login':
        return (<LoginScreen navigator={nav} title="login"/>);
      case 'signup':
        return (<SignUpScreen navigator={nav} title="signup" />);
      case 'home':
        return (<HomeScreen navigator={nav} title="home" />);
      case 'addSitter':
        return (<AddSitterScreen navigator={nav} title="add sitter" />);
      case 'sitters':
        return (<SittersListScreen navigator={nav} title="sitters list" />);
      case 'sitterDetails':
        return (<SitterDetailsScreen navigator={nav} title="sitter details" />);
        
    }
  }
}

AppRegistry.registerComponent('BabysitterApp', () => BabysitterApp);