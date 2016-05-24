'use strict';
var React = require('react-native');
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/addSitter');

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

var AddSitter = React.createClass({
	getInitialState: function() {
		return {
	      fullname: null,
	      phone: null,
	      rate: null,
	      priority: null
    	}
	},


    render: function() {
	    return (
	        <View style={styles.container}>
	        	<View style={styles.introContainer}>
		            <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
		            <Text style={styles.title}>Add new sitter</Text>
		        </View>

		        <View style={styles.inputs}>
		            <View style={styles.inputContainer}>
		                <Image style={styles.inputName} source={require('../images/icons/name.png')}/>
		                <TextInput 
		                    style={styles.input}
		                    placeholder="First and last name"
		                    placeholderTextColor="#FFF"
		                    value={this.state.fullname}
	                      onChangeText={text => this.state.fullname = text}
		                />
		            </View>
	                <View style={styles.inputContainer}>
	                    <Image style={styles.inputPhone} source={require('../images/icons/phone.png')}/>
	                    <TextInput 
	                        style={styles.input}
	                        placeholder="Mobile number"
	                        placeholderTextColor="#FFF"
	                        value={this.state.phone}
	                        onChangeText={text => this.state.phone = text}
	                    />
              		</View>

		            <View style={styles.inputContainer}>
		                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
		                <TextInput 
		                    style={styles.input}
		                    placeholder="Rate"
		                    placeholderTextColor="#FFF"
		                    value={this.state.rate}
	                      onChangeText={text => this.state.rate = text}
		                />
		            </View>
	              <View style={styles.inputContainer}>
	                  <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
	                  <TextInput
	                      password={true}
	                      style={styles.input}
	                      placeholder="Priority"
	                      placeholderTextColor="#FFF"
	                      value={this.state.priority}
	                      onChangeText={text => this.state.priority = text}
	                  />
	              </View>              
	    		</View>
	    		<TouchableHighlight
	              style={styles.button}
	              onPress={this.handleAddSitter}>
		            <View style={styles.signup}>
		                <Text style={styles.whiteFont}>SUBMIT</Text>
		            </View>
            	</TouchableHighlight>

            </View>

	    )
	}
});


module.exports = AddSitter;