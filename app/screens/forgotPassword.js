'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';

var LoginScreen = require('./login');

class ForgotPassword extends Component{

  constructor(props) {
      super(props);
      this.state = {
        emailAddress: null,
      }
  }


  handlePasswordReset() {
    fetch( GLOBAL.BABYSITTER_API_URL + "/users/password/requestReset", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress: this.state.emailAddress,
      })
    })
    .then((response) => response.json() )
    .then((responseJson) => {
      if(responseJson.message) {
        Alert.alert('Uh oh!', responseJson.message);
      } else {
        Alert.alert('Thanks!', "Check the email we've just sent to you for further instructions on how to reset your password.")
        this.props.navigator.push({
          component: LoginScreen
        })
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  goBack() {
    this.props.navigator.pop();
  }


  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={this.goBack.bind(this)}/>}
         />

        <View style={styles.introContainer}>
            <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/reading.png')} />
            <CustomText isHeading={true} style={styles.title}>Reset Password</CustomText>
        </View>
      
        <View style={styles.inputs}>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={require('../images/icons/person.png')}/>
                <CustomTextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={this.state.emailAddress}
                    autoCapitalize="none"
                    onChangeText={text => this.state.emailAddress = text}
                />
            </View>
        </View>

        <TouchableHighlight
          onPress={this.handlePasswordReset.bind(this)}>
          <View style={styles.submit}>
              <CustomText><Text style={styles.whiteFont}>SUBMIT</Text></CustomText>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = require('../styles/forgotPassword');

module.exports = ForgotPassword;
