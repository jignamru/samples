'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var SignUpScreen = require('./signup');
var HomeScreen = require('./home');

import React, { 
  Component, 
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator
} from 'react-native';

class Login extends Component{

  constructor(props) {
      super(props);
      this.state = {
        username: null,
        password: null
      }
  }

  componentWillMount() {
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((value) => {
      if( value != null) {
        console.log('User logged in. UserId: ' + value);
        this.props.navigator.push({
          component: HomeScreen
        })
      }
    }).done();
  }


  handleLogin() {
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
          // console.log('username: ', this.state.username);
          // console.log('pwd: ', this.state.password);
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
  }

  gotoSignup() {
    this.props.navigator.push({
      component: SignUpScreen
    })
  }

  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('../images/bg-login.png')} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('../images/icons/name.png')}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={this.state.username}
                        onChangeText={text => this.state.username = text}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
                    <TextInput
                        password={true}
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000"
                        value={this.state.password}
                        onChangeText={text => this.state.password = text}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text>Forgot Password?</Text>
                </View>
            </View>
            <TouchableHighlight
              onPress={this.handleLogin.bind(this)}>
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>SIGN IN</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.gotoSignup}>
              <View style={styles.signup}>
                  <Text>Don't have an account? <Text style={styles.bold}>Sign Up</Text></Text>
              </View>
            </TouchableHighlight>
        </View>
    )
  }
}

var styles = require('../styles/login');

module.exports = Login;
