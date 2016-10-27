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
    
    // todo: only show the 'request' button if user has sitters count > 0  
    render() {
	    return (
	        <View style={styles.container}>
	        	<View style={styles.introContainer}>
					<Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/giraffe.png')} />
		            <CustomText isHeading={true} style={styles.title}>Welcome!</CustomText>
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
            	<BottomIconBar navigator={this.props.navigator} />
            </View>
	    )
	}
}


module.exports = Home;