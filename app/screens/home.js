'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator} from 'react-native';

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/home');
var AddSitterOptionsScreen = require('./addSitterOptions');
var SittersListScreen = require('./sittersList');
var RequestSitterScreen = require('./requestSitter');

import CustomButton from '../components/customButton';
import CustomText from '../components/customText';
import BottomIconBar from '../components/bottomIconBar'

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
  	  console.log('user:', this.state.user);
  	  var requestButton = (
		  <CustomButton
	      	containerStyle={[styles.buttonContainer, styles.requestSitterButtonContainer]}
	        style={styles.button}
	        styleDisabled={{color: 'red'}}
	        onPress={() => this.goToScreen(RequestSitterScreen)}
	      >
	        REQUEST A SITTER
	      </CustomButton>
  	  );

  	  var addSitterButton = (
		<CustomButton
		  	containerStyle={[styles.buttonContainer, styles.addSitterButtonContainer]}
		    style={styles.button}
		    styleDisabled={{color: 'red'}}
		    onPress={() => this.goToScreen(AddSitterOptionsScreen)}
		  >
		    ADD NEW SITTER
		  </CustomButton>
  	  );

  	  var zeroSittersMessage = (
  	  	<CustomText style={styles.message}>Let us start by adding new sitters.</CustomText>
  	  );

  	  var openRequestsButton = (
  	  	<CustomButton
		  	containerStyle={[styles.buttonContainer, styles.addSitterButtonContainer]}
		    style={styles.button}
		    styleDisabled={{color: 'red'}}
		    onPress={() => this.goToScreen(AddSitterOptionsScreen)}
		  >
		    SEE OPEN REQUESTS
		  </CustomButton>
  	  );

		return (
		    <View style={styles.container}>
		    	<View style={styles.introContainer}>
					<Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/giraffe.png')} />
		            <CustomText isHeading={true} style={styles.title}>Hi {this.state.user.firstName}!</CustomText>
		        </View>
		        <View style={styles.actionsContainer}>
		        	{ this.state.user.hasOpenRequests ? openRequestsButton : <View/> }
		        	{ this.state.user.hasSitters ? requestButton : zeroSittersMessage }

		        	{addSitterButton}
		    	</View>
		    	<BottomIconBar navigator={this.props.navigator} />
		    </View>
		)
	}
}


module.exports = Home;