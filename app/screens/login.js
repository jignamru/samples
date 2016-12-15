'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var Validators = require('../common/formFieldValidators');
var ErrorMessages = require('../common/errorMessages');
var SignUpScreen = require('./signup');
var HomeScreen = require('./home');
var ForgotPasswordScreen = require('./forgotPassword');

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';
import { Form } from 'react-native-form-generator';

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';

class Login extends Component{

  constructor(props) {
      super(props);
      this.state = {
        formData: {}
      }
  }

  componentWillMount() {
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((value) => {
      if( value != null) {
        //console.log('User logged in. UserId: ' + value);
        this.props.navigator.push({
          component: HomeScreen
        })
      }
    }).done();
  }


  handleLogin() {

    if( !this.state.formData.username || !this.refs.loginForm.refs.username.valid ){
      return Alert.alert('Uh oh!', this.refs.loginForm.refs.username.validationErrors.join("\n"));
    }

    if( !this.state.formData.password || !this.refs.loginForm.refs.password.valid){
      return Alert.alert('Uh oh!', this.refs.loginForm.refs.password.validationErrors.join("\n"));
    }

    fetch( GLOBAL.BABYSITTER_API_URL + "users/authenticate", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailAddress: this.state.formData.username,
            password:     this.state.formData.password,
            clientId: "karma"
          })
        })
        .then((response) => response.json() )
        .then((responseJson) => {
//          console.log('Response:', responseJson);
          if(responseJson.userId) {
            User._setUserId(responseJson.userId).done();
            this.props.navigator.push({
              component: HomeScreen
            })
          } else {
            Alert.alert('Hmm!', ErrorMessages.login[responseJson.errorCode]);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
  }

  goToScreen(component){
      this.props.navigator.push({
      component: component
    })
  }

  handleFormChange(formData){
    this.setState({formData:formData});
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.mark} source={require('../images/icons/logo.png')} />
            </View>

              <Form ref='loginForm' 
                onChange={this.handleFormChange.bind(this)}
                label="Login">
                <CustomTextInput 
                  ref='username' 
                  style={styles.input}
                  iconLeft={<Image size={20} style={styles.iconUsername} source={require('../images/icons/person.png')}/>}
                  keyboardType='email-address'
                  placeholder='email address'
                  autoCapitalize="none"
                  validationFunction={ value => Validators.validateEmail(value)}
                  helpText={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.loginForm.refs.username.valid){
                        return self.refs.loginForm.refs.username.validationErrors.join("\n");
                      }
                    }
                  })(this)}
                />

                <CustomTextInput 
                  ref='password' 
                  iconLeft={<Image size={20} style={styles.iconPassword} source={require('../images/icons/pwd.png')}/>}
                  placeholder='password' 
                  password={true}
                  style={styles.input}
                  validationFunction={ value => Validators.validatePassword(value)}
                  helpText={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.loginForm.refs.password.valid){
                        return self.refs.loginForm.refs.password.validationErrors.join("\n");
                      }
                    }
                  })(this)}
                />            
              </Form>

            <TouchableHighlight
              onPress={() => this.goToScreen(ForgotPasswordScreen)}>
              <View style={styles.forgotContainer}>
                <CustomText>Forgot Password?</CustomText>
              </View>
            </TouchableHighlight>
            
            <TouchableHighlight
              onPress={this.handleLogin.bind(this)}>
              <View style={styles.signin}>
                  <CustomText style={[styles.whiteFont, styles.signinText]}>SIGN IN</CustomText>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.goToScreen(SignUpScreen)}>
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
