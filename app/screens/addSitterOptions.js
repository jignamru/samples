'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';

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

class AddSitter extends Component {
   constructor(props) {
      	super(props);
     	this.state = {};
     	this.goToAddSitter = this.goToAddSitter.bind(this);

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
		ContactsWrapper.getContact()
	        .then((contact) => {
	            this.goToAddSitter(contact);    
	        })
	        .catch((error) => {
	            Alert.alert("Uh Oh!", error.message);
	        });
	}

    render() {
	    return (
	        <View style={styles.container}>
                <NavigationBar
                  title={<IconTitle/>}
                  leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
				/>
	        	
	        	<View style={styles.introContainer}>
					<Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/car.png')} />
		            <CustomText isHeading={true} style={styles.title}>Add new sitter</CustomText>
		        </View>

		        <View style={styles.buttonsBox}>

		    		<View style={styles.buttonRow}>
		    		      <CustomButton
		    		      	containerStyle={styles.buttonContainer}
					        style={styles.button}
					        styleDisabled={{color: 'red'}}
					        onPress={this.openContacts.bind(this)}
					      >
					        SELECT FROM CONTACTS
					      </CustomButton>
					</View>


		    		<View style={styles.buttonRow}>
		    		      <CustomButton
		    		      	containerStyle={styles.buttonContainer}
					        style={styles.button}
					        styleDisabled={{color: 'red'}}
					        onPress={this.goToManualAddSitter.bind(this)}
					      >
					        ADD MANUALLY
					      </CustomButton>
					</View>
				</View>
            </View>

	    )
	}
}


module.exports = AddSitter;