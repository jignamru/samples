'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert, ScrollView, KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import { Form, SwitchField } from 'react-native-form-generator';

var User = require('../common/user');
var GLOBAL = require('../common/globals');
var HomeScreen = require('./home');
var commonStyles = require('../common/styles');
var Validators = require('../common/formFieldValidators');

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/customButton';
import CustomModal from '../components/customModal';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import TCModal from '../components/termsAndConditionsModal';
import TopBannerBox from '../components/topBannerBox';

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formData: {},
        disableButton: true,
        tcModalVisible: false,
        showSpinner: false
      }
    }

  handleSignup() {
    this.setState( { showSpinner: true } );
    var [firstName, lastName] = this.state.formData.fullname.split(' ');
    var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            phoneNumber:  this.state.formData.phone,
            emailAddress: this.state.formData.email,
            newPassword:  this.state.formData.password,
            tosAccept:    this.state.formData.acceptedTerms
          });

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
          if(responseJson.id) {
            User._setUserId(responseJson.id).done();
            this.props.navigator.push({
              component: HomeScreen
            })
          } else {
            this.setState( { showSpinner: false } );
            Alert.alert('Uh oh!', responseJson.message);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
  }

  handleFormChange(formData){
    this.setState({formData:formData});
    this.props.onFormChange && this.props.onFormChange(formData);

    if( (this.refs.signupForm.refs.fullname && this.refs.signupForm.refs.fullname.valid) &&
      (this.refs.signupForm.refs.phone && this.refs.signupForm.refs.phone.valid) &&
      (this.refs.signupForm.refs.email && this.refs.signupForm.refs.email.valid) &&
      (this.refs.signupForm.refs.password && this.refs.signupForm.refs.password.valid) &&
      (this.refs.signupForm.refs.confirmPassword && this.refs.signupForm.refs.confirmPassword.valid) &&
      (this.refs.signupForm.values.acceptedTerms)
    ){
      this.state.disableButton = false;
    } else {
      this.state.disableButton = true;
    }
  }

  validateConfirmPassword(value) {
    if(!value || value == '') return "Password confirmation is required.";

    if( this.state.formData.password != value )
      return "Passwords don't match."

    return true;
  }

  goBack() {
    this.props.navigator.pop();
  }

  toggleTCPicker() {
    this.setState( { tcModalVisible: !this.state.tcModalVisible } );
  }


  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={this.goBack.bind(this)}/>}
         />

        <TopBannerBox
          imageSource={require('../images/bg/dogRunning.jpg')}
          title="Sign up"
        />

        <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
          <KeyboardAvoidingView behavior='padding'>
            <Form ref='signupForm' 
              onChange={this.handleFormChange.bind(this)}
              label="Login">

              <CustomTextInput 
                ref='fullname' 
                style={styles.input}
                iconLeft={<Icon name="user-o" size={15} style={styles.inputIcon} />}
                placeholder='First and last name'
                validationFunction={ value => Validators.validateFullname(value)}
                autoCapitalize="words"
                helpTextComponent={((self)=>{
                  if(Object.keys(self.refs).length !== 0){
                    if(!self.refs.signupForm.refs.fullname.valid){
                      return <CustomText style={styles.errors}>{self.refs.signupForm.refs.fullname.validationErrors.join("\n")}</CustomText>;
                    }
                  }
                })(this)}
              />

              <CustomTextInput 
                ref='phone' 
                style={styles.input}
                iconLeft={<Icon name="mobile" size={20} style={styles.inputIcon} />}
                keyboardType='phone-pad'
                placeholder='Mobile number'
                validationFunction={ value => Validators.validatePhone(value)}
                helpTextComponent={((self)=>{
                  if(Object.keys(self.refs).length !== 0){
                    if(!self.refs.signupForm.refs.phone.valid){
                      return <CustomText style={styles.errors}>{self.refs.signupForm.refs.phone.validationErrors.join("\n")}</CustomText>;
                    }
                  }
                })(this)}
              />

              <CustomTextInput 
                ref='email' 
                style={styles.input}
                iconLeft={<Icon name="envelope-o" size={15} style={styles.inputIcon} />}
                keyboardType='email-address'
                placeholder='email address'
                autoCapitalize="none"
                validationFunction={ value => Validators.validateEmail(value)}
                helpTextComponent={((self)=>{
                  if(Object.keys(self.refs).length !== 0){
                    if(!self.refs.signupForm.refs.email.valid){
                      return <CustomText style={styles.errors}>{self.refs.signupForm.refs.email.validationErrors.join("\n")}</CustomText>;
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
                validationFunction={ value => Validators.validatePassword(value,true)}
                helpTextComponent={((self)=>{
                  if(Object.keys(self.refs).length !== 0){
                    if(!self.refs.signupForm.refs.password.valid){
                      return <CustomText style={styles.errors}>{self.refs.signupForm.refs.password.validationErrors.join("\n")}</CustomText>;
                    }
                  }
                })(this)}
              />   

              <CustomTextInput 
                ref='confirmPassword' 
                iconLeft={<Icon name="lock" size={20} style={styles.inputIcon} />}
                placeholder='Confirm password' 
                password={true}
                style={styles.input}
                validationFunction={ value => this.validateConfirmPassword(value)}
                helpTextComponent={((self)=>{
                  if(Object.keys(self.refs).length !== 0){
                    if(!self.refs.signupForm.refs.confirmPassword.valid){
                      return <CustomText style={styles.errors}>{self.refs.signupForm.refs.confirmPassword.validationErrors.join("\n")}</CustomText>;
                    }
                  }
                })(this)}
              />

              <SwitchField 
                label={
                  <CustomText style={styles.terms}>
                    <Icon name="legal" size={15} style={styles.inputIcon} />
                    <CustomText 
                      onPress={ this.toggleTCPicker.bind(this) }
                      style={styles.button}>
                      &nbsp;&nbsp;&nbsp;&nbsp;I accept the <Text style={styles.bold}>Terms & Conditions</Text>
                    </CustomText>
                  </CustomText>
                }
                ref="acceptedTerms" />

            </Form>
          </KeyboardAvoidingView>

          { this.state.tcModalVisible == true ? <TCModal/> : <View/>}

          <CustomButton
            onPress={this.handleSignup.bind(this)}
            disabled={this.state.disableButton}
            showSpinner={this.state.showSpinner}
            label="DONE"/>

          <TouchableHighlight
            style={styles.button}
            onPress={this.goBack.bind(this)}>
            <View style={styles.signin}>
                <CustomText style={styles.greyFont}>Already signed up? <Text style={styles.bold}>Sign In</Text></CustomText>
            </View>
          </TouchableHighlight>
        </ScrollView>
	    </View>

    )
  }
}
var styles = require('../styles/signup');
module.exports = SignUp;