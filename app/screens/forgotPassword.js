'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var LoginScreen = require('./login');
var Validators = require('../common/formFieldValidators');


import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';
import { Form } from 'react-native-form-generator';

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';


class ForgotPassword extends Component{

  constructor(props) {
      super(props);
      this.state = {
        formData: {}
      }
  }


  handlePasswordReset() {

    if( !this.state.formData.emailAddress || !this.refs.forgotPasswordForm.refs.emailAddress.valid ){
      return Alert.alert('Uh oh!', this.refs.forgotPasswordForm.refs.emailAddress.validationErrors.join("\n"));
    }

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
        Alert.alert('Uh oh!', "We didn't find an account under this email address.");
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

  handleFormChange(formData){
    this.setState({formData:formData});
    this.props.onFormChange && this.props.onFormChange(formData);
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

        <Form ref='forgotPasswordForm' 
                onChange={this.handleFormChange.bind(this)}
                label="Login">
                <CustomTextInput 
                  ref='emailAddress' 
                  style={styles.input}
                  iconLeft={<Image size={20} style={styles.inputIcon} source={require('../images/icons/person.png')}/>}
                  keyboardType='email-address'
                  placeholder='email address'
                  autoCapitalize="none"
                  validationFunction={ value => Validators.validateEmail(value)}
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.forgotPasswordForm.refs.emailAddress.valid){
                        return <CustomText style={styles.errors}>{self.refs.forgotPasswordForm.refs.emailAddress.validationErrors.join("\n")}</CustomText>;
                      }
                    }
                  })(this)}
                />           
              </Form>
      
        <TouchableHighlight
          onPress={this.handlePasswordReset.bind(this)}>
          <View style={styles.submit}>
              <CustomText><Text style={[styles.whiteFont, styles.buttonText]}>SUBMIT</Text></CustomText>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = require('../styles/forgotPassword');

module.exports = ForgotPassword;
