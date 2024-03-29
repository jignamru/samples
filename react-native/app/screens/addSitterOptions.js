'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Permissions from 'react-native-permissions';

var GLOBAL = require('../common/globals');
var commonStyles = require('../common/styles');
var User = require('../common/user');
var styles = require('../styles/addSitterOptions');
var AddSitterScreen = require('./addSitter');


import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';
import TopBannerBox from '../components/topBannerBox';

class AddSitter extends Component {
   constructor(props) {
      	super(props);
     	this.state = {
     		contactsPermission: ''
     	};
     	this.goToAddSitter = this.goToAddSitter.bind(this);

	}
	
	componentDidMount() {
		Permissions.getPermissionStatus('contacts')
	      .then(response => {
	        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
	        this.setState({ contactsPermission: response })
	      });
	}

	requestPermission() {
		Permissions.requestPermission('contacts')
	      .then(response => {
	        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
	        this.setState({ contactsPermission: response })
	        if( this.state.contactsPermission == 'authorized'){
				ContactsWrapper.getContact()
			        .then((contact) => {
			            this.goToAddSitter(contact);    
			        })
			        .catch((error) => {
			            Alert.alert("Uh Oh!", error.message);
			        });
	    	}
      	}).catch(e => console.warn(e));
	}

	alertForContactsPermission() {
		if( this.state.contactsPermission == 'undetermined' ){
			this.requestPermission();
		} else {
		    Alert.alert(
		      "Can't Access Your Contacts",
		      "We need access so you can select a sitter from your address book.\n" +
			    "\n" +
			    " Click on 'Open Settings' to enable access to your contacts, then come back to try again!",
		      [
		        { text: 'No' },
          		{ text: 'Open Settings', onPress: Permissions.openSettings }
		      ]
		    )
		}
	  }

	goToManualAddSitter(){
		this.props.navigator.push({
			component: AddSitterScreen
	    });
	}
  
	goToAddSitter(contact){
		this.props.navigator.push({
			component: AddSitterScreen, 
			passProps: {
				contact: contact
			}
	    });
	}

	openContacts(){
		if( this.state.contactsPermission == 'authorized'){
			ContactsWrapper.getContact()
		        .then((contact) => {
		            this.goToAddSitter(contact);    
		        })
		        .catch((error) => {
		            Alert.alert("Uh Oh!", error.message);
		        });
	    } else {
	    	this.alertForContactsPermission();
	    }
	}

    render() {
	    return (
	        <View style={styles.container}>
                <NavigationBar
                  title={<IconTitle/>}
                  leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
				/>

				<TopBannerBox
					imageSource={require('../images/bg/bubble.jpg')}
					title="Add new sitter"
				/>

		        <CustomText style={styles.introText}>
		        	Choose one of the following ways to invite someone to your sitter community. We will text your sitter to confirm their phone number... and we will not spam or sell their information!
		        </CustomText>

		        <View style={styles.buttonsBox}>

		    		<View style={styles.buttonRow}>
		    		      <CustomButton
		    		      	type="small"
		    		      	label="ADD FROM CONTACTS"
					        onPress={this.openContacts.bind(this)}
					      />
					</View>


		    		<View style={styles.buttonRow}>
		    		      <CustomButton
		    		      	type="small"
		    		      	label="ADD MANUALLY"
					        onPress={this.goToManualAddSitter.bind(this)}
					      />
					</View>
				</View>
				<BottomIconBar navigator={this.props.navigator}/>
            </View>

	    )
	}
}


module.exports = AddSitter;