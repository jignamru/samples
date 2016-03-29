'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Navigator
} = React;

var LoginScreen = require('./app/screens/login');
var WelcomeScreen = require('./app/screens/welcome');
//var CookieManager = require('react-native-cookies');


var BabysitterApp = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false
    }
  },
  render: function() {
    if( this.loggedIn ) {
      return (
          <Navigator
            initialRoute={{id: 'welcome'}}
            renderScene={this.navigatorRenderScene}/>
      );
    } else {
      return (
          <Navigator
            initialRoute={{id: 'login'}}
            renderScene={this.navigatorRenderScene}/>
      );
    }
  },

  navigatorRenderScene(route, nav) {
    switch (route.id) {
      case 'login':
        return (<LoginScreen navigator={nav} title="login"/>);
      case 'welcome':
        return (<WelcomeScreen navigator={nav} title="welcome" />);
    }
  }
});

AppRegistry.registerComponent('BabysitterApp', () => BabysitterApp);