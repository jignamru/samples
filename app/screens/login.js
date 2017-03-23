'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var Validators = require('../common/formFieldValidators');
var ErrorMessages = require('../common/errorMessages');
var SignUpScreen = require('./signup');
var HomeScreen = require('./home');
var ForgotPasswordScreen = require('./forgotPassword');
import RequestDetailsScreen from './requestDetails';

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert, KeyboardAvoidingView, Linking} from 'react-native';
import { Form } from 'react-native-form-generator';

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/customButton';
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component{

  constructor(props) {
      super(props);
      this.state = {
        formData: {},
        disableButton: true,
        showSpinner: false
      }
  }

  componentDidMount() {
      Linking.addEventListener('url', this.handleDeepLink.bind(this));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLink.bind(this));
  }

  handleDeepLink(event) {
    // ex: sitterdone://requestDetails?id=7b4edd1c-cd86-4347-b67c-e40532dc9b14
      var url = event.url.replace('sitterdone://', '').split('?');
      var path = url[0];
      var params = url[1];
      var id = params.replace('id=', '');

      // get request details by id and navigate to requestDetails screen

      if( (path == "requestDetails") && id){
        AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
          fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/openRequests", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((responseJson) => {
            var details = null;
            for(var i = 0; i < responseJson.length; i++) {
              if(responseJson[i].id == id){
                details = responseJson[i];   
                break;        
              }
            }
            if( details ){
              return this.props.navigator.push({
                component: RequestDetailsScreen, 
                passProps: {
                  requestDetails: details
                }
              });
            } else {
              console.warn("Couldn't find open request with id: " + id);
            }          
          })
        }).done();
      }
  }

  componentWillMount() {
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((value) => {
      if( value != null) {
        this.props.navigator.push({
          component: HomeScreen
        })
      }
    }).done();
  }


  handleLogin() {
    this.setState( { showSpinner: true } );

    fetch( GLOBAL.BABYSITTER_API_URL + "users/authenticate", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: this.state.formData.username,
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
            this.setState( { showSpinner: false } );
            Alert.alert('Hmm!', ErrorMessages.login[responseJson.errorCode]);
            console.warn('login failed with errorCode: ', responseJson.errorCode);
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
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.mark} source={require('../images/icons/logo.png')} />
            </View>

            <KeyboardAvoidingView behavior='padding'>
              <Form ref='loginForm' 
                onChange={this.handleFormChange.bind(this)}
                label="Login">
                <CustomTextInput 
                  ref='username' 
                  style={styles.input}
                  iconLeft={<Icon name="mobile" size={20} style={styles.inputIcon} />}
                  keyboardType='phone-pad'
                  placeholder='mobile number'
                  validationFunction={ value => Validators.validatePhone(value)}
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
            </KeyboardAvoidingView>
              
            <TouchableHighlight
              onPress={() => this.goToScreen(ForgotPasswordScreen)}>
              <View style={styles.forgotContainer}>
                <CustomText>Forgot Password?</CustomText>
              </View>
            </TouchableHighlight>

            <CustomButton
              onPress={this.handleLogin.bind(this)}
              disabled={this.state.disableButton}
              showSpinner={this.state.showSpinner}
              label="SIGN IN"/>

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
