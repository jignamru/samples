'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';

var CheckBox = require('react-native-checkbox');
var User = require('../common/user');
var GLOBAL = require('../common/globals');
var HomeScreen = require('./home');
var commonStyles = require('../common/styles');
import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fullname: null,
        phone: null,
        email: null,
        password: null,
        confirmPassword: null,
        tosAccept: null
      }
  }
  handleSignup() {
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
  goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
    	<View style={styles.container}>
            <TouchableHighlight
              onPress={this.goBack.bind(this)}>
              <View style={styles.back}>
                    <Image style={styles.backIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/left-arrow.png')} />
              </View>
            </TouchableHighlight>
            <CustomText isHeading={true} style={styles.title}>Sign Up</CustomText>
	    	<View style={styles.inputs}>
	            <View style={styles.inputContainer}>
	                <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/person.png')}/>
	                <CustomTextInput 
	                    style={styles.input}
	                    placeholder="First and last name"
	                    placeholderTextColor={commonStyles.color.grey}
	                    value={this.state.fullname}
                      autoCapitalize="words"
                      onChangeText={text => this.state.fullname = text}
	                />
	            </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/phone.png')}/>
                    <CustomTextInput 
                        style={styles.input}
                        placeholder="Mobile number"
                        placeholderTextColor={commonStyles.color.grey}
                        value={this.state.phone}
                        keyboardType="phone-pad"                        
                        onChangeText={text => this.state.phone = text}
                    />
              </View>

	            <View style={styles.inputContainer}>
	                <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/email.png')}/>
	                <CustomTextInput 
	                    style={styles.input}
	                    placeholder="Email"
	                    placeholderTextColor={commonStyles.color.grey}
                      autoCapitalize="none"
	                    value={this.state.email}
                      onChangeText={text => this.state.email = text}
	                />
	            </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/pwd.png')}/>
                  <CustomTextInput
                      password={true}
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={commonStyles.color.grey}
                      value={this.state.password}
                      onChangeText={text => this.state.password = text}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/pwd-confirm.png')}/>
                  <CustomTextInput
                      password={true}
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor={commonStyles.color.grey}
                      value={this.state.confirmPassword}
                      onChangeText={text => this.state.confirmPassword = text}
                  />
              </View>
              <View style={styles.inputContainer}>
                <CheckBox
                  label='I have read and accept the terms of service'
                  labelStyle={styles.checkbox}
                  checked={false}
                  onChange={(checked) => this.state.tosAccept = checked}
                />
              </View>
	    	</View>
	    	<TouchableHighlight
              style={styles.button}
              onPress={this.handleSignup.bind(this)}>
	            <View style={styles.signup}>
	                <CustomText style={styles.whiteFont}>DONE</CustomText>
	            </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this.goBack.bind(this)}>
              <View style={styles.signin}>
                  <CustomText style={styles.greyFont}>Already signed up? Sign In</CustomText>
              </View>
            </TouchableHighlight>

	    </View>

    )
  }
}
var styles = require('../styles/signup');
module.exports = SignUp;