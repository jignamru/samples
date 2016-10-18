'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var SignUpScreen = require('./signup');
var HomeScreen = require('./home');

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';

class Login extends Component{

  constructor(props) {
      super(props);
      this.gotoSignup = this.gotoSignup.bind(this);
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
            password:     this.state.password,
            clientId: "karma"
          })
        })
        .then((response) => response.json() )
        .then((responseJson) => {
          console.log('Response:', responseJson);
          if(responseJson.userId) {
            User._setUserId(responseJson.userId).done();
            this.props.navigator.push({
              component: HomeScreen
            })
          } else {
            Alert.alert('Uh oh!', responseJson.message);
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
            <View style={styles.header}>
                <Image style={styles.mark} source={require('../images/icons/logo.png')} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('../images/icons/person.png')}/>
                    <CustomTextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={this.state.username}
                        onChangeText={text => this.state.username = text}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={require('../images/icons/pwd.png')}/>
                    <CustomTextInput
                        password={true}
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000"
                        value={this.state.password}
                        onChangeText={text => this.state.password = text}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <CustomText>Forgot Password?</CustomText>
                </View>
            </View>
            <TouchableHighlight
              onPress={this.handleLogin.bind(this)}>
              <View style={styles.signin}>
                  <CustomText><Text style={styles.whiteFont}>SIGN IN</Text></CustomText>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.gotoSignup}>
              <View style={styles.signup}>
                  <CustomText>Don't have an account? <Text style={styles.bold}>Sign Up</Text></CustomText>
              </View>
            </TouchableHighlight>
        </View>
    )
  }
}

var styles = require('../styles/login');

module.exports = Login;
