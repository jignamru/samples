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

	goToAddNewSitter: function(){
		this.props.navigator.push({
			id: 'addSitter'
		})
	},
	handleLogout: function(){
		User._logout().done();
		this.props.navigator.push({
			id: 'login'
		})
	},
	goToSettings: function(){
		// User._logout().done();
		// this.props.navigator.push({
		// 	id: 'login'
		// })
	},

    render: function() {
	    return (
	        <View style={styles.container}>
	        	<View style={styles.introContainer}>
		            <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
		            <Text style={styles.title}>Welcome!</Text>
		        </View>
		        <View style={styles.actionsContainer}>
		        	<View style={[styles.box, styles.requestSitterBox]}>
		        		<Text style={[styles.boxLabel, styles.whiteFont]}>REQUEST A SITTER</Text>
		        	</View>
		        	<TouchableHighlight
		              onPress={this.goToAddNewSitter}>
			        	<View style={[styles.box, styles.addSitterBox]}>
			        		<Text style={[styles.boxLabel, styles.whiteFont]}>ADD NEW SITTER</Text>
			        	</View>
		        	</TouchableHighlight>
            	</View>
            	<View style={styles.footer}>
            		<TouchableHighlight
		              onPress={this.goToSettings}>
		              <View style={[styles.logout, styles.footerItem]}>
		                  <Text>SETTINGS</Text>
		              </View>
	            	</TouchableHighlight>
	            	<TouchableHighlight
		              onPress={this.goToSettings}>
		              <View style={[styles.logout, styles.footerItem]}>
		                  <Text>SITTERS</Text>
		              </View>
	            	</TouchableHighlight>
            		<TouchableHighlight
		              onPress={this.handleLogout}>
		              <View style={[styles.logout, styles.footerItem]}>
		                  <Text>LOG OUT</Text>
		              </View>
	            	</TouchableHighlight>
            	</View>
            </View>

	    )
	}
});


module.exports = Home;