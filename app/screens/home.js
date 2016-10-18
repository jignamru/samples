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

class Home extends Component {
    constructor(props) {
      super(props);
      this.goToSettings = this.goToSettings.bind(this);
      this.goToScreen = this.goToScreen.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.state = {};
    }
  
	componentWillMount() {
		//TODO get user info?
	}
  
    goToScreen(component){
      this.props.navigator.push({
			component: component
		})
	}
    
	handleLogout(){
		User._logout().done();

		var LoginScreen = require('./login'); // this line is needed here for lazy loading!
		this.goToScreen(LoginScreen);
	}
	goToSettings(){
		// todo
	}

  
    render() {
	    return (
	        <View style={styles.container}>
	        	<View style={styles.introContainer}>
					<Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/giraffe.png')} />
		            <CustomText style={styles.title}>Welcome!</CustomText>
		        </View>
		        <View style={styles.actionsContainer}>
		        	  <CustomButton
	    		      	containerStyle={[styles.buttonContainer, styles.requestSitterButtonContainer]}
				        style={styles.button}
				        styleDisabled={{color: 'red'}}
				        onPress={() => this.goToScreen(RequestSitterScreen)}
				      >
				        REQUEST A SITTER
				      </CustomButton>
		        	<CustomButton
	    		      	containerStyle={[styles.buttonContainer, styles.addSitterButtonContainer]}
				        style={styles.button}
				        styleDisabled={{color: 'red'}}
				        onPress={() => this.goToScreen(AddSitterOptionsScreen)}
				      >
				        ADD NEW SITTER
				      </CustomButton>
            	</View>
            	<View style={styles.footer}>
            		<TouchableHighlight
		              onPress={this.goToSettings}>
		              	<View style={[styles.logout, styles.footerItem]}>
		              		<Image style={styles.footerIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/settings.png')} />
		              	</View>
	            	</TouchableHighlight>
	            	<TouchableHighlight
//                     activeOpacity={75 / 100}
//                     underlayColor={"rgb(210,210,210)"}
		              onPress={() => this.goToScreen(SittersListScreen)}>
			              <View style={[styles.logout, styles.footerItem]}>
			              		<Image style={styles.footerIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/people.png')} />
			              </View>
	            	</TouchableHighlight>
            		<TouchableHighlight
		              onPress={this.handleLogout}>
	  		              <View style={[styles.logout, styles.footerItem]}>
   			              		<Image style={styles.footerIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/logout.png')} />
			              </View>
	            	</TouchableHighlight>
                  
            	</View>
            </View>
	    )
	}
}


module.exports = Home;