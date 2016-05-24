'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Navigator
} = React;

var LoginScreen = require('./app/screens/login');
var SignUpScreen = require('./app/screens/signup');
var HomeScreen = require('./app/screens/home');
var AddSitterScreen = require('./app/screens/addSitter');


var BabysitterApp = React.createClass({
  render: function() {
    return <Navigator
            initialRoute={{id: 'login'}}
            renderScene={this.navigatorRenderScene}/>
  },

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
    }
  }
});

AppRegistry.registerComponent('BabysitterApp', () => BabysitterApp);