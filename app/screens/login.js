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
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component{

  constructor(props) {
      super(props);
      this.state = {
        formData: {},
        disableButton: true
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

    if( (this.refs.loginForm.refs.username && this.refs.loginForm.refs.username.valid) &&
      (this.refs.loginForm.refs.password && this.refs.loginForm.refs.password.valid)
    ){
      this.state.disableButton = false;
    } else {
      this.state.disableButton = true;
    }

  }

  render() {
    var disabledButton = (
      <View style={[styles.signin, styles.signinDisabled]}>
          <CustomText style={[styles.signinTextDisabled, styles.signinText]}>SIGN IN</CustomText>
      </View>
    );

    var activeButton = (
      <View style={[styles.signin, styles.signinActive]}>
          <CustomText style={[styles.signinTextActive, styles.signinText]}>SIGN IN</CustomText>
      </View>

    );

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
                  iconLeft={<Icon name="user-o" size={15} style={styles.inputIcon} />}
                  keyboardType='email-address'
                  placeholder='email address'
                  autoCapitalize="none"
                  validationFunction={ value => Validators.validateEmail(value)}
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.loginForm.refs.username.valid){
                        return <CustomText style={styles.errors}>{self.refs.loginForm.refs.username.validationErrors.join("\n")}</CustomText>;
                      }
                    }
                  })(this)}
                />

                <CustomTextInput 
                  ref='password' 
                  iconLeft={<Icon name="lock" size={20} style={styles.inputIcon} />}
                  placeholder='password' 
                  password={true}
                  style={styles.input}
                  validationFunction={ value => Validators.validatePassword(value)}
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.loginForm.refs.password.valid){
                        return <CustomText style={styles.errors}>{self.refs.loginForm.refs.password.validationErrors.join("\n")}</CustomText>;
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
              onPress={this.handleLogin.bind(this)}
              disabled={this.state.disableButton}>
              { this.state.disableButton ? disabledButton : activeButton }
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
