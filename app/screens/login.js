'use strict';
var React = require('react-native');
var GLOBAL = require('../common/globals');
var SignUpScreen = require('./signup');
//var CookieManager = require('react-native-cookies');

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

var STORAGE_KEY = '@BabysitterApp:userId';

var Login = React.createClass({

  /**
   * Asynchronously store the a user ID to disk.
   */
  async _setUserId(userId) {
     try {
       await AsyncStorage.setItem(STORAGE_KEY, userId);
       console.log('Saved user ID to disk.')
     } catch (error) {
       console.log('AsyncStorage error: ', error.message);
     }
  },

  /**
   * Asynchronously read the user ID from disk.
   */
  async _getUserId() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        this.setState({ userId: value });
        console.log('Recovered user ID from disk: ' + value);
      } else {
        console.log('Initialized with no user ID on disk.');
      }
    } catch (error) {
      console.log('AsyncStorage error: ', error.message);
    }
  },

  componentWillMount: function() {
    this._getUserId().done();
    // TODO if the state contains a user ID
  },

  getInitialState: function() {
    return {
      username: null,
      password: null
    }
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
          console.log('Response', responseJson);
          this._setUserId(responseJson.userId);
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
