'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Navigator
} = React;

var LoginScreen = require('./app/screens/login');
var SignUpScreen = require('./app/screens/signup');

var BabysitterApp = React.createClass({
  render: function() {
    return (
        <Navigator
  //        style={styles.container}
          initialRoute={{id: 'login'}}
          renderScene={this.navigatorRenderScene}/>
    );
  },

  navigatorRenderScene(route, nav) {
    switch (route.id) {
      case 'login':
        return (<LoginScreen navigator={nav} title="login"/>);
      case 'signup':
        return (<SignUpScreen navigator={nav} title="signup" />);
    }
  }
});

AppRegistry.registerComponent('BabysitterApp', () => BabysitterApp);