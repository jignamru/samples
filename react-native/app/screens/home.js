'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator} from 'react-native';

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/home');
var AddSitterOptionsScreen = require('./addSitterOptions');
var SittersListScreen = require('./sittersList');
var RequestSitterScreen = require('./requestSitter');
var OpenRequestsListScreen = require('./openRequestsList');

import CustomButton from '../components/customButton';
import CustomText from '../components/customText';
import BottomIconBar from '../components/bottomIconBar';
import TopBannerBox from '../components/topBannerBox';

class Home extends Component {
    constructor(props) {
      super(props);
      this.goToScreen = this.goToScreen.bind(this);
      this.state = {
      	user: ''
      };
    }
  	
    componentDidMount() {
  	  this.getUserInfo();
  	}	
  
    getUserInfo(){
	    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {	
		  fetch( GLOBAL.BABYSITTER_API_URL + "users/" + userId, {
	          method: "GET",
	          headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	          }
	        })
	        .then((response) => response.json() )
	        .then((responseJson) => {
	          this.setState({
	          	user: responseJson
	          });
	        })
	        .catch((error) => {
	          console.warn(error);
	        });
		}).done();
	}
  
    goToScreen(component){
      this.props.navigator.push({
			component: component
		})
	}
    
    render() {
		var requestButton = (
			<CustomButton
				type="small"
				label="REQUEST A SITTER"
				onPress={() => this.goToScreen(RequestSitterScreen)}
			/>
		);

		var addSitterButton = (
			<CustomButton
				type="small"
				onPress={() => this.goToScreen(AddSitterOptionsScreen)}
				label="ADD NEW SITTER"
			/>
		);

		var zeroSittersMessage = (
			<View style={styles.messageContainer}>
				<CustomText style={[styles.message, styles.bold]}>Let's start by adding new sitters.</CustomText>
			</View>
		);

		var unverifiedAccountMessage = (
			<View style={styles.messageContainer}>
				<CustomText style={[styles.message, styles.bold]}>You're almost ready!</CustomText>
				<CustomText style={styles.message}>Check the SMS we sent you to verify your phone number.</CustomText>
			</View>
		);

		var unverifiedEmailMessage = (
			<View style={styles.messageContainer}>
				<CustomText style={[styles.message, styles.bold]}>Please verify your email address!</CustomText>
				<CustomText style={styles.message}>You can follow the instructions in the email we sent you.</CustomText>
			</View>
		);

		var unverifiedSitterMessage = (
			<View style={styles.messageContainer}>
				<CustomText style={styles.message}>We're waiting for your sitter to verify their account before you can start making a sitter request.</CustomText>
			</View>
		);

		var openRequestsButton = (
			<CustomButton
				type="small"
				label="SEE OPEN REQUESTS"
				onPress={() => this.goToScreen(OpenRequestsListScreen)}
			/>
		);

		return (
		    <View style={styles.container}>
	            <TopBannerBox
	              isTallBanner={true}
	              imageSource={require('../images/bg/home.jpg')}
	              title={'Hi ' + this.state.user.firstName + '!'}
	            />
		        <View style={styles.actionsContainer}>
					{ this.state.user.hasOpenRequests ? openRequestsButton : <View/> }
                    { this.state.user.hasVerifiedSitters ? requestButton : <View/> }
                    { (this.state.user.phoneNumberIsVerified && !this.state.user.hasSitters) ? zeroSittersMessage : <View/>}
                    { (this.state.user.hasSitters && !this.state.user.hasVerifiedSitters) ? unverifiedSitterMessage : <View/>}
                    { this.state.user.phoneNumberIsVerified ? addSitterButton : unverifiedAccountMessage}
                    { !this.state.user.emailIsVerified ? unverifiedEmailMessage : <View/>}
		    	<BottomIconBar navigator={this.props.navigator} hideHomeIcon={true} hideSittersListIcon={!this.state.user.phoneNumberIsVerified}/>

		    	</View>
		    </View>
		)
	}
}


module.exports = Home;