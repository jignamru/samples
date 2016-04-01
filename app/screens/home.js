'use strict';
var React = require('react-native');
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/home');

var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator
} = React;

var Home = React.createClass({
	componentWillMount: function() {

		//TODO get user info?
	},

	_handleLogout: function(){
		User._logout().done();
		this.props.navigator.push({
			id: 'login'
		})
	},

    render: function() {
	    return (
	        <View style={styles.container}>
	            <Image style={styles.bg} source={require('../images/bg-12.png')} />
	            <Text style={[styles.title, styles.whiteFont]}>Welcome!</Text>
                 <TouchableHighlight
	              onPress={this._handleLogout}>
	              <View style={styles.logout}>
	                  <Text style={styles.whiteFont}>Log out</Text>
	              </View>
            	</TouchableHighlight>

            </View>

	    )
	}
});


module.exports = Home;