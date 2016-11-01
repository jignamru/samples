'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';

import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';

class ForgotPassword extends Component{

  constructor(props) {
      super(props);
      this.state = {
        email: null,
      }
  }


  handlePasswordReset() {
    // fetch( GLOBAL.BABYSITTER_API_URL + "users/authenticate", {
    //       method: "POST",
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         emailAddress: this.state.username,
    //         password:     this.state.password,
    //         clientId: "karma"
    //       })
    //     })
    //     .then((response) => response.json() )
    //     .then((responseJson) => {
    //       console.log('Response:', responseJson);
    //       if(responseJson.userId) {
    //         User._setUserId(responseJson.userId).done();
    //         this.props.navigator.push({
    //           component: HomeScreen
    //         })
    //       } else {
    //         Alert.alert('Uh oh!', responseJson.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.warn(error);
    //     });
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
        <CustomText isHeading={true} style={styles.title}>Reset Password</CustomText>
      
        <View style={styles.inputs}>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={require('../images/icons/person.png')}/>
                <CustomTextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={this.state.username}
                    onChangeText={text => this.state.username = text}
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
