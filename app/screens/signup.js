'use strict';
var React = require('react-native');
var CheckBox = require('react-native-checkbox');
var User = require('../common/user');
var GLOBAL = require('../common/globals');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator,
  Alert
} = React;

var SignUp = React.createClass({

  getInitialState: function() {
    return {
      fullname: null,
      phone: null,
      email: null,
      password: null,
      confirmPassword: null,
      tosAccept: null
    }
  },
  handleSignup: function() {
    var [firstName, lastName] = this.state.fullname.split(' ');
    var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            phoneNumber:  this.state.phone,
            emailAddress: this.state.email,
            newPassword:  this.state.password,
            tosAccept:    this.state.tosAccept
          });
    console.log(data);
    fetch( GLOBAL.BABYSITTER_API_URL + "users/", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: data
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('Response:',responseJson);
          if(responseJson.id) {
            User._setUserId(responseJson.id).done();
            this.props.navigator.push({
              id: 'home'
            })
          } else {
            Alert.alert('Uh oh!', responseJson.message);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
  },
  goBack: function() {
    this.props.navigator.pop();
  },
  render: function() {
    return (
    	<View style={styles.container}>
            <Image style={styles.bg} source={require('../images/bg-signup.png')} />
            <TouchableHighlight
              onPress={this.goBack}>
              <View style={styles.back}>
                    <Image style={styles.backIcon} source={require('../images/icons/back.png')} />
              </View>
            </TouchableHighlight>

    		<Text style={[styles.title, styles.whiteFont]}>Sign Up</Text>
	    	<View style={styles.inputs}>
	            <View style={styles.inputContainer}>
	                <Image style={styles.inputName} source={require('../images/icons/name.png')}/>
	                <TextInput 
	                    style={[styles.input, styles.whiteFont]}
	                    placeholder="First and last name"
	                    placeholderTextColor="#FFF"
	                    value={this.state.fullname}
                      onChangeText={text => this.state.fullname = text}
	                />
	            </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPhone} source={require('../images/icons/phone.png')}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Mobile number"
                        placeholderTextColor="#FFF"
                        value={this.state.phone}
                        onChangeText={text => this.state.phone = text}
                    />
              </View>

	            <View style={styles.inputContainer}>
	                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
	                <TextInput 
	                    style={[styles.input, styles.whiteFont]}
	                    placeholder="Email"
	                    placeholderTextColor="#FFF"
	                    value={this.state.email}
                      onChangeText={text => this.state.email = text}
	                />
	            </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
                  <TextInput
                      password={true}
                      style={[styles.input, styles.whiteFont]}
                      placeholder="Password"
                      placeholderTextColor="#FFF"
                      value={this.state.password}
                      onChangeText={text => this.state.password = text}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
                  <TextInput
                      password={true}
                      style={[styles.input, styles.whiteFont]}
                      placeholder="Confirm Password"
                      placeholderTextColor="#FFF"
                      value={this.state.confirmPassword}
                      onChangeText={text => this.state.confirmPassword = text}
                  />
              </View>
              <View style={styles.inputContainer}>
                <CheckBox
                  label='I have read and accept the terms of service'
                  labelStyle={styles.whiteFont}
                  checked={false}
                  onChange={(checked) => this.state.tosAccept = checked}
                />
              </View>
	    	</View>
	    	<TouchableHighlight
              style={styles.button}
              onPress={this.handleSignup}>
	            <View style={styles.signup}>
	                <Text style={styles.whiteFont}>DONE</Text>
	            </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this.goBack}>
              <View style={styles.signin}>
                  <Text style={styles.greyFont}>Already signed up?<Text style={styles.whiteFont}>  Sign In</Text></Text>
              </View>
            </TouchableHighlight>

	    </View>

    )
}
});
var styles = require('../styles/signup');
module.exports = SignUp;