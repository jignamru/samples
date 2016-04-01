'use strict';
var React = require('react-native');
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var SignUpScreen = require('./signup');

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

var Login = React.createClass({

  getInitialState: function() {
    return {
      username: null,
      password: null
    }
  },

  componentWillMount: function() {
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((value) => {
      if( value != null) {
        console.log('User logged in. UserId: ' + value);
        this.props.navigator.push({
          id: 'home'
        })
      }
    }).done();
  },


  handleLogin: function() {
    fetch( GLOBAL.BABYSITTER_API_URL + "users/authenticate", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailAddress: this.state.username,
            password:     this.state.password
          })
        })
        .then((response) => response.json() )
        .then((responseJson) => {
          console.log('Response:', responseJson);

          if(responseJson.userId) {
            User._setUserId(responseJson.userId).done();
            this.props.navigator.push({
              id: 'home'
            })
          } else {
            console.log('Message:', responseJson.message);
            // TODO display error message to user
          }
        })
        .catch((error) => {
          console.warn(error);
        });
  },

  gotoSignup: function() {
    this.props.navigator.push({
      id: 'signup'
    })
  },

  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('../images/bg-12.png')} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('../images/icons/name.png')}/>
                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                        onChangeText={text => this.state.username = text}
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
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <TouchableHighlight
              onPress={this.handleLogin}>
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Sign In</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.gotoSignup}>
              <View style={styles.signup}>
                  <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
              </View>
            </TouchableHighlight>
        </View>
    );
  }
});

var styles = require('../styles/login');

module.exports = Login;
